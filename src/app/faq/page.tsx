import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactBar } from "@/components/ContactBar";
import { ContactForm } from "@/components/ContactForm";
import { FAQ_ITEMS } from "@/lib/faq";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, faqPageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm FAQ",
  description:
    "Answers about phone farm boxes, motherboard boxes, real devices vs cloud, MOQ, samples, shipping, payment, and sales contact.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <JsonLd data={faqPageJsonLd(FAQ_ITEMS)} />
      <h1 className="text-3xl font-bold text-white">Frequently Asked Questions</h1>
      <p className="mt-2 text-slate-400">Expanded FAQ for buyers, integrators, and enterprise procurement.</p>
      <div className="mt-4">
        <ContactBar />
      </div>
      <div className="mt-10 max-w-3xl">
        <FaqAccordion items={FAQ_ITEMS} />
      </div>
      <section className="mt-16 rounded-2xl border border-cyan-900/50 bg-cyan-950/20 p-8">
        <h2 className="text-xl font-bold text-white">Still have questions?</h2>
        <p className="mt-2 text-slate-400">Submit the form or message us on WhatsApp / Telegram.</p>
        <div className="mt-6 max-w-xl">
          <ContactForm source="faq-cta" />
        </div>
        <Link href="/contact" className="mt-4 inline-block text-cyan-400 hover:underline">
          Full contact page →
        </Link>
      </section>
    </div>
  );
}
