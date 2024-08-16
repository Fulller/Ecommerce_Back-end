import Cart from "../models/cart.model.js";
import SKURepo from "../models/repositories/sku.repo.js";
import InventoryRepo from "../models/repositories/inventory.repo.js";
import RedisPubSubService from "./redis.pubsub.service.js";
import createHttpError from "http-errors";
import { CART_SCHEMA_CONST } from "../configs/schema.const.config.js";
import CHANNEL_CONST from "../configs/channel.cons.configs.js";
import { standardizeCart, getCleanData } from "../utils/index.js";

const CartService = {
  async updateUserCartQuantity({ userId, product }) {
    const { productId, quantity } = product;
    const query = {
      cart_userId: userId,
      "cart_items.sku": productId,
      cart_state: CART_SCHEMA_CONST.STATE.ACTIVE,
    };
    const updateSet = { $inc: { "cart_products.$.quantity": quantity } };
    const options = { upsert: true, new: true };
    return await Cart.findOneAndUpdate(query, updateSet, options);
  },
  async deleteUserCart({ userId, productId }) {
    const query = {
      cart_userId: userId,
      cart_state: CART_SCHEMA_CONST.STATE.ACTIVE,
    };
    const updateSet = { $pull: { cart_products: { productId } } };
    const deleteCart = await Cart.updateOne(query, updateSet);
    return deleteCart;
  },
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
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { cart_user },
        { $pull: { cart_items: { _id: cart_item_id } } },
        { new: true }
      );
      if (!updatedCart) {
        throw createHttpError(400, "Cart not found or item not in cart.");
      }
      return updatedCart;
    } catch (error) {
      throw createHttpError(
        400,
        `Error removing item from cart: ${error.message}`
      );
    }
  },
};

export default CartService;
