"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { CartLink } from "./CartLink";
import { HeaderAccountMenu } from "./HeaderAccountMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SHOP_BRANDS } from "@/lib/constants";
import { PUBLIC_CART_IN_NAV } from "@/lib/features";
import { getCommonMessages, getMainNav } from "@/lib/i18n/messages";
import { localePath } from "@/lib/i18n/paths";
import { useLocale } from "./LocaleProvider";

export function Header() {
  const { locale } = useLocale();
  const nav = getMainNav(locale);
  const t = getCommonMessages(locale);

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="site-container flex items-center justify-between gap-4 py-3 lg:gap-6">
        <Logo />

        <nav className="header-nav hidden lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              className="header-nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          {PUBLIC_CART_IN_NAV && (
            <div className="hidden sm:flex items-center gap-3 text-sm">
              <CartLink />
              <HeaderAccountMenu />
            </div>
          )}
          <Link
            href={localePath(locale, "/services/packages")}
            className="hidden md:inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3.5 py-2 text-[13px] font-semibold text-amber-800 transition hover:border-amber-300 hover:bg-amber-100"
          >
            {t.packages}
          </Link>
          <Link href={localePath(locale, "/contact")} className="btn-primary hidden sm:inline-flex text-sm !py-2 !px-4 shadow-md">
            {t.getQuote}
          </Link>
          <MobileNav />
        </div>
      </div>

      <div className="hidden lg:block border-t border-slate-100 bg-slate-50/60">
        <div className="site-container flex items-center gap-3 overflow-x-auto py-2.5">
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {t.brands}
          </span>
          {SHOP_BRANDS.map((b) => (
            <Link
              key={b.slug}
              href={`${localePath(locale, "/shop")}?category=${b.slug}`}
              className="brand-pill shrink-0 shadow-sm"
            >
              <span className="brand-pill-icon">{b.icon}</span>
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
