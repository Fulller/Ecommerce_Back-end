import { redisClient } from "../database/redis.db.js";

const RedisService = {
  otpPath(email) {
    return `otp:${email}`;
  },
  forgotPasswordOTPPath(token) {
    return `forgot_password_otp:${token}`;
  },
  saveOTP({ email, expire = 60, token }) {
    redisClient.set(RedisService.otpPath(email), token, {
      EX: expire,
      NX: true,
    });
  },
  saveFotgotPasswordOTP({ email, expire = 60, token }) {
    redisClient.set(RedisService.forgotPasswordOTPPath(token), email, {
      EX: expire,
      NX: true,
    });
  },
  async getOTP({ email }) {
    return await redisClient.get(RedisService.otpPath(email));
  },
  async getFotgotPasswordOTP({ token }) {
    return await redisClient.get(RedisService.forgotPasswordOTPPath(token));
  },
  async deleteOTP({ email }) {
    return await redisClient.del(RedisService.otpPath(email));
  },
  async deleteFotgotPasswordOTP({ token }) {
    return await redisClient.del(RedisService.forgotPasswordOTPPath(token));
  },
};
export default RedisService;
