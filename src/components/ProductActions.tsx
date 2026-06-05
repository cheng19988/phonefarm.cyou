import Link from "next/link";

export function ProductActions({
  slug,
  inStock,
}: {
  productId: string;
  slug: string;
  name: string;
  imageCard: string;
  priceUsd: number;
  inStock: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/contact?product=${encodeURIComponent(slug)}`}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white hover:bg-cyan-500"
        >
          Request quote
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-slate-600 px-6 py-3 text-slate-200 hover:border-cyan-500"
        >
          Contact sales
        </Link>
      </div>
      {!inStock && (
        <p className="text-sm text-amber-400">
          Limited stock on this SKU — message us for lead time and alternatives.
        </p>
      )}
      <p className="text-sm text-slate-500">
        We confirm pricing, shipping, and setup scope on Telegram or WhatsApp before any order.
      </p>
    </div>
  );
}
