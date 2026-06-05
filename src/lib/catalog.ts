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

/** Normalize legacy DB / seed category values to canonical slugs. */
export function normalizeCategorySlug(category: string): string {
  const normalized = category
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

  if (normalized === "mirrorvip" || normalized === "mirror-vip") return "mirror-vip";
  if (normalized === "controlsoftware" || normalized === "control-software") return "control-software";

  return normalized;
}

export function publicCategoryLabel(category: string): string {
  const slug = normalizeCategorySlug(category);
  if (PUBLIC_CATEGORY_LABELS[slug]) return PUBLIC_CATEGORY_LABELS[slug];

  const raw = category.trim().toLowerCase();
  if (
    raw.includes("mirror") &&
    (raw.includes("vip") || raw.includes("control") || raw.includes("software"))
  ) {
    return "Control software service";
  }
  if (raw.includes("control") && raw.includes("software")) {
    return "Control software service";
  }

  return slug.replace(/-/g, " ");
}

export function isServiceCatalogItem(category: string): boolean {
  const slug = normalizeCategorySlug(category);
  return slug === "mirror-vip" || slug === "control-software" || slug === "service-package";
}

export function isAccessoryCatalogItem(category: string): boolean {
  const slug = normalizeCategorySlug(category);
  return (
    slug === "motherboard-box" ||
    slug === "usb-hub" ||
    slug === "power-supply" ||
    slug === "cooling-solution" ||
    slug === "network-equipment"
  );
}

export function isControlSoftwareCategory(category: string): boolean {
  const slug = normalizeCategorySlug(category);
  return slug === "mirror-vip" || slug === "control-software";
}

export const CONTROL_SOFTWARE_SERVICES_SECTION = "Control software services";
