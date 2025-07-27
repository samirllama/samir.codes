import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from 'next/server';

// Create a Redis client using Upstash credentials
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const limiter_fixed = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '1 m'), // 5 requests per minute
  analytics: true,
  prefix: 'rate_limiter',
});

// Middleware-style helper for API routes or Server Actions
export async function rateLimit_fixed(request: Request, key?: string) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const identifier = key || ip;

  const result = await limiter.limit(identifier);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait and try again.' },
      { status: 429 }
    );
  }

  return null;
}


export const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requests per rolling minute
  analytics: true,
  prefix: 'rate_limit',
});

export async function rateLimit(request: Request, key?: string) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const identifier = key || ip;

  const result = await limiter.limit(identifier);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait and try again.' },
      { status: 429 }
    );
  }

  return null;
}
