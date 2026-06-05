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

export function typicalUseCase(specs?: string): string {
  const s = parseSpecs(specs);
  return s.recommendedWorkload || s.workload || "QA device lab · multi-device operations";
}
