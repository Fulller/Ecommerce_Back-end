import { Router } from "express";
import {
  controller,
  validate,
  checkPermission,
  authenticate,
} from "../middlewares/index.js";
import CategoryController from "../controllers/category.controller.js";
import { CategoryValidate } from "../helpers/validate.helper.js";

const CategoryRouter = Router();

CategoryRouter.post(
  "/",
  authenticate,
  checkPermission({
    resource: "category",
    action: "create",
    possession: "any",
  }),
  validate(CategoryValidate.addCategory),
  controller(CategoryController.addCategory)
);
CategoryRouter.post(
  "/many",
  authenticate,
  checkPermission({
    resource: "category",
    action: "create",
    possession: "any",
  }),
  validate(CategoryValidate.addCategories),
  controller(CategoryController.addCategories)
);
CategoryRouter.get(
  "/",
  checkPermission({
    resource: "category",
    action: "read",
    possession: "any",
  }),
  controller(CategoryController.getAllCategories)
);
CategoryRouter.get(
  "/:categoryId",
  checkPermission({
    resource: "category",
    action: "read",
    possession: "any",
  }),
  validate(CategoryValidate.getCategoryAttributes, "params"),
  controller(CategoryController.getCategoryAttributes)
);

export default CategoryRouter;
