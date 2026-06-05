import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "Account",
  "Account area for Cyou Phone Farm — contact sales for B2B orders.",
  "/account"
);

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
