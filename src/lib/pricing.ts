import { buildPurchaseSpecRows } from "./purchase-specs";

/** Sitewide B2B price labeling — reference only until sales confirms proforma. */
export const REFERENCE_PRICE_LABEL = "Reference price";
export const FINAL_QUOTE_BEFORE_PAYMENT = "Final quote confirmed before payment";
export const REFERENCE_PRICE_DISCLAIMER = `${REFERENCE_PRICE_LABEL} · ${FINAL_QUOTE_BEFORE_PAYMENT}`;

export function formatReferencePrice(priceUsd: number): string {
  if (priceUsd <= 0) return "Bulk quote available";
  return `From $${priceUsd.toLocaleString("en-US")}`;
}

export function parseSpecs(specs?: string): Record<string, string> {
  if (!specs) return {};
  try {
    return JSON.parse(specs) as Record<string, string>;
  } catch {
    return {};
  }
}

const PLACEHOLDER_SPEC = /^(see\s*title|see\s*product\s*title|n\/a|tbd|unknown|—|-)$/i;

export function isDisplayableSpecValue(value?: string): boolean {
  if (!value?.trim()) return false;
  const normalized = value.trim();
  if (PLACEHOLDER_SPEC.test(normalized)) return false;
  if (/^see\s+title/i.test(normalized)) return false;
  return true;
}

function cleanHardwareSpec(value?: string): string | undefined {
  if (!isDisplayableSpecValue(value)) return undefined;
  return value!.trim();
}

/** shortDesc already shows CPU · RAM · Android — skip duplicate bullets on cards. */
export function shortDescIncludesHardwareSpecs(shortDesc: string): boolean {
  return /CPU:/i.test(shortDesc) && /\d+\s*G\s*\+\s*\d+\s*G/i.test(shortDesc) && /Android\s*[\d./]+/i.test(shortDesc);
}

/** Parse CPU / RAM / Android from catalog shortDesc lines. */
export function parseShortDescHardware(shortDesc: string): {
  cpu?: string;
  ram?: string;
  android?: string;
} {
  const cpuMatch = shortDesc.match(/CPU:\s*([^·]+)/i);
  const ramMatch = shortDesc.match(/(\d+\s*G\s*\+\s*\d+\s*G)/i);
  const androidMatch = shortDesc.match(/Android\s*[\d./]+/i);

  return {
    cpu: cpuMatch?.[1]?.trim(),
    ram: ramMatch?.[1]?.replace(/\s+/g, ""),
    android: androidMatch?.[0]?.trim(),
  };
}

export function productCardHardwareSpecs(product: { shortDesc: string; specs?: string }) {
  const fromShort = parseShortDescHardware(product.shortDesc);
  const fromJson = parseSpecs(product.specs);

  return {
    cpu: cleanHardwareSpec(isDisplayableSpecValue(fromJson.CPU) ? fromJson.CPU : fromShort.cpu),
    ram: cleanHardwareSpec(isDisplayableSpecValue(fromJson.RAM) ? fromJson.RAM : fromShort.ram),
    android: cleanHardwareSpec(
      isDisplayableSpecValue(fromJson.Android) ? fromJson.Android : fromShort.android
    ),
  };
}

export function hasProductCardHardwareSpecs(product: { shortDesc: string; specs?: string }): boolean {
  const { cpu, ram, android } = productCardHardwareSpecs(product);
  return Boolean(cpu || ram || android);
}

export function buildPublicSpecTable(
  shortDesc: string,
  specsJson?: string,
  overrides?: Record<string, string>,
  purchaseContext?: { category: string; productType?: string }
): Record<string, string> {
  const parsed = parseSpecs(specsJson);
  const hw = productCardHardwareSpecs({ shortDesc, specs: specsJson });
  const table: Record<string, string> = { ...parsed };

  if (hw.cpu) table.CPU = hw.cpu;
  if (hw.ram) table.RAM = hw.ram;
  if (hw.android) table.Android = hw.android;

  for (const [key, value] of Object.entries(table)) {
    if (!isDisplayableSpecValue(value)) delete table[key];
  }
  delete table.listPriceUsd;

  const merged = overrides ? { ...table, ...overrides } : table;
  if (purchaseContext) {
    const purchase = buildPurchaseSpecRows(purchaseContext.category, purchaseContext.productType);
    return { ...merged, ...purchase };
  }
  return merged;
}

export function typicalUseCase(specs?: string): string {
  const s = parseSpecs(specs);
  return s.recommendedWorkload || s.workload || "QA device lab · multi-device operations";
}
