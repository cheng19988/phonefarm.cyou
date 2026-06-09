import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "Checkout",
  "Complete your standard product order with Cyou Phone Farm.",
  "/checkout"
);

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
