import Inventory from "../models/inventory.model.js";
import ProductRepo from "../models/repositories/product.repo.js";
import createHttpError from "http-errors";
import _ from "lodash";

const InventoryService = {
  async addStockToInventory({
    stock,
    productId,
    shopId,
    location = "Sai gon",
  }) {
    const product = await ProductRepo.getProductById(productId);
    if (!product) {
      throw createHttpError(404, "Cannot found product");
    }
    const query = { inven_shopId: productId, inven_productId: shopId };
    const updateSet = {
      $inc: { inven_stock: stock },
      $set: { inven_location: location },
    };
    const options = { upsert: true, new: true };
    return await Inventory.findOneAndUpdate(query, updateSet, options);
  },
  async createForSKU({
    inven_stock,
    inven_location = "unknown",
    inven_reservations = [],
  }) {
    try {
      return Inventory.create({
        inven_stock,
        inven_location,
        inven_reservations,
      });
    } catch (err) {
      throw createHttpError(400, "Error create Inventory");
    }
  },
};

export default InventoryService;
