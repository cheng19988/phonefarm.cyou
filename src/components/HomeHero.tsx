import Image from "next/image";
import Link from "next/link";
import { CONTACT, SITE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const TRUST_POINTS = [
  "Real Android motherboard boxes — factory assembled in Guangzhou",
  "Remote control & group-control configured by our engineers",
  "Export packing, worldwide logistics, and after-sales support",
];

/** Full-bleed hero using the 0566 honeycomb chassis webp (original cinematic background). */
const HERO_BG = IMAGES.heroAltFallback;

export function HomeHero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden border-b border-slate-800/80">
      <div className="absolute inset-0">
        <Image
          src={HERO_BG}
          alt="Phone farm motherboard chassis with honeycomb cooling"
          fill
          className="object-cover object-[65%_center] brightness-[1.12] contrast-[1.05] saturate-[1.15]"
          priority
          sizes="100vw"
        />
        {/* Left text panel — vivid navy, lighter on image side so chassis stays visible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(8,15,30,0.94) 0%, rgba(8,20,40,0.82) 32%, rgba(12,45,75,0.45) 52%, rgba(14,116,144,0.12) 72%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-900/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(34,211,238,0.22),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.12),transparent_40%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-16 lg:min-h-[88vh] lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-500/15 px-4 py-1.5 text-xs font-semibold text-cyan-100 shadow-sm shadow-cyan-500/10 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            {SITE.location} · Factory direct · Since {SITE.since}
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            {SITE.tagline}
          </h1>
          <ul className="mt-6 space-y-3 text-base text-slate-200 lg:text-lg">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/30 text-xs font-bold text-cyan-200 ring-1 ring-cyan-400/50">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/35 transition hover:shadow-cyan-400/45"
              style={{ background: "linear-gradient(135deg, #0891b2, #22d3ee)" }}
            >
              Request a Quote
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-7 py-3.5 text-base font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Browse Shop
            </Link>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-emerald-400/45 bg-emerald-500/20 px-7 py-3.5 text-base font-medium text-emerald-100 transition hover:bg-emerald-500/30"
            >
              WhatsApp Sales
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 sm:gap-8">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 px-5 py-3 backdrop-blur-sm">
              <p className="font-display text-3xl font-bold text-white">32+</p>
              <p className="text-sm text-cyan-200/85">Catalog SKUs</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 px-5 py-3 backdrop-blur-sm">
              <p className="font-display text-3xl font-bold text-cyan-300">{SITE.since}</p>
              <p className="text-sm text-cyan-200/85">Years in production</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 px-5 py-3 backdrop-blur-sm">
              <p className="font-display text-3xl font-bold text-white">30+</p>
              <p className="text-sm text-cyan-200/85">Export regions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
