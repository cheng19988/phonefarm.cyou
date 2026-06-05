import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { IMAGES } from "../src/lib/images";
import { parseShortDescHardware } from "../src/lib/pricing";

const prisma = new PrismaClient();
const cards = IMAGES.productCards;
const pick = (i: number) => cards[i % cards.length];
const detail = (i: number) =>
  pick(i).replace("card_800x800", "detail_1200x900").replace("/card_800x800/", "/detail_1200x900/");

function body(short: string) {
  const hw = parseShortDescHardware(short);
  const specs: Record<string, string> = {
    nodes: "20 per standard box",
    cooling: "4 fans",
    power: "450–550W adaptive",
    recommendedWorkload: "QA device lab · app compatibility testing · remote device management",
  };
  if (hw.cpu) specs.CPU = hw.cpu;
  if (hw.ram) specs.RAM = hw.ram;
  if (hw.android) specs.Android = hw.android;

  return {
    description: `${short} Supplied and configured by Cyou Phone Farm, Guangzhou. Includes deployment checklist and support channel setup.`,
    features: JSON.stringify([
      "Real motherboard nodes in metal chassis",
      "Factory burn-in report",
      "USB + OTG control path",
      "Compatible with remote control setup service",
    ]),
    specs: JSON.stringify(specs),
    scenarios: JSON.stringify([
      "App QA testing",
      "Device compatibility lab",
      "Enterprise device fleet",
      "Remote device management",
    ]),
    accessories: JSON.stringify(["PSU", "USB hub", "Cooling fans"]),
    delivery: JSON.stringify(["Export carton", "Quick-start guide", "Label sheet"]),
    maintenance: JSON.stringify(["Fan cleaning quarterly", "Remote support via Telegram/WhatsApp"]),
    faq: JSON.stringify([{ q: "Setup help?", a: "Remote Control Configuration service available." }]),
  };
}

type SeedProduct = {
  slug: string;
  name: string;
  category: string;
  shortDesc: string;
  priceUsd: number;
  stock: number;
  img: number;
};

const catalog: SeedProduct[] = [
  // Samsung Box — reference parity
  { slug: "samsung-s8-farm-4-64", name: "SAMSUNG S8 Farm 4+64", category: "samsung-box", shortDesc: "CPU: Snapdragon 835 / Exynos 8895 · 4G+64G · Android 9", priceUsd: 550, stock: 14, img: 0 },
  { slug: "samsung-s9-plus-farm-6-64", name: "SAMSUNG S9+ Farm 6+64", category: "samsung-box", shortDesc: "CPU: Snapdragon 845 / Exynos 9810 · 6G+64G · Android 10", priceUsd: 680, stock: 12, img: 1 },
  { slug: "samsung-s10-farm-8-128", name: "SAMSUNG S10 Farm 8+128", category: "samsung-box", shortDesc: "CPU: Snapdragon 855 / Exynos 9820 · 8G+128G · Android 11/12", priceUsd: 930, stock: 9, img: 2 },
  { slug: "samsung-s22-farm-8-128", name: "SAMSUNG S22 Farm 8+128", category: "samsung-box", shortDesc: "CPU: Snapdragon 8 Gen1 · 8G+128G · Android 14", priceUsd: 1500, stock: 5, img: 3 },
  // Oppo Box
  { slug: "oppo-find-x2-farm-8-128", name: "OPPO Find X2 Farm 8+128", category: "oppo-box", shortDesc: "CPU: Snapdragon 865 · 8G+128G · Android 13", priceUsd: 1050, stock: 6, img: 4 },
  { slug: "oppo-find-x2-pro-farm-12-256", name: "OPPO Find X2 Pro Farm 12+256", category: "oppo-box", shortDesc: "CPU: Snapdragon 865 · 12G+256G · Android 13", priceUsd: 1400, stock: 4, img: 5 },
  { slug: "oppo-find-x3-neo-farm-8-128", name: "OPPO Find X3 Neo Farm 8+128", category: "oppo-box", shortDesc: "CPU: Snapdragon 888 · 8G+128G · Android 13", priceUsd: 1270, stock: 5, img: 0 },
  { slug: "oppo-reno5-pro-farm-8-128", name: "OPPO Reno5 Pro Farm 8+128", category: "oppo-box", shortDesc: "CPU: Dimensity 1000+ · 8G+128G · Android 13", priceUsd: 1050, stock: 6, img: 1 },
  // Xiaomi Box
  { slug: "xiaomi-6x-a2-farm-4-64", name: "Xiaomi 6X/A2 Farm 4+64", category: "xiaomi-box", shortDesc: "CPU: Snapdragon 660 · 4G+64G · Android 10", priceUsd: 550, stock: 10, img: 2 },
  { slug: "xiaomi-8se-farm-6-64", name: "Xiaomi 8SE Farm 6+64", category: "xiaomi-box", shortDesc: "CPU: Snapdragon 710 · 6G+64G · Android 10", priceUsd: 980, stock: 7, img: 3 },
  { slug: "xiaomi-mix-2-farm-6-64", name: "Xiaomi MIX 2 Farm 6+64", category: "xiaomi-box", shortDesc: "CPU: Snapdragon 835 · 6G+64G · Android 10", priceUsd: 670, stock: 8, img: 4 },
  { slug: "xiaomi-8-farm-8-128", name: "Xiaomi 8 Farm 8+128", category: "xiaomi-box", shortDesc: "CPU: Snapdragon 845 · 8G+128G · Android 10", priceUsd: 940, stock: 7, img: 5 },
  // OnePlus Box
  { slug: "oneplus-3-farm-6-64", name: "OnePlus 3 Farm 6+64", category: "oneplus-box", shortDesc: "CPU: Snapdragon 820 · 6G+64G · Android 8", priceUsd: 630, stock: 9, img: 0 },
  { slug: "oneplus-8-pro-farm-12-256", name: "OnePlus 8 Pro Farm 12+256", category: "oneplus-box", shortDesc: "CPU: Snapdragon 865 · 12G+256G · Android 13", priceUsd: 1400, stock: 4, img: 1 },
  { slug: "oneplus-9-pro-farm-8-128", name: "OnePlus 9 Pro Farm 8+128", category: "oneplus-box", shortDesc: "CPU: Snapdragon 888 · 8G+128G · Android 14", priceUsd: 1300, stock: 5, img: 2 },
  { slug: "oneplus-11-farm-16-256", name: "OnePlus 11 Farm 16+256", category: "oneplus-box", shortDesc: "CPU: Snapdragon 8 Gen 2 · 12G+256G · Android 15", priceUsd: 2050, stock: 3, img: 3 },
  // Pixel Box
  { slug: "pixel-4a-farm-6-128", name: "Pixel 4a Farm 6+128", category: "pixel-box", shortDesc: "CPU: Adreno 618 class · 6G+128G · Android 13", priceUsd: 1130, stock: 5, img: 4 },
  { slug: "pixel-5-farm-8-128", name: "Pixel 5 Farm 8+128", category: "pixel-box", shortDesc: "CPU: Snapdragon 765 · 8G+128G · Android 13", priceUsd: 1280, stock: 5, img: 5 },
  { slug: "pixel-6-farm-8-128", name: "Pixel 6 Farm 8+128", category: "pixel-box", shortDesc: "CPU: Google Tensor · 8G+128G · Android 16", priceUsd: 1860, stock: 4, img: 0 },
  { slug: "pixel-7-pro-farm-12-128", name: "Pixel 7 Pro Farm 12+128", category: "pixel-box", shortDesc: "CPU: Google Tensor · 8G+128G · Android 16", priceUsd: 2540, stock: 2, img: 1 },
  // Control software setup services (not CDKEY resale)
  { slug: "mirror-setup-basic-renewal", name: "Control Software Onboarding", category: "mirror-vip", shortDesc: "Remote onboarding for customer-selected mirror workspace · USB + grouping baseline.", priceUsd: 350, stock: 99, img: 2 },
  { slug: "mirror-setup-cloud-bridge", name: "Remote Mirror Workspace Setup", category: "mirror-vip", shortDesc: "Multi-monitor layout, LAN scan ranges, operator accounts, handover checklist.", priceUsd: 450, stock: 99, img: 3 },
  { slug: "mirror-setup-annual-pro", name: "Annual Maintenance Support", category: "mirror-vip", shortDesc: "Quarterly health review, fan/PSU guidance, control-stack update planning.", priceUsd: 890, stock: 99, img: 4 },
  { slug: "group-control-onboarding", name: "Group Control Onboarding", category: "control-software", shortDesc: "Sync control, batch APK, ADB script map for one farm.", priceUsd: 350, stock: 40, img: 5 },
  // Service packages
  { slug: "package-starter-setup", name: "Starter Setup Package", category: "service-package", shortDesc: "Box consult + remote baseline + 7-day support.", priceUsd: 350, stock: 50, img: 0 },
  { slug: "package-studio-pro", name: "Studio Pro Package", category: "service-package", shortDesc: "Multi-box + group control + bulk APK policy + 30-day support.", priceUsd: 890, stock: 30, img: 1 },
  { slug: "package-enterprise-deploy", name: "Enterprise Deployment (Quote)", category: "service-package", shortDesc: "Custom cabinet, SLA, commissioning.", priceUsd: 0, stock: 99, img: 2 },
  // Accessories & infrastructure
  { slug: "motherboard-box-20-slot", name: "20-Slot Motherboard Box", category: "motherboard-box", shortDesc: "Empty-tray chassis for Samsung-class boards.", priceUsd: 428, stock: 15, img: 3 },
  { slug: "industrial-usb-hub-20-port", name: "Industrial 20-Port USB Hub", category: "usb-hub", shortDesc: "Matched hub tier for 20-node farms.", priceUsd: 165, stock: 25, img: 4 },
  { slug: "adaptive-power-supply-550w", name: "550W Adaptive Power Supply", category: "power-supply", shortDesc: "110–220V adaptive PSU for continuous draw.", priceUsd: 98, stock: 30, img: 5 },
  { slug: "quad-fan-cooling-kit", name: "Quad-Fan Cooling Kit", category: "cooling-solution", shortDesc: "4-fan kit for 24/7 chassis temps.", priceUsd: 72, stock: 40, img: 0 },
  { slug: "gigabit-farm-network-kit", name: "Gigabit Farm Network Kit", category: "network-equipment", shortDesc: "Router/switch/cabling baseline.", priceUsd: 210, stock: 14, img: 1 },
];

async function main() {
  const adminHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@2026!", 12);
  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@phonefarm.cyou" },
    update: {},
    create: { email: process.env.ADMIN_EMAIL || "admin@phonefarm.cyou", passwordHash: adminHash },
  });

  const slugs = catalog.map((p) => p.slug);
  await prisma.product.deleteMany({ where: { slug: { notIn: slugs } } });

  for (const p of catalog) {
    const content = body(p.shortDesc);
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        category: p.category,
        shortDesc: p.shortDesc,
        priceUsd: p.priceUsd,
        stock: p.stock,
        ...content,
      },
      create: {
        slug: p.slug,
        name: p.name,
        category: p.category,
        shortDesc: p.shortDesc,
        priceUsd: p.priceUsd,
        stock: p.stock,
        imageCard: pick(p.img),
        imageHero: IMAGES.hero,
        imageDetail: detail(p.img),
        ...content,
      },
    });
  }
  console.log(`Seeded ${catalog.length} products for Cyou Phone Farm.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
