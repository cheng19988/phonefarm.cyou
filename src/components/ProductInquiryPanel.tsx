import { ContactForm } from "./ContactForm";

export function ProductInquiryPanel({
  productSlug,
  productName,
}: {
  productSlug: string;
  productName: string;
}) {
  return (
    <aside className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold text-white">Send inquiry</h2>
      <p className="mt-1 text-sm text-slate-400">Model: {productName}</p>
      <div className="mt-4">
        <ContactForm defaultProduct={productSlug} source={`product-${productSlug}`} />
      </div>
    </aside>
  );
}
