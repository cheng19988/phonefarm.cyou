import { ALL_HARDWARE_CATALOG } from "./hardware-catalog";

export function resolveProductPrefill(slugOrLabel: string | undefined) {
  if (!slugOrLabel?.trim()) {
    return { slug: "", displayName: "" };
  }
  const trimmed = slugOrLabel.trim();
  const bySlug = ALL_HARDWARE_CATALOG.find((p) => p.slug === trimmed);
  if (bySlug) {
    return { slug: bySlug.slug, displayName: bySlug.name };
  }
  const byName = ALL_HARDWARE_CATALOG.find((p) => p.name.toLowerCase() === trimmed.toLowerCase());
  if (byName) {
    return { slug: byName.slug, displayName: byName.name };
  }
  return { slug: trimmed, displayName: trimmed };
}
