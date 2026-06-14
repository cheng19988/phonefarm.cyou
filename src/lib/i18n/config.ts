export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
};

export const LOCALE_OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
};

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
