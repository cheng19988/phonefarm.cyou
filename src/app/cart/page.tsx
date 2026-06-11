import { B2BQuotationGate } from "@/components/B2BQuotationGate";
import { CartPageContent } from "@/components/CartPageContent";

export default function CartPage() {
  return (
    <B2BQuotationGate title="Your order" checkoutLabel="View cart for standard SKUs">
      <CartPageContent />
    </B2BQuotationGate>
  );
}
