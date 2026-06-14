import { SITE } from "@/lib/constants";
import { DEFAULT_LOCALE, type Locale } from "./config";

/** Site path without locale prefix, always leading slash or empty for home. */
export function normalizeSitePath(path: string): string {
  if (!path || path === "/") return "";
  const bare = path.startsWith("/") ? path : `/${path}`;
  if (bare === "/zh" || bare.startsWith("/zh/")) {
    return bare === "/zh" ? "" : bare.slice(3);
  }
  return bare;
}

export function detectLocaleFromPathname(pathname: string): Locale {
  const bare = pathname.split("?")[0];
  if (bare === "/zh" || bare.startsWith("/zh/")) return "zh";
  return DEFAULT_LOCALE;
}

/** Prefix-aware public path (no origin). */
export function localePath(locale: Locale, sitePath: string): string {
  const normalized = normalizeSitePath(sitePath);
  if (locale === "zh") {
    return normalized ? `/zh${normalized}` : "/zh";
  }
  return normalized || "/";
}

export function localeUrl(locale: Locale, sitePath: string): string {
  return `${SITE.url}${localePath(locale, sitePath)}`;
}

export function buildLanguageAlternates(sitePath: string) {
  const normalized = normalizeSitePath(sitePath);
  const enPath = normalized || "/";
  const zhPath = localePath("zh", normalized);
  return {
    en: `${SITE.url}${enPath === "/" ? "" : enPath}`,
    "zh-CN": `${SITE.url}${zhPath}`,
    "x-default": `${SITE.url}${enPath === "/" ? "" : enPath}`,
  };
}

/** Switch current pathname to another locale (keeps query string). */
export function switchLocalePath(pathname: string, search: string, target: Locale): string {
  const sitePath = normalizeSitePath(pathname);
  return `${localePath(target, sitePath)}${search}`;
}
