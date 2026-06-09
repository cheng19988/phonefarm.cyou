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
    <section className="relative min-h-[92vh] flex flex-col overflow-hidden border-b border-white/5">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.heroAlt}
          alt="Cyou Phone Farm device chassis lineup"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/88 to-slate-950/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(6,182,212,0.18),transparent_45%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/50 px-4 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {SITE.location} · Factory direct · Since {SITE.since}
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4rem]">
            {SITE.tagline}
          </h1>
          <ul className="mt-8 space-y-3 text-base text-slate-300 lg:text-lg">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/25 text-xs text-cyan-400">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary px-8 py-3.5 text-base">
              Request a Quote
            </Link>
            <Link href="/shop" className="btn-secondary px-8 py-3.5 text-base">
              Browse Shop
            </Link>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-emerald px-8 py-3.5 text-base"
            >
              WhatsApp Sales
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 lg:mt-16">
          <div className="card-premium px-6 py-4 backdrop-blur-md">
            <p className="font-display text-3xl font-bold text-white">32+</p>
            <p className="text-sm text-slate-400">Catalog SKUs</p>
          </div>
          <div className="card-premium px-6 py-4 backdrop-blur-md">
            <p className="font-display text-3xl font-bold text-cyan-400">{SITE.since}</p>
            <p className="text-sm text-slate-400">Years in production</p>
          </div>
          <div className="card-premium px-6 py-4 backdrop-blur-md">
            <p className="font-display text-3xl font-bold text-white">30+</p>
            <p className="text-sm text-slate-400">Export regions</p>
          </div>
        </div>
      </div>
    </section>
  );
}
