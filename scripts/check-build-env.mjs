/** Fail fast on Vercel build with clear errors (no secrets logged). */
const required = [
  "DATABASE_URL",
  "DIRECT_URL",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "SITE_URL",
  "USDT_TRC20_ADDRESS",
];

const missing = required.filter((k) => !process.env[k]?.trim());
if (missing.length) {
  console.error("[build] Missing required environment variables:");
  missing.forEach((k) => console.error(`  - ${k}`));
  console.error("[build] Add them in Vercel → Settings → Environment Variables → Production, then redeploy.");
  process.exit(1);
}

function isPostgresUrl(value) {
  return value.startsWith("postgresql://") || value.startsWith("postgres://");
}

const db = process.env.DATABASE_URL.trim();
const direct = process.env.DIRECT_URL.trim();

if (db.startsWith("file:")) {
  console.error(
    "[build] DATABASE_URL is still SQLite (file:...). Replace with Neon Pooled connection string from console.neon.tech"
  );
  process.exit(1);
}

if (!isPostgresUrl(db)) {
  console.error("[build] DATABASE_URL must be a PostgreSQL URL (postgresql://...)");
  process.exit(1);
}

if (!isPostgresUrl(direct)) {
  console.error("[build] DIRECT_URL must be a PostgreSQL URL (postgresql://...)");
  process.exit(1);
}

console.log("[build] Environment check passed (Neon PostgreSQL URLs detected).");
