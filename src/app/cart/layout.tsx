import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "Cart",
  "Review standard product selections before checkout.",
  "/cart"
);

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
