import CartService from "../services/cart.service.js";

const CartController = {
  async update(req, res) {
    return res.fly({
      status: 200,
      message: "Update cart product to cart successfuly",
      metadata: await CartService.addToCartV2(req.body),
    });
  },
  async delete(req, res) {
    return res.fly({
      status: 200,
      message: "Delete cart product to cart successfuly",
      metadata: await CartService.deleteUserCart(req.body),
    });
  },
  async getByUser(req, res) {
    const userId = req.user._id;
    return res.fly({
      status: 200,
      message: "Get list cart successfuly",
      metadata: await CartService.getByUser(userId),
    });
  },
  async addToCart(req, res) {
    const userId = req.user._id;
    await CartService.addToCart(userId, req.body);
    return res.fly({
      status: 200,
      message: "Add product cart to cart successfuly",
      metadata: await CartService.getByUser(userId),
    });
  },
};

export default CartController;
