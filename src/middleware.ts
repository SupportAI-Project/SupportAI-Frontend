import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AuthClient } from "./api/auth.client";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("Authorization")?.value;
  const { pathname } = request.nextUrl;

  if (!token && pathname !== "/login" && pathname !== "/signup") {
    // Redirect unauthenticated users to login if they're trying to access a protected route
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const authClient = new AuthClient();
      const currentUser = await authClient.validateToken();

      // Redirect authenticated users away from login or signup
      if (currentUser && (pathname === "/login" || pathname === "/signup")) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (err) {
      console.log("asdsdad Invalid Token, Redirecting to login");
      // Redirect users with invalid tokens to login
      if (pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
