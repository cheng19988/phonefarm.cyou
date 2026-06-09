import Image from "next/image";
import Link from "next/link";
import { CONTACT, SITE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const TRUST_POINTS = [
  "Real Android motherboard boxes — factory assembled in Guangzhou",
  "Remote control & group-control configured by our engineers",
  "Export packing, worldwide logistics, and after-sales support",
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-slate-50" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold text-sky-800">
              {SITE.location} · Factory direct · Since {SITE.since}
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3rem]">
              {SITE.tagline}
            </h1>
            <ul className="mt-6 space-y-3 text-base text-slate-600 lg:text-lg">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary px-7 py-3.5 text-base">Request a Quote</Link>
              <Link href="/shop" className="btn-secondary px-7 py-3.5 text-base">Browse Shop</Link>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-emerald px-7 py-3.5 text-base">
                WhatsApp Sales
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-center sm:text-left">
              <div>
                <p className="font-display text-3xl font-bold text-slate-900">32+</p>
                <p className="text-sm text-slate-500">Catalog SKUs</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-sky-700">{SITE.since}</p>
                <p className="text-sm text-slate-500">Years in production</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-slate-900">30+</p>
                <p className="text-sm text-slate-500">Export regions</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
              <div className="relative aspect-[4/3]">
                <Image src={IMAGES.hero} alt="Phone farm motherboard boxes" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" priority />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
