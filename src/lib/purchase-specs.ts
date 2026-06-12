import { STANDARD_20_NODE_CHASSIS } from "./chassis-specs";
import { DEFAULT_QUOTATION_DELIVERY } from "./delivery";
import { isServiceCatalogItem } from "./catalog";

/** Buyer-facing procurement rows for product specification tables. */
export function buildPurchaseSpecRows(category: string, productType?: string): Record<string, string> {
  if (isServiceCatalogItem(category) || productType === "service") {
    return {
      MOQ: "Quoted per service scope (single farm onboarding or enterprise package).",
      "Lead time": "Remote session scheduled within 3–7 business days after payment confirmation.",
      "Service delivery": "Screenshare onboarding via WhatsApp / Telegram / agreed video call.",
      Warranty: "Service scope documented on invoice; hardware warranty follows bundled chassis policy.",
      "Shipping method": "Services are remote; hardware shipments use DHL / FedEx / UPS from Guangzhou.",
      "Payment process":
        "Sales confirms proforma invoice and scope before payment. Online checkout available on select service SKUs.",
    };
  }

  const d = DEFAULT_QUOTATION_DELIVERY;
  return {
    MOQ: d.moq,
    "Lead time": d.leadTime,
    "Packing size": STANDARD_20_NODE_CHASSIS.dimensionsMm.formatted,
    "Gross weight (packed)": STANDARD_20_NODE_CHASSIS.weightKg.formatted,
    Voltage: STANDARD_20_NODE_CHASSIS.power.inputVoltage,
    Warranty: "90-day hardware defect coverage from delivery date (manufacturing faults under normal farm use).",
    "Shipping method": "DHL / FedEx / UPS express export from Guangzhou with commercial invoice and packing list.",
    "Payment process":
      "RFQ-first: sales confirms written BOM, proforma invoice, MOQ, lead time, and destination before payment. Catalog SKUs marked for direct purchase support logged-in USDT checkout — bulk and custom configs require quotation first.",
  };
}
