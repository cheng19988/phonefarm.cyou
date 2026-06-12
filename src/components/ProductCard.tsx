import Image from "next/image";
import Link from "next/link";
import {
  FINAL_QUOTE_BEFORE_PAYMENT,
  formatReferencePrice,
  REFERENCE_PRICE_LABEL,
  typicalUseCase,
} from "@/lib/pricing";
import { isServiceCatalogItem, publicCategoryLabel } from "@/lib/catalog";
import { resolveProductPurchase } from "@/lib/product-purchase";
import { AddToCartButton } from "./AddToCartButton";
import { CONTACT } from "@/lib/constants";
import { PUBLIC_CHECKOUT_ENABLED, PUBLIC_CART_IN_NAV } from "@/lib/features";

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
  const quoteFirst = quoteOnly || !PUBLIC_CART_IN_NAV;
  const canAddToCart =
    PUBLIC_CHECKOUT_ENABLED && directPurchaseEnabled && product.priceUsd > 0 && !quoteOnly;

  return (
    <article className="group card-premium flex flex-col overflow-hidden">
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-slate-100">
        <Image
          src={product.imageCard}
          alt={product.name}
          fill
          className="object-contain p-2 transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width:768px) 100vw, 25vw"
        />
        <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-700 shadow-sm">
          {publicCategoryLabel(product.category)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-snug text-slate-900">
          <Link href={`/products/${product.slug}`} className="hover:text-sky-700 transition">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">{product.shortDesc}</p>
        {!service && (
          <p className="mt-2 text-xs text-slate-500 line-clamp-1">{useCase}</p>
        )}
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {service && product.priceUsd <= 0 ? "Service quote" : REFERENCE_PRICE_LABEL}
          </p>
          <p className="font-display text-2xl font-bold text-slate-900">
            {service && product.priceUsd <= 0 ? "Custom quote" : formatReferencePrice(product.priceUsd)}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">{FINAL_QUOTE_BEFORE_PAYMENT}</p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {quoteFirst ? (
            <>
              <Link href={`/contact?product=${product.slug}`} className="btn-primary w-full text-center text-sm !py-2.5">
                Request Quote
              </Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost-emerald w-full text-center text-sm !py-2.5">
                WhatsApp Sales
              </a>
              {canAddToCart && (
                <AddToCartButton
                  productId={product.id}
                  slug={product.slug}
                  name={product.name}
                  priceUsd={product.priceUsd}
                  imageCard={product.imageCard}
                  variant="secondary"
                  label="Add sales-confirmed SKU"
                  fullWidth
                />
              )}
            </>
          ) : (
            <>
              {canAddToCart && (
                <AddToCartButton
                  productId={product.id}
                  slug={product.slug}
                  name={product.name}
                  priceUsd={product.priceUsd}
                  imageCard={product.imageCard}
                  variant="primary"
                  label="Add sales-confirmed SKU"
                  fullWidth
                />
              )}
              <Link href={`/contact?product=${product.slug}`} className="btn-secondary w-full text-center text-sm !py-2.5">
                Request Quote
              </Link>
              <Link href={`/products/${product.slug}`} className="btn-secondary w-full text-center text-sm !py-2.5">
                View details
              </Link>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
