/**
 * Map synced real product filenames to catalog slugs.
 * Only maps when filename clearly matches (avoids wrong cross-brand assignments).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const realDir = path.join(root, "public/images/real-products");
const outFile = path.join(root, "src/lib/real-product-images.json");

/** slug -> required substrings (all must appear in filename) */
const RULES = [
  { slug: "samsung-s8-farm-4-64", must: ["box-phone-farm-s8-en", "main"] },
  { slug: "samsung-s9-plus-farm-6-64", must: ["box-phone-farm-s9-en", "main"] },
  { slug: "samsung-s10-farm-8-128", must: ["box-phone-farm-s10-en", "main"] },
  { slug: "samsung-s22-farm-8-128", must: ["box-phone-farm-s20-en", "main"] },
  { slug: "oneplus-8-pro-farm-12-256", must: ["oneplus-8-pro-en", "main"] },
  { slug: "oneplus-3-farm-6-64", must: ["oneplus-5-super-change", "main"] },
  { slug: "pixel-4a-farm-6-128", must: ["pixel-4xl"] },
];

function publicPath(rel) {
  return `/images/${rel.replace(/\\/g, "/")}`;
}

function matches(file, must) {
  const lower = file.toLowerCase();
  return must.every((part) => lower.includes(part.toLowerCase()));
}

if (!fs.existsSync(realDir)) {
  console.warn("[map] No real-products dir — run sync-local-assets.mjs first");
  fs.writeFileSync(outFile, "{}");
  process.exit(0);
}

const files = fs.readdirSync(realDir).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
const map = {};
const used = new Set();

for (const rule of RULES) {
  const hit = files.find((f) => !used.has(f) && matches(f, rule.must));
  if (hit) {
    used.add(hit);
    const url = publicPath(`real-products/${hit}`);
    map[rule.slug] = { card: url, hero: url, detail: url };
  }
}

fs.writeFileSync(outFile, JSON.stringify(map, null, 2) + "\n");
console.log(`[map] Mapped ${Object.keys(map).length} products (strict match)`);
for (const slug of Object.keys(map)) console.log(`  ${slug}`);
