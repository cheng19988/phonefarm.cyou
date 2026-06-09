import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "Register",
  "Create a Cyou Phone Farm account for standard online orders.",
  "/register"
);

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
