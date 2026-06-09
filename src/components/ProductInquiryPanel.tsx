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
    <aside className="card-premium p-6 lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold text-slate-900">Send inquiry</h2>
      <p className="mt-1 text-sm text-slate-500">Model: {productName}</p>
      <div className="mt-4 flex flex-col gap-2 lg:hidden">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-emerald w-full py-2.5 text-center text-sm"
        >
          WhatsApp Sales
        </a>
        <Link href={`/contact?product=${productSlug}`} className="btn-secondary w-full py-2.5 text-center text-sm">
          Full quote form
        </Link>
      </div>
      <div className="mt-4 hidden sm:block">
        <ContactForm defaultProduct={productSlug} source={`product-${productSlug}`} variant="compact" />
      </div>
    </aside>
  );
}
