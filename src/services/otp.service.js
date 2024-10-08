import RedisService from "./redis.service.js";
import { generateDegitOTP } from "../utils/index.js";
import createHttpError from "http-errors";

const OTPService = {
  generateOTP({ email }) {
    const token = generateDegitOTP();
    RedisService.saveOTP({ email, token });
    return token;
  },
  generateForgotPasswordOTP({ email }) {
    const token = generateDegitOTP();
    RedisService.saveFotgotPasswordOTP({ email, token, expire: 120 });
    return token;
  },
  async verifyOTP({ email, token }) {
    const storedToken = await RedisService.getOTP({ email });
    if (!storedToken) {
      throw createHttpError(404, "OTP not found");
    }
    if (storedToken != token) {
      throw createHttpError(404, "OTP was wrong");
    }
    await RedisService.deleteOTP({ email });
  },
  async verifyForgotPasswordOTP({ token }) {
    const storedEmail = await RedisService.getFotgotPasswordOTP({ token });
    if (!storedEmail) {
      throw createHttpError(404, "Forgot password OTP not found");
    }
    await RedisService.deleteFotgotPasswordOTP({ token });
    return storedEmail;
  },
};
export default OTPService;
