import { Router } from "express";
import { SKUValidate } from "../helpers/validate.helper.js";
import SKUController from "../controllers/sku.controller.js";
import {
  validate,
  controller,
  authenticate,
  checkPermission,
} from "../middlewares/index.js";

const SKURouter = Router();

SKURouter.use(authenticate);

export default SKURouter;
