import { Router } from "express";
import { ProductValidate } from "../helpers/validate.helper.js";
import ProductController from "../controllers/product.controller.js";
import {
  validate,
  controller,
  authenticate,
  checkPermission,
} from "../middlewares/index.js";

const ProductRouter = Router();

ProductRouter.use(authenticate);
ProductRouter.post(
  "/",
  checkPermission({ resource: "product", action: "create", possession: "own" }),
  validate(ProductValidate.create),
  controller(ProductController.create)
);
ProductRouter.put(
  "/:productId",
  checkPermission({ resource: "product", action: "update", possession: "own" }),
  validate(ProductValidate.update, ["params", "body"]),
  controller(ProductController.update)
);
ProductRouter.get(
  "/:productId/by-shop",
  checkPermission({ resource: "product", action: "read", possession: "own" }),
  validate(ProductValidate.getByShop, "params"),
  controller(ProductController.getByShop)
);

export default ProductRouter;
