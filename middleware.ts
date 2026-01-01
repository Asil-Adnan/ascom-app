import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionAction } from '@/lib/actions/auth';

// Paths that require specific roles
const ROLE_PATHS = {
    // '/dashboard': ['USER'], // Guest allowed now
    // '/applications': ['USER', 'ADMIN', 'SUPER_ADMIN'], // Guest allowed for browsing
    '/messages': ['USER'], // Protected
    '/profile': ['USER'], // Protected
    '/admin': ['ADMIN', 'SUPER_ADMIN'],
    '/super-admin': ['SUPER_ADMIN']
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Check if path is protected
    const protectedPath = Object.keys(ROLE_PATHS).find(path => pathname.startsWith(path));

    if (protectedPath) {
        // 2. Check Session (We need to verify session cookie manually or via action if possible in middleware?)
        // Server Actions in middleware are tricky/experimental.
        // Better to check cookie existence first, then verify role if needed, or rely on layout.
        // For strictness, let's read the cookie.
        const sessionCookie = request.cookies.get('auth_session');

        if (!sessionCookie) {
            // Redirect logic based on path
            if (pathname.startsWith('/admin') || pathname.startsWith('/super-admin')) {
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Note: Verifying role inside middleware requires DB access (not allowed in Edge middleware usually).
        // If we can't access DB, we can't verify role here easily unless encoded in JWT.
        // Since we use a simple session ID in cookie (as per my auth implementation), we cannot verify role in middleware without Edge DB.
        // Strategy: Let the page/layout handle the strict role check, or use a cached role cookie (insecure?).
        // strict solution: The `getSessionAction` is a server action, can be called in Layout.
        // Middleware just ensures "LoggedIn".
        // BUT, I can try to redirect if I know the user is wrong role.

        // For now, Middleware ensures *authentication*.
        // Role check happens in Layouts of each section.
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
