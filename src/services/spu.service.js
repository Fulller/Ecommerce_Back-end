import SPU from "../models/spu.model.js";
import ShopRepository from "../models/repositories/shop.repo.js";
import CategoryRepository from "../models/repositories/category.repo.js";
import CategoryService from "../services/category.service.js";
import SKUService from "./sku.service.js";
import createHttpError from "http-errors";
import { spuSlug, skuSlug, getCleanData } from "../utils/index.js";
import _ from "lodash";

const SPUService = {
  async newSPU(spuData, ownerId) {
    const [shop, category] = await Promise.all([
      ShopRepository.findByOwnerId(ownerId),
      CategoryRepository.findById(spuData.spu_category).lean(),
    ]);
    if (!shop) {
      throw createHttpError(404, "SPUService :: shop not found");
    }
    if (!category) {
      throw createHttpError(404, "SPUService :: catetory not found");
    }
    spuData = _.chain(spuData)
      .set("spu_shop", shop._id)
      .set("spu_slug", spuSlug(spuData.spu_name))
      .value();
    const newSPU = await SPU.create(spuData);
    const skuList = _.chain(spuData)
      .get("sku_list", [])
      .map((sku) =>
        _.chain(sku)
          .set("sku_spu", newSPU._id)
          .set(
            "sku_slug",
            skuSlug(spuData.spu_name, spuData.spu_variations, sku.sku_tier_idx)
          )
          .value()
      )
      .value();
    const newSKUList = await SKUService.createMany(skuList);
    newSPU.spu_skus = _.map(newSKUList, (sku) => sku._id);
    await newSPU.save();
    return [getCleanData(newSPU), getCleanData(newSKUList)];
  },
  async getByShop(spuId, ownerId) {
    const shop = await ShopRepository.findByOwnerId(ownerId);
    if (!shop) {
      throw createHttpError(404, "Shop not found");
    }
    const spu = await SPU.findOne({ _id: spuId, spu_shop: shop._id }).populate({
      path: "spu_skus",
      select: "sku_tier_idx sku_price sku_stock sku_image sku_weight",
    });
    if (!spu) {
      throw createHttpError(404, "SPU not found");
    }
    const { ancestors, category } =
      await CategoryService.getCategoryWithAncestors(spu.spu_category);
    return _.chain(getCleanData(spu))
      .set("spu_category", category)
      .set("spu_category_ancestors", ancestors)
      .value();
  },
};

export default SPUService;
