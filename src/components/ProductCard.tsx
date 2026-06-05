import Image from "next/image";
import Link from "next/link";
import { formatReferencePrice, parseSpecs, typicalUseCase } from "@/lib/pricing";

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
  const specs = parseSpecs(product.specs);
  const useCase = typicalUseCase(product.specs);

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
        <p className="mt-2 text-sm text-slate-400 line-clamp-2">{product.shortDesc}</p>
        <ul className="mt-2 space-y-0.5 text-xs text-slate-500">
          {specs.CPU && <li>CPU: {specs.CPU}</li>}
          {specs.RAM && <li>RAM / storage: {specs.RAM}</li>}
          {specs.Android && <li>Android: {specs.Android}</li>}
        </ul>
        <p className="mt-2 text-xs text-slate-400 line-clamp-2">
          <span className="text-slate-500">Typical configuration: </span>
          {useCase}
        </p>
        <div className="mt-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">From price</p>
          <p className="text-lg font-bold text-white">{formatReferencePrice(product.priceUsd)}</p>
        </div>
        <div className="mt-3 flex gap-2">
          <Link
            href={`/contact?product=${product.slug}`}
            className="flex-1 rounded-lg bg-cyan-600 py-2 text-center text-sm font-medium text-white hover:bg-cyan-500"
          >
            Request Quote
          </Link>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-300 hover:border-cyan-500"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
