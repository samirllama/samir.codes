import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createCSPDirectives, formatCSP } from "@/lib/csp-config-flexible"

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
    response.headers.set("X-Frame-Options", "SAMEORIGIN")

    // Build CSP directives based on environment
    const isDevelopment = process.env.NODE_ENV === "development"
    const cspDirectives = createCSPDirectives(nonce, isDevelopment)
    const cspString = formatCSP(cspDirectives)

    response.headers.set("Content-Security-Policy", cspString)
    response.headers.set("x-nonce", nonce)

    return response
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
