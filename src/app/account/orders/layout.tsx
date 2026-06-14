import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "My orders",
  "Order history for standard configuration purchases.",
  "/account/orders"
);

export default function AccountOrdersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
