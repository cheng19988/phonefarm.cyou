import Link from "next/link";
import { CONTACT } from "@/lib/constants";

export function B2BQuotationGate({ pageLabel }: { pageLabel?: string }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      {pageLabel && <p className="text-sm font-medium uppercase tracking-wide text-slate-500">{pageLabel}</p>}
      <h1 className="page-title mt-2">B2B quotation only</h1>
      <p className="page-lead mx-auto mt-4">
        This website is configured for B2B quotation. Please contact our sales team for pricing, availability, and
        payment instructions.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/contact" className="btn-primary px-6 py-3">
          Request a Quote
        </Link>
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-emerald px-6 py-3"
        >
          WhatsApp Sales
        </a>
        <Link href="/shop" className="btn-secondary px-6 py-3">
          Browse catalog
        </Link>
      </div>
    </div>
  );
}
