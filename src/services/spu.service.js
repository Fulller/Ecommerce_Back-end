import SPU from "../models/spu.model.js";
import ShopRepository from "../models/repositories/shop.repo.js";
import CategoryRepository from "../models/repositories/category.repo.js";
import CategoryService from "../services/category.service.js";
import SKUService from "./sku.service.js";
import createHttpError from "http-errors";
import { spuSlug, skuSlug, getCleanData } from "../utils/index.js";
import _ from "lodash";

const SPUService = {
  async newSPU(ownerId, spuData) {
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
    let skuList = _.get(spuData, "spu_skus");
    spuData = _.chain(spuData)
      .set("spu_shop", shop._id)
      .set("spu_slug", spuSlug(spuData.spu_name))
      .set("spu_skus", [])
      .value();
    const newSPU = await SPU.create(spuData);
    skuList = _.chain(skuList)
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
    return getCleanData(await newSPU.populate("spu_skus"));
  },
  async update(spuQuery, spuData) {
    const [shop, category] = await Promise.all([
      ShopRepository.findByOwnerId(spuQuery.shop_owner),
      CategoryRepository.findById(spuData.spu_category).lean(),
    ]);
    if (!shop) {
      throw createHttpError(404, "SPUService :: update :: shop not found");
    }
    if (!category) {
      throw createHttpError(404, "SPUService :: update :: category not found");
    }
    let spu = await SPU.findOne({ _id: spuQuery.spu_id, spu_shop: shop._id });
    if (!spu) {
      throw createHttpError(404, "SPUService :: update :: spu not found");
    }

    const { spu_skus, spu_name } = spuData;
    spuData = _.chain(spuData)
      .omit(["_id", "spu_skus", "spu_sold", "spu_sort", "spu_shop", "spu_slug"])
      .set("spu_slug", spuSlug(spu_name))
      .value();

    await spu.updateOne(spuData, { upsert: true, new: true });
    const skuList = _.chain(spu_skus)
      .map((sku) =>
        _.chain(sku)
          .set(
            "sku_slug",
            skuSlug(spuData.spu_name, spuData.spu_variations, sku.sku_tier_idx)
          )
          .value()
      )
      .value();
    const isNewSKUs = !_.hasIn(skuList[0], "_id");
    if (isNewSKUs) {
      await SKUService.deleteMany(spu.spu_skus);
    }
    const updatedSKUList = await SKUService.updateOrCreateMany(skuList);
    spu.spu_skus = _.map(updatedSKUList, (sku) => sku._id);
    await spu.save();
    return spu;
  },
  async getByShop(spuId, ownerId) {
    const shop = await ShopRepository.findByOwnerId(ownerId);
    if (!shop) {
      throw createHttpError(404, "Shop not found");
    }
    const spu = await SPU.findOne({ _id: spuId, spu_shop: shop._id }).populate({
      path: "spu_skus",
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
