import { ContactForm } from "@/components/ContactForm";
import { ContactFormFeedback } from "@/components/ContactFormFeedback";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT, SITE } from "@/lib/constants";
import { CONTACT_URLS } from "@/lib/contact-urls";
import { resolveProductPrefill } from "@/lib/product-prefill";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, contactPageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Sales — Request a Quotation",
  description:
    "Request a phone farm quotation from Cyou Phone Farm, Guangzhou. Share node count, destination, and control method — sales replies within one business day.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; intent?: string; contact?: string }>;
}) {
  const { product, intent, contact } = await searchParams;
  const prefill = resolveProductPrefill(product);
  const formIntent = intent === "sample" ? "sample" : "quote";

  return (
    <div className="bg-white">
      <JsonLd data={contactPageJsonLd()} />
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading
            title="Contact sales"
            subtitle={`${SITE.name} · ${SITE.location} · factory assembly & export since ${SITE.since}`}
          />
          <p className="mt-4 max-w-2xl text-sm text-slate-600 leading-relaxed">
            For bulk orders, custom mixes, or export packing questions, submit the form below. We confirm MOQ, lead
            time, and proforma invoice before you pay. Standard SKUs may also support limited online checkout — see
            shop for reference USD prices.
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
