import { buildMetadata } from "@/lib/seo";
import { SITE, PAYMENT } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${SITE.name} website and orders.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose-farm">
      <h1>Terms of Use</h1>
      <p>By using {SITE.name} you agree to these terms.</p>
      <h2>Orders & Payment</h2>
      <p>
        Online orders may be paid via USDT ({PAYMENT.protocol}) on {PAYMENT.network}. Minimum {PAYMENT.minAmount}{" "}
        {PAYMENT.currency}. Orders expire after {PAYMENT.expiryMinutes} minutes if unpaid.
      </p>
      <h2>Use of Hardware</h2>
      <p>Customers are responsible for compliant use of devices and software in their jurisdiction.</p>
      <h2>Warranty</h2>
      <p>Hardware warranty terms are provided per invoice and SKU documentation.</p>
    </div>
  );
}
