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
  validate(SPUValidate.create),
  controller(SPUController.create)
);
SPURouter.put(
  "/:spuId",
  checkPermission({ resource: "product", action: "update", possession: "own" }),
  validate(SPUValidate.update, ["params", "body"]),
  controller(SPUController.update)
);
SPURouter.get(
  "/:spuId/by-shop",
  checkPermission({ resource: "product", action: "read", possession: "own" }),
  validate(SPUValidate.getByShop, "params"),
  controller(SPUController.getByShop)
);

export default SPURouter;
