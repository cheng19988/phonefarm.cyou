import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CANONICAL_HOST, CANONICAL_ORIGIN, isApexHost } from "@/lib/site-hosts";

function requestHost(request: NextRequest): string | undefined {
  const forwarded = request.headers.get("x-forwarded-host");
  const host = forwarded ?? request.headers.get("host");
  return host?.split(",")[0]?.trim();
}

function isSiteHost(host: string | undefined): boolean {
  const bare = host?.split(":")[0]?.toLowerCase();
  return bare === CANONICAL_HOST || isApexHost(host);
}

function needsHttps(request: NextRequest): boolean {
  const proto = request.headers.get("x-forwarded-proto");
  if (proto) return proto === "http";
  return request.nextUrl.protocol === "http:";
}

export function middleware(request: NextRequest) {
  const host = requestHost(request);
  const apex = isApexHost(host);
  const siteHost = isSiteHost(host);
  const http = needsHttps(request);

  if (apex || (siteHost && http)) {
    const destination = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      CANONICAL_ORIGIN
    );
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!_next/static|_next/image).*)"],
};
