import { auth } from "./lib/auth";

export default auth;

// every request go through the middleware except api, _next/static, _next/image, favicon.ico
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};