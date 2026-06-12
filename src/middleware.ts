import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CANONICAL_ORIGIN, isApexHost } from "@/lib/site-hosts";

function requestHost(request: NextRequest): string | undefined {
  const forwarded = request.headers.get("x-forwarded-host");
  const host = forwarded ?? request.headers.get("host");
  return host?.split(",")[0]?.trim();
}

export function middleware(request: NextRequest) {
  if (!isApexHost(requestHost(request))) {
    return NextResponse.next();
  }

  const destination = new URL(
    request.nextUrl.pathname + request.nextUrl.search,
    CANONICAL_ORIGIN
  );
  return NextResponse.redirect(destination, 301);
}

export const config = {
  // Match all paths including "/" (/:path* alone can miss the root on some matchers).
  matcher: ["/", "/((?!_next/static|_next/image).*)"],
};
