import { redisClient } from "../database/redis.db.js";
import createHttpError from "http-errors";

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
  refreskToken: {
    path(user_id) {
      return `refreshtoken:${user_id}`;
    },
    save(user_id, refreshtoken, { exprire }) {
      redisClient.set(RedisService.refreskToken.path(user_id), refreshtoken, {
        EX: exprire,
      });
    },
    async exist(user_id, refreshtoken) {
      const refresktokenSaved = await redisClient.get(
        RedisService.refreskToken.path(user_id)
      );
      return refresktokenSaved == refreshtoken;
    },
    get(user_id) {
      return redisClient.get(RedisService.refreskToken.path(user_id));
    },
    async delete(user_id, refreshtoken) {
      const isExist = await RedisService.refreskToken.exist(
        user_id,
        refreshtoken
      );
      if (!isExist) {
        throw createHttpError(404, "RedisService :: refreshtoken not found");
      }
      return redisClient.del(RedisService.refreskToken.path(user_id));
    },
  },
};
export default RedisService;
