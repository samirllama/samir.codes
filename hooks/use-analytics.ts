"use client"

import { track } from "@vercel/analytics"

// Helper to generate or retrieve an ephemeral browser sessionId
const getSessionId = (): string => {
  if (typeof window === "undefined") return "anonymous"
  try {
    let sid = sessionStorage.getItem("analytics_sid")
    if (!sid) {
      sid =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      sessionStorage.setItem("analytics_sid", sid)
    }
    return sid
  } catch (e) {
    // Handle sandboxed contexts or blocked storage (strict incognito mode)
    return "anonymous"
  }
}

// Helper to fire events to our custom analytics edge tunnel
const sendCustomEvent = (event: string, properties: any) => {
  const sessionId = getSessionId()
  const payloadWithSession = {
    ...properties,
    sessionId,
  }
  const data = JSON.stringify({ event, properties: payloadWithSession })
  const url = "/api/analytics"

  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    const blob = new Blob([data], { type: "application/json" })
    const success = navigator.sendBeacon(url, blob)
    if (!success) {
      // Fallback to fetch keepalive if sendBeacon queue is full
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
        keepalive: true,
      }).catch((err) => console.error("Custom analytics fetch fallback failed:", err))
    }
  } else if (typeof fetch !== "undefined") {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
      keepalive: true,
    }).catch((err) => console.error("Custom analytics fetch failed:", err))
  }
}

export const trackLinkClick = (url: string, text: string, location: string) => {
  const properties = {
    url,
    text: text.substring(0, 100),
    location,
  }
  track("Link Click", properties)
  sendCustomEvent("Link Click", properties)
}

export const trackPageView = (page: string, category?: string) => {
  const properties = {
    page,
    category: category || "blog",
  }
  track("Page View", properties)
  sendCustomEvent("Page View", properties)
}

export const trackBlogPost = (title: string, category: string, readTime: number) => {
  const properties = {
    title: title.substring(0, 100),
    category,
    readTime,
  }
  track("Blog Post View", properties)
  sendCustomEvent("Blog Post View", properties)
}

export const trackSearch = (query: string, resultsCount: number) => {
  const properties = {
    query: query.substring(0, 50),
    resultsCount,
  }
  track("Search", properties)
  sendCustomEvent("Search", properties)
}

export const trackSubscription = (type: "newsletter" | "rss") => {
  const properties = {
    type,
  }
  track("Subscription", properties)
  sendCustomEvent("Subscription", properties)
}

export const trackSocialShare = (platform: string, url: string) => {
  const properties = {
    platform,
    url,
  }
  track("Social Share", properties)
  sendCustomEvent("Social Share", properties)
}

// hook for components that prefer the hook pattern
export function useAnalytics() {
  return {
    trackLinkClick,
    trackPageView,
    trackBlogPost,
    trackSearch,
    trackSubscription,
    trackSocialShare,
  }
}


