import { ContactBar } from "@/components/ContactBar";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT, SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Sales — Custom Quote in Minutes",
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
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Contact Sales</h1>
      <p className="mt-2 text-slate-400">
        Tell us your device count and product interest—we reply from {SITE.location} within 24 hours.
      </p>
      <div className="mt-6 space-y-2 text-slate-300">
        <p>Phone: <a href={`tel:${CONTACT.phone}`} className="text-cyan-400">{CONTACT.phoneDisplay}</a></p>
        <p>Telegram: <a href={CONTACT.telegramUrl} className="text-cyan-400">{CONTACT.telegram}</a></p>
        <p>WhatsApp: <a href={CONTACT.whatsappUrl} className="text-cyan-400">{CONTACT.whatsapp}</a></p>
        <p>Email: <a href={`mailto:${CONTACT.email}`} className="text-cyan-400">{CONTACT.email}</a></p>
      </div>
      <div className="mt-4">
        <ContactBar />
      </div>
      <div className="mt-10 max-w-xl">
        <ContactForm defaultProduct={product || ""} source="contact" />
      </div>
    </div>
  );
}
