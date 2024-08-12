import { Router } from "express";
import {
  validate,
  controller,
  cache,
  authenticate,
} from "../middlewares/index.js";
import { RBACValidate } from "../helpers/validate.helper.js";
import RBACController from "../controllers/rbac.controller.js";
import { checkPermission } from "../middlewares/index.js";
const RBACRouter = Router();

RBACRouter.use(authenticate);
RBACRouter.post(
  "/role",
  checkPermission({
    resource: "rbac",
    action: "create",
    possession: "any",
  }),
  validate(RBACValidate.newRole),
  controller(RBACController.newRole)
);
RBACRouter.get(
  "/role",
  checkPermission({
    resource: "rbac",
    action: "read",
    possession: "any",
  }),
  cache({ status: 200, message: "GET LIST GRANT FROM CACHE REDIS" }),
  controller(RBACController.listGrant)
);
RBACRouter.post(
  "/role/grant",
  checkPermission({
    resource: "rbac",
    action: "create",
    possession: "any",
  }),
  validate(RBACValidate.addGrantToRole),
  controller(RBACController.addGrantToRole)
);
RBACRouter.delete(
  "/role/:role_id/grant/:grant_id",
  checkPermission({
    resource: "rbac",
    action: "delete",
    possession: "any",
  }),
  validate(RBACValidate.removeGrantFromRole, "params"),
  controller(RBACController.removeGrantFromRole)
);
RBACRouter.patch(
  "/role/:role_id/grant/:grant_id",
  checkPermission({
    resource: "rbac",
    action: "update",
    possession: "any",
  }),
  validate(RBACValidate.updateGrantInRole, ["params", "body"]),
  controller(RBACController.updateGrantInRole)
);
RBACRouter.post(
  "/resource",
  checkPermission({
    resource: "rbac",
    action: "create",
    possession: "any",
  }),
  validate(RBACValidate.newResource),
  controller(RBACController.newResource)
);

export default RBACRouter;
