import { SHIPPING_REGIONS } from "@/lib/constants";
import { SectionHeading } from "./ui/SectionHeading";

export function RegionsShowcase() {
  return (
    <section className="site-container py-16">
      <SectionHeading
        title="Global shipping coverage"
        subtitle="We regularly export phone farm hardware from Guangzhou to QA labs, device farms, and enterprise buyers worldwide."
      />
      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-2 gap-px bg-slate-200 sm:grid-cols-3 lg:grid-cols-5">
          {SHIPPING_REGIONS.map((region) => (
            <div
              key={region}
              className="flex items-center gap-2 bg-white px-4 py-3 text-sm text-slate-700 transition hover:bg-sky-50"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
              {region}
            </div>
          ))}
        </div>
        <p className="border-t border-slate-200 px-4 py-3 text-center text-xs text-slate-500">
          Commercial invoice & export packing included · Sample orders welcome before bulk PO
        </p>
      </div>
    </section>
  );
}
