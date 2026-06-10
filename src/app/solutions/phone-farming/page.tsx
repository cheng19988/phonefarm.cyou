import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ContactForm } from "@/components/ContactForm";
import { ContactBar } from "@/components/ContactBar";
import { DeliverySopSection } from "@/components/DeliverySopSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

const LAYERS = [
  {
    title: "Hardware layer",
    body: "Factory-assembled 20-node chassis, matched PSU and cooling, optional USB hub and network kit, burn-in serial sheet before shipment.",
  },
  {
    title: "Control layer",
    body: "USB mirroring or LAN OTG path, control workstation layout guidance, device grouping for batch APK deployment for internal testing.",
  },
  {
    title: "Operations layer",
    body: "Operator runbook, troubleshooting checklist, long-duration stability test recommendations, and spare-parts list for fans and PSU.",
  },
  {
    title: "Logistics layer",
    body: "Export packing, commercial invoice support, express freight from Guangzhou, WhatsApp and Telegram after-sales during US/EU-friendly hours.",
  },
];

export default async function PhoneFarmingSolutionPage() {
  const products = await prisma.product.findMany({
    where: { published: true, category: { in: [...SOLUTION_CATEGORIES] } },
    orderBy: [{ category: "asc" }, { priceUsd: "asc" }],
    take: 8,
  });

  return (
    <div className="bg-white pb-24 lg:pb-0">
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
          <SectionHeading
            title="Enterprise phone farm solution"
            subtitle={`${SITE.name} supplies real Android motherboard farms from Guangzhou for app QA testing, mobile device labs, compatibility testing, and enterprise device fleet programs.`}
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Request solution quote
            </Link>
            <Link href="/deployment" className="btn-secondary">
              View delivery SOP
            </Link>
            <Link href="/phone-farm" className="btn-secondary">
              What is a phone farm?
            </Link>
          </div>
          <div className="mt-6">
            <ContactBar />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHeading title="Lawful B2B use cases we support" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LEGAL_USE_CASES.map((use) => (
            <li key={use} className="card-premium px-4 py-3 text-sm text-slate-700">
              {use}
            </li>
          ))}
        </ul>
      </section>

      <section className="section-alt py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="What a typical solution includes" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {LAYERS.map((layer) => (
              <article key={layer.title} className="card-premium p-5">
                <h3 className="font-semibold text-slate-900">{layer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{layer.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <DeliverySopSection />
      </section>

      <section className="section-alt py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="Reference hardware configurations"
            subtitle="Browse common box tiers — final BOM confirmed in your written quote."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <Link href="/shop" className="link-accent mt-8 inline-block text-sm">
            Full hardware catalog →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="page-section-title">Discuss your deployment</h2>
        <div className="mt-4">
          <ContactBar />
        </div>
        <div className="card-premium mt-8 max-w-xl p-6">
          <ContactForm source="solution-phone-farming" variant="full" />
        </div>
      </section>
    </div>
  );
}
