import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "Admin",
  "Administration area for Cyou Phone Farm.",
  "/admin"
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
