import { SITE } from "@/lib/constants";

const STATS = [
  { value: String(SITE.since), label: "Years manufacturing", sub: "Guangzhou factory" },
  { value: "32+", label: "Product SKUs", sub: "Boxes & accessories" },
  { value: "30+", label: "Export regions", sub: "DHL · FedEx · UPS" },
  { value: "6-step", label: "Deployment SOP", sub: "Hardware to handover" },
];

export function TrustStatsBar() {
  return (
    <section className="border-b border-white/5 bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <p className="font-display text-3xl font-bold text-white lg:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-300">{stat.label}</p>
              <p className="text-xs text-slate-500">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
