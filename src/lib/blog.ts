import { BLOG_BODIES } from "./blog-bodies";

export const BLOG_POSTS = [
  {
    slug: "phone-farm-box-crashes-lessons",
    title: "Phone Farm Box Stability: Lessons from Real Deployments",
    category: "Applications & Use Cases",
    date: "2026-05-15",
    excerpt:
      "Thermal drift, weak PSUs, and loose USB paths cause downtime—how Cyou Phone Farm deployment QA prevents costly crashes.",
  },
  {
    slug: "s8-vs-n5-box-comparison",
    title: "S8+ 20-Node vs N5+ Starter: Which Box Fits Your Workload?",
    category: "Hardware & Selection",
    date: "2026-04-17",
    excerpt:
      "Compare Snapdragon 835 stability against Exynos entry kits for marketers, testers, and studio matrices.",
  },
  {
    slug: "budget-phone-farm-under-500",
    title: "Budget Phone Farm Under $500: Smart Hardware Choices",
    category: "Setup & Tutorials",
    date: "2026-04-15",
    excerpt:
      "Stretch budget with the right chassis tier, hub, and cooling—without gambling on mystery boxes.",
  },
  {
    slug: "choose-phone-farm-box-cpu-cooling",
    title: "How to Choose a Phone Farm Box: CPU, Cooling, Scalability",
    category: "Hardware & Selection",
    date: "2026-03-27",
    excerpt:
      "CPU tier, fan layout, and stackable design matter more than marketing photos—factory engineer checklist.",
  },
  {
    slug: "bulk-apk-install-guide",
    title: "Bulk APK Installation on Multi-Device Control Software",
    category: "Setup & Tutorials",
    date: "2026-03-20",
    excerpt:
      "Step-by-step bulk APK push across grouped devices from your control workstation.",
  },
  {
    slug: "adb-shortcuts-setup",
    title: "ADB Command Shortcuts for Phone Farm Operators",
    category: "Setup & Tutorials",
    date: "2026-02-27",
    excerpt:
      "Map frequent ADB actions to context menus—speed up provisioning without custom scripts.",
  },
  {
    slug: "phone-farming-profitable-2026",
    title: "Is Phone Farming Still Viable in 2026 for Real Businesses?",
    category: "Applications & Use Cases",
    date: "2026-02-12",
    excerpt:
      "Where legitimate multi-device ops still win—and why real hardware beats shortcuts.",
  },
  {
    slug: "build-phone-farm-2026-guide",
    title: "Build a Phone Farm in 2026: From Chaos to Control",
    category: "Setup & Tutorials",
    date: "2026-01-20",
    excerpt:
      "Room-to-rack evolution: power, cooling, control PC sizing, and overseas shipping tips.",
  },
  {
    slug: "laixi-cloudphone-whitetiger-mirror-guide",
    title: "Laixi vs CloudPhone vs WhiteTiger: Mirror Software for Phone Farms",
    category: "Setup & Tutorials",
    date: "2026-06-01",
    excerpt:
      "Compare leading Android group-control mirror stacks—USB projection, LAN OTG, batch APK, and when to license each on real hardware.",
  },
  {
    slug: "samsung-s22-phone-farm-box-guide",
    title: "Samsung S22 Phone Farm Box: Specs, Price, and QA Use Cases",
    category: "Hardware & Selection",
    date: "2026-06-05",
    excerpt:
      "Snapdragon 8 Gen 1, Android 14, and ~$1,500 reference pricing for modern Samsung farm chassis buyers.",
  },
  {
    slug: "cloud-phone-subscription-hybrid-labs",
    title: "Cloud Phone Subscriptions in Hybrid Device Labs",
    category: "Applications & Use Cases",
    date: "2026-06-08",
    excerpt:
      "How to add vendor cloud seats to Laixi or CloudPhone while keeping real motherboard farms for release QA.",
  },
] as const;

/** Posts with full article bodies — listed on /blog and included in sitemap. */
export const PUBLISHED_BLOG_POSTS = BLOG_POSTS.filter((p) => Boolean(BLOG_BODIES[p.slug]));

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function hasFullBlogBody(slug: string) {
  return Boolean(BLOG_BODIES[slug]);
}
