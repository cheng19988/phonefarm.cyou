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

const PLACEHOLDER_SPEC = /^(see title|see product title|n\/a|tbd|unknown|—|-)$/i;

export function isDisplayableSpecValue(value?: string): boolean {
  if (!value?.trim()) return false;
  return !PLACEHOLDER_SPEC.test(value.trim());
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
    cpu: isDisplayableSpecValue(fromJson.CPU) ? fromJson.CPU : fromShort.cpu,
    ram: isDisplayableSpecValue(fromJson.RAM) ? fromJson.RAM : fromShort.ram,
    android: isDisplayableSpecValue(fromJson.Android) ? fromJson.Android : fromShort.android,
  };
}

export function buildPublicSpecTable(
  shortDesc: string,
  specsJson?: string,
  overrides?: Record<string, string>
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

  return overrides ? { ...table, ...overrides } : table;
}

export function typicalUseCase(specs?: string): string {
  const s = parseSpecs(specs);
  return s.recommendedWorkload || s.workload || "QA device lab · multi-device operations";
}
