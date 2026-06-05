"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT, SITE } from "@/lib/constants";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Setup Services" },
  { href: "/deployment", label: "Deployment" },
  { href: "/services/packages", label: "Packages" },
  { href: "/help", label: "Help" },
  { href: "/faq", label: "FAQ" },
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
        className="rounded-lg border border-slate-700 px-3 py-2 text-slate-200"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-slate-800 bg-slate-950 shadow-xl">
          <nav className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{SITE.name}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-slate-400 hover:text-white"
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
                    className="block rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-800 pt-4">
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-emerald-700 py-2 text-center text-sm text-white"
              >
                WhatsApp
              </a>
              <a
                href={CONTACT.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-sky-700 py-2 text-center text-sm text-white"
              >
                Telegram
              </a>
            </div>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 block rounded-lg bg-cyan-600 py-2 text-center text-sm font-medium text-white"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
