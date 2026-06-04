import { CURRENCY } from "@/lib/constants";

/** Reference-style locale/currency strip (USD primary) */
export function SiteBar() {
  return (
    <div className="flex items-center gap-3 text-xs text-slate-500">
      <span className="rounded border border-slate-700 px-2 py-0.5 text-slate-400">EN</span>
      <span className="rounded border border-slate-700 px-2 py-0.5 text-slate-300">{CURRENCY.code}</span>
    </div>
  );
}
