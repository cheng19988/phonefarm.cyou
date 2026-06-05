import Image from "next/image";
import Link from "next/link";

type Product = {
  slug: string;
  name: string;
  shortDesc: string;
  priceUsd: number;
  stock: number;
  imageCard: string;
  category: string;
  specs?: string;
};

function listPriceFromSpecs(specs?: string): number | null {
  if (!specs) return null;
  try {
    const v = (JSON.parse(specs) as { listPriceUsd?: number }).listPriceUsd;
    return v && v > 0 ? v : null;
  } catch {
    return null;
  }
}

export function ProductCard({ product }: { product: Product }) {
  const inStock = product.stock > 0;
  const isQuote = product.priceUsd <= 0;
  const listPrice = listPriceFromSpecs(product.specs);

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
      <Link href={`/products/${product.slug}`} className="relative aspect-square">
        <Image
          src={product.imageCard}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 25vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-wide text-cyan-500">{product.category.replace(/-/g, " ")}</p>
        <h3 className="mt-1 font-semibold text-white">
          <Link href={`/products/${product.slug}`} className="hover:text-cyan-400">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm text-slate-400 line-clamp-2">{product.shortDesc}</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            {isQuote ? (
              <span className="font-semibold text-amber-400">Quote</span>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-white">${product.priceUsd.toFixed(2)}</span>
                {listPrice && (
                  <span className="text-sm text-slate-500 line-through">${listPrice.toFixed(2)}</span>
                )}
              </div>
            )}
            <p className={`text-xs ${inStock ? "text-emerald-400" : "text-red-400"}`}>
              {inStock ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 rounded-lg border border-slate-600 py-2 text-center text-sm font-medium text-slate-200 hover:border-cyan-500"
          >
            View details
          </Link>
          <Link
            href={`/contact?product=${product.slug}`}
            className="flex-1 rounded-lg bg-cyan-600 py-2 text-center text-sm font-medium text-white hover:bg-cyan-500"
          >
            {isQuote ? "Get quote" : "Request quote"}
          </Link>
        </div>
      </div>
    </article>
  );
}
