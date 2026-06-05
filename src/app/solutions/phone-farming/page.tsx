import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ContactForm } from "@/components/ContactForm";
import { ContactBar } from "@/components/ContactBar";
import { DeliverySopSection } from "@/components/DeliverySopSection";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/constants";
import { LEGAL_USE_CASES } from "@/lib/delivery";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Enterprise Phone Farm Solution — QA & Device Labs",
  description:
    "Real-device phone farm solution from Guangzhou: hardware, burn-in, export packing, and remote setup for app QA testing, mobile device labs, and enterprise device fleets.",
  path: "/solutions/phone-farming",
});

const SOLUTION_CATEGORIES = [
  "samsung-box",
  "xiaomi-box",
  "oppo-box",
  "oneplus-box",
  "pixel-box",
  "motherboard-box",
  "usb-hub",
  "network-equipment",
] as const;

export default async function PhoneFarmingSolutionPage() {
  const products = await prisma.product.findMany({
    where: { published: true, category: { in: [...SOLUTION_CATEGORIES] } },
    orderBy: [{ category: "asc" }, { priceUsd: "asc" }],
    take: 8,
  });

  return (
    <div className="pb-24 lg:pb-0">
      <section className="relative border-b border-slate-800 py-20">
        <div className="absolute inset-0">
          <Image src={IMAGES.controlScene} alt="Phone farm control workstation" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-slate-950/90" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-white">Enterprise phone farm solution</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            {SITE.name} supplies real Android motherboard farms from Guangzhou for app QA testing, mobile device labs,
            compatibility testing, and enterprise device fleet programs—with documented burn-in, export packing, and
            remote handover.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-lg bg-cyan-600 px-5 py-2 text-white hover:bg-cyan-500">
              Request solution quote
            </Link>
            <Link href="/deployment" className="rounded-lg border border-slate-600 px-5 py-2 text-white">
              View delivery SOP
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-bold text-white">Lawful B2B use cases we support</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LEGAL_USE_CASES.map((use) => (
            <li key={use} className="rounded-lg border border-slate-800 px-4 py-3 text-sm text-slate-300">
              {use}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/20 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-white">What a typical solution includes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-slate-800 p-5 text-slate-400">
              <h3 className="font-semibold text-white">Hardware layer</h3>
              <p className="mt-2 text-sm">
                Factory-assembled 20-node chassis, matched PSU and cooling, optional USB hub and network kit, burn-in
                serial sheet before shipment.
              </p>
            </article>
            <article className="rounded-xl border border-slate-800 p-5 text-slate-400">
              <h3 className="font-semibold text-white">Control layer</h3>
              <p className="mt-2 text-sm">
                USB mirroring or LAN OTG path, control workstation layout guidance, device grouping for batch APK
                deployment for internal testing.
              </p>
            </article>
            <article className="rounded-xl border border-slate-800 p-5 text-slate-400">
              <h3 className="font-semibold text-white">Operations layer</h3>
              <p className="mt-2 text-sm">
                Operator runbook, troubleshooting checklist, long-duration stability test recommendations, and spare-parts
                list for fans and PSU.
              </p>
            </article>
            <article className="rounded-xl border border-slate-800 p-5 text-slate-400">
              <h3 className="font-semibold text-white">Logistics layer</h3>
              <p className="mt-2 text-sm">
                Export packing, commercial invoice support, express freight from Guangzhou, WhatsApp and Telegram
                after-sales during US/EU-friendly hours.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <DeliverySopSection />
      </section>

      <section className="border-t border-slate-800 bg-slate-900/20 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-white">Reference hardware configurations</h2>
          <p className="mt-2 text-slate-400">Browse common box tiers — final BOM confirmed in your written quote.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <Link href="/shop" className="mt-8 inline-block text-cyan-400 hover:underline">
            Full hardware catalog →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <ContactBar />
        <div className="mt-8 max-w-xl">
          <h2 className="text-xl font-bold text-white">Discuss your deployment</h2>
          <ContactForm source="solution-phone-farming" variant="full" />
        </div>
      </section>
    </div>
  );
}
