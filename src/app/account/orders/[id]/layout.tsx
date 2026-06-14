import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "Order details",
  "USDT payment and shipping details for your order.",
  "/account/orders"
);

export default function AccountOrderDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
