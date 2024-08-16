import Cart from "../cart.model.js";
import { toObjectId } from "../../utils/index.js";
import { CART_SCHEMA_CONST } from "../../configs/schema.const.config.js";

const CartRepo = {
  async findCartById(id) {
    return await Cart.findOne({
      _id: toObjectId(id),
      cart_state: CART_SCHEMA_CONST.STATE.ACTIVE,
    }).lean();
  },
  async findByUser(cart_user) {
    return await Cart.findOne({
      cart_user: toObjectId(cart_user),
      cart_state: CART_SCHEMA_CONST.STATE.ACTIVE,
    });
  },
};
export default CartRepo;
