import { Router } from "express";
import { SPUValidate } from "../helpers/validate.helper.js";
import SPUController from "../controllers/spu.controller.js";
import {
  validate,
  controller,
  authenticate,
  checkPermission,
} from "../middlewares/index.js";

const SPURouter = Router();

SPURouter.use(authenticate);
SPURouter.post(
  "/",
  checkPermission({ resource: "product", action: "create", possession: "own" }),
  validate(SPUValidate.createNew),
  controller(SPUController.createNew)
);

export default SPURouter;
