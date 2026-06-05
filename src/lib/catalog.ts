/** Public-facing catalog labels — never show raw DB category slugs like mirror-vip. */
export const PUBLIC_CATEGORY_LABELS: Record<string, string> = {
  "samsung-box": "Samsung phone farm box",
  "oppo-box": "Oppo phone farm box",
  "xiaomi-box": "Xiaomi phone farm box",
  "oneplus-box": "OnePlus phone farm box",
  "pixel-box": "Pixel phone farm box",
  "motherboard-box": "Motherboard chassis",
  "usb-hub": "USB control accessory",
  "power-supply": "Power supply",
  "cooling-solution": "Cooling kit",
  "network-equipment": "Network equipment",
  "mirror-vip": "Control software service",
  "control-software": "Control software service",
  "service-package": "Setup service package",
};

export function publicCategoryLabel(category: string): string {
  return PUBLIC_CATEGORY_LABELS[category] ?? category.replace(/-/g, " ");
}

export function isServiceCatalogItem(category: string): boolean {
  return category === "mirror-vip" || category === "control-software" || category === "service-package";
}
