import { Router } from "express";
import { ShopController } from "../controllers/index.js";
// import { ShopValidate } from "../helpers/validate.helper.js";
// import { HEADER } from "../configs/const.config.js";
import {
  // validate,
  controller,
  authenticate,
  // authenticateWithRefreshToken,
  checkPermission,
} from "../middlewares/index.js";

const ShopRouter = Router();

// ShopRouter.post(
//   "/signup",
//   validate(ShopValidate.signUp),
//   controller(ShopController.signUp)
// );
// ShopRouter.post(
//   "/login",
//   validate(ShopValidate.logIn),
//   controller(ShopController.logIn)
// );

// // Authen with refrehtoken
// ShopRouter.use(authenticateWithRefreshToken);

// ShopRouter.post(
//   "/logout",
//   validate(ShopValidate.logOut, "headers", [HEADER.REFRESHTOKEN]),
//   controller(ShopController.logOut)
// );

// ShopRouter.post(
//   "/refresh-token",
//   validate(ShopValidate.refreshToken, "headers", [HEADER.REFRESHTOKEN]),
//   controller(ShopController.refreshToken)
// );
ShopRouter.use(authenticate);
ShopRouter.get(
  "/infomation",
  checkPermission({ resource: "shop", action: "read", possession: "own" }),
  controller(ShopController.getInfomation)
);
export default ShopRouter;
