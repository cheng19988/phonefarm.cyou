import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "www.phonefarm.cyou";
const ROOT_HOST = "phonefarm.cyou";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (host !== ROOT_HOST) {
    return NextResponse.next();
  }

  const destination = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${CANONICAL_HOST}`);
  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: "/:path*",
};
