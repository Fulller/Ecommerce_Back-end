import env from "../configs/env.config.js";
import { createClient } from "redis";

let redisClient;

async function connectRedis(
  connectedLog = "CONNECTED :: REDIS",
  failedLog = "CONNECTED :: REDIS"
) {
  redisClient = createClient({
    url: env.db.redis,
  });
  redisClient.on("connect", () => console.log(connectedLog));
  redisClient.on("error", (err) => console.log(failedLog, err));
  await redisClient.connect();
}

export { redisClient, connectRedis };
