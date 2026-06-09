/**
 * Map product slugs to real product PNGs by box-phone-farm-* id in filename.
 * Fallback: chassis/box shots only (never office or service-scene art).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const realDir = path.join(root, "public/images/real-products");
const outFile = path.join(root, "src/lib/real-product-images.json");

const CHASSIS_FALLBACKS = [
  "/images/real-factory/box-shots/2025_10_25_11_21_IMG_0547.png",
  "/images/real-factory/box-shots/2025_10_25_11_24_IMG_0549.png",
  "/images/real-factory/box-shots/2025_10_25_11_27_IMG_0551.png",
  "/images/real-factory/box-shots/2025_10_25_11_28_IMG_0553.png",
  "/images/real-factory/box-shots/2025_10_25_11_33_IMG_0561.png",
  "/images/real-factory/box-shots/2025_10_25_11_37_IMG_0566.png",
  "/images/card_800x800/phonefarm.cyou-product-box-0f5501e1584de9a625d220f62951bc6d-d04df-card_800x800.webp",
  "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-24-img-0549-f696b-card_800x800.webp",
  "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-27-img-0551-a9b35-card_800x800.webp",
  "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-28-img-0553-47327-card_800x800.webp",
  "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-33-img-0561-db197-card_800x800.webp",
  "/images/hero_1600x900/phonefarm.cyou-product-box-2025-10-25-11-21-img-0547-4b35a-hero_1600x900.webp",
];

/** slug → box-phone-farm-* ids to match in filename (first match wins) */
const CATALOG = [
  { slug: "samsung-s8-farm-4-64", boxIds: ["box-phone-farm-s8-en"], fb: 0 },
  { slug: "samsung-s9-plus-farm-6-64", boxIds: ["box-phone-farm-s9-en"], fb: 1 },
  { slug: "samsung-s10-farm-8-128", boxIds: ["box-phone-farm-s10-en"], fb: 2 },
  { slug: "samsung-s22-farm-8-128", boxIds: ["box-phone-farm-s21-fe", "s21-fe", "s21fe"], fb: 3 },
  { slug: "oppo-find-x2-farm-8-128", boxIds: ["find-x2", "find_x2"], fb: 4 },
  { slug: "oppo-find-x2-pro-farm-12-256", boxIds: ["find-x2-pro", "find_x2_pro"], fb: 5 },
  { slug: "oppo-find-x3-neo-farm-8-128", boxIds: ["find-x3", "find_x3"], fb: 6 },
  { slug: "oppo-reno5-pro-farm-8-128", boxIds: ["reno5", "reno_5"], fb: 7 },
  { slug: "xiaomi-6x-a2-farm-4-64", boxIds: ["xiaomi-6x", "a2-farm"], fb: 0 },
  { slug: "xiaomi-8se-farm-6-64", boxIds: ["8se", "xiaomi-8se"], fb: 1 },
  { slug: "xiaomi-mix-2-farm-6-64", boxIds: ["mix-2", "mix_2"], fb: 2 },
  { slug: "xiaomi-8-farm-8-128", boxIds: ["xiaomi-8", "xiaomi_8"], fb: 3 },
  { slug: "oneplus-3-farm-6-64", boxIds: ["oneplus-3", "box-phone-farm-oneplus-3"], fb: 4 },
  { slug: "oneplus-8-pro-farm-12-256", boxIds: ["oneplus-8-pro-en", "oneplus_8_pro"], fb: 5 },
  { slug: "oneplus-9-pro-farm-8-128", boxIds: ["oneplus-9", "oneplus_9"], fb: 6 },
  { slug: "oneplus-11-farm-16-256", boxIds: ["oneplus-11", "oneplus_11"], fb: 7 },
  { slug: "pixel-4a-farm-6-128", boxIds: ["pixel-4xl", "pixel_4xl"], fb: 0 },
  { slug: "pixel-5-farm-8-128", boxIds: ["pixel-5", "pixel_5"], fb: 1 },
  { slug: "pixel-6-farm-8-128", boxIds: ["pixel-6", "pixel_6"], fb: 2 },
  { slug: "pixel-7-pro-farm-12-128", boxIds: ["pixel-7", "pixel_7"], fb: 3 },
  { slug: "motherboard-box-20-slot", boxIds: ["motherboard", "20-slot"], fb: 8 },
  { slug: "industrial-usb-hub-20-port", boxIds: ["usb-hub", "usb_hub"], fb: 9 },
  { slug: "adaptive-power-supply-550w", boxIds: ["power-supply", "550w"], fb: 10 },
  { slug: "quad-fan-cooling-kit", boxIds: ["cooling", "fan-kit"], fb: 11 },
  { slug: "gigabit-farm-network-kit", boxIds: ["network-kit", "network"], fb: 0 },
  { slug: "mirror-setup-basic-renewal", boxIds: [], fb: 1 },
  { slug: "mirror-setup-cloud-bridge", boxIds: [], fb: 2 },
  { slug: "mirror-setup-annual-pro", boxIds: [], fb: 3 },
  { slug: "group-control-onboarding", boxIds: [], fb: 4 },
  { slug: "package-starter-setup", boxIds: [], fb: 5 },
  { slug: "package-studio-pro", boxIds: [], fb: 6 },
  { slug: "package-enterprise-deploy", boxIds: [], fb: 7 },
];

function publicPath(rel) {
  return `/images/${rel.replace(/\\/g, "/")}`;
}

function scoreFile(file, boxIds) {
  const lower = file.toLowerCase();
  let score = 0;
  for (const id of boxIds) {
    if (lower.includes(id.toLowerCase())) score += 20;
  }
  if (lower.includes("en_main") || lower.includes("_en_main")) score += 12;
  if (lower.includes("main_box")) score += 6;
  if (lower.includes("gallery")) score -= 8;
  if (lower.includes("change") && !boxIds.some((id) => id.includes("change"))) score -= 4;
  if (lower.includes("structure")) score -= 6;
  return score;
}

function bestMatch(files, boxIds) {
  if (!boxIds.length) return null;
  let best = null;
  let bestScore = 0;
  for (const file of files) {
    const s = scoreFile(file, boxIds);
    if (s > bestScore) {
      bestScore = s;
      best = file;
    }
  }
  return bestScore >= 20 ? best : null;
}

const files = fs.existsSync(realDir)
  ? fs.readdirSync(realDir).filter((f) => /\.(png|jpg|jpeg)$/i.test(f))
  : [];

const map = {};
let matched = 0;
let fallback = 0;

for (const item of CATALOG) {
  const hit = bestMatch(files, item.boxIds);
  let url;
  if (hit) {
    url = publicPath(`real-products/${hit}`);
    matched++;
  } else {
    url = CHASSIS_FALLBACKS[item.fb % CHASSIS_FALLBACKS.length];
    fallback++;
  }
  map[item.slug] = { card: url, hero: url, detail: url };
}

fs.writeFileSync(outFile, JSON.stringify(map, null, 2) + "\n");
console.log(`[map] ${Object.keys(map).length} slugs — ${matched} model match, ${fallback} chassis fallback`);
