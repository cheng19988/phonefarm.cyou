import { resolveCanonicalSiteUrl } from "./site-url";

export const SITE = {
  name: "Cyou Phone Farm",
  tagline: "Complete Phone Farm Setup Service with Real Devices",
  domain: "phonefarm.cyou",
  url: resolveCanonicalSiteUrl(),
  location: "Guangzhou, China",
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
  label: "Reference price · final quote confirmed before payment",
} as const;

export const PAYMENT = {
  network: "Tron",
  protocol: "TRC20",
  currency: "USDT",
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
  { slug: "control-software", name: "Control software services" },
  { slug: "service-package", name: "Service Package" },
  { slug: "accessories", name: "Accessories" },
  { slug: "usb-hub", name: "USB Hub" },
  { slug: "power-supply", name: "Power Supply" },
  { slug: "cooling-solution", name: "Cooling" },
  { slug: "network-equipment", name: "Network Equipment" },
  { slug: "remote-control-setup", name: "Remote Control Setup" },
  { slug: "mirror-vip", name: "Control Software Setup" },
] as const;

export const CONTROL_SOFTWARE_OPTIONS = [
  {
    slug: "free-mirror-stack",
    name: "USB screen mirroring (free-tier tools)",
    desc: "Baseline USB projection and device detection on customer-licensed mirror software—we configure paths, not resell licenses.",
  },
  {
    slug: "laixi-stack",
    name: "Laixi group control screen projection",
    desc: "Industry-leading Android mirror tool known for stability and rich group-control features. We configure USB/LAN on your Laixi license.",
  },
  {
    slug: "cloudphone-stack",
    name: "CloudPhone group control software",
    desc: "Cost-effective mirror stack with strong stability. We set up LAN scan ranges, groups, and operator layout on your CloudPhone account.",
  },
  {
    slug: "whitetiger-stack",
    name: "WhiteTiger screen projection software",
    desc: "Widely deployed mirror suite (related tools include Panda and Xiaowei). We document USB topology and batch APK policy on your license.",
  },
  {
    slug: "lan-otg",
    name: "LAN OTG configuration",
    desc: "Subnet planning, TCP 5555 enablement, and scan policies for same-router fleets.",
  },
  {
    slug: "device-grouping",
    name: "Device grouping & sync control",
    desc: "Test groups, master window rules, sync tap, and operator permissions.",
  },
  {
    slug: "batch-apk",
    name: "Batch APK installation",
    desc: "Test-on-one-node workflow, split APK handling, and rollback notes.",
  },
  {
    slug: "operator-handover",
    name: "Operator handover",
    desc: "Runbook, escalation path, and spare-parts list for your team.",
  },
] as const;

export const CONTROL_SOFTWARE_DISCLAIMER =
  "We configure the control environment selected by the customer. We do not resell third-party software licenses unless explicitly agreed in writing.";

export const DEPLOYMENT_STEPS = [
  { step: 1, title: "Requirement confirmation", desc: "Device count, app matrix, Android targets, control method, and export destination." },
  { step: 2, title: "Device selection", desc: "SoC tier, RAM/storage, chassis density, and accessory BOM from Guangzhou engineering." },
  { step: 3, title: "Hardware assembly", desc: "Motherboard tray build, PSU, cooling, USB topology, and factory labeling." },
  { step: 4, title: "Control software setup", desc: "USB mirroring, LAN OTG, grouping, batch APK policy, and operator PC layout." },
  { step: 5, title: "Burn-in test and packing", desc: "24–48h stress run, serial sheet, export carton, and commercial invoice prep." },
  { step: 6, title: "Handover and support", desc: "Remote walkthrough, runbook, spare-parts list, and WhatsApp/Telegram after-sales channel." },
] as const;

export const CONTROL_SETUP_SERVICES = [
  {
    slug: "group-control-onboarding",
    name: "Group Control Onboarding",
    desc: "Device groups, sync control baseline, and operator handover for one farm.",
    priceFrom: 350,
  },
  {
    slug: "usb-lan-control-setup",
    name: "USB / LAN OTG Control Setup",
    desc: "Powered USB paths, LAN scan ranges, ADB authorization, and connectivity checks.",
    priceFrom: 350,
  },
  {
    slug: "control-workstation-layout",
    name: "Control Workstation Layout",
    desc: "Multi-monitor tiling, USB controller separation, and backup workstation guidance.",
    priceFrom: 450,
  },
  {
    slug: "batch-apk-deployment-setup",
    name: "Batch APK Deployment Setup",
    desc: "Canary install workflow, test-group rollout rules, and rollback checklist.",
    priceFrom: 350,
  },
  {
    slug: "annual-maintenance",
    name: "Annual Maintenance Support",
    desc: "Quarterly health review, fan/PSU guidance, and control-stack update planning.",
    priceFrom: 890,
  },
] as const;

export const TRUST_POINTS = [
  { title: "Guangzhou facility", desc: "Assembly, burn-in, and export packing under one roof since 2017." },
  { title: "Assembly & burn-in testing", desc: "Each node logged on a serial sheet before shipment." },
  { title: "Export packing", desc: "Reinforced cartons, foam, and commercial invoice support for overseas buyers." },
  { title: "Remote setup support", desc: "Screenshare onboarding for first connection and grouping." },
  { title: "MOQ policy", desc: "Single-box and sample units available; bulk pricing from 5+ boxes." },
  { title: "Warranty policy", desc: "90-day hardware defect coverage; extended options for enterprise contracts." },
  { title: "Spare parts support", desc: "Fans, PSU, USB hubs, and trays stocked for RMA and expansion." },
  { title: "After-sales channel", desc: "WhatsApp and Telegram response during US/EU-friendly hours." },
] as const;

export const PRODUCT_INFO_TOPICS = [
  {
    title: "What is a phone farm?",
    body: "A chassis of real Android motherboards—no screens or batteries—sharing power, cooling, and a centralized USB/LAN control path. Built for professional multi-device operations, not consumer handset resale.",
  },
  {
    title: "Real device vs emulator",
    body: "Physical boards match production SoC, sensors, and storage behavior. Emulators are useful for early dev but diverge under QA, compatibility testing, and enterprise device-lab workflows.",
  },
  {
    title: "Real device vs cloud phone",
    body: "Cloud seats are recurring and shared infrastructure. Real-device farms give you local control, predictable latency, and hardware you can audit—hybrid setups are documented when you already use cloud tools.",
  },
  {
    title: "When to choose motherboard boxes",
    body: "Choose a boxed farm when you need 20+ nodes per rack, stable thermals, and factory burn-in. Loose boards only make sense for small pilots with bench power.",
  },
  {
    title: "Network segmentation for device labs",
    body: "For QA labs and enterprise device fleets, we help plan network segmentation, device grouping, and connectivity documentation so each test group can be managed clearly.",
  },
  {
    title: "Connectivity planning",
    body: "Plan a dedicated control PC with powered USB hubs, gigabit switching, and DHCP pools sized for your node count before scaling past one chassis.",
  },
  {
    title: "USB screen projection",
    body: "USB mirroring is the lowest-latency path and is required for first ADB authorization on official ROM tiers. Use powered industrial hubs and short data-rated cables.",
  },
  {
    title: "LAN OTG projection",
    body: "After USB setup, nodes can mirror over the LAN using OTG TCP (port 5555 on official builds). Control PC and farm must share one router subnet—scan farm VLAN only.",
  },
  {
    title: "Group control & sync",
    body: "One master window drives tap and swipe on all selected nodes in a group. Always validate on a test group before production regression windows.",
  },
  {
    title: "Router & VLAN planning",
    body: "Enterprise labs document VLANs, DHCP pools, and router policies per test group. We help map topology during quotes—your IT team owns compliance policy.",
  },
  {
    title: "Why Guangzhou factory supply",
    body: "Since 2017 we assemble, burn-in test, and export pack phone farm chassis in Guangzhou with serial sheets and commercial invoice support for overseas buyers.",
  },
] as const;

export const HOME_SECTIONS = [
  { slug: "samsung-box", name: "Samsung Box" },
  { slug: "xiaomi-box", name: "Xiaomi Box" },
  { slug: "oppo-box", name: "OPPO Box" },
  { slug: "oneplus-box", name: "OnePlus Box" },
  { slug: "pixel-box", name: "Pixel Box" },
  { slug: "usb-hub", name: "Accessories", categories: ["usb-hub", "power-supply", "cooling-solution", "network-equipment", "motherboard-box"] },
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
    desc: "Sync control, batch APK install, file push, ADB scripts, and device grouping by test matrix.",
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

