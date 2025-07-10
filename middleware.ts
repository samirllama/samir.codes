import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";
import crypto from 'crypto';

const PROTECTED_ROOT = "/playground";
const PUBLIC_PATHS = ["/signin", "/signup", "/", "/home"];
const isDev = process.env.NODE_ENV === "development";

function generateNonce(): string {
  const array = new Uint8Array(16);
  globalThis.crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}


export async function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const { pathname } = request.nextUrl;

  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' ${isDev ? "'unsafe-eval'" : ''} 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}' 'unsafe-inline';
    img-src 'self' blob: data: https://jwdtwbbgwku6ttxc.public.blob.vercel-storage.com;
    connect-src 'self' vitals.vercel-insights.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    report-uri /api/csp-report; # Replace with your actual CSP reporting endpoint
  `.replace(/\s{2,}/g, ' ').trim();

  // Clone and enhance request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);


  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Add response-only headers
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade');

  // Optional: Set nonce as a cookie for hydration-safe access (if needed in layout)
  response.cookies.set('nonce', nonce, {
    secure: !isDev,
    sameSite: 'lax',
    path: '/',
  });

  // JWT Authentication logic
  const tokenCookie = request.cookies.get('auth_token');
  let isAuthenticated = false;

  if (tokenCookie?.value) {
    try {
      const payload = await verifyJWT(tokenCookie.value);
      isAuthenticated = Boolean(payload);
    } catch (err) {
      console.error('JWT verification failed:', err);
    }
  }

  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  if (isAuthenticated && (pathname === '/signin' || pathname === '/signup')) {
    return NextResponse.redirect(new URL(PROTECTED_ROOT, request.url));
  }

  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return response;
}



export async function middleware_(request: NextRequest) {
  const { pathname } = request.nextUrl;


  // 1. Generate Nonce and CSP Header as per our documentation
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader_ = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
        style-src 'self' 'nonce-${nonce}' 'unsafe-eval' 'unsafe-inline';
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

  const cspHeader = `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' ${isDev ? "'unsafe-eval'" : ""} 'strict-dynamic';
      style-src 'self' 'nonce-${nonce}' 'unsafe-inline';
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


  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

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
