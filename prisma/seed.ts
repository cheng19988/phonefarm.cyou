import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { IMAGES } from "../src/lib/images";
import { parseShortDescHardware } from "../src/lib/pricing";
import { ALL_HARDWARE_CATALOG } from "../src/lib/hardware-catalog";
import realProductImages from "../src/lib/real-product-images.json";

const prisma = new PrismaClient();
const cards = IMAGES.productCards;
const pick = (i: number) => cards[i % cards.length];
const realMap = realProductImages as Record<
  string,
  { card: string; hero: string; detail: string; gallery?: string[] }
>;

function productImages(slug: string, imgIndex: number) {
  const real = realMap[slug];
  if (real) {
    return { imageCard: real.card, imageHero: real.hero, imageDetail: real.detail };
  }
  return {
    imageCard: pick(imgIndex),
    imageHero: IMAGES.hero,
    imageDetail: pick(imgIndex).replace("card_800x800", "detail_1200x900").replace("/card_800x800/", "/detail_1200x900/"),
  };
}

function body(name: string, short: string) {
  const hw = parseShortDescHardware(short);
  const specs: Record<string, string> = {
    nodes: "20 per standard 2U chassis",
    cooling: "4-fan active cooling",
    power: "450–550W adaptive PSU (quoted per config)",
    control: "USB screen projection · LAN OTG · optional WiFi handoff",
    recommendedWorkload: "QA device lab · app compatibility testing · remote device management · group control",
    export: "Guangzhou factory burn-in · export carton · commercial invoice",
  };
  if (hw.cpu) specs.CPU = hw.cpu;
  if (hw.ram) specs.RAM = hw.ram;
  if (hw.android) specs.Android = hw.android;

  return {
    description: `${name}. ${short}. Supplied and configured by Cyou Phone Farm, Guangzhou. Each chassis is factory-assembled with shared power, cooling, and USB/LAN control paths. Nodes are burn-in tested and logged on a serial sheet before export. Remote Control Configuration, Group Control Onboarding, and Enterprise Deployment packages available. Worldwide shipping via DHL/FedEx/UPS with reinforced packing.`,
    features: JSON.stringify([
      "Real Android motherboard nodes in metal chassis (no screens/batteries)",
      "Factory burn-in report with per-node serial log",
      "USB + OTG + LAN mirroring control path",
      "Optimized farm ROM or official ROM tier documented on burn-in sheet",
      "Compatible with batch APK, sync control, and ADB automation",
      "90-day hardware defect warranty · extended SLA for enterprise",
    ]),
    specs: JSON.stringify(specs),
    scenarios: JSON.stringify([
      "App QA testing and regression on real SoC",
      "Device compatibility validation matrix",
      "Enterprise device fleet and remote device management",
      "Multi-device automation and group control operations",
      "Overseas QA lab expansion with export-ready packing",
    ]),
    accessories: JSON.stringify([
      "Adaptive PSU and quad-fan cooling (included or quoted per BOM)",
      "20-port industrial USB hub (recommended for USB mirroring)",
      "Gigabit switch/router kit for LAN OTG fleets",
      "Spare fans, trays, and hub stock for RMA",
    ]),
    delivery: JSON.stringify([
      "Reinforced export carton with foam bracing",
      "Burn-in serial sheet and quick-start checklist",
      "Commercial invoice and export documentation",
      "Remote first-connection guidance via WhatsApp/Telegram",
    ]),
    maintenance: JSON.stringify([
      "Quarterly fan cleaning and PSU health check",
      "Remote support channel via WhatsApp/Telegram",
      "Annual Maintenance Support package available",
      "Spare parts: fans, PSU, USB hubs, motherboard trays",
    ]),
    faq: JSON.stringify([
      { q: "What is included in the box?", a: "Chassis with nodes, PSU, cooling, burn-in sheet, and export packing. Hub/network kit quoted per control method." },
      { q: "MOQ and bulk pricing?", a: "Single box available. Bulk discounts typically from 5+ units—contact sales for MOQ confirmation." },
      { q: "Lead time?", a: "Standard configs commonly 7–21 business days after order confirmation, plus transit. Custom builds 15–30 days." },
      { q: "How to connect after delivery?", a: "See Help Center: USB projection → LAN OTG scan. Remote onboarding included with setup packages." },
      { q: "Warranty?", a: "90-day hardware defect coverage. Extended SLA for enterprise contracts." },
      { q: "Shipping regions?", a: "Regular export to US, UK, EU, Southeast Asia, Middle East, and more from Guangzhou." },
    ]),
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
  directPurchaseEnabled?: boolean;
  quoteOnly?: boolean;
  productType?: "hardware" | "accessory" | "service" | "enterprise";
};

function purchaseMeta(p: SeedProduct) {
  if (p.slug === "package-enterprise-deploy" || p.priceUsd <= 0) {
    return { directPurchaseEnabled: false, quoteOnly: true, productType: "enterprise" as const };
  }
  if (
    p.category === "motherboard-box" ||
    p.category === "usb-hub" ||
    p.category === "power-supply" ||
    p.category === "cooling-solution" ||
    p.category === "network-equipment"
  ) {
    return { directPurchaseEnabled: true, quoteOnly: false, productType: "accessory" as const };
  }
  if (
    p.category === "mirror-vip" ||
    p.category === "control-software" ||
    p.category === "service-package"
  ) {
    return { directPurchaseEnabled: true, quoteOnly: false, productType: "service" as const };
  }
  return { directPurchaseEnabled: true, quoteOnly: false, productType: "hardware" as const };
}

const hardwareCatalog: SeedProduct[] = ALL_HARDWARE_CATALOG.map((p, i) => ({
  slug: p.slug,
  name: p.name,
  category: p.category,
  shortDesc: p.shortDesc,
  priceUsd: p.priceUsd,
  stock: p.stock,
  img: i,
  directPurchaseEnabled: p.directPurchaseEnabled ?? true,
  quoteOnly: p.quoteOnly ?? false,
  productType: "hardware",
}));

const serviceCatalog: SeedProduct[] = [
  { slug: "mirror-setup-basic-renewal", name: "Control Software Onboarding", category: "mirror-vip", shortDesc: "Remote onboarding for customer-selected mirror workspace · USB + grouping baseline.", priceUsd: 350, stock: 99, img: 2 },
  { slug: "mirror-setup-cloud-bridge", name: "Remote Mirror Workspace Setup", category: "mirror-vip", shortDesc: "Multi-monitor layout, LAN scan ranges, operator accounts, handover checklist.", priceUsd: 450, stock: 99, img: 3 },
  { slug: "mirror-setup-annual-pro", name: "Annual Maintenance Support", category: "mirror-vip", shortDesc: "Quarterly health review, fan/PSU guidance, control-stack update planning.", priceUsd: 890, stock: 99, img: 4 },
  { slug: "group-control-onboarding", name: "Group Control Onboarding", category: "control-software", shortDesc: "Sync control, batch APK, ADB script map for one farm.", priceUsd: 350, stock: 40, img: 5 },
  { slug: "package-starter-setup", name: "Starter Setup Package", category: "service-package", shortDesc: "Box consult + remote baseline + 7-day support.", priceUsd: 350, stock: 50, img: 0 },
  { slug: "package-studio-pro", name: "Studio Pro Package", category: "service-package", shortDesc: "Multi-box + group control + bulk APK policy + 30-day support.", priceUsd: 890, stock: 30, img: 1 },
  { slug: "package-enterprise-deploy", name: "Enterprise Deployment (Quote)", category: "service-package", shortDesc: "Custom cabinet, SLA, commissioning.", priceUsd: 0, stock: 99, img: 2 },
  { slug: "motherboard-box-20-slot", name: "20-Slot Motherboard Box", category: "motherboard-box", shortDesc: "Empty-tray chassis for Samsung-class boards.", priceUsd: 428, stock: 15, img: 3 },
  { slug: "industrial-usb-hub-20-port", name: "Industrial 20-Port USB Hub", category: "usb-hub", shortDesc: "Matched hub tier for 20-node farms.", priceUsd: 165, stock: 25, img: 4 },
  { slug: "adaptive-power-supply-550w", name: "550W Adaptive Power Supply", category: "power-supply", shortDesc: "110–220V adaptive PSU for continuous draw.", priceUsd: 98, stock: 30, img: 5 },
  { slug: "quad-fan-cooling-kit", name: "Quad-Fan Cooling Kit", category: "cooling-solution", shortDesc: "4-fan kit for 24/7 chassis temps.", priceUsd: 72, stock: 40, img: 0 },
  { slug: "gigabit-farm-network-kit", name: "Gigabit Farm Network Kit", category: "network-equipment", shortDesc: "Router/switch/cabling baseline for LAN OTG.", priceUsd: 210, stock: 14, img: 1 },
];

const catalog: SeedProduct[] = [...hardwareCatalog, ...serviceCatalog];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@phonefarm.cyou";
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const adminHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@2026!", 12);
    await prisma.adminUser.create({ data: { email: adminEmail, passwordHash: adminHash } });
  }

  const slugSet = catalog.map((p) => p.slug);
  await prisma.product.updateMany({
    where: { slug: { notIn: slugSet } },
    data: { published: false },
  });

  for (const p of catalog) {
    const content = body(p.name, p.shortDesc);
    const purchase = purchaseMeta(p);
    const images = productImages(p.slug, p.img);
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        category: p.category,
        shortDesc: p.shortDesc,
        priceUsd: p.priceUsd,
        published: true,
        directPurchaseEnabled: purchase.directPurchaseEnabled,
        quoteOnly: purchase.quoteOnly,
        productType: purchase.productType,
        imageCard: images.imageCard,
        imageHero: images.imageHero,
        imageDetail: images.imageDetail,
        ...content,
      },
      create: {
        slug: p.slug,
        name: p.name,
        category: p.category,
        shortDesc: p.shortDesc,
        priceUsd: p.priceUsd,
        stock: p.stock,
        published: true,
        directPurchaseEnabled: purchase.directPurchaseEnabled,
        quoteOnly: purchase.quoteOnly,
        productType: purchase.productType,
        ...images,
        ...content,
      },
    });
  }
  console.log(`Seeded ${catalog.length} products (${hardwareCatalog.length} hardware + ${serviceCatalog.length} services/accessories).`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
