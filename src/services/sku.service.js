import SKU from "../models/sku.model.js";
import Inventory from "../models/inventory.model.js";
import InventoryService from "./inventory.service.js";
import createHttpError from "http-errors";
import _ from "lodash";
import mongoose from "mongoose";

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
  async updateOrCreateMany(skuList) {
    try {
      const promises = skuList.map(async (sku) => {
        let inventory;
        if (sku.sku_inventory) {
          inventory = await Inventory.findById(sku.sku_inventory);
          if (inventory) {
            inventory.inven_stock = sku.sku_stock;
            await inventory.save();
          } else {
            inventory = await Inventory.create({
              inven_stock: sku.sku_stock,
              inven_location: "unknown",
            });
          }
        } else {
          inventory = await Inventory.create({
            inven_stock: sku.sku_stock,
            inven_location: "unknown",
          });
        }

        // Cập nhật hoặc tạo mới SKU
        const updatedSKU = await SKU.findOneAndUpdate(
          { _id: sku._id || new mongoose.Types.ObjectId() },
          _.chain(sku)
            .omit(["_id", "sku_spu"])
            .set("sku_inventory", inventory._id)
            .value(),
          {
            upsert: true,
            new: true,
          }
        );
        inventory.inven_sku = updatedSKU._id;
        await inventory.save();
        return updatedSKU;
      });

      const newSKUList = await Promise.all(promises);
      return newSKUList;
    } catch (error) {
      console.error(error);
      throw createHttpError(400, "Error updating SKUs");
    }
  },
  async deleteMany(skuIds) {
    try {
      return await SKU.updateMany(
        { _id: { $in: skuIds } },
        { $set: { isDeleted: true } }
      );
    } catch (error) {
      throw createHttpError(400, "Error deleting SKUs: " + error.message);
    }
  },
};
export default SKUService;
