import { canonicalOriginFromSiteUrl } from "./canonical-url";

/** Canonical public origin — production always resolves to https://www.phonefarm.cyou */
export function resolveCanonicalSiteUrl(): string {
  if (process.env.NODE_ENV === "production") {
    return canonicalOriginFromSiteUrl(process.env.SITE_URL);
  }
  const dev = process.env.SITE_URL || process.env.VERCEL_URL;
  if (dev) {
    try {
      const url = new URL(dev.startsWith("http") ? dev : `https://${dev}`);
      return url.origin;
    } catch {
      /* fall through */
    }
  }
  return canonicalOriginFromSiteUrl(process.env.SITE_URL);
}
