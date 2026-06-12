import { CANONICAL_HOST, CANONICAL_ORIGIN } from "./site-hosts";

const BLOCKED_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\.\d+\.\d+\.\d+$/,
  /\.vercel\.app$/i,
  /^phonefarm\.cyou$/i,
];

/** Production sitemap/canonical must never use preview or local hosts. */
export function isAllowedCanonicalHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === CANONICAL_HOST) return true;
  return !BLOCKED_HOST_PATTERNS.some((re) => re.test(host));
}

export function canonicalOriginFromSiteUrl(raw: string | undefined): string {
  if (!raw?.trim()) return CANONICAL_ORIGIN;
  try {
    const url = new URL(raw.trim());
    if (!isAllowedCanonicalHost(url.hostname)) return CANONICAL_ORIGIN;
    url.hostname = CANONICAL_HOST;
    url.protocol = "https:";
    return url.origin;
  } catch {
    return CANONICAL_ORIGIN;
  }
}

export function canonicalPageUrl(path: string, origin = CANONICAL_ORIGIN): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized === "/" ? "" : normalized}`;
}
