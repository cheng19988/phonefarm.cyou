/**
 * Build product image map from material-library filenames + chassis fallbacks for services/accessories.
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const catalogScript = path.join(__dirname, "build-product-catalog-from-images.mjs");
const outFile = path.join(root, "src/lib/real-product-images.json");

spawnSync(process.execPath, [catalogScript], { stdio: "inherit", cwd: root });

const CHASSIS = [
  "/images/real-factory/box-shots/2025_10_25_11_21_IMG_0547.png",
  "/images/real-factory/box-shots/2025_10_25_11_24_IMG_0549.png",
  "/images/real-factory/box-shots/2025_10_25_11_27_IMG_0551.png",
  "/images/real-factory/box-shots/2025_10_25_11_28_IMG_0553.png",
  "/images/real-factory/box-shots/2025_10_25_11_33_IMG_0561.png",
  "/images/real-factory/box-shots/2025_10_25_11_37_IMG_0566.png",
  "/images/card_800x800/phonefarm.cyou-product-box-0f5501e1584de9a625d220f62951bc6d-d04df-card_800x800.webp",
  "/images/card_800x800/phonefarm.cyou-accessories-networkdevice-cablesaccessoriesshowcase-e6cc8-card_800x800.webp",
];

const ACCESSORY_SLUGS = [
  "oppo-find-x2-farm-8-128",
  "oppo-find-x2-pro-farm-12-256",
  "oppo-find-x3-neo-farm-8-128",
  "oppo-reno5-pro-farm-8-128",
  "xiaomi-6x-a2-farm-4-64",
  "xiaomi-8se-farm-6-64",
  "xiaomi-mix-2-farm-6-64",
  "xiaomi-8-farm-8-128",
  "oneplus-3-farm-6-64",
  "oneplus-9-pro-farm-8-128",
  "oneplus-11-farm-16-256",
  "oneplus-8-pro-farm-12-256",
  "pixel-4a-farm-6-128",
  "pixel-5-farm-8-128",
  "pixel-6-farm-8-128",
  "pixel-7-pro-farm-12-128",
  "samsung-s9-plus-farm-6-64",
  "samsung-s22-farm-8-128",
  "motherboard-box-20-slot",
  "industrial-usb-hub-20-port",
  "adaptive-power-supply-550w",
  "quad-fan-cooling-kit",
  "gigabit-farm-network-kit",
  "mirror-setup-basic-renewal",
  "mirror-setup-cloud-bridge",
  "mirror-setup-annual-pro",
  "group-control-onboarding",
  "package-starter-setup",
  "package-studio-pro",
  "package-enterprise-deploy",
];

const map = JSON.parse(fs.readFileSync(outFile, "utf8"));
let added = 0;
ACCESSORY_SLUGS.forEach((slug, i) => {
  if (map[slug]) return;
  const url = CHASSIS[i % CHASSIS.length];
  map[slug] = { card: url, hero: url, detail: url, gallery: [url] };
  added++;
});
fs.writeFileSync(outFile, JSON.stringify(map, null, 2) + "\n");
console.log(`[map] +${added} chassis fallbacks · total ${Object.keys(map).length} slugs`);
