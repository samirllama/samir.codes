import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";

const PROTECTED_ROOT = "/playground";
const PUBLIC_PATHS = ["/signin", "/signup", "/", "/home"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Generate Nonce and CSP Header as per our documentation
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
        style-src 'self' 'nonce-${nonce}';
        img-src 'self' blob: data: https://jwdtwbbgwku6ttxc.public.blob.vercel-storage.com;
        connect-src 'self' vitals.vercel-insights.com;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `
    .replace(/\s{2,}/g, " ")
    .trim();

  // 2. Set security headers on the request to be used by Server Components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  // 3. Clone the request to attach the new headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 4. Set security headers on the response
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  // 5. Perform authentication logic
  const tokenCookie = request.cookies.get("auth_token");
  let isAuthenticated = false;
  if (tokenCookie?.value) {
    try {
      const payload = await verifyJWT(tokenCookie.value);
      if (payload) {
        isAuthenticated = true;
      }
    } catch (err) {
      // Token verification failed, treat as unauthenticated
      console.error("JWT verification failed:", err);
    }
  }

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname === path);

  if (isAuthenticated) {
    if (pathname === "/signin" || pathname === "/signup") {
      return NextResponse.redirect(new URL(PROTECTED_ROOT, request.url));
    }
  } else {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // Return the response with the new headers
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets/).*)"],
};
