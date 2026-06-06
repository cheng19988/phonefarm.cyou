/** Canonical public origin — always prefer www.phonefarm.cyou for SEO. */
export function resolveCanonicalSiteUrl(): string {
  const raw = process.env.SITE_URL || "https://www.phonefarm.cyou";
  try {
    const url = new URL(raw);
    if (url.hostname === "phonefarm.cyou") {
      url.hostname = "www.phonefarm.cyou";
    }
    return url.origin;
  } catch {
    return "https://www.phonefarm.cyou";
  }
}
