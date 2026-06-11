import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ContactForm } from "@/components/ContactForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { DeploymentTimeline } from "@/components/DeploymentTimeline";
import { BuyerTrustSection } from "@/components/BuyerTrustSection";
import { DeliverySopSection } from "@/components/DeliverySopSection";
import { HomeHero } from "@/components/HomeHero";
import { TrustStatsBar } from "@/components/TrustStatsBar";
import { RegionsShowcase } from "@/components/RegionsShowcase";
import { BrandProductSection } from "@/components/BrandProductSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ_ITEMS } from "@/lib/faq";
import {
  CONTROL_SOFTWARE_OPTIONS,
  CONTROL_SOFTWARE_DISCLAIMER,
  CONTROL_SETUP_SERVICES,
  PRODUCT_INFO_TOPICS,
  HOME_SECTIONS,
} from "@/lib/constants";
import { FACILITY_GALLERY } from "@/lib/images";
import { FacilityPhoto } from "@/components/FacilityPhoto";
import { buildMetadata, faqPageJsonLd } from "@/lib/seo";
import { isServiceCatalogItem } from "@/lib/catalog";

export const metadata = buildMetadata({
  title: "Complete Phone Farm Setup Service with Real Devices",
  description:
    "Guangzhou factory team shipping real-device phone farm boxes since 2017. Hardware, remote control setup, and worldwide deployment support.",
  path: "/",
});

async function productsForSection(section: (typeof HOME_SECTIONS)[number]) {
  const rows =
    "categories" in section && section.categories
      ? await prisma.product.findMany({
          where: { published: true, category: { in: [...section.categories] } },
          take: 16,
          orderBy: { priceUsd: "asc" },
        })
      : await prisma.product.findMany({
          where: { published: true, category: section.slug },
          take: 16,
          orderBy: { priceUsd: "asc" },
        });

  return rows.filter((p) => !isServiceCatalogItem(p.category)).slice(0, 8);
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
      <JsonLd data={faqPageJsonLd(FAQ_ITEMS.slice(0, 12))} />
      <HomeHero />
      <TrustStatsBar />

      <section className="site-container py-16">
        <SectionHeading
          title="Product information"
          subtitle="Technical context for buyers evaluating real-device farms for professional QA, remote device management, and enterprise deployment."
        />
        <div className="info-grid mt-10">
          {PRODUCT_INFO_TOPICS.map((topic) => (
            <div key={topic.title} className="card-premium p-6">
              <h3 className="font-display text-lg font-semibold text-sky-700">{topic.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{topic.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/phone-farm" className="link-accent">
            What is a phone farm?
          </Link>
          <Link href="/help/after-purchase-guide" className="link-accent">
            After receiving your farm
          </Link>
        </div>
      </section>

      {sections.map(({ section, products }) => (
        <BrandProductSection
          key={section.slug}
          slug={section.slug}
          name={section.name}
          products={products}
          categoryHref={`/shop?category=${"categories" in section && section.categories ? section.categories[0] : section.slug}`}
        />
      ))}

      <section className="site-container py-16">
        <SectionHeading
          title="Control software setup"
          subtitle={CONTROL_SOFTWARE_DISCLAIMER}
        />
        <div className="info-grid mt-10">
          {CONTROL_SETUP_SERVICES.map((s) => (
            <div key={s.slug} className="card-premium p-5">
              <h3 className="font-semibold text-slate-900">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
              <p className="mt-4 font-display text-xl font-bold text-sky-700">
                {s.priceFrom > 0 ? `From $${s.priceFrom}` : "Custom quote"}
              </p>
              <Link href="/contact" className="mt-4 inline-block text-sm font-medium text-sky-700 hover:text-sky-600">
                Request quote —              </Link>
            </div>
          ))}
        </div>
        <div className="info-grid mt-8">
          {CONTROL_SOFTWARE_OPTIONS.map((o) => (
            <div key={o.slug} className="card-premium p-4 text-sm">
              <p className="font-medium text-slate-900">{o.name}</p>
              <p className="mt-1 text-slate-600">{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <BuyerTrustSection />

      <RegionsShowcase />

      <section className="section-alt py-16">
        <div className="site-container">
          <DeliverySopSection id="delivery-sop" />
          <div className="mt-16">
            <SectionHeading
              title="Deployment workflow"
              subtitle="Six-stage rollout from discovery to after-sales support."
              actionHref="/deployment"
              actionLabel="Full deployment page"
            />
            <div className="mt-8">
              <DeploymentTimeline />
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-16">
        <SectionHeading title="Guangzhou facility" subtitle="Factory assembly, burn-in testing, and export packing." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {FACILITY_GALLERY.map((photo) => (
            <FacilityPhoto key={photo.key} src={photo.src} alt={photo.alt} label={photo.label} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 py-16">
        <div className="site-container">
          <SectionHeading title="FAQ" actionHref="/faq" actionLabel="Full FAQ" />
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={FAQ_ITEMS.slice(0, 6)} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-slate-200 bg-sky-50 py-20">
        <div className="relative site-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900">Request a quotation</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Share quantity, destination, and control method —sales replies with MOQ, lead time, and setup scope.
              </p>
            </div>
            <div className="card-premium p-6">
              <ContactForm source="home-cta" variant="compact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
