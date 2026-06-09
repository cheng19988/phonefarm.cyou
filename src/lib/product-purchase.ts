import { isAccessoryCatalogItem, isServiceCatalogItem, normalizeCategorySlug } from "./catalog";

export type ProductType = "hardware" | "accessory" | "service" | "enterprise";

export type ProductPurchaseFields = {
  slug?: string;
  category: string;
  priceUsd: number;
  directPurchaseEnabled: boolean;
  quoteOnly: boolean;
  productType: string;
};

export function normalizeProductType(value: string, category: string): ProductType {
  const t = value.trim().toLowerCase();
  if (t === "hardware" || t === "accessory" || t === "service" || t === "enterprise") {
    return t;
  }
  if (normalizeCategorySlug(category) === "service-package") return "service";
  if (isAccessoryCatalogItem(category)) return "accessory";
  if (isServiceCatalogItem(category)) return "service";
  return "hardware";
}

/** Resolve storefront CTA rules from DB fields with category fallbacks. */
export function resolveProductPurchase(product: ProductPurchaseFields) {
  const productType = normalizeProductType(product.productType, product.category);
  const slug = product.slug ?? "";

  const quoteOnly =
    product.quoteOnly ||
    productType === "enterprise" ||
    slug === "package-enterprise-deploy" ||
    (product.priceUsd <= 0 && productType !== "service");

  const directPurchaseEnabled =
    !quoteOnly &&
    (product.directPurchaseEnabled ||
      productType === "hardware" ||
      productType === "accessory" ||
      (productType === "service" && product.priceUsd > 0));

  return { quoteOnly, directPurchaseEnabled, productType };
}

export function canAddToCart(product: ProductPurchaseFields): boolean {
  const rules = resolveProductPurchase(product);
  return rules.directPurchaseEnabled && product.priceUsd > 0;
}
