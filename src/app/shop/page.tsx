import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ContactBar } from "@/components/ContactBar";
import { ShopFilters } from "@/components/ShopFilters";
import { buildMetadata } from "@/lib/seo";
import { CURRENCY } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Shop — Phone Farm Devices & Setup Services",
  description:
    "Samsung, Oppo, Xiaomi, OnePlus, and Pixel phone farm boxes plus control setup services from Guangzhou.",
  path: "/shop",
});

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q } },
              { shortDesc: { contains: q } },
              { category: { contains: q } },
            ],
          }
        : {}),
    },
    orderBy: [{ category: "asc" }, { priceUsd: "desc" }],
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Shop</h1>
      <p className="mt-2 text-slate-400">{CURRENCY.label}</p>
      <div className="mt-4">
        <ContactBar />
      </div>
      <Suspense>
        <div className="mt-8">
          <ShopFilters />
        </div>
      </Suspense>
      <p className="mt-6 text-sm text-slate-500">{products.length} products</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
