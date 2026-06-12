/** Public hostname policy — apex always redirects to www. */
export const ROOT_HOST = "phonefarm.cyou";
export const CANONICAL_HOST = "www.phonefarm.cyou";
export const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

export function isApexHost(host: string | null | undefined): boolean {
  if (!host) return false;
  return host.split(":")[0]?.toLowerCase() === ROOT_HOST;
}
