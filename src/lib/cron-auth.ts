/** Authorize Vercel cron (Bearer CRON_SECRET) or manual x-cron-secret header. */
export function isCronAuthorized(req: Request): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (process.env.NODE_ENV === "production" && !cronSecret) {
    return false;
  }
  if (!cronSecret) return true;

  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${cronSecret}`) return true;
  if (req.headers.get("x-cron-secret") === cronSecret) return true;

  return false;
}
