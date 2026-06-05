import { BUYER_TRUST_ITEMS } from "@/lib/delivery";
import { ImagePlaceholderCard } from "./ImagePlaceholderCard";

export function BuyerTrustSection({ siteName }: { siteName: string }) {
  return (
    <section className="border-t border-slate-800 bg-slate-900/30 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-bold text-white">Why buyers work with {siteName}</h2>
        <p className="mt-2 max-w-3xl text-slate-400">
          Practical reasons overseas QA teams, device labs, and hardware buyers choose a Guangzhou-based supplier—not
          marketing slogans.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {BUYER_TRUST_ITEMS.map((item) => (
            <article key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <ImagePlaceholderCard label="factory assembly bench" />
          <ImagePlaceholderCard label="pre-shipment testing" />
          <ImagePlaceholderCard label="export packing" />
        </div>
      </div>
    </section>
  );
}
