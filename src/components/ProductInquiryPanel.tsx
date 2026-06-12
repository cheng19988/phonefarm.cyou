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
  const wa = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(
    `Hello, I need a quotation for ${productName}. Ship-to country: [your country]. Quantity: [boxes/nodes].`
  )}`;

  return (
    <aside className="card-premium p-6 lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold text-slate-900">Request quotation</h2>
      <p className="mt-1 text-sm text-slate-600">
        Model on this page: <span className="font-medium text-slate-800">{productName}</span>
      </p>
      <p className="mt-2 text-xs text-slate-500">
        Guangzhou sales replies within one business day with MOQ and export lead time.
      </p>
      <div className="mt-4 flex flex-col gap-2 lg:hidden">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-emerald w-full py-2.5 text-center text-sm"
        >
          WhatsApp sales
        </a>
        <Link
          href={`/contact?product=${productSlug}&intent=quote`}
          className="btn-secondary w-full py-2.5 text-center text-sm"
        >
          Open full quote form
        </Link>
      </div>
      <div className="mt-4">
        <ContactForm
          defaultProduct={productName}
          productSlug={productSlug}
          source={`product-${productSlug}`}
          variant="compact"
          showIntro={false}
        />
      </div>
    </aside>
  );
}
