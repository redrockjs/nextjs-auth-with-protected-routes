import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export const protectedRoutes = ["/private", "/about"];

export function middleware(request: NextRequest) {

    const accessToken = request.cookies.get("accessToken")?.value;

    const isLogged = !!accessToken

    // if (request.nextUrl.pathname.startsWith('/private')) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }

    if (protectedRoutes.includes(request.nextUrl.pathname, 0) && !isLogged) {

        request.cookies.delete("accessToken");
        const response = NextResponse.rewrite(new URL("/403", request.url));
        response.cookies.delete("accessToken");

        return response;
    }
}
