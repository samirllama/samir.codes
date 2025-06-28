import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Configure Redis client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
});

// Create a new ratelimiter, that allows 5 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10s"),
  analytics: true,
  /**
   * Optional: A key prefix for the ratelimit keys in Redis.
   * Can be used to organize your keys on Redis.
   */
  prefix: "@upstash/ratelimit",
});