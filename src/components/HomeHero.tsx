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
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Cyou Phone Farm device chassis"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/92 to-slate-950/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.12),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-medium text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {SITE.location} · Factory direct · Since {SITE.since}
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              {SITE.tagline}
            </h1>
            <ul className="mt-6 space-y-3 text-base text-slate-300 lg:text-lg">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs text-cyan-400">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary px-7 py-3.5 text-base">
                Request a Quote
              </Link>
              <Link href="/shop" className="btn-secondary px-7 py-3.5 text-base">
                Browse Shop
              </Link>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-emerald px-7 py-3.5 text-base">
                WhatsApp Sales
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="card-premium overflow-hidden p-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[0.875rem]">
                <Image
                  src={IMAGES.hero}
                  alt="Phone farm motherboard box"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs font-medium uppercase tracking-widest text-cyan-400">Hardware + Software + Support</p>
                  <p className="mt-1 font-display text-xl font-semibold text-white">One-stop phone farm deployment</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 card-premium px-5 py-3">
              <p className="text-2xl font-bold text-white">32+</p>
              <p className="text-xs text-slate-400">Catalog SKUs</p>
            </div>
            <div className="absolute -right-2 top-8 card-premium px-5 py-3">
              <p className="text-2xl font-bold text-cyan-400">{SITE.since}</p>
              <p className="text-xs text-slate-400">Years in production</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
