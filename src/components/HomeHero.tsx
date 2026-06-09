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
    <section className="relative overflow-hidden border-b border-sky-200">
      {/* Lighter vivid sky base — less “dead” than flat navy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, #e0f2fe 0%, #bae6fd 28%, #7dd3fc 55%, #38bdf8 85%, #0ea5e9 100%)",
        }}
      />
      <div className="pointer-events-none absolute -left-16 top-8 h-80 w-80 rounded-full bg-white/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-[24rem] w-[24rem] rounded-full bg-cyan-200/60 blur-3xl" />

      {/* Chassis — bright, full-bleed right; minimal overlay so hardware stays visible */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <Image
          src={IMAGES.hero}
          alt="Phone farm motherboard chassis"
          fill
          className="object-cover object-center brightness-[1.08] contrast-[1.06] saturate-[1.12]"
          sizes="(max-width:1024px) 100vw, 58vw"
          priority
        />
        {/* Soft left fade only — do not darken the chassis */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(224,242,254,0.97) 0%, rgba(224,242,254,0.75) 22%, rgba(186,230,253,0.35) 42%, transparent 58%)",
          }}
        />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-sky-100/90 via-transparent to-transparent lg:block" style={{ maxHeight: "35%" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-white/80 px-4 py-1.5 text-xs font-semibold text-sky-800 shadow-sm backdrop-blur-sm">
            {SITE.location} · Factory direct · Since {SITE.since}
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
            {SITE.tagline}
          </h1>
          <ul className="mt-6 space-y-3 text-base text-slate-700 lg:text-lg">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white shadow-sm">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary px-7 py-3.5 text-base shadow-lg shadow-sky-500/25">
              Request a Quote
            </Link>
            <Link href="/shop" className="btn-secondary bg-white/90 px-7 py-3.5 text-base backdrop-blur-sm">
              Browse Shop
            </Link>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-emerald bg-white/80 px-7 py-3.5 text-base backdrop-blur-sm"
            >
              WhatsApp Sales
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-8 border-t border-sky-300/50 pt-8">
            <div>
              <p className="font-display text-3xl font-bold text-slate-900">32+</p>
              <p className="text-sm text-slate-600">Catalog SKUs</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-sky-700">{SITE.since}</p>
              <p className="text-sm text-slate-600">Years in production</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-slate-900">30+</p>
              <p className="text-sm text-slate-600">Export regions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
