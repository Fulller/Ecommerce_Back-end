import SKU from "../models/sku.model.js";

const SKUService = {
  async createMany(skuList) {
    return SKU.insertMany(skuList);
  },
};
export default SKUService;
