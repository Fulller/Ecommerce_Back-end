import passport from "passport";
import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { UserValidate } from "../helpers/validate.helper.js";
import { validate, controller, authenticate } from "../middlewares/index.js";

const UserRouter = Router();

UserRouter.post(
  "/email/signup",
  validate(UserValidate.signUp),
  controller(UserController.email.signUp)
);
UserRouter.post(
  "/email/login",
  validate(UserValidate.logIn),
  controller(UserController.email.logIn)
);
UserRouter.get(
  "/email/verify-signup-otp",
  validate(UserValidate.verifySignUpOTP, "query"),
  controller(UserController.email.verifySignUpOTP)
);
UserRouter.post(
  "/email/before-forgot-password",
  validate(UserValidate.beforeForgotPassword),
  controller(UserController.email.beforeForgotPassword)
);
UserRouter.post(
  "/email/after-for-forgot",
  validate(UserValidate.afterForgotPassword),
  controller(UserController.email.afterForgotPassword)
);
UserRouter.get("/google", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
});
UserRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  controller(UserController.social.googleCallback)
);
UserRouter.get("/github", (req, res, next) => {
  passport.authenticate("github")(req, res, next);
});
UserRouter.get(
  "/github/callback",
  passport.authenticate("github"),
  controller(UserController.social.gitHubCallback)
);
UserRouter.post(
  "/refresh-access-token",
  validate(UserValidate.refreshToken),
  controller(UserController.refreshToken)
);
UserRouter.use(authenticate);
UserRouter.get("/profile", controller(UserController.profile));
UserRouter.post(
  "/user-upgrade-to-shop",
  validate(UserValidate.userUpgradeToShop),
  controller(UserController.userUpgradeToShop)
);

export default UserRouter;
