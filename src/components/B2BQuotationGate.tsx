import Link from "next/link";
import { ContactBar } from "./ContactBar";
import { CONTACT } from "@/lib/constants";

export function B2BQuotationGate({ pageLabel }: { pageLabel?: string }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      {pageLabel && <p className="text-sm uppercase tracking-wide text-slate-500">{pageLabel}</p>}
      <h1 className="mt-2 text-2xl font-bold text-white">B2B quotation only</h1>
      <p className="mt-4 text-slate-300 leading-relaxed">
        This website is configured for B2B quotation. Please contact our sales team for pricing,
        availability, and payment instructions.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/contact" className="rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white hover:bg-cyan-500">
          Request a Quote
        </Link>
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-emerald-700 px-6 py-3 font-medium text-white hover:bg-emerald-600"
        >
          WhatsApp Sales
        </a>
        <Link href="/shop" className="rounded-lg border border-slate-600 px-6 py-3 text-slate-200 hover:border-cyan-500">
          Browse catalog
        </Link>
      </div>
      <div className="mt-8">
        <ContactBar />
      </div>
    </div>
  );
}
