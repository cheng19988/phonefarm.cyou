import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactForm } from "@/components/ContactForm";
import { FAQ_ITEMS } from "@/lib/faq";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, faqPageJsonLd } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = buildMetadata({
  title: "Phone Farm FAQ —Hardware, Setup, Shipping, Payment",
  description:
    "70+ answers about phone farm boxes, motherboard boxes, USB/LAN control, real devices vs cloud, MOQ, samples, shipping, payment, and Guangzhou factory support.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <JsonLd data={faqPageJsonLd(FAQ_ITEMS)} />
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Expanded FAQ for buyers, integrators, enterprise procurement, and phone farm reference."
          />
          <p className="mt-4 text-sm text-slate-600">{FAQ_ITEMS.length} questions · Help Center and blog linked below</p>
        </div>
      </section>
      <div className="site-container py-12">
        <div className="max-w-3xl">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
        <section className="mt-16 max-w-3xl rounded-xl border border-sky-200 bg-sky-50 p-8">
          <h2 className="text-xl font-bold text-slate-900">Still have questions?</h2>
          <p className="mt-2 text-slate-600">Submit the form or message us on WhatsApp / Telegram.</p>
          <div className="mt-6 max-w-xl">
            <ContactForm source="faq-cta" />
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href="/contact" className="text-sky-700 hover:underline">Contact</Link>
            <Link href="/help" className="text-sky-700 hover:underline">Help Center</Link>
            <Link href="/blog" className="text-sky-700 hover:underline">Blog</Link>
            <Link href="/shop" className="text-sky-700 hover:underline">Shop</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
