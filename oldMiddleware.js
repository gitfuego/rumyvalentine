import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

   // Allow requests to public assets like images, CSS, etc.
   if (pathname.startsWith('/_next/static') || 
   pathname.startsWith('/_next/image') || pathname.startsWith('/images')) {
    return NextResponse.next();
  }

  // Move logged in users to homepage if they try to access the landing page
  if (token && pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/home';
    return NextResponse.redirect(url);
  }

  // Allow requests if the token exists or the request is for the landing page or authentication routes
  if (token || pathname === '/' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Redirect to landing page if not authenticated and trying to access other routes
  if (!token && pathname !== '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};