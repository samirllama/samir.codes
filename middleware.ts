import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Edge-safe nonce generator using Web Crypto API
function generateNonce(): string {
    const array = new Uint8Array(16)
    crypto.getRandomValues(array)
    return Buffer.from(array).toString('base64')
}

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
        "worker-src": ["'self'", "blob:"],   // using web workers
    };

    return Object.entries(directives)
        .map(([key, vals]) => `${key} ${vals.join(" ")}`)
        .join("; ");
}

export function middleware(_request: NextRequest) {
    const response = NextResponse.next();
    const nonce = generateNonce();

    // Fallback headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN') // Fallback for older browsers


    // Lock down framing only in production
    if (process.env.NODE_ENV === 'production') {
        // Build CSP
        const directives: Record<string, string[]> = {
            'default-src': ["'self'"],
            'script-src': ["'self'", `'nonce-${nonce}'`],
            "style-src": ["'self'", `'nonce-${nonce}'`],
            "img-src": ["'self'", "blob:", "data:", "https://*.vercel-storage.com"],
            "font-src": ["'self'"],
            "connect-src": ["'self'"],
            "frame-ancestors": ["'self'"],       //  iframe
            "worker-src": ["'self'", "blob:"],   // using web workers
            "object-src": ["'none'"],
            "base-uri": ["'self'"],
        };


        const csp = Object.entries(directives)
            .map(([k, v]) => `${k} ${v.join(' ')}`)
            .join('; ');

        response.headers.set('Content-Security-Policy', csp);
        response.headers.set('x-nonce', nonce);
    }

    return response;
}
