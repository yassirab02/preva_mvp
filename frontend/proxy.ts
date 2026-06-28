import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export const proxy = auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const role = (session as any)?.role;

  const isStudentRoute = nextUrl.pathname.startsWith('/student');
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');

  if (isStudentRoute) {
    if (!session || role !== 'STUDENT') {
      return NextResponse.redirect(new URL('/auth/login', nextUrl));
    }
  }

  if (isAdminRoute) {
    if (!session || (role !== 'ADMIN' && role !== 'OFFICER')) {
      return NextResponse.redirect(new URL('/auth/login', nextUrl));
    }
    if (nextUrl.pathname === '/admin/officers' && role === 'OFFICER') {
      return NextResponse.redirect(new URL('/admin/dashboard', nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/student/:path*', '/admin/:path*'],
};
