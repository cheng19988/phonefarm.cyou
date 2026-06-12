import Image from "next/image";
import Link from "next/link";
import { CONTACT, SITE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const TRUST_POINTS = [
  "Real Android motherboard boxes - factory assembled in Guangzhou",
  "Remote control & group-control configured by our engineers",
  "Export packing, worldwide logistics, and after-sales support",
];

const HERO_CHASSIS = IMAGES.heroChassisTransparent;

export function HomeHero() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="site-container py-12 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold text-sky-800">
              {SITE.location} | Factory direct | Since {SITE.since}
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[2.75rem]">
              {SITE.tagline}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 lg:text-lg">
              B2B phone farm boxes — Samsung, Oppo, Xiaomi, OnePlus, and Pixel reference lines. Bulk RFQ · USDT on
              select SKUs · worldwide export · remote setup available.
            </p>
            <ul className="mt-6 space-y-3 text-base text-slate-600 lg:text-lg">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                    +
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
            <p className="mt-8 text-sm text-slate-500">
              <Link href="/phone-farm" className="link-accent">
                What is a phone farm?
              </Link>
            </p>
          </div>

          <div className="relative min-h-[min(72vw,400px)] lg:col-span-7 lg:min-h-[min(42vw,540px)]">
            <div className="absolute inset-0 lg:-mr-4 lg:scale-110">
              <Image
                src={HERO_CHASSIS}
                alt="Phone farm honeycomb chassis with motherboard trays"
                fill
                className="object-contain object-center lg:object-right drop-shadow-[0_24px_48px_rgba(15,23,42,0.1)]"
                sizes="(max-width:1024px) 100vw, 58vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
