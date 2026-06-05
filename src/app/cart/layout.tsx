import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shopping Cart",
  description: "Request a quote for phone farm devices and setup services from Cyou Phone Farm.",
  path: "/cart",
});

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
