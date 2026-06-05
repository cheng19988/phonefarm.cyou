import Image from "next/image";
import Link from "next/link";
import { formatReferencePrice, typicalUseCase } from "@/lib/pricing";
import { isServiceCatalogItem, publicCategoryLabel } from "@/lib/catalog";

type Product = {
  slug: string;
  name: string;
  shortDesc: string;
  priceUsd: number;
  imageCard: string;
  category: string;
  specs?: string;
};

export function ProductCard({ product }: { product: Product }) {
  const useCase = typicalUseCase(product.specs);
  const service = isServiceCatalogItem(product.category);

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
        <p className="text-xs uppercase tracking-wide text-cyan-500">
          {publicCategoryLabel(product.category)}
        </p>
        <h3 className="mt-1 font-semibold text-white">
          <Link href={`/products/${product.slug}`} className="hover:text-cyan-400">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-slate-400 line-clamp-2">{product.shortDesc}</p>
        {!service && (
          <p className="mt-2 text-xs text-slate-400 line-clamp-2">
            <span className="text-slate-500">Typical configuration: </span>
            {useCase}
          </p>
        )}
        <div className="mt-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {service ? "Service quote" : "Reference price"}
          </p>
          <p className="text-lg font-bold text-white">
            {service && product.priceUsd <= 0
              ? "Custom quote"
              : formatReferencePrice(product.priceUsd)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {service
              ? "Configuration confirmed before invoice"
              : "Bulk quote available · availability confirmed by sales"}
          </p>
        </div>
        <div className="mt-3 flex gap-2">
          <Link
            href={`/contact?product=${product.slug}`}
            className="flex-1 rounded-lg bg-cyan-600 py-2 text-center text-sm font-medium text-white hover:bg-cyan-500"
          >
            Request quote
          </Link>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-300 hover:border-cyan-500"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
