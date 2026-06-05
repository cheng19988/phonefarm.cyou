export const SITE = {
  name: "Cyou Phone Farm",
  tagline: "Complete Phone Farm Setup Service with Real Devices",
  domain: "phonefarm.cyou",
  url: process.env.SITE_URL || "https://phonefarm.cyou",
  location: "Guangzhou, China",
  locationZh: "中国广州",
  since: 2017,
  intro:
    "Guangzhou factory team shipping real-device phone farm boxes since 2017. We size hardware, configure remote and group control, and support overseas rollout—not just a parts list.",
} as const;

export const CONTACT = {
  phone: "13059502618",
  phoneDisplay: "+86 130 5950 2618",
  telegram: "@huicheng1998",
  telegramUrl: "https://t.me/huicheng1998",
  whatsapp: "+85262155642",
  whatsappUrl: "https://wa.me/85262155642",
  email: "qiuxui646@gmail.com",
} as const;

export const CURRENCY = {
  code: "USD",
  symbol: "$",
  label: "USD list prices · final quote via Telegram, WhatsApp, or email",
} as const;

export const PAYMENT = {
  network: "Tron",
  protocol: "TRC20",
  currency: "USDT",
  address: "TH42KshQyz15iWk5svAwS475RM8oYQjwjW",
  contract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  minAmount: 10,
  expiryMinutes: 30,
} as const;

export const ORDER_STATUSES = [
  "Pending",
  "Waiting for Payment",
  "Paid",
  "Confirmed",
  "Cancelled",
  "Expired",
] as const;

/** Shop brand lines — mirrors niaozun.shop box categories */
export const SHOP_BRANDS = [
  { slug: "samsung-box", name: "Samsung Box", icon: "S" },
  { slug: "oppo-box", name: "Oppo Box", icon: "O" },
  { slug: "xiaomi-box", name: "Xiaomi Box", icon: "M" },
  { slug: "oneplus-box", name: "Oneplus Box", icon: "1+" },
  { slug: "pixel-box", name: "Pixel Box", icon: "P" },
] as const;

export const PRODUCT_CATEGORIES = [
  ...SHOP_BRANDS,
  { slug: "phone-farm-box", name: "Phone Farm Box" },
  { slug: "motherboard-box", name: "Motherboard Box" },
  { slug: "phone-farm-device", name: "Phone Farm Device" },
  { slug: "control-software", name: "Control Software Setup" },
  { slug: "service-package", name: "Service Package" },
  { slug: "accessories", name: "Accessories" },
  { slug: "usb-hub", name: "USB Hub" },
  { slug: "power-supply", name: "Power Supply" },
  { slug: "cooling-solution", name: "Cooling" },
  { slug: "network-equipment", name: "Network Equipment" },
  { slug: "remote-control-setup", name: "Remote Control Setup" },
  { slug: "mirror-vip", name: "Mirror Software VIP" },
] as const;

export const CONTROL_SOFTWARE_OPTIONS = [
  {
    slug: "cyou-mirror",
    name: "Cyou Mirror Workspace (Free Tier Setup)",
    desc: "Our team configures the free mirror workspace for USB and LAN OTG fleets—authorization paths, grouping, and batch controls.",
  },
  {
    slug: "pro-mirror",
    name: "Professional Mirror Suite Setup",
    desc: "Stable commercial mirror stack installation, shortcuts, and multi-group layouts for agency-scale operations.",
  },
  {
    slug: "cost-effective-cloud-bridge",
    name: "Cost-Effective Cloud Bridge Setup",
    desc: "Hybrid guidance when you need subscription-based cloud seats alongside real devices—we wire policies, not resell third-party keys.",
  },
  {
    slug: "enterprise-control-stack",
    name: "Enterprise Control Stack",
    desc: "Multi-vendor toolchains unified under one deployment playbook with audit-friendly device labeling.",
  },
] as const;

export const DEPLOYMENT_STEPS = [
  { step: 1, title: "Discovery & Device Selection", desc: "Workload, app matrix, Android version, and per-node storage targets." },
  { step: 2, title: "Hardware Configuration", desc: "Box model, PSU, cooling, USB hub tier, and rack layout from Guangzhou factory." },
  { step: 3, title: "Remote Control Configuration", desc: "USB, LAN OTG, WiFi handoff, mirroring groups, and operator workstations." },
  { step: 4, title: "Group Control System Setup", desc: "Device groups, sync control rules, batch APK/file policies, ADB shortcuts." },
  { step: 5, title: "Burn-in & Delivery", desc: "Stress test, export packing, customs docs, and overseas logistics." },
  { step: 6, title: "Handover & After-sales", desc: "Runbooks, spare parts list, Telegram/WhatsApp support channel, and upgrade path." },
] as const;

export const SERVICE_PACKAGES = [
  {
    slug: "starter-setup",
    name: "Starter Setup Package",
    priceFrom: 350,
    includes: ["1× 20-node box consult", "Remote control baseline", "7-day chat support"],
  },
  {
    slug: "studio-pro",
    name: "Studio Pro Package",
    priceFrom: 890,
    includes: ["Multi-box layout", "Group control groups", "Bulk APK policy", "30-day support"],
  },
  {
    slug: "enterprise-deploy",
    name: "Enterprise Deployment",
    priceFrom: 0,
    includes: ["Custom cabinet", "On-site/remote commissioning", "SLA options", "Quote based"],
  },
] as const;

export const SERVICES = [
  {
    slug: "one-stop-phone-farm-setup",
    title: "One-stop Phone Farm Setup",
    desc: "Single contract covers hardware selection, assembly validation, control PC sizing, and go-live checklist.",
  },
  {
    slug: "remote-control-configuration",
    title: "Remote Control Configuration",
    desc: "USB projection, LAN OTG, WiFi switching, window layouts, and operator shortcuts.",
  },
  {
    slug: "group-control-system-setup",
    title: "Group Control System Setup",
    desc: "Sync control, batch APK install, file push, ADB scripts, and device grouping by campaign.",
  },
  {
    slug: "deployment-workflow",
    title: "Deployment Workflow",
    desc: "Documented six-stage rollout from discovery to after-sales—see /deployment.",
  },
  {
    slug: "hardware-software-support-bundle",
    title: "Hardware + Software + Support",
    desc: "Combined BOM, control stack, and support hours for teams that want one vendor accountable.",
  },
  {
    slug: "sample-solution",
    title: "Sample Solution",
    desc: "Pilot box or chassis for overseas evaluation before bulk purchase.",
  },
  {
    slug: "enterprise-bulk-deployment",
    title: "Enterprise Bulk Deployment",
    desc: "40–200+ node programs with redundant power and monitoring hooks.",
  },
  {
    slug: "overseas-delivery-support",
    title: "Overseas Delivery & After-sales",
    desc: "Export packing, tracking, RMA, and remote troubleshooting in US/EU/APAC time zones.",
  },
  {
    slug: "custom-hardware-solution",
    title: "Custom Hardware Solution",
    desc: "Non-standard density, fan topology, or mixed-brand motherboard trays.",
  },
] as const;

/** Regions we regularly export to — no fabricated order counts. */
export const SHIPPING_REGIONS = [
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Spain",
  "Poland",
  "Mexico",
  "Russia",
  "Ukraine",
  "Norway",
  "Slovakia",
  "Dominican Republic",
  "Southeast Asia",
  "Middle East",
] as const;

export const MIRROR_VIP_PRODUCTS = [
  {
    slug: "mirror-setup-basic-renewal",
    name: "Mirror Workspace Renewal Setup",
    shortDesc: "Renewal configuration after VIP expiry — remote onboarding.",
    priceUsd: 8,
    listPriceUsd: 88,
  },
  {
    slug: "mirror-setup-cloud-bridge",
    name: "Cloud Bridge Control Setup",
    shortDesc: "Top-rated hybrid bridge configuration for multi-device teams.",
    priceUsd: 5,
    listPriceUsd: 99,
  },
  {
    slug: "mirror-setup-annual-pro",
    name: "Annual Pro Control Setup",
    shortDesc: "360-day control stack mapping, groups, and script shortcuts.",
    priceUsd: 10,
    listPriceUsd: 266,
  },
] as const;
