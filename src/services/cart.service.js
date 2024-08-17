import Cart from "../models/cart.model.js";
import SKURepo from "../models/repositories/sku.repo.js";
import InventoryRepo from "../models/repositories/inventory.repo.js";
import RedisPubSubService from "./redis.pubsub.service.js";
import createHttpError from "http-errors";
import { CART_SCHEMA_CONST } from "../configs/schema.const.config.js";
import CHANNEL_CONST from "../configs/channel.cons.configs.js";
import { standardizeCart, getCleanData } from "../utils/index.js";

const CartService = {
  async createUserCart(userId) {
    const query = {
      cart_user: userId,
      cart_state: CART_SCHEMA_CONST.STATE.ACTIVE,
    };
    const options = { upsert: true, new: true };
    return await Cart.findOneAndUpdate(query, {}, options);
  },
  async getByUser(cart_user) {
    const cart = await Cart.findOne({ cart_user }).populate({
      path: "cart_items.sku",
      populate: { path: "sku_product", populate: "product_shop" },
    });
    cart.cart_items.forEach((cartItem) => {
      const {
        sku: { isDeleted },
      } = cartItem;
      if (isDeleted) {
        RedisPubSubService.publish(CHANNEL_CONST.CART_SKU_DELETED, {
          cart_user,
          cart_item_id: cartItem._id,
        });
      }
    });
    return standardizeCart(getCleanData(cart).cart_items);
  },
  async addToCart(cart_user, product) {
    const { sku, quantity } = product;
    const _sku = await SKURepo.findById(sku);
    if (!_sku) {
      throw createHttpError("CartService :: addToCartV3 :: sku not found");
    }
    const inventory = await InventoryRepo.findBySKU(sku);
    if (quantity > inventory.inven_stock) {
      throw createHttpError(
        `CartService :: addToCartV3 :: quantity must be less than stock stock = ${inventory.inven_stock}`
      );
    }
    const cart = await Cart.findOneAndUpdate(
      {
        cart_user,
        "cart_items.sku": sku,
        cart_state: CART_SCHEMA_CONST.STATE.ACTIVE,
      },
      {
        $inc: { "cart_items.$.quantity": quantity },
      },
      { new: true }
    );
    if (!cart) {
      await Cart.findOneAndUpdate(
        { cart_user, cart_state: CART_SCHEMA_CONST.STATE.ACTIVE },
        {
          $push: {
            cart_items: {
              sku,
              quantity,
            },
          },
        },
        { upsert: true, new: true }
      );
    }
  },
  async removeCartItem(cart_user, cart_item_id) {
    const updatedCart = await Cart.findOneAndUpdate(
      { cart_user, cart_state: CART_SCHEMA_CONST.STATE.ACTIVE },
      { $pull: { cart_items: { _id: cart_item_id } } }
    );
    if (!updatedCart) {
      throw createHttpError(400, "Cart not found or item not in cart.");
    }
    return updatedCart;
  },
  async updateCartQuantityItem(cart_user, cart_item_id, quantity) {
    const cart = await Cart.findOne({
      cart_user,
      "cart_items._id": cart_item_id,
      cart_state: CART_SCHEMA_CONST.STATE.ACTIVE,
    }).populate("cart_items.sku");
    if (!cart) {
      throw createHttpError(
        `CartService :: updateCartQuantityItem :: cart not found`
      );
    }
    const cartItem = cart.cart_items.id(cart_item_id);
    const sku = cartItem.sku;
    const inventory = await InventoryRepo.findBySKU(sku._id);
    if (quantity > inventory.inven_stock) {
      throw createHttpError(
        `CartService :: updateCartQuantityItem :: quantity must be less than stock stock = ${inventory.inven_stock}`
      );
    }
    cartItem.quantity = quantity;
    await cart.save();
  },
};

export default CartService;
