/**
 * Copy real photos from user local drives (paths in local-asset-paths.json).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pathsFile = path.join(__dirname, "local-asset-paths.json");
const destRoot = path.join(root, "public/images");
const realProducts = path.join(destRoot, "real-products");
const slidesDir = path.join(destRoot, "real-factory/slides");
const photosDir = path.join(destRoot, "real-factory/photos");
const boxShotsDir = path.join(destRoot, "real-factory/box-shots");

const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function safeName(name) {
  return name.replace(/[^\w.\-]/g, "_");
}

function copyFiltered(source, dest, { skipSubstrings = [] } = {}) {
  if (!fs.existsSync(source)) {
    console.warn(`[skip] missing: ${source}`);
    return 0;
  }
  ensureDir(dest);
  let count = 0;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (skipSubstrings.some((s) => full.includes(s))) continue;
        walk(full);
        continue;
      }
      const ext = path.extname(entry.name).toLowerCase();
      if (!IMG_EXT.has(ext)) continue;
      fs.copyFileSync(full, path.join(dest, safeName(entry.name)));
      count++;
    }
  };
  walk(source);
  return count;
}

const cfg = JSON.parse(fs.readFileSync(pathsFile, "utf8"));

ensureDir(realProducts);
ensureDir(slidesDir);
ensureDir(photosDir);
ensureDir(boxShotsDir);

let n1 = 0;
if (fs.existsSync(cfg.productDetails)) {
  for (const file of fs.readdirSync(cfg.productDetails)) {
    const lower = file.toLowerCase();
    if (!lower.startsWith("product_") || !IMG_EXT.has(path.extname(lower))) continue;
    fs.copyFileSync(path.join(cfg.productDetails, file), path.join(realProducts, safeName(file)));
    n1++;
  }
}
const n2 = copyFiltered(cfg.promoPhotos, photosDir);

let n3 = 0;
if (fs.existsSync(cfg.slides)) {
  const slides = fs
    .readdirSync(cfg.slides)
    .filter((f) => f.toLowerCase().endsWith(".png"))
    .sort();
  slides.forEach((file, i) => {
    fs.copyFileSync(path.join(cfg.slides, file), path.join(slidesDir, `slide-${String(i + 1).padStart(2, "0")}.png`));
    n3++;
  });
}

const n4 = copyFiltered(cfg.boxShotsRoot, boxShotsDir, { skipSubstrings: ["演示文稿"] });

console.log("Local assets synced:");
console.log(`  product details: ${n1} -> real-products/`);
console.log(`  promo photos:    ${n2} -> real-factory/photos/`);
console.log(`  slides:          ${n3} -> real-factory/slides/`);
console.log(`  box PNG shots:   ${n4} -> real-factory/box-shots/`);
