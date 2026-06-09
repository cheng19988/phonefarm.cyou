import Image from "next/image";
import Link from "next/link";
import { CONTACT, SITE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const TRUST_POINTS = [
  "Real Android motherboard boxes — factory assembled in Guangzhou",
  "Remote control & group-control configured by our engineers",
  "Export packing, worldwide logistics, and after-sales support",
];

/** Transparent 0566 cutout — full-bleed behind text on white (object-contain, no crop). */
const HERO_CHASSIS = IMAGES.heroChassisTransparent;

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50/40 to-slate-100/80" />
      <div className="pointer-events-none absolute -left-16 top-0 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl" />

      {/* Full-bleed chassis — same footprint as dark hero, behind copy */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[68%]">
        <div className="absolute inset-0 -right-[6%] scale-105">
          <Image
            src={HERO_CHASSIS}
            alt="Phone farm honeycomb chassis with motherboard trays"
            fill
            className="object-contain object-right drop-shadow-[0_28px_56px_rgba(15,23,42,0.12)]"
            sizes="(max-width:1024px) 100vw, 68vw"
            priority
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.94) 22%, rgba(255,255,255,0.55) 48%, transparent 72%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/30 lg:hidden" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold text-sky-800">
            {SITE.location} · Factory direct · Since {SITE.since}
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
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
          <div className="mt-10 flex flex-wrap gap-8 border-t border-slate-200 pt-8">
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
      </div>
    </section>
  );
}
