import type { QuotationDelivery } from "@/lib/delivery";
import { DEFAULT_QUOTATION_DELIVERY } from "@/lib/delivery";

export function QuotationDeliveryNotes({ notes }: { notes?: Partial<QuotationDelivery> }) {
  const n = { ...DEFAULT_QUOTATION_DELIVERY, ...notes };

  return (
    <section className="card-premium mt-12 p-6 not-prose">
      <h2 className="text-xl font-bold text-slate-900">Quotation &amp; Delivery Notes</h2>
      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        <li>
          <span className="font-medium text-slate-800">Reference pricing: </span>
          {n.priceNote}
        </li>
        <li>
          <span className="font-medium text-slate-800">MOQ guidance: </span>
          {n.moq}
        </li>
        <li>
          <span className="font-medium text-slate-800">Lead time: </span>
          {n.leadTime}
        </li>
        <li>
          <span className="font-medium text-slate-800">Packing: </span>
          {n.packing}
        </li>
        <li>
          <span className="font-medium text-slate-800">Recommended accessories: </span>
          {n.accessories}
        </li>
        <li>
          <span className="font-medium text-slate-800">Remote setup support: </span>
          {n.remoteSetup}
        </li>
        <li>
          <span className="font-medium text-slate-800">Warranty &amp; spares: </span>
          {n.warranty}
        </li>
      </ul>
    </section>
  );
}
