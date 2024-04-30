import NextAuth from "next-auth";
import { nextAuthConfig } from "./lib/auth-edge";

export default NextAuth(nextAuthConfig).auth;

// every request go through the middleware except api, _next/static, _next/image, favicon.ico
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
