import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWT } from '@/lib/jwt'

const PROTECTED_ROOT = '/playground'
const PUBLIC_PATHS = ['/signin', '/signup', '/', '/home']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const tokenCookie = request.cookies.get('auth_token')

    let isAuthenticated = false
    if (tokenCookie?.value) {
        const payload = await verifyJWT(tokenCookie.value)
        if (payload) {
            isAuthenticated = true
        }
    }

    const isPublicPath = PUBLIC_PATHS.includes(pathname)

    if (isAuthenticated) {
        if (pathname === '/signin' || pathname === '/signup') {
            return NextResponse.redirect(new URL(PROTECTED_ROOT, request.url))
        }
    } else {
        if (!isPublicPath) {
            return NextResponse.redirect(new URL('/signin', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets/).*)'],
}
