import ProductService from "../services/product.service.js";
import _ from "lodash";

const ProductController = {
  async create(req, res) {
    const ownerId = req.user._id;
    const productData = req.body;
    const product = await ProductService.newProduct(ownerId, productData);
    return res.fly({
      status: 201,
      message: "Creat new SPU succesfully",
      metadata: await ProductService.getByShop(ownerId, product._id),
    });
  },
  async update(req, res) {
    const productId = req.params.productId;
    const ownerId = req.user._id;
    const productData = req.body;
    await ProductService.update({ ownerId, productId }, productData);
    return res.fly({
      status: 201,
      message: "Update SPU succesfully",
      metadata: await ProductService.getByShop(ownerId, productId),
    });
  },
  async getByShop(req, res) {
    const ownerId = req.user._id;
    const productId = req.params.productId;
    return res.fly({
      status: 200,
      message: "Get SPU by shop succesfully",
      metadata: await ProductService.getByShop(ownerId, productId),
    });
  },
};
export default ProductController;
