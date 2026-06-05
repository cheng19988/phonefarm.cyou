import Link from "next/link";
import { CONTACT } from "@/lib/constants";

export function ProductActions({
  slug,
  name,
}: {
  productId: string;
  slug: string;
  name: string;
  imageCard: string;
  priceUsd: number;
  inStock: boolean;
}) {
  const inquiry = `/contact?product=${encodeURIComponent(slug)}`;
  const wa = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(`Hi, I'd like a quote for ${name} (${slug}).`)}`;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <Link
          href={inquiry}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white hover:bg-cyan-500"
        >
          Request Quote for This Model
        </Link>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-emerald-700 px-6 py-3 font-medium text-white hover:bg-emerald-600"
        >
          WhatsApp Sales
        </a>
        <Link
          href={inquiry}
          className="rounded-lg border border-slate-600 px-6 py-3 text-slate-200 hover:border-cyan-500"
        >
          Send Inquiry
        </Link>
      </div>
      <p className="text-sm text-slate-500">
        Reference price only. Sales confirms MOQ, lead time, shipping, and setup scope before any order.
      </p>
    </div>
  );
}
