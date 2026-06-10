import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import { resolveProductPurchase } from "@/lib/product-purchase";
import { AddToCartButton } from "./AddToCartButton";

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

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        {rules.quoteOnly ? (
          <>
            <Link href={inquiry} className="btn-primary">
              Request Quote for This Model
            </Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost-emerald">
              WhatsApp Sales
            </a>
          </>
        ) : (
          <>
            {rules.directPurchaseEnabled && priceUsd > 0 && (
              <AddToCartButton
                productId={productId}
                slug={slug}
                name={name}
                priceUsd={priceUsd}
                imageCard={imageCard}
                variant="primary"
                label="Add to Cart"
              />
            )}
            <Link href={inquiry} className="btn-secondary">
              Request Quote
            </Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost-emerald">
              WhatsApp Sales
            </a>
            {rules.directPurchaseEnabled && priceUsd > 0 && (
              <Link href={`/contact?product=${slug}&intent=sample`} className="link-accent self-center text-sm">
                Order sample via sales
              </Link>
            )}
          </>
        )}
      </div>
      <p className="text-sm text-slate-500">
        Reference price only. Sales confirms MOQ, lead time, shipping, and setup scope before bulk orders.
        {rules.directPurchaseEnabled && priceUsd > 0
          ? " Standard configurations may be ordered online with USDT TRC20."
          : ""}
      </p>
    </div>
  );
}
