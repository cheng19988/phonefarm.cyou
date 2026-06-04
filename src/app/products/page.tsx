import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Phone Farm Products Catalog",
  description:
    "Phone farm boxes, motherboard boxes, Android farms, accessories, and custom cabinets from Guangzhou manufacturer.",
  path: "/products",
});

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Products</h1>
      <p className="mt-2 text-slate-400">Full hardware catalog for real-device phone farms.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/products"
          className={`rounded-full px-3 py-1 text-sm ${!category ? "bg-cyan-600 text-white" : "border border-slate-700 text-slate-400"}`}
        >
          All
        </Link>
        {PRODUCT_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/products?category=${c.slug}`}
            className={`rounded-full px-3 py-1 text-sm ${category === c.slug ? "bg-cyan-600 text-white" : "border border-slate-700 text-slate-400"}`}
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
