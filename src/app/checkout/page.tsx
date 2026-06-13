import Link from "next/link";
import { CheckoutForm } from "@/components/CheckoutForm";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "Checkout",
  "Complete shipping details for sales-confirmed standard SKUs. Bulk orders use RFQ and proforma first.",
  "/checkout"
);

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link href="/cart" className="link-accent text-sm">
        ← Back to cart
      </Link>
      <h1 className="page-title mt-4">Order details</h1>
      <p className="page-lead text-sm">
        Complete shipping and contact details for standard online orders. Bulk or custom deployments should go through{" "}
        <Link href="/contact" className="link-accent">
          sales inquiry
        </Link>{" "}
        first.
      </p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
