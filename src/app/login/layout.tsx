import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "B2B Quotation",
  "Contact Cyou Phone Farm sales for pricing and availability.",
  "/login"
);

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
