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
    <section className="relative overflow-hidden border-b border-sky-900/30">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0c1929 0%, #0f2744 35%, #0e3a5e 70%, #0c4a6e 100%)",
        }}
      />
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[28rem] w-[28rem] rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-96 rounded-full bg-blue-500/15 blur-3xl" />

      {/* Original 0566 hero — centered, full-bleed (no cutout, no right column) */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Phone farm motherboard chassis"
          fill
          className="object-cover object-center scale-105"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(12,25,41,0.92) 0%, rgba(12,25,41,0.75) 32%, rgba(14,58,94,0.35) 58%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1929]/85 via-transparent to-[#0c2744]/35" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-4 py-1.5 text-xs font-semibold text-cyan-100 shadow-sm shadow-cyan-500/10">
            {SITE.location} · Factory direct · Since {SITE.since}
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            {SITE.tagline}
          </h1>
          <ul className="mt-6 space-y-3 text-base text-slate-200/95 lg:text-lg">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/25 text-xs font-bold text-cyan-300 ring-1 ring-cyan-400/40">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-400/40"
              style={{ background: "linear-gradient(135deg, #0891b2, #0ea5e9)" }}
            >
              Request a Quote
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-7 py-3.5 text-base font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Browse Shop
            </Link>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-500/15 px-7 py-3.5 text-base font-medium text-emerald-100 transition hover:bg-emerald-500/25"
            >
              WhatsApp Sales
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="font-display text-3xl font-bold text-white">32+</p>
              <p className="text-sm text-cyan-200/80">Catalog SKUs</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-cyan-300">{SITE.since}</p>
              <p className="text-sm text-cyan-200/80">Years in production</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-white">30+</p>
              <p className="text-sm text-cyan-200/80">Export regions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
