"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { detectLocaleFromPathname, localePath } from "@/lib/i18n/paths";

type LocaleContextValue = {
  locale: Locale;
  pathForLocale: (sitePath: string) => string;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  pathForLocale: (sitePath) => localePath(DEFAULT_LOCALE, sitePath),
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : "";

  const value = useMemo<LocaleContextValue>(() => {
    const locale = detectLocaleFromPathname(pathname);
    return {
      locale,
      pathForLocale: (sitePath: string) => `${localePath(locale, sitePath)}${search}`,
    };
  }, [pathname, search]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
