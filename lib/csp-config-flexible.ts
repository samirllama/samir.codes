// Flexible CSP configuration without strict typing
export const CSP_SOURCES = {
  // Core
  SELF: "'self'",
  NONE: "'none'",

  // Special directives
  UNSAFE_INLINE: "'unsafe-inline'",
  UNSAFE_EVAL: "'unsafe-eval'",
  WASM_UNSAFE_EVAL: "'wasm-unsafe-eval'",

  BLOB: "blob:",
  DATA: "data:",

  // External services
  JSDELIVR: "https://cdn.jsdelivr.net",
  UNPKG: "https://unpkg.com",

  // Vercel services
  VERCEL_ANALYTICS: "https://va.vercel-scripts.com",
  VERCEL_ANALYTICS_API: "https://vitals.vercel-analytics.com",
  VERCEL_LIVE: "https://vercel.live",
  VERCEL_MAIN: "https://vercel.com",
  VERCEL_SUBDOMAINS: "https://*.vercel.com",

  // Storage
  VERCEL_STORAGE: "https://*.vercel-storage.com",
  VERCEL_BLOB: "https://*.public.blob.vercel-storage.com",
  SPECIFIC_BLOB: "https://j.public.blob.vercel-storage.com",

  // Utilities
  PLACEHOLDER_SVG: "https://placeholder.svg",

  // Development wildcards
  HTTPS_WILDCARD: "https://*",
};

export function createCSPDirectives(nonce: string, isDevelopment = false) {
  const nonceSrc = `'nonce-${nonce}'`;

  const directives = {
    "default-src": [CSP_SOURCES.SELF],

    "script-src": [
      CSP_SOURCES.SELF,
      nonceSrc,
      CSP_SOURCES.WASM_UNSAFE_EVAL,
      CSP_SOURCES.JSDELIVR,
      CSP_SOURCES.UNPKG,
      CSP_SOURCES.VERCEL_ANALYTICS,
      CSP_SOURCES.VERCEL_LIVE,
      CSP_SOURCES.BLOB,
      ...(isDevelopment
        ? [CSP_SOURCES.UNSAFE_EVAL, CSP_SOURCES.UNSAFE_INLINE]
        : []),
    ],

    "script-src-elem": [
      CSP_SOURCES.SELF,
      nonceSrc,
      CSP_SOURCES.JSDELIVR,
      CSP_SOURCES.UNPKG,
      CSP_SOURCES.VERCEL_ANALYTICS,
      CSP_SOURCES.VERCEL_LIVE,
      ...(isDevelopment ? [CSP_SOURCES.UNSAFE_INLINE] : []),
    ],

    "style-src": [
      CSP_SOURCES.SELF,
      nonceSrc,
      CSP_SOURCES.JSDELIVR,
      CSP_SOURCES.VERCEL_ANALYTICS,
      CSP_SOURCES.UNSAFE_INLINE, // Required for many CSS frameworks
    ],

    "style-src-elem": [
      CSP_SOURCES.SELF,
      nonceSrc,
      CSP_SOURCES.JSDELIVR,
      CSP_SOURCES.VERCEL_ANALYTICS,
      CSP_SOURCES.UNSAFE_INLINE,
    ],

    "img-src": isDevelopment
      ? [
        CSP_SOURCES.SELF,
        CSP_SOURCES.BLOB,
        CSP_SOURCES.DATA,
        CSP_SOURCES.HTTPS_WILDCARD,
      ]
      : [
        CSP_SOURCES.SELF,
        CSP_SOURCES.BLOB,
        CSP_SOURCES.DATA,
        CSP_SOURCES.VERCEL_STORAGE,
        CSP_SOURCES.VERCEL_BLOB,
        CSP_SOURCES.SPECIFIC_BLOB,
        CSP_SOURCES.JSDELIVR,
        CSP_SOURCES.PLACEHOLDER_SVG,
        CSP_SOURCES.VERCEL_MAIN,
        CSP_SOURCES.VERCEL_SUBDOMAINS,
      ],

    "font-src": isDevelopment
      ? [CSP_SOURCES.SELF, CSP_SOURCES.HTTPS_WILDCARD]
      : [CSP_SOURCES.SELF, CSP_SOURCES.JSDELIVR, CSP_SOURCES.VERCEL_ANALYTICS],

    "connect-src": isDevelopment
      ? [
        CSP_SOURCES.SELF,
        CSP_SOURCES.HTTPS_WILDCARD,
        CSP_SOURCES.BLOB,
        CSP_SOURCES.DATA,
      ]
      : [
        CSP_SOURCES.SELF,
        CSP_SOURCES.JSDELIVR,
        CSP_SOURCES.UNPKG,
        CSP_SOURCES.VERCEL_STORAGE,
        CSP_SOURCES.VERCEL_BLOB,
        CSP_SOURCES.VERCEL_ANALYTICS_API,
        CSP_SOURCES.VERCEL_ANALYTICS,
        CSP_SOURCES.VERCEL_LIVE,
        CSP_SOURCES.BLOB,
        CSP_SOURCES.DATA,
      ],

    "frame-ancestors": [CSP_SOURCES.SELF],

    "worker-src": isDevelopment
      ? [CSP_SOURCES.SELF, CSP_SOURCES.BLOB, CSP_SOURCES.HTTPS_WILDCARD]
      : [
        CSP_SOURCES.SELF,
        CSP_SOURCES.BLOB,
        CSP_SOURCES.JSDELIVR,
        CSP_SOURCES.VERCEL_ANALYTICS,
      ],

    "child-src": [CSP_SOURCES.SELF, CSP_SOURCES.BLOB, CSP_SOURCES.VERCEL_LIVE],

    "object-src": [CSP_SOURCES.NONE],

    "base-uri": [CSP_SOURCES.SELF],
  };

  return directives;
}

export function formatCSP(directives: Record<string, string[]>): string {
  return Object.entries(directives)
    .map(([directive, sources]) => `${directive} ${sources.join(" ")}`)
    .join("; ");
}
