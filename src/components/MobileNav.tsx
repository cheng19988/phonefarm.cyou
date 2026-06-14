"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT, SITE } from "@/lib/constants";
import { CartLink } from "./CartLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PUBLIC_CART_IN_NAV } from "@/lib/features";
import { getCommonMessages, getMainNav, getSecondaryNav } from "@/lib/i18n/messages";
import { localePath } from "@/lib/i18n/paths";
import { useLocale } from "./LocaleProvider";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const mainNav = getMainNav(locale);
  const secondaryNav = getSecondaryNav(locale);
  const t = getCommonMessages(locale);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? t.closeMenu : t.openMenu}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm"
      >
        {open ? t.closeMenu : t.menu}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-slate-200 bg-white shadow-lg">
          <nav className="site-container py-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{SITE.name}</p>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-sm text-slate-600 hover:text-sky-700"
                >
                  {t.closeMenu}
                </button>
              </div>
            </div>
            <ul className="mt-3 space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(locale, item.href)}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-slate-800 hover:bg-sky-50 hover:text-sky-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-3 space-y-1 border-t border-slate-100 pt-3">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(locale, item.href)}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-sky-50 hover:text-sky-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {PUBLIC_CART_IN_NAV && (
              <div className="mt-4 flex gap-4 border-t border-slate-200 pt-4 text-sm">
                <CartLink />
                <Link href="/account/orders" onClick={() => setOpen(false)} className="text-slate-600 hover:text-sky-700">
                  {t.account}
                </Link>
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-200 pt-4">
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-emerald-600 py-2 text-center text-sm font-medium text-white"
              >
                WhatsApp
              </a>
              <a
                href={CONTACT.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-sky-600 py-2 text-center text-sm font-medium text-white"
              >
                Telegram
              </a>
            </div>
            <Link
              href={localePath(locale, "/contact")}
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 block py-2 text-center text-sm"
            >
              {t.requestQuote}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
