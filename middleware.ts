import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Edge-safe nonce generator using Web Crypto API
function generateNonce(): string {
    const array = new Uint8Array(16)
    crypto.getRandomValues(array)
    return Buffer.from(array).toString("base64")
}

export function middleware(request: NextRequest) {
    const response = NextResponse.next()
    const nonce = generateNonce()

    // Set WASM content type for SciChart files
    if (request.nextUrl.pathname.endsWith(".wasm")) {
        response.headers.set("Content-Type", "application/wasm")
        response.headers.set("Cross-Origin-Embedder-Policy", "require-corp")
        response.headers.set("Cross-Origin-Opener-Policy", "same-origin")
    }

    // Fallback headers
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("X-XSS-Protection", "1; mode=block")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.set("X-Frame-Options", "SAMEORIGIN") // Fallback for older browsers

    // Lock down framing only in production
    if (process.env.NODE_ENV === "production") {
        // Build CSP with SciChart, WASM, and Vercel Blob support
        const directives: Record<string, string[]> = {
            "default-src": ["'self'"],
            "script-src": [
                "'self'",
                `'nonce-${nonce}'`,
                "'wasm-unsafe-eval'", // Required for WASM
                "https://cdn.jsdelivr.net", // SciChart CDN
                "https://unpkg.com", // Alternative CDN
                "blob:", // For dynamic script loading
            ],
            "style-src": [
                "'self'",
                `'nonce-${nonce}'`,
                "'unsafe-inline'", // Sometimes needed for dynamic styles
            ],
            "img-src": [
                "'self'",
                "blob:",
                "data:",
                "https://*.vercel-storage.com", // Vercel Blob storage
                "https://*.public.blob.vercel-storage.com", // Specific Vercel Blob pattern
                "https://j.public.blob.vercel-storage.com", // Your specific hostname
                "https://cdn.jsdelivr.net", // For any images from CDN
                "https://placeholder.svg", // Placeholder images
            ],
            "font-src": ["'self'", "https://cdn.jsdelivr.net"],
            "connect-src": [
                "'self'",
                "https://cdn.jsdelivr.net", // For fetching WASM files
                "https://unpkg.com",
                "https://*.vercel-storage.com", // Vercel Blob API calls
                "https://*.public.blob.vercel-storage.com",
                "blob:",
                "data:",
            ],
            "frame-ancestors": ["'self'"], // iframe
            "worker-src": [
                "'self'",
                "blob:", // Web workers for SciChart
                "https://cdn.jsdelivr.net",
            ],
            "child-src": [
                "'self'",
                "blob:", // For web workers
            ],
            "object-src": ["'none'"],
            "base-uri": ["'self'"],
            // Add WASM-specific directive
            "script-src-elem": ["'self'", `'nonce-${nonce}'`, "https://cdn.jsdelivr.net", "https://unpkg.com"],
        }

        const csp = Object.entries(directives)
            .map(([k, v]) => `${k} ${v.join(" ")}`)
            .join("; ")

        response.headers.set("Content-Security-Policy", csp)
        response.headers.set("x-nonce", nonce)
    } else {
        // Development mode - more permissive CSP for easier development
        const devDirectives: Record<string, string[]> = {
            "default-src": ["'self'"],
            "script-src": [
                "'self'",
                `'nonce-${nonce}'`,
                "'unsafe-eval'", // More permissive for development
                "'wasm-unsafe-eval'",
                "https://cdn.jsdelivr.net",
                "https://unpkg.com",
                "blob:",
            ],
            "style-src": ["'self'", `'nonce-${nonce}'`, "'unsafe-inline'"],
            "img-src": ["'self'", "blob:", "data:", "https://*"], // Allow all HTTPS images in dev
            "font-src": ["'self'", "https://*"],
            "connect-src": ["'self'", "https://*", "blob:", "data:"],
            "frame-ancestors": ["'self'"],
            "worker-src": ["'self'", "blob:", "https://*"],
            "child-src": ["'self'", "blob:"],
            "object-src": ["'none'"],
            "base-uri": ["'self'"],
        }

        const devCsp = Object.entries(devDirectives)
            .map(([k, v]) => `${k} ${v.join(" ")}`)
            .join("; ")

        response.headers.set("Content-Security-Policy", devCsp)
        response.headers.set("x-nonce", nonce)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}
