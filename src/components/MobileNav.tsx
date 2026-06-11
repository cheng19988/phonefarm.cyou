"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT, SITE } from "@/lib/constants";
import { CartLink } from "./CartLink";

const links = [
  { href: "/", label: "Home" },
  { href: "/phone-farm", label: "Phone Farm" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/deployment", label: "Deployment" },
  { href: "/services/packages", label: "Packages" },
  { href: "/help", label: "Help" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-slate-200 bg-white shadow-lg">
          <nav className="site-container py-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{SITE.name}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-slate-600 hover:text-sky-700"
              >
                Close
              </button>
            </div>
            <ul className="mt-3 space-y-1">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-slate-800 hover:bg-sky-50 hover:text-sky-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-4 border-t border-slate-200 pt-4 text-sm">
              <CartLink />
              <Link href="/account/orders" onClick={() => setOpen(false)} className="text-slate-600 hover:text-sky-700">
                Account
              </Link>
            </div>
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
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 block py-2 text-center text-sm"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
