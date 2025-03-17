import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/admin/login",
  "/admin/register",
  "/admin/forgot-password",
];

const isProtectedRoute = (path: string): boolean =>
  path.startsWith("/admin") &&
  !publicRoutes.some((route) => path.startsWith(route));

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  if (!token && isProtectedRoute(path)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (token && publicRoutes.some((route) => path.startsWith(route))) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } catch (error) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
