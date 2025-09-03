import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

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


    response.headers.set("X-Robots-Tag", "index, follow");
    response.headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(), payment=()"
    );

    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
