import CartService from "../services/cart.service.js";

const CartController = {
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
  async updateCartQuantityItem(req, res) {
    const userId = req.user._id;
    const { cart_item_id, quantity } = req.body;
    await CartService.updateCartQuantityItem(userId, cart_item_id, quantity);
    return res.fly({
      status: 200,
      message: "Update cart product to cart successfuly",
      metadata: await CartService.getByUser(userId),
    });
  },
  async removeCartItem(req, res) {
    const userId = req.user._id;
    const { cart_item_id } = req.body;
    await CartService.removeCartItem(userId, cart_item_id);
    return res.fly({
      status: 200,
      message: "Delete cart item successfuly",
      metadata: await CartService.getByUser(userId),
    });
  },
};

export default CartController;
