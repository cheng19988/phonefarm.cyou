"use client";

import { useState } from "react";

export function FaqAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-slate-800 rounded-xl border border-slate-800">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            type="button"
            className="flex w-full items-center justify-between px-4 py-4 text-left font-medium text-white hover:bg-slate-900/80"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {item.q}
            <span className="text-cyan-500">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <p className="px-4 pb-4 text-sm text-slate-400">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
