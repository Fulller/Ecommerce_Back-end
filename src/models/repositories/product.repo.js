import Product from "../product.model.js";

const ProductRepository = {
  findById(productId) {
    return Product.findOne({ _id: productId, isDeleted: false });
  },
};

export default ProductRepository;
