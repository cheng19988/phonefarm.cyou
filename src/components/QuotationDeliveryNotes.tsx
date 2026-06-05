import type { QuotationDelivery } from "@/lib/delivery";
import { DEFAULT_QUOTATION_DELIVERY } from "@/lib/delivery";

export function QuotationDeliveryNotes({ notes }: { notes?: Partial<QuotationDelivery> }) {
  const n = { ...DEFAULT_QUOTATION_DELIVERY, ...notes };

  return (
    <section className="mt-12 rounded-xl border border-slate-800 bg-slate-900/30 p-6 not-prose">
      <h2 className="text-xl font-bold text-white">Quotation &amp; Delivery Notes</h2>
      <ul className="mt-4 space-y-3 text-sm text-slate-400">
        <li>
          <span className="font-medium text-slate-300">Reference pricing: </span>
          {n.priceNote}
        </li>
        <li>
          <span className="font-medium text-slate-300">MOQ guidance: </span>
          {n.moq}
        </li>
        <li>
          <span className="font-medium text-slate-300">Lead time: </span>
          {n.leadTime}
        </li>
        <li>
          <span className="font-medium text-slate-300">Packing: </span>
          {n.packing}
        </li>
        <li>
          <span className="font-medium text-slate-300">Recommended accessories: </span>
          {n.accessories}
        </li>
        <li>
          <span className="font-medium text-slate-300">Remote setup support: </span>
          {n.remoteSetup}
        </li>
        <li>
          <span className="font-medium text-slate-300">Warranty &amp; spares: </span>
          {n.warranty}
        </li>
      </ul>
    </section>
  );
}
