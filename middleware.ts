import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWT } from '@/lib/session'

// Define public paths that do not require authentication
const PUBLIC_PATHS = ['/signin', '/signup', '/']

// Define the path to redirect to after successful login
const PROTECTED_ROOT = '/work'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const tokenCookie = request.cookies.get('auth_token')

    // 1. Check for a valid JWT
    let isAuthenticated = false
    if (tokenCookie?.value) {
        const payload = await verifyJWT(tokenCookie.value)
        if (payload) {
            isAuthenticated = true
        }
    }

    // 2. Determine if the path is public
    const isPublicPath = PUBLIC_PATHS.includes(pathname)

    // 3. Redirect logic
    if (isAuthenticated) {
        // If the user is logged in and tries to access a public auth page,
        // redirect them to the main protected area.
        if (pathname === '/signin' || pathname === '/signup') {
            return NextResponse.redirect(new URL(PROTECTED_ROOT, request.url))
        }
    } else {
        // If user is not logged in and tries to access a protected route,
        // redirect them to the sign-in page.
        if (!isPublicPath) {
            return NextResponse.redirect(new URL('/signin', request.url))
        }
    }

    // 4. If no redirection is needed, allow the request to proceed
    return NextResponse.next()
}

// Configuration to specify which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
