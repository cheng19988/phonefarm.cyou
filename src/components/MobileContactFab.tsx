"use client";

import { CONTACT } from "@/lib/constants";

export function MobileContactFab() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-1 border-t border-slate-700 bg-slate-950/95 p-2 lg:hidden">
      <a
        href={`tel:${CONTACT.phone}`}
        className="flex-1 rounded-lg bg-cyan-700 py-2 text-center text-xs font-medium text-white"
      >
        Call
      </a>
      <a
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 rounded-lg bg-emerald-700 py-2 text-center text-xs font-medium text-white"
      >
        WhatsApp
      </a>
      <a
        href={CONTACT.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 rounded-lg bg-sky-700 py-2 text-center text-xs font-medium text-white"
      >
        Telegram
      </a>
      <a
        href={`mailto:${CONTACT.email}`}
        className="flex-1 rounded-lg bg-slate-700 py-2 text-center text-xs font-medium text-white"
      >
        Email
      </a>
    </div>
  );
}
