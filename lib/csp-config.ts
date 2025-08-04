// Centralized CSP configuration for better maintainability
export const CSP_DOMAINS = {
    // Core application
    self: "'self'",

    // External CDNs
    jsdelivr: "https://cdn.jsdelivr.net",
    unpkg: "https://unpkg.com",

    // Vercel services
    vercelAnalytics: "https://va.vercel-scripts.com",
    vercelAnalyticsApi: "https://vitals.vercel-analytics.com",
    vercelLive: "https://vercel.live",
    vercelMain: "https://vercel.com",
    vercelSubdomains: "https://*.vercel.com",

    // Vercel Storage
    vercelStorage: "https://*.vercel-storage.com",
    vercelBlobStorage: "https://*.public.blob.vercel-storage.com",
    specificBlobStorage: "https://j.public.blob.vercel-storage.com",

    // Placeholder services
    placeholderSvg: "https://placeholder.svg",

    // Special directives
    blob: "blob:",
    data: "data:",
    unsafeInline: "'unsafe-inline'",
    unsafeEval: "'unsafe-eval'",
    wasmUnsafeEval: "'wasm-unsafe-eval'",
} as const

export function buildCSPDirectives(nonce: string, isDevelopment = false) {
    const baseDirectives = {
        "default-src": [CSP_DOMAINS.self],
        "script-src": [
            CSP_DOMAINS.self,
            `'nonce-${nonce}'`,
            CSP_DOMAINS.wasmUnsafeEval,
            CSP_DOMAINS.jsdelivr,
            CSP_DOMAINS.unpkg,
            CSP_DOMAINS.vercelAnalytics,
            CSP_DOMAINS.vercelLive,
            CSP_DOMAINS.blob,
        ],
        "script-src-elem": [
            CSP_DOMAINS.self,
            `'nonce-${nonce}'`,
            CSP_DOMAINS.jsdelivr,
            CSP_DOMAINS.unpkg,
            CSP_DOMAINS.vercelAnalytics,
            CSP_DOMAINS.vercelLive,
        ],
        "style-src": [
            CSP_DOMAINS.self,
            `'nonce-${nonce}'`,
            CSP_DOMAINS.jsdelivr,
            CSP_DOMAINS.vercelAnalytics,
            CSP_DOMAINS.unsafeInline, // Required for many CSS frameworks
        ],
        "style-src-elem": [
            CSP_DOMAINS.self,
            `'nonce-${nonce}'`,
            CSP_DOMAINS.jsdelivr,
            CSP_DOMAINS.vercelAnalytics,
            CSP_DOMAINS.unsafeInline,
        ],
        "img-src": [
            CSP_DOMAINS.self,
            CSP_DOMAINS.blob,
            CSP_DOMAINS.data,
            CSP_DOMAINS.vercelStorage,
            CSP_DOMAINS.vercelBlobStorage,
            CSP_DOMAINS.specificBlobStorage,
            CSP_DOMAINS.jsdelivr,
            CSP_DOMAINS.placeholderSvg,
            CSP_DOMAINS.vercelMain,
            CSP_DOMAINS.vercelSubdomains,
        ],
        "font-src": [CSP_DOMAINS.self, CSP_DOMAINS.jsdelivr, CSP_DOMAINS.vercelAnalytics],
        "connect-src": [
            CSP_DOMAINS.self,
            CSP_DOMAINS.jsdelivr,
            CSP_DOMAINS.unpkg,
            CSP_DOMAINS.vercelStorage,
            CSP_DOMAINS.vercelBlobStorage,
            CSP_DOMAINS.vercelAnalyticsApi,
            CSP_DOMAINS.vercelAnalytics,
            CSP_DOMAINS.vercelLive,
            CSP_DOMAINS.blob,
            CSP_DOMAINS.data,
        ],
        "frame-ancestors": [CSP_DOMAINS.self],
        "worker-src": [CSP_DOMAINS.self, CSP_DOMAINS.blob, CSP_DOMAINS.jsdelivr, CSP_DOMAINS.vercelAnalytics],
        "child-src": [CSP_DOMAINS.self, CSP_DOMAINS.blob, CSP_DOMAINS.vercelLive],
        "object-src": ["'none'"],
        "base-uri": [CSP_DOMAINS.self],
    }

    // Add development-specific permissions
    if (isDevelopment) {
        baseDirectives["script-src"].push(CSP_DOMAINS.unsafeEval, CSP_DOMAINS.unsafeInline)
        baseDirectives["script-src-elem"].push(CSP_DOMAINS.unsafeInline)
        baseDirectives["img-src"] = [CSP_DOMAINS.self, CSP_DOMAINS.blob, CSP_DOMAINS.data, "https://*"]
        baseDirectives["font-src"] = [CSP_DOMAINS.self, "https://*"]
        baseDirectives["connect-src"] = [
            CSP_DOMAINS.self,
            "https://*",
            CSP_DOMAINS.blob,
            CSP_DOMAINS.data,
            CSP_DOMAINS.vercelAnalyticsApi,
        ]
        baseDirectives["worker-src"] = [CSP_DOMAINS.self, CSP_DOMAINS.blob, "https://*"]
    }

    return baseDirectives
}

export function buildCSPString(directives: Record<string, string[]>): string {
    return Object.entries(directives)
        .map(([key, values]) => `${key} ${values.join(" ")}`)
        .join("; ")
}
