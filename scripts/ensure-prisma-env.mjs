/** Prisma schema uses DIRECT_URL; fall back to DATABASE_URL when unset (e.g. Vercel). */
export function getPrismaEnv() {
  const env = { ...process.env };
  if (!env.DIRECT_URL?.trim() && env.DATABASE_URL?.trim()) {
    env.DIRECT_URL = env.DATABASE_URL;
    console.warn(
      "[prisma] DIRECT_URL not set — using DATABASE_URL. For Neon, add a separate direct URL if migrate deploy fails."
    );
  }
  return env;
}
