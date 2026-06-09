import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "Login",
  "Sign in to your Cyou Phone Farm account.",
  "/login"
);

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
