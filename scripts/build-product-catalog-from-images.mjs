/**
 * Scan product detail PNGs/JPGs, parse model + RAM/storage from filenames,
 * emit image-derived catalog + real-product-images.json (card/hero/detail + gallery).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const realDir = path.join(root, "public/images/real-products");
const pathsFile = path.join(__dirname, "local-asset-paths.json");
const catalogOut = path.join(root, "src/lib/image-derived-catalog.json");
const imagesOut = path.join(root, "src/lib/real-product-images.json");

/** box-phone-farm token → catalog slug */
const SLUG_BY_BOX_ID = {
  "a908n": "samsung-a908n-farm-6-128",
  "s8-en": "samsung-s8-farm-4-64",
  "s8-change-en": "samsung-s8-change-farm-2026",
  "s8-change-id": "samsung-s8-change-farm-2026",
  "s8-super-change-en": "samsung-s8-super-change-farm",
  "s9-en": "samsung-s9-farm-6-64",
  "s10-en": "samsung-s10-farm-8-128",
  "s10-change-en": "samsung-s10-change-farm-2026",
  "s20-en": "samsung-s20-farm-8-128",
  "s21-fe-en": "samsung-s21-fe-farm-6-128",
  "note-8-en": "samsung-note-8-farm-6-64",
  "note-8-super-change-en": "samsung-note-8-super-change-farm",
  "note-9-en": "samsung-note-9-farm-6-128",
  "note-10-lite-change": "samsung-note-10-lite-change-farm",
  "note-20-en": "samsung-note-20-farm-8-256",
  "note-20": "samsung-note-20-farm-8-256",
  "note-8-en": "samsung-note-8-farm-6-64",
  "note-8": "samsung-note-8-farm-6-64",
  "note-9-en": "samsung-note-9-farm-6-128",
  "note-9": "samsung-note-9-farm-6-128",
  "nubia-z17-en": "nubia-z17-farm-6-64",
  "nubia-z17": "nubia-z17-farm-6-64",
  "oneplus-5-super-change-en": "oneplus-5-super-change-farm-6-64",
  "oneplus-5-super-change": "oneplus-5-super-change-farm-6-64",
  "oneplus-8-pro-en": "oneplus-8-pro-farm-8-128",
  "oneplus-8-pro": "oneplus-8-pro-farm-8-128",
  "s10-change-en": "samsung-s10-change-farm-2026",
  "s10-change": "samsung-s10-change-farm-2026",
  "s10-en": "samsung-s10-farm-8-128",
  "s10": "samsung-s10-farm-8-128",
  "s20-en": "samsung-s20-farm-8-128",
  "s20": "samsung-s20-farm-8-128",
  "s21-fe-en": "samsung-s21-fe-farm-6-128",
  "s21-fe": "samsung-s21-fe-farm-6-128",
  "s8-change-en": "samsung-s8-change-farm-2026",
  "s8-change": "samsung-s8-change-farm-2026",
  "s8-en": "samsung-s8-farm-4-64",
  "s8": "samsung-s8-farm-4-64",
  "s8-super-change-en": "samsung-s8-super-change-farm",
  "s8-super-change": "samsung-s8-super-change-farm",
  "s9-en": "samsung-s9-farm-6-64",
  "s9": "samsung-s9-farm-6-64",
  "z-flip3-en": "samsung-z-flip3-farm-8-128",
  "z-flip3": "samsung-z-flip3-farm-8-128",
  "z-flip4-en": "samsung-z-flip4-farm-8-128",
  "z-flip4": "samsung-z-flip4-farm-8-128",
  "a908n-en": "samsung-a908n-farm-6-128",
  "a908n": "samsung-a908n-farm-6-128",
  "pixel-4xl-super-change": "pixel-4xl-super-change-farm-6-128",
  "z-flip3-en": "samsung-z-flip3-farm-8-128",
  "z-flip4-en": "samsung-z-flip4-farm-8-128",
  "nubia-z17-en": "nubia-z17-farm-6-64",
  "oneplus-5-super-change-en": "oneplus-5-super-change-farm-6-64",
  "oneplus-8-pro-en": "oneplus-8-pro-farm-8-128",
  "pixel-4xl-super-change": "pixel-4xl-super-change-farm-6-128",
  "s8-id": "samsung-s8-farm-4-64",
};

const PRODUCT_META = {
  "samsung-s8-farm-4-64": {
    name: "SAMSUNG S8 Farm 4+64",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 835 / Exynos 8895 · 4G+64G · Android 9",
    priceUsd: 550,
    stock: 14,
    cpu: "Snapdragon 835 / Exynos 8895",
    android: "Android 9",
  },
  "samsung-s8-change-farm-2026": {
    name: "SAMSUNG S8 Change Farm 4+64 (2026 Gen)",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 835 / Exynos 8895 · 4G+64G · Android 9 · 2026 change generation",
    priceUsd: 580,
    stock: 10,
    cpu: "Snapdragon 835 / Exynos 8895",
    android: "Android 9",
  },
  "samsung-s8-super-change-farm": {
    name: "SAMSUNG S8 Super Change Farm 4+64",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 835 / Exynos 8895 · 4G+64G · Android 9 · Super Change USB/LAN/OTG",
    priceUsd: 600,
    stock: 8,
    cpu: "Snapdragon 835 / Exynos 8895",
    android: "Android 9",
  },
  "samsung-s9-farm-6-64": {
    name: "SAMSUNG S9 Farm 6+64",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 845 / Exynos 9810 · 6G+64G · Android 10",
    priceUsd: 680,
    stock: 12,
    cpu: "Snapdragon 845 / Exynos 9810",
    android: "Android 10",
  },
  "samsung-s9-plus-farm-6-64": {
    name: "SAMSUNG S9+ Farm 6+64",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 845 / Exynos 9810 · 6G+64G · Android 10",
    priceUsd: 700,
    stock: 10,
    cpu: "Snapdragon 845 / Exynos 9810",
    android: "Android 10",
  },
  "samsung-s10-farm-8-128": {
    name: "SAMSUNG S10 Farm 8+128",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 855 / Exynos 9820 · 8G+128G · Android 11/12",
    priceUsd: 930,
    stock: 9,
    cpu: "Snapdragon 855 / Exynos 9820",
    android: "Android 11/12",
  },
  "samsung-s10-change-farm-2026": {
    name: "SAMSUNG S10 Change Farm 8+128 (2026 Gen)",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 855 / Exynos 9820 · 8G+128G · Android 11/12 · 2026 change generation",
    priceUsd: 960,
    stock: 7,
    cpu: "Snapdragon 855 / Exynos 9820",
    android: "Android 11/12",
  },
  "samsung-s20-farm-8-128": {
    name: "SAMSUNG S20 Farm 8+128",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 865 / Exynos 990 · 8G+128G · Android 13",
    priceUsd: 1200,
    stock: 6,
    cpu: "Snapdragon 865 / Exynos 990",
    android: "Android 13",
  },
  "samsung-s21-fe-farm-6-128": {
    name: "SAMSUNG S21 FE Farm 6+128",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 888 / Exynos 2100 · 6G+128G · Android 14",
    priceUsd: 1150,
    stock: 6,
    cpu: "Snapdragon 888 / Exynos 2100",
    android: "Android 14",
  },
  "samsung-s22-farm-8-128": {
    name: "SAMSUNG S22 Farm 8+128",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 8 Gen1 · 8G+128G · Android 14",
    priceUsd: 1500,
    stock: 5,
    cpu: "Snapdragon 8 Gen1",
    android: "Android 14",
  },
  "samsung-note-8-farm-6-64": {
    name: "SAMSUNG Note 8 Farm 6+64",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 835 / Exynos 8895 · 6G+64G · Android 9",
    priceUsd: 580,
    stock: 8,
    cpu: "Snapdragon 835 / Exynos 8895",
    android: "Android 9",
  },
  "samsung-note-8-super-change-farm": {
    name: "SAMSUNG Note 8 Super Change Farm 6+64",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 835 / Exynos 8895 · 6G+64G · Android 9 · Super Change",
    priceUsd: 610,
    stock: 6,
    cpu: "Snapdragon 835 / Exynos 8895",
    android: "Android 9",
  },
  "samsung-note-9-farm-6-128": {
    name: "SAMSUNG Note 9 Farm 6+128",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 845 / Exynos 9810 · 6G+128G · Android 10",
    priceUsd: 720,
    stock: 7,
    cpu: "Snapdragon 845 / Exynos 9810",
    android: "Android 10",
  },
  "samsung-note-10-lite-change-farm": {
    name: "SAMSUNG Note 10 Lite Change Farm 6+128",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 855 · 6G+128G · Android 12 · Change generation",
    priceUsd: 850,
    stock: 5,
    cpu: "Snapdragon 855",
    android: "Android 12",
  },
  "samsung-note-20-farm-8-256": {
    name: "SAMSUNG Note 20 Farm 8+256",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 865+ / Exynos 990 · 8G+256G · Android 13",
    priceUsd: 1380,
    stock: 4,
    cpu: "Snapdragon 865+ / Exynos 990",
    android: "Android 13",
  },
  "samsung-z-flip3-farm-8-128": {
    name: "SAMSUNG Z Flip3 Farm 8+128",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 888 · 8G+128G · Android 14",
    priceUsd: 1450,
    stock: 4,
    cpu: "Snapdragon 888",
    android: "Android 14",
  },
  "samsung-z-flip4-farm-8-128": {
    name: "SAMSUNG Z Flip4 Farm 8+128",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 8+ Gen1 · 8G+128G · Android 14",
    priceUsd: 1580,
    stock: 3,
    cpu: "Snapdragon 8+ Gen1",
    android: "Android 14",
  },
  "samsung-a908n-farm-6-128": {
    name: "SAMSUNG A908N Farm 6+128",
    category: "samsung-box",
    shortDesc: "CPU: Snapdragon 855 · 6G+128G · Android 12",
    priceUsd: 820,
    stock: 6,
    cpu: "Snapdragon 855",
    android: "Android 12",
  },
  "nubia-z17-farm-6-64": {
    name: "Nubia Z17 Farm 6+64",
    category: "xiaomi-box",
    shortDesc: "CPU: Snapdragon 835 · 6G+64G · Android 9",
    priceUsd: 620,
    stock: 6,
    cpu: "Snapdragon 835",
    android: "Android 9",
  },
  "oneplus-5-super-change-farm-6-64": {
    name: "OnePlus 5 Super Change Farm 6+64",
    category: "oneplus-box",
    shortDesc: "CPU: Snapdragon 835 · 6G+64G · Android 9 · Super Change",
    priceUsd: 650,
    stock: 7,
    cpu: "Snapdragon 835",
    android: "Android 9",
  },
  "oneplus-8-pro-farm-8-128": {
    name: "OnePlus 8 Pro Farm 8+128",
    category: "oneplus-box",
    shortDesc: "CPU: Snapdragon 865 · 8G+128G · Android 13",
    priceUsd: 1350,
    stock: 4,
    cpu: "Snapdragon 865",
    android: "Android 13",
  },
  "oneplus-8-pro-farm-12-256": {
    name: "OnePlus 8 Pro Farm 12+256",
    category: "oneplus-box",
    shortDesc: "CPU: Snapdragon 865 · 12G+256G · Android 13",
    priceUsd: 1400,
    stock: 4,
    cpu: "Snapdragon 865",
    android: "Android 13",
  },
  "pixel-4xl-super-change-farm-6-128": {
    name: "Pixel 4XL Super Change Farm 6+128",
    category: "pixel-box",
    shortDesc: "CPU: Snapdragon 855 · 6G+128G · Android 13 · Super Change",
    priceUsd: 1180,
    stock: 5,
    cpu: "Snapdragon 855",
    android: "Android 13",
  },
};

function publicUrl(filename) {
  return `/images/real-products/${filename}`;
}

function extractBoxId(filename) {
  const lower = filename.toLowerCase();
  let m = lower.match(/box-phone-farm-(.+?)(?:_en_main|_main_|_gallery|\.png|\.jpg)/);
  if (m) return m[1].replace(/-+$/, "");
  m = lower.match(/boxphone-(.+?)(?:_en_main|_main_|\.png)/);
  if (m) return m[1].replace(/-+$/, "");
  m = lower.match(/device-(.+?)(?:_id_|_gallery|\.jpg)/);
  if (m) return m[1].replace(/-+$/, "");
  return null;
}

function scoreMainImage(filename) {
  const lower = filename.toLowerCase();
  let s = 0;
  if (lower.includes("en_main") || lower.includes("_en_main")) s += 30;
  if (lower.includes("main_box")) s += 15;
  if (lower.includes("gallery")) s -= 20;
  if (lower.includes("structure")) s -= 15;
  if (lower.includes("device-")) s -= 25;
  if (lower.endsWith(".jpg")) s -= 5;
  return s;
}

function collectSourceFiles() {
  const files = new Set();
  if (fs.existsSync(realDir)) {
    for (const f of fs.readdirSync(realDir)) {
      if (/\.(png|jpg|jpeg)$/i.test(f)) files.add(f);
    }
  }
  try {
    const cfg = JSON.parse(fs.readFileSync(pathsFile, "utf8"));
    if (fs.existsSync(cfg.productDetails)) {
      for (const f of fs.readdirSync(cfg.productDetails)) {
        if (f.toLowerCase().startsWith("product_") && /\.(png|jpg|jpeg)$/i.test(f)) {
          files.add(f.replace(/[^\w.\-() ]/g, "_").replace(/\s+/g, "_"));
        }
      }
    }
  } catch {
    /* optional */
  }
  return [...files];
}

function slugFromBoxId(boxId) {
  if (SLUG_BY_BOX_ID[boxId]) return SLUG_BY_BOX_ID[boxId];
  const norm = boxId.replace(/-en$/, "").replace(/-change$/, "-change");
  return `farm-${norm}`;
}

const fileNames = collectSourceFiles();
const bySlug = {};

for (const file of fileNames) {
  const boxId = extractBoxId(file);
  if (!boxId) continue;
  const slug = slugFromBoxId(boxId);
  if (!bySlug[slug]) bySlug[slug] = { files: [] };
  bySlug[slug].files.push(file);
}

// Copy missing files from D drive to real-products
try {
  const cfg = JSON.parse(fs.readFileSync(pathsFile, "utf8"));
  if (fs.existsSync(cfg.productDetails)) {
    fs.mkdirSync(realDir, { recursive: true });
    for (const file of fs.readdirSync(cfg.productDetails)) {
      const lower = file.toLowerCase();
      if (!lower.startsWith("product_") || !/\.(png|jpg|jpeg)$/i.test(lower)) continue;
      const safe = file.replace(/[^\w.\-() ]/g, "_").replace(/\s+/g, "_");
      const dest = path.join(realDir, safe);
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(path.join(cfg.productDetails, file), dest);
      }
    }
  }
} catch {
  /* optional */
}

// Re-read after copy
const onDisk = fs.existsSync(realDir)
  ? fs.readdirSync(realDir).filter((f) => /\.(png|jpg|jpeg)$/i.test(f))
  : [];

for (const file of onDisk) {
  const boxId = extractBoxId(file);
  if (!boxId) continue;
  const slug = slugFromBoxId(boxId);
  if (!bySlug[slug]) bySlug[slug] = { files: [] };
  if (!bySlug[slug].files.includes(file)) bySlug[slug].files.push(file);
}

const catalog = [];
const imageMap = {};

// Merge galleries when multiple box ids map to same slug
const mergedBySlug = {};
for (const [rawSlug, { files }] of Object.entries(bySlug)) {
  const boxId = extractBoxId(files[0]);
  const slug = boxId ? slugFromBoxId(boxId) : rawSlug;
  if (!mergedBySlug[slug]) mergedBySlug[slug] = { files: [] };
  for (const f of files) {
    if (!mergedBySlug[slug].files.includes(f)) mergedBySlug[slug].files.push(f);
  }
}

for (const [slug, { files }] of Object.entries(mergedBySlug)) {
  const sorted = [...files].sort((a, b) => scoreMainImage(b) - scoreMainImage(a));
  const mainFile = sorted[0];
  const mainUrl = publicUrl(mainFile);
  const gallery = sorted.map((f) => publicUrl(f));

  const meta = PRODUCT_META[slug] ?? {
    name: slug.replace(/-/g, " ").toUpperCase(),
    category: "samsung-box",
    shortDesc: "Real-device phone farm box · USB/LAN/OTG · factory assembled Guangzhou",
    priceUsd: 800,
    stock: 5,
    cpu: "See product title",
    android: "Android optimized farm ROM",
  };

  catalog.push({
    slug,
    name: meta.name,
    category: meta.category,
    shortDesc: meta.shortDesc,
    priceUsd: meta.priceUsd,
    stock: meta.stock,
    productType: "hardware",
    directPurchaseEnabled: true,
    quoteOnly: false,
    sourceImages: sorted,
  });

  imageMap[slug] = {
    card: mainUrl,
    hero: mainUrl,
    detail: mainUrl,
    gallery,
  };
}

// Sort catalog: samsung first, by price
catalog.sort((a, b) => a.category.localeCompare(b.category) || a.priceUsd - b.priceUsd);

fs.writeFileSync(catalogOut, JSON.stringify(catalog, null, 2) + "\n");
fs.writeFileSync(imagesOut, JSON.stringify(imageMap, null, 2) + "\n");

console.log(`[catalog] ${catalog.length} hardware SKUs from ${onDisk.length} image files`);
console.log(`[images] ${Object.keys(imageMap).length} slug mappings with gallery`);
