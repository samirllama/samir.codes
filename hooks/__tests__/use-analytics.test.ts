import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { trackLinkClick, trackPageView } from "../use-analytics";
import { track } from "@vercel/analytics";

vi.mock("@vercel/analytics", () => ({
  track: vi.fn(),
}));

describe("use-analytics hook and functions", () => {
  let originalNavigator: any;
  let originalFetch: any;

  beforeEach(() => {
    vi.clearAllMocks();
    originalNavigator = typeof global !== "undefined" ? (global as any).navigator : undefined;
    originalFetch = typeof global !== "undefined" ? (global as any).fetch : undefined;
  });

  afterEach(() => {
    if (typeof global !== "undefined") {
      (global as any).navigator = originalNavigator;
      (global as any).fetch = originalFetch;
    }
  });

  it("should trigger Vercel track and navigator.sendBeacon when tracking link click", () => {
    const sendBeaconMock = vi.fn().mockReturnValue(true);
    if (typeof global !== "undefined") {
      (global as any).navigator = {
        sendBeacon: sendBeaconMock,
      } as any;
    }

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
    if (typeof global !== "undefined") {
      (global as any).navigator = {
        sendBeacon: sendBeaconMock,
      } as any;
      (global as any).fetch = fetchMock as any;
    }

    trackPageView("/blog", "tech");

    expect(track).toHaveBeenCalledWith("Page View", {
      page: "/blog",
      category: "tech",
    });

    expect(sendBeaconMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith("/api/analytics", expect.objectContaining({
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    }));
  });

  it("should fallback to fetch if navigator.sendBeacon is completely unavailable", () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    if (typeof global !== "undefined") {
      (global as any).navigator = {} as any; // no sendBeacon
      (global as any).fetch = fetchMock as any;
    }

    trackPageView("/home");

    expect(fetchMock).toHaveBeenCalledWith("/api/analytics", expect.objectContaining({
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    }));
  });
});
