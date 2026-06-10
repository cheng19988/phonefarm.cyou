"use client";

import { CONTACT } from "@/lib/constants";

export function MobileContactFab() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-1 border-t border-slate-200 bg-white/95 p-2 shadow-[0_-4px_12px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:hidden">
      <a
        href={`tel:${CONTACT.phone}`}
        className="flex-1 rounded-lg border border-slate-200 bg-slate-50 py-2 text-center text-xs font-medium text-slate-700"
      >
        Call
      </a>
      <a
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 rounded-lg bg-emerald-600 py-2 text-center text-xs font-medium text-white"
      >
        WhatsApp
      </a>
      <a
        href={CONTACT.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 rounded-lg bg-sky-600 py-2 text-center text-xs font-medium text-white"
      >
        Telegram
      </a>
      <a
        href="/contact"
        className="flex-1 rounded-lg bg-gradient-to-r from-sky-700 to-sky-600 py-2 text-center text-xs font-medium text-white"
      >
        Quote
      </a>
    </div>
  );
}
