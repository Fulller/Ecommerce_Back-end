import RedisService from "./redis.service.js";
import jwt from "jsonwebtoken";
import env from "../configs/env.config.js";
import createHttpError from "http-errors";
import { pickAccountData } from "../utils/index.js";
import _ from "lodash";

const {
  access_serect_key: ACCESS_SECRECT_KEY,
  refresh_serect_key: REFRESH_SECRECT_KEY,
  access_ex: ACCESS_EX,
  refresh_ex: REFRESH_EX,
} = env.auth.jwt;
const RedisRefreskTokenService = RedisService.refreskToken;

const JWTService = {
  access: {
    sign: (user) => {
      return jwt.sign(pickAccountData(user), ACCESS_SECRECT_KEY, {
        expiresIn: ACCESS_EX,
        algorithm: "HS256",
      });
    },
    verify: (token) => {
      return jwt.verify(token, ACCESS_SECRECT_KEY);
    },
  },
  refresh: {
    sign: async (user, userId) => {
      const token = jwt.sign(pickAccountData(user), REFRESH_SECRECT_KEY, {
        expiresIn: REFRESH_EX,
        algorithm: "HS256",
      });
      RedisRefreskTokenService.save(userId, token, { exprire: REFRESH_EX });
      return token;
    },
    verify: async (token) => {
      const user = await jwt.verify(token, REFRESH_SECRECT_KEY);
      if (!user) {
        throw createHttpError(404, "JWTService :: Invalid token");
      }
      const isExist = await RedisRefreskTokenService.exist(user._id, token);
      if (!isExist) {
        throw createHttpError(404, "JWTService :: Token is not exist ");
      }
      return user;
    },
    delete: async (token) => {
      const user = await JWTService.refresh.verify(token);
      if (!user) throw createHttpError(400, "Token invalid");
      return await RedisRefreskTokenService.delete(user._id, token);
    },
    findByUser: async (userId) => {
      return await RedisRefreskTokenService.get(userId);
    },
  },
  refreshToken: async function (refreshTokenString) {
    const validRefreshToken = await JWTService.refresh.verify(
      refreshTokenString
    );
    if (!validRefreshToken) {
      throw createHttpError(403, "RefreshToken invalid");
    }
    const accessToken = await JWTService.access.sign(
      pickAccountData(validRefreshToken)
    );
    if (!accessToken) {
      throw createHttpError(403, "Can not create access token");
    }
    return accessToken;
  },
};

export default JWTService;
