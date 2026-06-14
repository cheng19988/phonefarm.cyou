/** Fail fast on Vercel build with clear errors (no secrets logged). */
const required = [
  "DATABASE_URL",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "SITE_URL",
  "USDT_TRC20_ADDRESS",
];

console.log(
  `[build-env] VERCEL=${process.env.VERCEL ?? "0"} VERCEL_ENV=${process.env.VERCEL_ENV ?? "local"} NODE_VERSION=${process.version}`
);
console.log(
  "[build-env] Required vars present:",
  required.map((k) => `${k}=${Boolean(process.env[k]?.trim())}`).join(", ")
);

const missing = required.filter((k) => !process.env[k]?.trim());
if (missing.length) {
  console.error("[build] Missing required environment variables:");
  missing.forEach((k) => console.error(`  - ${k}`));
  console.error(
    "[build] Add them in Vercel → Settings → Environment Variables → Production, then redeploy."
  );
  process.exit(1);
}

function isPostgresUrl(value) {
  return value.startsWith("postgresql://") || value.startsWith("postgres://");
}

const db = process.env.DATABASE_URL.trim();

if (db.startsWith("file:")) {
  console.error(
    "[build] DATABASE_URL is still SQLite (file:...). Replace with Neon connection string from console.neon.tech"
  );
  process.exit(1);
}

if (!isPostgresUrl(db)) {
  console.error("[build] DATABASE_URL must be a PostgreSQL URL (postgresql://...)");
  process.exit(1);
}

const direct = process.env.DIRECT_URL?.trim();
if (direct && !isPostgresUrl(direct)) {
  console.error("[build] DIRECT_URL must be a PostgreSQL URL (postgresql://...)");
  process.exit(1);
}

if (!direct) {
  console.warn(
    "[build] DIRECT_URL not set — build will use DATABASE_URL for Prisma migrate (OK if Neon direct URL)."
  );
}

console.log("[build] Environment check passed (Neon PostgreSQL URLs detected).");
