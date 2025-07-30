import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Edge-safe nonce generator using Web Crypto API
function generateNonce(): string {
    const array = new Uint8Array(16)
    crypto.getRandomValues(array)
    return Buffer.from(array).toString('base64')
}

// Strict CSP for production only
const _generateCSPV1 = (nonce: string) => [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https://*.vercel-storage.com",
    "font-src 'self'",
    "connect-src 'self'",
].join('; ')

function generateCSP(nonce: string) {
    const directives = {
        "default-src": ["'self'"],
        "script-src": ["'self'", `'nonce-${nonce}'`],
        "style-src": ["'self'", `'nonce-${nonce}'`],
        "img-src": ["'self'", "blob:", "data:", "https://*.vercel-storage.com"],
        "font-src": ["'self'"],
        "connect-src": ["'self'"],
        "frame-src": ["'self'"],             //  iframe
        "object-src": ["'none'"],
        "base-uri": ["'self'"],
        "form-action": ["'self'"],
        "worker-src": ["'self'", "blob:"],   // using web workers
    };

    return Object.entries(directives)
        .map(([key, vals]) => `${key} ${vals.join(" ")}`)
        .join("; ");
}

export function middleware(_request: NextRequest) {
    const response = NextResponse.next()
    const nonce = generateNonce()

    response.headers.set('x-nonce', nonce)
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    if (process.env.NODE_ENV === 'production') {
        response.headers.set('Content-Security-Policy', generateCSP(nonce))
    }

    return response
}
