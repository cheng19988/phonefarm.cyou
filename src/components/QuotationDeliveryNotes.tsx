import type { QuotationDelivery } from "@/lib/delivery";
import { DEFAULT_QUOTATION_DELIVERY } from "@/lib/delivery";

export function QuotationDeliveryNotes({ notes }: { notes?: Partial<QuotationDelivery> }) {
  const n = { ...DEFAULT_QUOTATION_DELIVERY, ...notes };

  return (
    <section className="card-premium mt-12 p-6 not-prose">
      <h2 className="text-xl font-bold text-slate-900">Pricing, lead time &amp; delivery</h2>
      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        <li>
          <span className="font-medium text-slate-800">Price: </span>
          {n.priceNote}
        </li>
        <li>
          <span className="font-medium text-slate-800">MOQ: </span>
          {n.moq}
        </li>
        <li>
          <span className="font-medium text-slate-800">Lead time: </span>
          {n.leadTime}
        </li>
        <li>
          <span className="font-medium text-slate-800">Export packing: </span>
          {n.packing}
        </li>
        <li>
          <span className="font-medium text-slate-800">Accessories: </span>
          {n.accessories}
        </li>
        <li>
          <span className="font-medium text-slate-800">Remote setup: </span>
          {n.remoteSetup}
        </li>
        <li>
          <span className="font-medium text-slate-800">Warranty: </span>
          {n.warranty}
        </li>
      </ul>
    </section>
  );
}
