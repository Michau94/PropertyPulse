import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });

  if (token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
