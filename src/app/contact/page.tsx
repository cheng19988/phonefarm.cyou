import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ContactFormFeedback } from "@/components/ContactFormFeedback";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT, SITE } from "@/lib/constants";
import { CONTACT_URLS } from "@/lib/contact-urls";
import { resolveProductPrefill } from "@/lib/product-prefill";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, contactPageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Sales — Request Phone Farm Quotation (RFQ)",
  description:
    "Request a phone farm RFQ from Cyou Phone Farm, Guangzhou. Share brand line, node count, shipping country, and connection mode — written BOM, MOQ, proforma before payment.",
  path: "/contact",
  keywords: ["phone farm quote", "phone farm RFQ", "bulk phone farm order", "export phone farm"],
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; intent?: string; contact?: string }>;
}) {
  const { product, intent, contact } = await searchParams;
  const prefill = await resolveProductPrefill(product);
  const formIntent = intent === "sample" ? "sample" : "quote";

  return (
    <div className="bg-white">
      <JsonLd data={contactPageJsonLd()} />
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading
            as="h1"
            title="Contact sales"
            subtitle={`${SITE.name} · ${SITE.location} · factory assembly & export since ${SITE.since}`}
          />
          <p className="mt-4 max-w-2xl text-sm text-slate-600 leading-relaxed">
            RFQ-first B2B path for brand-line motherboard farms from our Guangzhou factory. Submit the form for a
            written BOM, burn-in QC scope, export packing, and proforma invoice — final quote confirmed before payment.
            USDT checkout applies only to sales-confirmed standard SKUs — see our{" "}
            <Link href="/help/proforma-vs-usdt-ordering" className="link-accent font-medium">
              proforma vs USDT ordering guide
            </Link>
            . Shop and checkout show reference prices only.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 hover:text-emerald-600"
            >
              WhatsApp {CONTACT.whatsapp}
            </a>
            <a
              href={CONTACT.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky-700 hover:text-sky-600"
            >
              Telegram {CONTACT.telegram}
            </a>
            <a
              href={CONTACT_URLS.gmailCompose}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky-700 hover:text-sky-600"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>
      </section>

      <div className="site-container py-12 pb-24 lg:pb-12">
        <div className="max-w-xl card-premium p-6 lg:p-8">
          <ContactFormFeedback status={contact} />
          <ContactForm
            defaultProduct={prefill.displayName}
            productSlug={prefill.slug}
            intent={formIntent}
            source="contact"
            variant="full"
            showIntro={!prefill.displayName}
          />
        </div>
      </div>
    </div>
  );
}
