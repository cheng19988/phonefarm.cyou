"use client";

import { useState } from "react";

export function FaqAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            type="button"
            className="flex w-full items-center justify-between px-4 py-4 text-left font-medium text-slate-900 hover:bg-slate-50"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item.q}</span>
            <span className="ml-4 shrink-0 text-sky-600">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div className="px-4 pb-4 text-sm leading-relaxed text-slate-600">{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}
