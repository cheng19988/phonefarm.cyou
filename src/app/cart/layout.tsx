import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shopping Cart",
  description: "Review phone farm devices and setup services before USDT checkout.",
  path: "/cart",
});

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
