import SKU from "../models/sku.model.js";
import InventoryService from "./inventory.service.js";
import createHttpError from "http-errors";
import _ from "lodash";

const SKUService = {
  async createMany(skuList) {
    try {
      const promises = skuList.map(async (sku) => {
        const inventory = await InventoryService.createForSKU({
          inven_stock: sku.sku_stock,
        });
        const newSKU = await SKU.create(
          _.set(sku, "sku_inventory", inventory._id)
        );
        inventory.inven_sku = newSKU._id;
        await inventory.save();
        return newSKU;
      });
      const newSKUList = await Promise.all(promises);
      return newSKUList;
    } catch (error) {
      console.log(error);
      throw createHttpError(400, "Error creating SKUs");
    }
  },
};
export default SKUService;
