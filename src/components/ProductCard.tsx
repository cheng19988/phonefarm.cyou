import Image from "next/image";
import Link from "next/link";
import { formatReferencePrice, typicalUseCase } from "@/lib/pricing";
import { isServiceCatalogItem, publicCategoryLabel } from "@/lib/catalog";
import { resolveProductPurchase } from "@/lib/product-purchase";
import { AddToCartButton } from "./AddToCartButton";
import { CONTACT } from "@/lib/constants";

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

export function ProductCard({ product }: { product: Product }) {
  const useCase = typicalUseCase(product.specs);
  const service = isServiceCatalogItem(product.category);
  const { quoteOnly, directPurchaseEnabled } = resolveProductPurchase(product);
  const wa = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(`Hi, I'd like a bulk quote for ${product.name}.`)}`;

  return (
    <article className="group card-premium flex flex-col overflow-hidden">
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden">
        <Image
          src={product.imageCard}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
        <span className="absolute left-3 top-3 rounded-md bg-slate-950/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan-400 backdrop-blur-sm">
          {publicCategoryLabel(product.category)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-snug text-white">
          <Link href={`/products/${product.slug}`} className="hover:text-cyan-400 transition">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-slate-400 line-clamp-2 leading-relaxed">{product.shortDesc}</p>
        {!service && (
          <p className="mt-2 text-xs text-slate-500 line-clamp-1">{useCase}</p>
        )}
        <div className="mt-4 border-t border-white/5 pt-4">
          <p className="font-display text-2xl font-bold text-white">
            {service && product.priceUsd <= 0 ? "Custom quote" : formatReferencePrice(product.priceUsd)}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {service ? "Quote before invoice" : "Bulk quote available"}
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {quoteOnly ? (
            <>
              <Link href={`/contact?product=${product.slug}`} className="btn-primary w-full text-center text-sm !py-2.5">
                Request Quote
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-emerald w-full text-center text-sm !py-2.5"
              >
                WhatsApp Sales
              </a>
            </>
          ) : (
            <>
              {directPurchaseEnabled && product.priceUsd > 0 && (
                <AddToCartButton
                  productId={product.id}
                  slug={product.slug}
                  name={product.name}
                  priceUsd={product.priceUsd}
                  imageCard={product.imageCard}
                  variant="primary"
                  label="Add to Cart"
                  fullWidth
                />
              )}
              <Link
                href={`/products/${product.slug}`}
                className="btn-secondary w-full text-center text-sm !py-2.5"
              >
                View details
              </Link>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
