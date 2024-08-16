import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("Authorization")?.value;
  const { pathname } = request.nextUrl;

  // Redirect authenticated users away from login or signup
  if (currentUser && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow unauthenticated users to access login or signup
  if (!currentUser && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access any other page to login
  if (!currentUser && pathname !== "/login" && pathname !== "/signup") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
