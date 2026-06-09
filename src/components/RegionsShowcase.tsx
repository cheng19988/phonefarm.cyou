import { SHIPPING_REGIONS } from "@/lib/constants";
import { SectionHeading } from "./ui/SectionHeading";

export function RegionsShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        title="Global shipping coverage"
        subtitle="We regularly export phone farm hardware from Guangzhou to QA labs, device farms, and enterprise buyers worldwide."
      />
      <div className="mt-8 overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40">
        <div className="grid grid-cols-2 gap-px bg-white/5 sm:grid-cols-3 lg:grid-cols-5">
          {SHIPPING_REGIONS.map((region) => (
            <div
              key={region}
              className="flex items-center gap-2 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900/80"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
              {region}
            </div>
          ))}
        </div>
        <p className="border-t border-white/5 px-4 py-3 text-center text-xs text-slate-500">
          Commercial invoice & export packing included · Sample orders welcome before bulk PO
        </p>
      </div>
    </section>
  );
}
