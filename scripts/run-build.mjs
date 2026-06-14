import { execSync } from "child_process";
import { getPrismaEnv } from "./ensure-prisma-env.mjs";

function run(command, env, label) {
  console.log(`[build] >>> ${label}`);
  execSync(command, { stdio: "inherit", env });
  console.log(`[build] <<< ${label} OK`);
}

console.log(`[build] Starting (VERCEL=${process.env.VERCEL ?? "0"}, VERCEL_ENV=${process.env.VERCEL_ENV ?? "local"})`);

execSync("node scripts/check-build-env.mjs", { stdio: "inherit" });

const env = getPrismaEnv();

run("prisma generate", env, "prisma generate");
run("npx tsx scripts/generate-ai-files.ts", env, "generate-ai-files");

const migrateEnv = { ...env };
const directUrl = migrateEnv.DIRECT_URL?.trim();
if (directUrl) {
  migrateEnv.DATABASE_URL = directUrl;
  console.log("[build] prisma migrate deploy will use DIRECT_URL");
}

try {
  run("prisma migrate deploy", migrateEnv, "prisma migrate deploy");
} catch (error) {
  console.error("[build] prisma migrate deploy failed.");
  if (!process.env.VERCEL) throw error;
  console.warn("[build] Continuing on Vercel — migrations may already be applied.");
}

if (process.env.SKIP_DB_SEED === "1") {
  console.warn("[build] SKIP_DB_SEED=1 — skipping prisma db seed");
} else {
  try {
    run("prisma db seed", env, "prisma db seed");
  } catch (error) {
    console.error("[build] prisma db seed failed.");
    if (!process.env.VERCEL) throw error;
    console.warn("[build] Continuing on Vercel — product catalog may already exist.");
  }
}

run("next build", env, "next build");

console.log("[build] All steps completed successfully.");
