import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { SHOP_BRANDS } from "@/lib/constants";

type Product = {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  priceUsd: number;
  imageCard: string;
  category: string;
  specs?: string;
  directPurchaseEnabled: boolean;
  quoteOnly: boolean;
  productType: string;
};

export function BrandProductSection({
  slug,
  name,
  products,
  categoryHref,
}: {
  slug: string;
  name: string;
  products: Product[];
  categoryHref: string;
}) {
  const brand = SHOP_BRANDS.find((b) => b.slug === slug);

  return (
    <section className="section-alt py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {brand && (
              <div className="brand-pill-icon h-12 w-12 rounded-xl text-sm">{brand.icon}</div>
            )}
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">{name}</h2>
              <p className="mt-1 text-sm text-slate-600">Reference configurations · bulk quote available</p>
            </div>
          </div>
          <Link href={categoryHref} className="text-sm font-medium text-sky-700 hover:text-sky-600">
            View all {name} →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
