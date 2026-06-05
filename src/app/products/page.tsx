import { redirect } from "next/navigation";

/** Catalog lives at /shop — avoid duplicate listing routes. */
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const next = new URLSearchParams();
  if (category) next.set("category", category);
  if (q) next.set("q", q);
  const qs = next.toString();
  redirect(qs ? `/shop?${qs}` : "/shop");
}
