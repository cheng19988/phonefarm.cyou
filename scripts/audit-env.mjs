import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const required = [
  "DATABASE_URL",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "SITE_URL",
  "USDT_TRC20_ADDRESS",
];

const optional = [
  "DIRECT_URL",
  "CRON_SECRET",
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_NOTIFY_CHAT_ID",
  "CONTACT_WEBHOOK_URL",
  "GOOGLE_SITE_VERIFICATION",
  "TRON_API_KEY",
];

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

function validate(key, val) {
  const issues = [];
  if (!val?.trim()) return { status: "MISSING", issues: ["empty or not set"] };
  const v = val.trim();
  if (key === "DATABASE_URL") {
    if (v.startsWith("file:")) issues.push("SQLite — need PostgreSQL (Neon)");
    else if (!v.startsWith("postgresql://") && !v.startsWith("postgres://"))
      issues.push("must be postgresql:// URL");
    else if (!v.includes("sslmode=")) issues.push("add sslmode=require for Neon");
  }
  if (key === "DIRECT_URL" && v) {
    if (!v.startsWith("postgresql://") && !v.startsWith("postgres://"))
      issues.push("must be postgresql:// URL");
  }
  if (key === "SITE_URL") {
    if (!v.startsWith("https://")) issues.push("should use https://");
    if (!v.includes("www.phonefarm.cyou"))
      issues.push("canonical should be https://www.phonefarm.cyou");
  }
  if (key === "USDT_TRC20_ADDRESS") {
    if (!v.startsWith("T") || v.length < 30) issues.push("TRC20 address format looks wrong");
  }
  if (key === "JWT_SECRET" && v.length < 16) issues.push("use 16+ random characters");
  if (key === "ADMIN_EMAIL" && !v.includes("@")) issues.push("invalid email");
  return { status: issues.length ? "WARN" : "OK", issues };
}

const root = path.resolve(import.meta.dirname, "..");
const env = {
  ...parseEnvFile(path.join(root, ".env")),
  ...parseEnvFile(path.join(root, ".env.local")),
};

console.log("=== Local env audit (values not printed) ===\n");

let fail = 0;
for (const k of required) {
  const r = validate(k, env[k]);
  console.log(`${k}: ${r.status}${r.issues.length ? " — " + r.issues.join("; ") : ""}`);
  if (r.status === "MISSING") fail++;
}

console.log("\n--- Optional ---");
for (const k of optional) {
  const v = env[k];
  if (!v?.trim()) {
    console.log(`${k}: not set`);
    continue;
  }
  const r = validate(k, v);
  console.log(`${k}: ${r.status}${r.issues.length ? " — " + r.issues.join("; ") : ""}`);
}

try {
  execSync("node scripts/check-build-env.mjs", { stdio: "pipe", env: { ...process.env, ...env } });
  console.log("\ncheck-build-env.mjs: PASSED");
} catch {
  console.log("\ncheck-build-env.mjs: FAILED (see missing required vars above)");
  fail++;
}

process.exit(fail > 0 ? 1 : 0);
