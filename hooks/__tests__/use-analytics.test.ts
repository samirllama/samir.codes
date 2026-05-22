import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  trackLinkClick,
  trackPageView,
  trackBlogPost,
  trackSearch,
  trackSubscription,
  trackSocialShare,
  trackCustomEvent,
} from "../use-analytics";
import { useClickTracking } from "../use-click-tracking";
import { track } from "@vercel/analytics";

vi.mock("@vercel/analytics", () => ({
  track: vi.fn(),
}));

describe("use-analytics hook and functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("sessionStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
    });
    // Stub fetch globally by default to prevent relative URL failures in node context
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should trigger Vercel track and navigator.sendBeacon when tracking link click", () => {
    const sendBeaconMock = vi.fn().mockReturnValue(true);
    vi.stubGlobal("navigator", {
      sendBeacon: sendBeaconMock,
    });

    trackLinkClick("https://example.com", "Test Link", "footer");

    // 1. Verify Vercel track is called
    expect(track).toHaveBeenCalledWith("Link Click", {
      url: "https://example.com",
      text: "Test Link",
      location: "footer",
    });

    // 2. Verify navigator.sendBeacon is called with correct parameters
    expect(sendBeaconMock).toHaveBeenCalled();
    const [url, blob] = sendBeaconMock.mock.calls[0];
    expect(url).toBe("/api/analytics");
    expect(blob).toBeInstanceOf(Blob);
  });

  it("should fallback to fetch with keepalive if sendBeacon returns false", () => {
    const sendBeaconMock = vi.fn().mockReturnValue(false);
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("navigator", {
      sendBeacon: sendBeaconMock,
    });
    vi.stubGlobal("fetch", fetchMock);

    trackPageView("/blog", "tech");

    expect(track).toHaveBeenCalledWith("Page View", {
      page: "/blog",
      category: "tech",
    });

    expect(sendBeaconMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/analytics",
      expect.objectContaining({
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: expect.stringContaining("sessionId"),
      })
    );
  });

  it("should fallback to fetch if navigator.sendBeacon is completely unavailable", () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("navigator", {}); // no sendBeacon
    vi.stubGlobal("fetch", fetchMock);

    trackPageView("/home");

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/analytics",
      expect.objectContaining({
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: expect.stringContaining("sessionId"),
      })
    );
  });

  it("should correctly log blog posts, searches, subscriptions, and social shares", () => {
    const sendBeaconMock = vi.fn().mockReturnValue(true);
    vi.stubGlobal("navigator", { sendBeacon: sendBeaconMock });

    // Track Blog Post
    trackBlogPost("Mastering Next.js", "Engineering", 5);
    expect(track).toHaveBeenCalledWith("Blog Post View", {
      title: "Mastering Next.js",
      category: "Engineering",
      readTime: 5,
    });

    // Track Search
    trackSearch("Redpanda Kafka", 12);
    expect(track).toHaveBeenCalledWith("Search", {
      query: "Redpanda Kafka",
      resultsCount: 12,
    });

    // Track Subscription
    trackSubscription("newsletter");
    expect(track).toHaveBeenCalledWith("Subscription", {
      type: "newsletter",
    });

    // Track Social Share
    trackSocialShare("Twitter", "https://samir.codes/posts/1");
    expect(track).toHaveBeenCalledWith("Social Share", {
      platform: "Twitter",
      url: "https://samir.codes/posts/1",
    });
  });

  it("should support trackCustomEvent and trigger sendCustomEvent cleanly", () => {
    const sendBeaconMock = vi.fn().mockReturnValue(true);
    vi.stubGlobal("navigator", { sendBeacon: sendBeaconMock });

    const customProps = { customAttr: "val123" };
    trackCustomEvent("Custom Custom", customProps);

    expect(track).toHaveBeenCalledWith("Custom Custom", customProps);
    expect(sendBeaconMock).toHaveBeenCalled();
  });

  describe("getSessionId functionality", () => {
    it("should retrieve a cached session ID from sessionStorage if available", () => {
      const getSpy = vi.fn().mockReturnValue("cached-session-999");
      vi.stubGlobal("sessionStorage", {
        getItem: getSpy,
        setItem: vi.fn(),
      });
      const sendBeaconMock = vi.fn().mockReturnValue(false); // Force fetch fallback
      const fetchMock = vi.fn().mockResolvedValue({ ok: true });
      vi.stubGlobal("navigator", { sendBeacon: sendBeaconMock });
      vi.stubGlobal("fetch", fetchMock);

      trackPageView("/about");

      expect(getSpy).toHaveBeenCalledWith("analytics_sid");
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/analytics",
        expect.objectContaining({
          body: expect.stringContaining("cached-session-999"),
        })
      );
    });

    it("should generate and cache a session ID if sessionStorage is empty", () => {
      const setSpy = vi.fn();
      vi.stubGlobal("sessionStorage", {
        getItem: vi.fn().mockReturnValue(null),
        setItem: setSpy,
      });

      trackPageView("/about");

      expect(setSpy).toHaveBeenCalledWith("analytics_sid", expect.any(String));
    });
  });

  describe("useClickTracking hook", () => {
    it("should track click events as 'UI Click' events and preserve additionalData", () => {
      const sendBeaconMock = vi.fn().mockReturnValue(true);
      vi.stubGlobal("navigator", { sendBeacon: sendBeaconMock });

      const { trackClick } = useClickTracking();
      trackClick("button", "Submit Form", "contact-form", { formId: "form_01" });

      expect(track).toHaveBeenCalledWith("UI Click", {
        elementType: "button",
        elementText: "Submit Form",
        location: "contact-form",
        additionalData: { formId: "form_01" },
      });

      expect(sendBeaconMock).toHaveBeenCalled();
    });
  });
});
