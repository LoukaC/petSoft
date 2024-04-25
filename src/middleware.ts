import { NextResponse } from "next/server";


export function middleware( request: Request) {

    console.log('middleware:', request.url);

    return NextResponse.next();


}


// match all except api, _next/static, _next/image, favicon.ico
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};