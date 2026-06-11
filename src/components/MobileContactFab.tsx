"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/constants";

const CHANNELS = [
  {
    key: "telegram",
    label: "Telegram",
    value: CONTACT.telegram,
    href: CONTACT.telegramUrl,
    external: true,
    accent: "text-sky-700",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsappUrl,
    external: true,
    accent: "text-emerald-700",
  },
  {
    key: "email",
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    external: false,
    accent: "text-slate-700",
  },
] as const;

export function MobileContactFab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="floating-contact" aria-label="Contact sales">
      {open && (
        <div className="floating-contact-panel" role="dialog" aria-label="Contact options">
          <p className="floating-contact-title">Contact sales</p>
          <ul className="floating-contact-list">
            {CHANNELS.map((ch) => (
              <li key={ch.key}>
                <a
                  href={ch.href}
                  target={ch.external ? "_blank" : undefined}
                  rel={ch.external ? "noopener noreferrer" : undefined}
                  className="floating-contact-link"
                  onClick={() => setOpen(false)}
                >
                  <span className={`text-xs font-semibold uppercase tracking-wide ${ch.accent}`}>{ch.label}</span>
                  <span className="mt-0.5 block text-sm text-slate-800">{ch.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        className="floating-contact-toggle"
        aria-expanded={open}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
