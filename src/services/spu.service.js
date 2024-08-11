import SPU from "../models/spu.model.js";
import ShopRepository from "../models/repositories/shop.repo.js";
import SKUService from "./sku.service.js";
import createHttpError from "http-errors";
import { spuSlug, skuSlug, getCleanData } from "../utils/index.js";
import _ from "lodash";

const SPUService = {
  async newSPU(spuData, ownerId) {
    const shop = await ShopRepository.findByOwnerId(ownerId);
    if (!shop) {
      throw createHttpError(404, "SPUService :: shop not found");
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
};

export default SPUService;
