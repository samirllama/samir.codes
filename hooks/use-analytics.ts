// /hooks/use-analytics.ts
"use client";

import { track } from "@vercel/analytics";
import type {
  LinkClickProperties,
  PageViewProperties,
  BlogPostProperties,
  SearchProperties,
  SubscriptionProperties,
  SocialShareProperties,
} from "../types/analytics";

type VercelTrackableProperties = Record<string, string | number | boolean | null>;

const getSessionId = (): string => {
  if (typeof window === "undefined") return "anonymous";
  try {
    let sid = sessionStorage.getItem("analytics_sid");
    if (!sid) {
      sid = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem("analytics_sid", sid);
    }
    return sid;
  } catch {
    return "anonymous";
  }
};


export const sendCustomEvent = (event: string, properties: Record<string, unknown>) => {
  try {
    const sessionId = getSessionId();
    const payloadWithSession = {
      ...properties,
      sessionId,
    };

    const data = JSON.stringify({ event, properties: payloadWithSession });
    const url = "/api/analytics";

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([data], { type: "application/json" });
      const success = navigator.sendBeacon(url, blob);
      if (success) return;
    }

    if (typeof fetch !== "undefined") {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
        keepalive: true,
      }).catch((err) => console.error("Custom analytics fetch failed:", err));
    }
  } catch (err) {
    console.error("Failed to construct or dispatch custom analytics payload:", err);
  }
};

const executeTrack = (event: string, properties: Record<string, unknown>) => {
  try {
    track(event, properties as VercelTrackableProperties);
  } catch (err) {
    console.error(`Vercel Analytics failed tracking for "${event}":`, err);
  }
  sendCustomEvent(event, properties);
};

export const trackCustomEvent = (event: string, properties: Record<string, unknown>) => {
  executeTrack(event, properties);
};

export const trackLinkClick = (url: string, text: string, location: string) => {
  const properties: LinkClickProperties = {
    url,
    text: text.substring(0, 100),
    location,
  };
  executeTrack("Link Click", properties as unknown as VercelTrackableProperties);
};

export const trackPageView = (page: string, category?: string) => {
  const properties: PageViewProperties = {
    page,
    category: category || "blog",
  };
  executeTrack("Page View", properties as unknown as VercelTrackableProperties);
};

export const trackBlogPost = (title: string, category: string, readTime: number) => {
  const properties: BlogPostProperties = {
    title: title.substring(0, 100),
    category,
    readTime,
  };
  executeTrack("Blog Post View", properties as unknown as VercelTrackableProperties);
};

export const trackSearch = (query: string, resultsCount: number) => {
  const properties: SearchProperties = {
    query: query.substring(0, 50),
    resultsCount,
  };
  executeTrack("Search", properties as unknown as VercelTrackableProperties);
};

export const trackSubscription = (type: "newsletter" | "rss") => {
  const properties: SubscriptionProperties = {
    type,
  };
  executeTrack("Subscription", properties as unknown as VercelTrackableProperties);
};

export const trackSocialShare = (platform: string, url: string) => {
  const properties: SocialShareProperties = {
    platform,
    url,
  };
  executeTrack("Social Share", properties as unknown as VercelTrackableProperties);
};

export function useAnalytics() {
  return {
    trackCustomEvent,
    trackLinkClick,
    trackPageView,
    trackBlogPost,
    trackSearch,
    trackSubscription,
    trackSocialShare,
  };
}
