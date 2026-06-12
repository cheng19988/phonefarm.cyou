import { HELP_EXPANDED } from "./help-expanded";
import { HELP_SUPPLEMENT } from "./help-supplement";
import { HELP_REFERENCE_ARTICLES } from "./help-reference-additions";
import { HELP_REFERENCE_EXPANDED } from "./help-reference-expanded";

export const HELP_CATEGORIES = [
  { id: "buying", name: "Buying & Logistics" },
  { id: "getting-started", name: "Getting Started" },
  { id: "connection", name: "Device Connection" },
  { id: "network", name: "Network & Router" },
  { id: "control", name: "Control & Group Ops" },
  { id: "firmware", name: "Firmware & ROM" },
  { id: "troubleshooting", name: "Troubleshooting" },
] as const;

const BASE_HELP_ARTICLES = [
  {
    slug: "what-is-phone-farm",
    category: "getting-started",
    title: "What is a Phone Farm?",
    excerpt: "How real-device farms improve on loose-phone group control.",
    body: `A phone farm is an integrated chassis of real Android motherboards—without screens or batteries—running under shared power, cooling, and USB/LAN control. Cyou Phone Farm deploys factory-built boxes from Guangzhou with documented network and control policies.`,
  },
  {
    slug: "single-device-single-ip",
    category: "getting-started",
    title: "Network Segmentation for Device Labs",
    excerpt: "Device grouping and connectivity planning for QA labs and enterprise fleets.",
    body: `For QA labs and enterprise device fleets, we help plan network segmentation, device grouping, and connectivity documentation so each test group can be managed clearly. Contact sales for a topology review before scaling past one box.`,
  },
  {
    slug: "after-purchase-guide",
    category: "getting-started",
    title: "Instructions After Receiving Your Phone Farm",
    excerpt: "Unboxing, burn-in, and first connection checklist.",
    body: `1. Inspect packaging and PSU labels. 2. Connect control PC and one box via USB. 3. Run device detection. 4. Apply group labels. 5. Open support ticket on Telegram/WhatsApp if any node fails burn-in.`,
  },
  {
    slug: "device-connection-video-guide",
    category: "getting-started",
    title: "Device Connection Video Guide",
    excerpt: "Visual walkthrough for first-time USB and LAN setup.",
    body: `Watch our Help Center sequence: USB projection → LAN OTG scan → optional WiFi handoff. Cyou Phone Farm provides remote onboarding during Starter or Studio Pro packages. Contact sales for a live screenshare session.`,
  },
  {
    slug: "usb-screen-projection",
    category: "connection",
    title: "USB Screen Projection Connection",
    excerpt: "Connect official and optimized system boxes over USB.",
    body: `Plug the farm box into a powered USB hub path to the control PC. For official Android builds, we provide ADB authorization file placement instructions during Remote Control Configuration. Optimized/root boxes may skip extra auth steps.`,
  },
  {
    slug: "lan-otg-connection",
    category: "connection",
    title: "LAN OTG Screen Projection",
    excerpt: "Same-router scanning and IP segment adds.",
    body: `Ensure PC and farm share one router. Official boxes may require USB-first enable of OTG TCP 5555 before WiFi/LAN scan. Optimized boxes often ship with network mirroring enabled—use Add LAN Device and segment scan in your mirror tool.`,
  },
  {
    slug: "usb-to-wifi-handoff",
    category: "connection",
    title: "USB Device to WiFi Connection",
    excerpt: "When to hand off and router capacity guidance.",
    body: `Right-click a connected device and switch to LAN/WiFi mode to drop the USB cable. Ordinary routers handle ~5–10 mirrors; enterprise APs can exceed 20. Use WiFi handoff sparingly on large motherboard walls to avoid voltage-related drops.`,
  },
  {
    slug: "equipment-status-detection",
    category: "troubleshooting",
    title: "Equipment Status Detection",
    excerpt: "Find offline nodes quickly.",
    body: `Use the device detection panel in your control software. If a node fails after group sync, re-seat USB, swap hub port, and compare serial in our burn-in sheet. Escalate to Cyou support with the node ID.`,
  },
  {
    slug: "sync-control-batch-ops",
    category: "control",
    title: "Sync Control & Batch Operations",
    excerpt: "Master window, grouping, and one-click select.",
    body: `Fixed window: one-click select on the left rail controls all selected units. Floating master: use the group control button. Combine with device groups for test-group batch taps, APK pushes, and file transfers.`,
  },
  {
    slug: "batch-apk-install",
    category: "control",
    title: "Batch APK Installation",
    excerpt: "Multi-select install workflow.",
    body: `Select target devices → batch install → choose APK set. Failed installs usually indicate incompatible APK splits—test one APK on a single node before fleet push.`,
  },
  {
    slug: "adb-scripts-shortcuts",
    category: "control",
    title: "ADB Commands & Script Shortcuts",
    excerpt: "Save repeatable automation without full IDE.",
    body: `Map frequent ADB actions to buttons during Group Control System Setup. Advanced teams use script windows for chained commands with guard timeouts.`,
  },
  {
    slug: "otg-mode-connection-tutorial",
    category: "connection",
    title: "Tutorial: Connect Phone Farm in OTG Mode",
    excerpt: "Step-by-step OTG TCP enablement before LAN scan.",
    body: `For official ROM boxes: connect USB first, run OTG TCP 5555 shortcut from your mirror tool, then switch to LAN scan on the same subnet. Optimized ROM boxes from Cyou often skip this—verify in your burn-in report.`,
  },
  {
    slug: "large-farm-network-deployment",
    category: "network",
    title: "Recommended Network Plan for Large Phone Farms",
    excerpt: "VLANs, uplinks, and AP placement for 40+ nodes.",
    body: `Split control PCs and farm subnets, dedicate gigabit switches per rack, cap WiFi mirrors per AP, and document DHCP pools. We provide a network BOM review during Enterprise Deployment packages.`,
  },
  {
    slug: "router-dhcp-pool-limits",
    category: "network",
    title: "Router DHCP Pool & Connection Limits",
    excerpt: "Avoid DHCP exhaustion when scaling devices.",
    body: `Expand DHCP pools above default consumer limits, reserve IPs for control PCs, and enable per-port isolation where proxies require unique egress paths.`,
  },
  {
    slug: "samsung-farm-rom-guidance",
    category: "firmware",
    title: "Samsung Farm ROM Update Guidance",
    excerpt: "When to flash optimized ROM vs stay on official builds.",
    body: `Official ROM requires ADB auth files; optimized ROM enables faster LAN mirroring. Cyou ships boxes with documented ROM tier—do not flash unknown images without factory support.`,
  },
  {
    slug: "motherboard-bios-xhci-note",
    category: "firmware",
    title: "Workstation BIOS: USB/XHCI Notes",
    excerpt: "Stability tips for control PCs driving many hubs.",
    body: `Disable problematic XHCI handoff on legacy boards if USB tree drops nodes. Use powered hubs and separate controllers for 60+ ports.`,
  },
] as const;

const BASE_SLUGS = new Set<string>(BASE_HELP_ARTICLES.map((a) => a.slug));

export const HELP_ARTICLES = [
  ...BASE_HELP_ARTICLES,
  ...HELP_REFERENCE_ARTICLES.filter((a) => !BASE_SLUGS.has(a.slug)),
];

export function getHelpArticle(slug: string) {
  const article = HELP_ARTICLES.find((a) => a.slug === slug);
  if (!article) return undefined;
  const expanded = HELP_EXPANDED[slug];
  const supplement = HELP_SUPPLEMENT[slug];
  const referenceExpanded = HELP_REFERENCE_EXPANDED[slug];
  if (expanded) return { ...article, body: expanded };
  if (supplement) return { ...article, body: supplement };
  if (referenceExpanded) return { ...article, body: referenceExpanded };
  return article;
}
