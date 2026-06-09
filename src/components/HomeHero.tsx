import Image from "next/image";
import Link from "next/link";
import { CONTACT, SITE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const TRUST_POINTS = [
  "Real Android motherboard boxes — factory assembled in Guangzhou",
  "Remote control & group-control configured by our engineers",
  "Export packing, worldwide logistics, and after-sales support",
];

/** 0566 honeycomb chassis — shown on white with object-contain (no crop / no grey strip). */
const HERO_CHASSIS = IMAGES.heroChassisProduct;

export function HomeHero() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold text-sky-800">
              {SITE.location} · Factory direct · Since {SITE.since}
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3rem]">
              {SITE.tagline}
            </h1>
            <ul className="mt-6 space-y-3 text-base text-slate-600 lg:text-lg">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary px-7 py-3.5 text-base shadow-lg shadow-sky-500/20">
                Request a Quote
              </Link>
              <Link href="/shop" className="btn-secondary px-7 py-3.5 text-base">
                Browse Shop
              </Link>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-emerald px-7 py-3.5 text-base"
              >
                WhatsApp Sales
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-4 sm:gap-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3">
                <p className="font-display text-3xl font-bold text-slate-900">32+</p>
                <p className="text-sm text-slate-500">Catalog SKUs</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3">
                <p className="font-display text-3xl font-bold text-sky-700">{SITE.since}</p>
                <p className="text-sm text-slate-500">Years in production</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3">
                <p className="font-display text-3xl font-bold text-slate-900">30+</p>
                <p className="text-sm text-slate-500">Export regions</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[2713/978] w-full max-h-[min(52vw,480px)]">
              <Image
                src={HERO_CHASSIS}
                alt="Phone farm honeycomb chassis with motherboard trays"
                fill
                className="object-contain object-center drop-shadow-[0_24px_48px_rgba(15,23,42,0.08)]"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
