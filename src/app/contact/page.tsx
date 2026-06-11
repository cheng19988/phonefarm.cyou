import { ContactBar } from "@/components/ContactBar";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT, SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Sales —Custom Quote in Minutes",
  description:
    "Contact Cyou Phone Farm: +86 13059502618, Telegram @huicheng1998, WhatsApp +852 6215 5642, qiuxui646@gmail.com",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading
            title="Contact Sales"
            subtitle={`Tell us your device count and product interest—we reply from ${SITE.location} within 24 hours.`}
          />
          <div className="mt-6 space-y-2 text-slate-700">
            <p>
              Phone: <a href={`tel:${CONTACT.phone}`} className="link-accent">{CONTACT.phoneDisplay}</a>
            </p>
            <p>
              Telegram: <a href={CONTACT.telegramUrl} className="link-accent">{CONTACT.telegram}</a>
            </p>
            <p>
              WhatsApp: <a href={CONTACT.whatsappUrl} className="link-accent">{CONTACT.whatsapp}</a>
            </p>
            <p>
              Email: <a href={`mailto:${CONTACT.email}`} className="link-accent">{CONTACT.email}</a>
            </p>
          </div>
          <div className="mt-4">
            <ContactBar />
          </div>
        </div>
      </section>

      <div className="site-container py-12 pb-24 lg:pb-12">
        <div className="max-w-xl card-premium p-6">
          <ContactForm defaultProduct={product || ""} source="contact" variant="full" />
        </div>
      </div>
    </div>
  );
}
