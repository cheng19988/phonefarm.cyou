import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "B2B Quotation",
  "Contact Cyou Phone Farm sales for hardware quotes and availability.",
  "/cart"
);

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
