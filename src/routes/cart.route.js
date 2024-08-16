import { Router } from "express";
import { controller, authenticate, validate } from "../middlewares/index.js";
import { CartValidate } from "../helpers/validate.helper.js";
import CartController from "../controllers/cart.controller.js";

const CartRouter = Router();

// CartRouter.post("/", controller(CartController.addToCart));
// CartRouter.post("/update", controller(CartController.update));
// CartRouter.delete("/", controller(CartController.delete));
CartRouter.use(authenticate);
CartRouter.get("/", controller(CartController.getByUser));
CartRouter.post(
  "/add-to-cart",
  validate(CartValidate.addToCart),
  controller(CartController.addToCart)
);

export default CartRouter;
