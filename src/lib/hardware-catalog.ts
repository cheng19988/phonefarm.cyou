/**
 * Hardware SKUs: image-derived (material library) + reference Oppo/Xiaomi/Pixel without PNGs yet.
 */
import imageDerived from "./image-derived-catalog.json";

export type HardwareCatalogItem = {
  slug: string;
  name: string;
  category: string;
  shortDesc: string;
  priceUsd: number;
  stock: number;
  productType?: "hardware";
  directPurchaseEnabled?: boolean;
  quoteOnly?: boolean;
};

/** Parsed from D:\产品商品详情图 filenames */
export const IMAGE_DERIVED_HARDWARE: HardwareCatalogItem[] = imageDerived as HardwareCatalogItem[];

/** Oppo / Xiaomi / Pixel / OnePlus lines without product_ PNG in library yet — chassis image at seed */
export const REFERENCE_HARDWARE_WITHOUT_IMAGES: HardwareCatalogItem[] = [
  { slug: "oppo-find-x2-farm-8-128", name: "OPPO Find X2 Farm 8+128", category: "oppo-box", shortDesc: "CPU: Snapdragon 865 · 8G+128G · Android 13", priceUsd: 1050, stock: 6 },
  { slug: "oppo-find-x2-pro-farm-12-256", name: "OPPO Find X2 Pro Farm 12+256", category: "oppo-box", shortDesc: "CPU: Snapdragon 865 · 12G+256G · Android 13", priceUsd: 1400, stock: 4 },
  { slug: "oppo-find-x3-neo-farm-8-128", name: "OPPO Find X3 Neo Farm 8+128", category: "oppo-box", shortDesc: "CPU: Snapdragon 888 · 8G+128G · Android 13", priceUsd: 1270, stock: 5 },
  { slug: "oppo-reno5-pro-farm-8-128", name: "OPPO Reno5 Pro Farm 8+128", category: "oppo-box", shortDesc: "CPU: Dimensity 1000+ · 8G+128G · Android 13", priceUsd: 1050, stock: 6 },
  { slug: "xiaomi-6x-a2-farm-4-64", name: "Xiaomi 6X/A2 Farm 4+64", category: "xiaomi-box", shortDesc: "CPU: Snapdragon 660 · 4G+64G · Android 10", priceUsd: 550, stock: 10 },
  { slug: "xiaomi-8se-farm-6-64", name: "Xiaomi 8SE Farm 6+64", category: "xiaomi-box", shortDesc: "CPU: Snapdragon 710 · 6G+64G · Android 10", priceUsd: 980, stock: 7 },
  { slug: "xiaomi-mix-2-farm-6-64", name: "Xiaomi MIX 2 Farm 6+64", category: "xiaomi-box", shortDesc: "CPU: Snapdragon 835 · 6G+64G · Android 10", priceUsd: 670, stock: 8 },
  { slug: "xiaomi-8-farm-8-128", name: "Xiaomi 8 Farm 8+128", category: "xiaomi-box", shortDesc: "CPU: Snapdragon 845 · 8G+128G · Android 10", priceUsd: 940, stock: 7 },
  { slug: "oneplus-3-farm-6-64", name: "OnePlus 3 Farm 6+64", category: "oneplus-box", shortDesc: "CPU: Snapdragon 820 · 6G+64G · Android 8", priceUsd: 630, stock: 9 },
  { slug: "oneplus-9-pro-farm-8-128", name: "OnePlus 9 Pro Farm 8+128", category: "oneplus-box", shortDesc: "CPU: Snapdragon 888 · 8G+128G · Android 14", priceUsd: 1300, stock: 5 },
  { slug: "oneplus-11-farm-16-256", name: "OnePlus 11 Farm 16+256", category: "oneplus-box", shortDesc: "CPU: Snapdragon 8 Gen 2 · 12G+256G · Android 15", priceUsd: 2050, stock: 3 },
  { slug: "pixel-4a-farm-6-128", name: "Pixel 4a Farm 6+128", category: "pixel-box", shortDesc: "CPU: Adreno 618 class · 6G+128G · Android 13", priceUsd: 1130, stock: 5 },
  { slug: "pixel-5-farm-8-128", name: "Pixel 5 Farm 8+128", category: "pixel-box", shortDesc: "CPU: Snapdragon 765 · 8G+128G · Android 13", priceUsd: 1280, stock: 5 },
  { slug: "pixel-6-farm-8-128", name: "Pixel 6 Farm 8+128", category: "pixel-box", shortDesc: "CPU: Google Tensor · 8G+128G · Android 16", priceUsd: 1860, stock: 4 },
  { slug: "pixel-7-pro-farm-12-128", name: "Pixel 7 Pro Farm 12+128", category: "pixel-box", shortDesc: "CPU: Google Tensor · 8G+128G · Android 16", priceUsd: 2540, stock: 2 },
];

function mergeHardware(): HardwareCatalogItem[] {
  const map = new Map<string, HardwareCatalogItem>();
  for (const p of REFERENCE_HARDWARE_WITHOUT_IMAGES) map.set(p.slug, p);
  for (const p of IMAGE_DERIVED_HARDWARE) map.set(p.slug, p);
  return [...map.values()];
}

export const ALL_HARDWARE_CATALOG = mergeHardware();
