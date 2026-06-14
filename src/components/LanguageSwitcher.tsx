"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { switchLocalePath } from "@/lib/i18n/paths";
import { useLocale } from "./LocaleProvider";

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const { locale } = useLocale();

  const enHref = switchLocalePath(pathname, search, "en");
  const zhHref = switchLocalePath(pathname, search, "zh");

  return (
    <div
      className={`inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 text-xs font-semibold shadow-sm ${className ?? ""}`}
      aria-label="Language"
    >
      <Link
        href={enHref}
        className={`rounded-full px-2.5 py-1 transition ${
          locale === "en" ? "bg-sky-600 text-white" : "text-slate-600 hover:text-sky-700"
        }`}
        lang="en"
      >
        EN
      </Link>
      <Link
        href={zhHref}
        className={`rounded-full px-2.5 py-1 transition ${
          locale === "zh" ? "bg-sky-600 text-white" : "text-slate-600 hover:text-sky-700"
        }`}
        lang="zh-CN"
      >
        中文
      </Link>
    </div>
  );
}
