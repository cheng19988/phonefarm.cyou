import { CANONICAL_HOST, CANONICAL_ORIGIN, ROOT_HOST } from "./site-hosts";

/** Canonical public origin — always prefer www.phonefarm.cyou for SEO. */
export function resolveCanonicalSiteUrl(): string {
  const raw = process.env.SITE_URL || CANONICAL_ORIGIN;
  try {
    const url = new URL(raw);
    if (url.hostname === ROOT_HOST) {
      url.hostname = CANONICAL_HOST;
    }
    return url.origin;
  } catch {
    return CANONICAL_ORIGIN;
  }
}
