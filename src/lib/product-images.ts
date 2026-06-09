import realProductImages from "./real-product-images.json";

type ImageEntry = {
  card: string;
  hero: string;
  detail: string;
  gallery?: string[];
};

const map = realProductImages as Record<string, ImageEntry>;

export function getProductImageEntry(slug: string): ImageEntry | undefined {
  return map[slug];
}

export function getProductGallery(slug: string, fallback?: string): string[] {
  const entry = map[slug];
  if (entry?.gallery?.length) return entry.gallery;
  if (entry?.detail) return [entry.detail];
  if (fallback) return [fallback];
  return [];
}
