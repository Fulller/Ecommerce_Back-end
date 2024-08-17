import { Router } from "express";
import { controller, authenticate, validate } from "../middlewares/index.js";
import { CartValidate } from "../helpers/validate.helper.js";
import CartController from "../controllers/cart.controller.js";

const CartRouter = Router();

CartRouter.use(authenticate);
CartRouter.get("/", controller(CartController.getByUser));
CartRouter.post(
  "/add-to-cart",
  validate(CartValidate.addToCart),
  controller(CartController.addToCart)
);
CartRouter.put(
  "/cart-item-quantity",
  validate(CartValidate.updateCartQuantityItem),
  controller(CartController.updateCartQuantityItem)
);
CartRouter.delete(
  "/cart-item",
  validate(CartValidate.removeCartItem),
  controller(CartController.removeCartItem)
);

export default CartRouter;
