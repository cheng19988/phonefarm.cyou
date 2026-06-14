/** Public site languages — English primary, Chinese at /zh/ */
export const SITE_PRIMARY_LANGUAGE = "en" as const;
export const SITE_PRIMARY_LOCALE = "en-US" as const;
export const SITE_SECONDARY_LANGUAGE = "zh" as const;
export const SITE_SECONDARY_LOCALE = "zh-CN" as const;
export const SITE_LANGUAGES = [SITE_PRIMARY_LANGUAGE, SITE_SECONDARY_LANGUAGE] as const;
