// middleware.ts
// Purpose: Enforce authentication on protected routes and redirect unauthenticated users to /login.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow NextAuth routes and the login page
  if (pathname.startsWith('/api/auth') || pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // Infer authentication by presence of NextAuth session cookies
  // In development: "next-auth.session-token"
  // In production (secure): "__Secure-next-auth.session-token"
  const devSession = req.cookies.get('next-auth.session-token')?.value;
  const prodSession = req.cookies.get('__Secure-next-auth.session-token')?.value;
  const isAuthenticated = Boolean(devSession || prodSession);

  // Handle root path: send authenticated users to dashboard, others to login
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = isAuthenticated ? '/dashboard' : '/login';
    return NextResponse.redirect(url);
  }

  // Protect dashboard and other matched routes
  if (!isAuthenticated) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Match all routes that should be protected. Public routes like /login and /api/auth are excluded.
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
  ],
};
