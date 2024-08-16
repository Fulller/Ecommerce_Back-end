import SKU from "../sku.model.js";

const SKURepository = {
  findById(skuId) {
    return SKU.findOne({ _id: skuId, isDeleted: false });
  },
};

export default SKURepository;
