import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/deposit', '/transfer', '/reversal'];
const publicRoutes = ['/auth/signIn', '/auth/signUp', '/auth/forgot-password'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('cognito_access_token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.includes(pathname) || pathname === '/';

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/auth/signIn', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoute && token && pathname !== '/') {
    if (pathname === '/auth/signIn') {
      const redirectPath = request.nextUrl.searchParams.get('redirect') || '/dashboard';
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
    if (pathname !== '/auth/signIn') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

