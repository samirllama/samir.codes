"use client"

import { track } from "@vercel/analytics"

export const trackLinkClick = (url: string, text: string, location: string) => {
    track("Link Click", {
        url,
        text: text.substring(0, 100),
        location,
    })
}

export const trackPageView = (page: string, category?: string) => {
    track("Page View", {
        page,
        category: category || "blog",
    })
}

export const trackBlogPost = (title: string, category: string, readTime: number) => {
    track("Blog Post View", {
        title: title.substring(0, 100),
        category,
        readTime,
    })
}

export const trackSearch = (query: string, resultsCount: number) => {
    track("Search", {
        query: query.substring(0, 50),
        resultsCount,
    })
}

export const trackSubscription = (type: "newsletter" | "rss") => {
    track("Subscription", {
        type,
    })
}

export const trackSocialShare = (platform: string, url: string) => {
    track("Social Share", {
        platform,
        url,
    })
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
