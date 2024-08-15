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

        // Nếu SKU có tồn tại inventory
        if (sku.sku_inventory) {
          // Tìm Inventory theo ID
          inventory = await Inventory.findById(sku.sku_inventory);
          if (inventory) {
            // Cập nhật tồn kho của Inventory
            inventory.inven_stock = sku.sku_stock;
            await inventory.save();
          } else {
            // Nếu Inventory không tồn tại, tạo mới
            inventory = await Inventory.create({
              inven_stock: sku.sku_stock,
              inven_location: "unknown",
              inven_reservations: [],
            });
          }
        } else {
          // Nếu SKU không có inventory, tạo mới Inventory
          inventory = await Inventory.create({
            inven_stock: sku.sku_stock,
            inven_location: "unknown",
            inven_reservations: [],
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
};
export default SKUService;
