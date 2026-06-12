import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import { resolveProductPurchase } from "@/lib/product-purchase";
import { AddToCartButton } from "./AddToCartButton";
import { PUBLIC_CHECKOUT_ENABLED, PUBLIC_CART_IN_NAV } from "@/lib/features";

export function ProductActions({
  productId,
  slug,
  name,
  imageCard,
  priceUsd,
  directPurchaseEnabled,
  quoteOnly,
  productType,
  category,
}: {
  productId: string;
  slug: string;
  name: string;
  imageCard: string;
  priceUsd: number;
  directPurchaseEnabled: boolean;
  quoteOnly: boolean;
  productType: string;
  category: string;
}) {
  const rules = resolveProductPurchase({
    slug,
    category,
    priceUsd,
    directPurchaseEnabled,
    quoteOnly,
    productType,
  });
  const inquiry = `/contact?product=${encodeURIComponent(slug)}`;
  const wa = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(`Hi, I'd like a quote for ${name} (${slug}).`)}`;
  const quoteFirst = rules.quoteOnly || !PUBLIC_CART_IN_NAV;
  const canAddToCart =
    PUBLIC_CHECKOUT_ENABLED && rules.directPurchaseEnabled && priceUsd > 0 && !rules.quoteOnly;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        {quoteFirst ? (
          <>
            <Link href={inquiry} className="btn-primary">
              Request Quote for This Model
            </Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost-emerald">
              WhatsApp Sales
            </a>
            {canAddToCart && (
              <AddToCartButton
                productId={productId}
                slug={slug}
                name={name}
                priceUsd={priceUsd}
                imageCard={imageCard}
                variant="secondary"
                label="Add sales-confirmed SKU"
              />
            )}
          </>
        ) : (
          <>
            {canAddToCart && (
              <AddToCartButton
                productId={productId}
                slug={slug}
                name={name}
                priceUsd={priceUsd}
                imageCard={imageCard}
                variant="primary"
                label="Add sales-confirmed SKU"
              />
            )}
            <Link href={inquiry} className="btn-secondary">
              Request Quote
            </Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost-emerald">
              WhatsApp Sales
            </a>
            {canAddToCart && (
              <Link href={`/contact?product=${slug}&intent=sample`} className="link-accent self-center text-sm">
                Order sample via sales
              </Link>
            )}
          </>
        )}
      </div>
      <p className="text-sm text-slate-500">
        Reference price · final quote confirmed before payment. Request quotation for bulk, mixed brand lines, or
        export packing. Online checkout is for sales-confirmed standard SKUs only — not unconfirmed configurations.
      </p>
    </div>
  );
}
