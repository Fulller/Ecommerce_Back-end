import { redisClient, connectRedis } from "../database/redis.db.js"; // Adjust the path accordingly

class RedisPubSubService {
  constructor() {
    this.publisher = redisClient.duplicate();
    this.subscriber = redisClient.duplicate();

    this.publisher.on("error", (err) =>
      console.error("Redis Publisher Error:", err)
    );
    this.subscriber.on("error", (err) =>
      console.error("Redis Subscriber Error:", err)
    );
    this.connectClients();
  }

  async connectClients() {
    if (!this.publisher.isOpen) {
      await this.publisher.connect();
    }
    if (!this.subscriber.isOpen) {
      await this.subscriber.connect();
    }
  }

  async publish(channel, message) {
    await this.connectClients();
    return this.publisher.publish(channel, JSON.stringify(message));
  }

  async subscribe(channel, callback) {
    await this.connectClients();

    await this.subscriber.subscribe(channel, (message) => {
      callback(channel, JSON.parse(message));
    });
  }
}

export default new RedisPubSubService(
  await connectRedis("CONNECTED :: REDIS :: PUBSUB")
);
