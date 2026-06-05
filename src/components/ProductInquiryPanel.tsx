import Link from "next/link";
import { ContactForm } from "./ContactForm";
import { CONTACT } from "@/lib/constants";

export function ProductInquiryPanel({
  productSlug,
  productName,
}: {
  productSlug: string;
  productName: string;
}) {
  const wa = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(`Hi, I'd like a quote for ${productName} (${productSlug}).`)}`;

  return (
    <aside className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold text-white">Send inquiry</h2>
      <p className="mt-1 text-sm text-slate-400">Model: {productName}</p>
      <div className="mt-4 flex flex-col gap-2 lg:hidden">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-emerald-700 py-2.5 text-center text-sm font-medium text-white"
        >
          WhatsApp Sales
        </a>
        <Link
          href={`/contact?product=${productSlug}`}
          className="rounded-lg border border-slate-600 py-2.5 text-center text-sm text-slate-200"
        >
          Full quote form
        </Link>
      </div>
      <div className="mt-4 hidden sm:block">
        <ContactForm
          defaultProduct={productSlug}
          source={`product-${productSlug}`}
          variant="compact"
        />
      </div>
      <p className="mt-3 text-xs text-slate-500 sm:hidden">
        Prefer a short message? Use WhatsApp above. The full form is on the contact page.
      </p>
    </aside>
  );
}
