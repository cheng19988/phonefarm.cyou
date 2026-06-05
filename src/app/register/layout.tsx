import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "B2B Quotation",
  "Contact Cyou Phone Farm sales for pricing and availability.",
  "/register"
);

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
