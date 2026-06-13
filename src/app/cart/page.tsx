import { B2BQuotationGate } from "@/components/B2BQuotationGate";
import { CartPageContent } from "@/components/CartPageContent";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "Cart",
  "Review standard SKU selections before checkout or request a bulk quotation.",
  "/cart"
);

export default function CartPage() {
  return (
    <B2BQuotationGate title="Your order" checkoutLabel="View cart for standard SKUs">
      <CartPageContent />
    </B2BQuotationGate>
  );
}
