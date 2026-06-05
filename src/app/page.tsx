import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ContactBar } from "@/components/ContactBar";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { DeploymentTimeline } from "@/components/DeploymentTimeline";
import { BuyerTrustSection } from "@/components/BuyerTrustSection";
import { DeliverySopSection } from "@/components/DeliverySopSection";
import { FAQ_ITEMS } from "@/lib/faq";
import {
  SITE,
  CONTROL_SOFTWARE_OPTIONS,
  CONTROL_SOFTWARE_DISCLAIMER,
  CONTROL_SETUP_SERVICES,
  PRODUCT_INFO_TOPICS,
  SHIPPING_REGIONS,
  HOME_SECTIONS,
  CONTACT,
} from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { buildMetadata, faqPageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Complete Phone Farm Setup Service with Real Devices",
  description: SITE.intro,
  path: "/",
});

async function productsForSection(section: (typeof HOME_SECTIONS)[number]) {
  if ("categories" in section && section.categories) {
    return prisma.product.findMany({
      where: { published: true, category: { in: [...section.categories] } },
      take: 4,
      orderBy: { priceUsd: "asc" },
    });
  }
  return prisma.product.findMany({
    where: { published: true, category: section.slug },
    take: 4,
    orderBy: { priceUsd: "asc" },
  });
}

export default async function HomePage() {
  const sections = await Promise.all(
    HOME_SECTIONS.map(async (section) => ({
      section,
      products: await productsForSection(section),
    }))
  );

  return (
    <>
      <JsonLd data={faqPageJsonLd(FAQ_ITEMS.slice(0, 6))} />
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <Image src={IMAGES.hero} alt="Cyou Phone Farm device chassis" fill className="object-cover opacity-25" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
            {SITE.location} · Guangzhou-based supplier · Since {SITE.since}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white lg:text-5xl">{SITE.tagline}</h1>
          <ul className="mt-6 max-w-3xl space-y-2 text-lg text-slate-300">
            <li>Real Android motherboard boxes — factory assembled in Guangzhou</li>
            <li>Remote control and group-control configuration by our engineers</li>
            <li>Overseas delivery, export packing, and after-sales support</li>
          </ul>
          <div className="mt-6 hidden lg:block">
            <ContactBar />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white hover:bg-cyan-500">
              Request a Quote
            </Link>
            <Link href="/shop" className="rounded-lg border border-slate-600 px-6 py-3 text-white hover:border-cyan-500">
              View Phone Farm Devices
            </Link>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-emerald-600/60 px-6 py-3 text-emerald-400 hover:bg-emerald-950/40"
            >
              WhatsApp Sales
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-bold text-white">Product Information</h2>
        <p className="mt-2 max-w-3xl text-slate-400">
          Technical context for buyers evaluating real-device farms for professional QA, remote device management, and enterprise deployment.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_INFO_TOPICS.map((topic) => (
            <div key={topic.title} className="rounded-xl border border-slate-800 p-5">
              <h3 className="font-semibold text-cyan-400">{topic.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{topic.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/help/what-is-phone-farm" className="text-cyan-400 hover:underline">What is a phone farm? →</Link>
          <Link href="/help/after-purchase-guide" className="text-cyan-400 hover:underline">After receiving your farm →</Link>
        </div>
      </section>

      {sections.map(({ section, products }) => (
        <section key={section.slug} className="border-t border-slate-800 bg-slate-900/20 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{section.name}</h2>
              <Link
                href={`/shop?category=${"categories" in section && section.categories ? section.categories[0] : section.slug}`}
                className="text-sm text-cyan-400 hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-white">Control Software Setup &amp; Remote Management Configuration</h2>
        <p className="mt-2 max-w-3xl text-slate-400">{CONTROL_SOFTWARE_DISCLAIMER}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CONTROL_SETUP_SERVICES.map((s) => (
            <div key={s.slug} className="rounded-xl border border-slate-800 p-5">
              <h3 className="font-semibold text-white">{s.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
              <p className="mt-3 text-sm font-medium text-cyan-400">
                {s.priceFrom > 0 ? `From $${s.priceFrom}` : "Custom quote"}
              </p>
              <p className="mt-1 text-xs text-slate-500">Contact sales · configuration confirmed before invoice</p>
              <Link href="/contact" className="mt-4 inline-block text-sm text-cyan-400 hover:underline">
                Request service quote →
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CONTROL_SOFTWARE_OPTIONS.map((o) => (
            <div key={o.slug} className="rounded-lg border border-slate-800/80 p-4 text-sm">
              <p className="font-medium text-white">{o.name}</p>
              <p className="mt-1 text-slate-400">{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <BuyerTrustSection siteName={SITE.name} />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-white">Export capability &amp; logistics</h2>
        <p className="mt-2 max-w-2xl text-slate-400">
          We ship from Guangzhou via DHL, FedEx, and UPS. Sample single-box orders are accepted before bulk programs.
        </p>
        <h3 className="mt-6 text-sm font-medium uppercase tracking-wide text-slate-500">Common destination regions</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {SHIPPING_REGIONS.map((region) => (
            <li key={region} className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
              {region}
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-4 md:grid-cols-3 text-sm text-slate-400">
          <div className="rounded-xl border border-slate-800 p-5">
            <h3 className="font-semibold text-white">Packing process</h3>
            <p className="mt-2">Foam-braced export cartons, serial sheet inside lid, commercial invoice for customs.</p>
          </div>
          <div className="rounded-xl border border-slate-800 p-5">
            <h3 className="font-semibold text-white">Sample order policy</h3>
            <p className="mt-2">One box or accessory kit for evaluation; credited toward bulk PO when agreed in writing.</p>
          </div>
          <div className="rounded-xl border border-slate-800 p-5">
            <h3 className="font-semibold text-white">After-sales</h3>
            <p className="mt-2">WhatsApp and Telegram support during US/EU-friendly hours; spare parts stocked in Guangzhou.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <DeliverySopSection id="delivery-sop" />
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white">Deployment workflow</h2>
            <p className="mt-2 text-slate-400">Six-stage rollout from discovery to after-sales support.</p>
            <DeploymentTimeline />
            <Link href="/deployment" className="mt-6 inline-block text-cyan-400 hover:underline">
              Full deployment page →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold text-white">Guangzhou facility</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              ["office", "Office"],
              ["front", "Reception"],
              ["meeting", "Project review room"],
              ["production", "Assembly floor"],
              ["warehouse", "Warehouse"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-800">
              <Image src={IMAGES.company[key]} alt={`${SITE.name} ${label}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-800 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-white">FAQ</h2>
          <div className="mt-6 max-w-3xl">
            <FaqAccordion items={FAQ_ITEMS.slice(0, 6)} />
          </div>
          <Link href="/faq" className="mt-4 inline-block text-cyan-400 hover:underline">
            Full FAQ →
          </Link>
        </div>
      </section>

      <section className="bg-cyan-950/20 py-16 pb-24 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-white">Request a quotation</h2>
          <p className="mt-2 text-slate-400">
            Share quantity, destination, and control method — sales replies with MOQ, lead time, and setup scope.
          </p>
          <div className="mt-8 max-w-xl">
            <ContactForm source="home-cta" variant="compact" />
          </div>
        </div>
      </section>
    </>
  );
}
