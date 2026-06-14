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
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/paths";

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

export function ProductCard({ product, locale = "en" }: { product: Product; locale?: Locale }) {
  const useCase = typicalUseCase(product.specs);
  const service = isServiceCatalogItem(product.category);
  const { quoteOnly, directPurchaseEnabled } = resolveProductPurchase(product);
  const wa = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(`Hi, I'd like a bulk quote for ${product.name}.`)}`;
  const quoteFirst = quoteOnly || !PUBLIC_CART_IN_NAV;
  const canAddToCart =
    PUBLIC_CHECKOUT_ENABLED && directPurchaseEnabled && product.priceUsd > 0 && !quoteOnly;
  const productHref = localePath(locale, `/products/${product.slug}`);
  const contactHref = `${localePath(locale, "/contact")}?product=${product.slug}`;
  const quoteLabel = locale === "zh" ? "索取报价" : "Request Quote";
  const waLabel = locale === "zh" ? "WhatsApp 销售" : "WhatsApp Sales";
  const detailsLabel = locale === "zh" ? "查看详情" : "View details";
  const serviceQuoteLabel = locale === "zh" ? "服务询价" : "Service quote";
  const customQuoteLabel = locale === "zh" ? "定制报价" : "Custom quote";
  const refPriceLabel = locale === "zh" ? "参考价" : REFERENCE_PRICE_LABEL;
  const finalQuoteNote = locale === "zh" ? "付款前确认最终报价" : FINAL_QUOTE_BEFORE_PAYMENT;

  return (
    <article className="group card-premium flex flex-col overflow-hidden">
      <Link href={productHref} className="relative aspect-square overflow-hidden bg-slate-100">
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
          <Link href={productHref} className="hover:text-sky-700 transition">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">{product.shortDesc}</p>
        {!service && (
          <p className="mt-2 text-xs text-slate-500 line-clamp-1">{useCase}</p>
        )}
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {service && product.priceUsd <= 0 ? serviceQuoteLabel : refPriceLabel}
          </p>
          <p className="font-display text-2xl font-bold text-slate-900">
            {service && product.priceUsd <= 0 ? customQuoteLabel : formatReferencePrice(product.priceUsd)}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">{finalQuoteNote}</p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {quoteFirst ? (
            <>
              <Link href={contactHref} className="btn-primary w-full text-center text-sm !py-2.5">
                {quoteLabel}
              </Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost-emerald w-full text-center text-sm !py-2.5">
                {waLabel}
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
              <Link href={contactHref} className="btn-secondary w-full text-center text-sm !py-2.5">
                {quoteLabel}
              </Link>
              <Link href={productHref} className="btn-secondary w-full text-center text-sm !py-2.5">
                {detailsLabel}
              </Link>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
