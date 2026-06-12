/** Reject open redirects — only same-site relative paths allowed. */
export function safeInternalPath(path: string | null | undefined, fallback = "/"): string {
  if (!path || typeof path !== "string") return fallback;
  const trimmed = path.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes(":")) {
    return fallback;
  }
  return trimmed;
}
