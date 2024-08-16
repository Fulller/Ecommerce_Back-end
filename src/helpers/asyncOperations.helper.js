import RedisPubSubService from "../services/redis.pubsub.service.js";
import CartService from "../services/cart.service.js";
import CHANNEL_CONST from "../configs/channel.cons.configs.js";

function registerEventHandlers() {
  try {
    RedisPubSubService.subscribe(
      CHANNEL_CONST.USER_CREATED,
      (channel, { userId }) => {
        CartService.createUserCart(userId);
      }
    );
    RedisPubSubService.subscribe(
      CHANNEL_CONST.CART_SKU_DELETED,
      (channel, { cart_user, cart_item_id }) => {
        CartService.removeCartItem(cart_user, cart_item_id);
      }
    );
    console.log("REGISTER :: EVEN HANDLER :: REDIS");
  } catch (err) {
    console.log("EVEN HANDLER :: ERROR ", err);
  }
}

export default registerEventHandlers;
