/** Related Help Center articles shown on product detail pages (reference parity). */

export type ProductHelpLink = { slug: string; title: string };

const UNIVERSAL: ProductHelpLink[] = [
  { slug: "what-is-phone-farm", title: "What is a phone farm?" },
  { slug: "after-purchase-guide", title: "After receiving your farm" },
  { slug: "device-connection-video-guide", title: "Device connection guide" },
  { slug: "usb-screen-projection", title: "USB screen projection" },
  { slug: "lan-otg-connection", title: "LAN OTG connection" },
  { slug: "otg-mode-connection-tutorial", title: "OTG mode tutorial" },
  { slug: "sync-control-batch-ops", title: "Sync control & batch ops" },
  { slug: "batch-apk-install", title: "Batch APK install" },
  { slug: "control-software-types", title: "Control software types" },
];

const BY_CATEGORY: Record<string, ProductHelpLink[]> = {
  "samsung-box": [
    { slug: "samsung-farm-rom-guidance", title: "Samsung farm ROM guidance" },
    { slug: "samsung-farm-official-rom-flash", title: "Official ROM flash" },
    { slug: "samsung-farm-optimized-rom", title: "Optimized farm ROM" },
  ],
  "oppo-box": [
    { slug: "usb-to-wifi-handoff", title: "USB to WiFi handoff" },
    { slug: "equipment-status-detection", title: "Equipment status detection" },
  ],
  "xiaomi-box": [
    { slug: "adb-scripts-shortcuts", title: "ADB shortcuts" },
    { slug: "usb-power-management", title: "USB power management" },
  ],
  "oneplus-box": [
    { slug: "batch-file-image-transfer", title: "Batch file transfer" },
    { slug: "wallpaper-batch-set", title: "Batch wallpaper setup" },
  ],
  "pixel-box": [
    { slug: "adb-keyboard-input", title: "ADB keyboard input" },
    { slug: "equipment-detection-failures", title: "Detection troubleshooting" },
  ],
  "motherboard-box": [
    { slug: "large-farm-network-deployment", title: "Large farm network deployment" },
    { slug: "router-dhcp-pool-limits", title: "Router DHCP pool limits" },
  ],
  "usb-hub": [{ slug: "usb-power-management", title: "USB hub sizing" }],
  "network-equipment": [
    { slug: "large-farm-network-deployment", title: "Network deployment guide" },
    { slug: "soft-router-user-guide", title: "Soft router documentation" },
  ],
  "mirror-vip": [
    { slug: "mirror-software-vip-overview", title: "Control software setup packages" },
    { slug: "laixi-control-software-guide", title: "Laixi workspace setup" },
    { slug: "cloudphone-control-software-guide", title: "CloudPhone workspace setup" },
    { slug: "whitetiger-control-software-guide", title: "WhiteTiger workspace setup" },
  ],
  "control-software": [
    { slug: "mirror-software-vip-overview", title: "Control software setup packages" },
    { slug: "laixi-control-software-guide", title: "Laixi workspace setup" },
    { slug: "cloudphone-control-software-guide", title: "CloudPhone workspace setup" },
    { slug: "whitetiger-control-software-guide", title: "WhiteTiger workspace setup" },
    { slug: "cloud-phone-subscription-workflow", title: "Cloud phone subscription workflow" },
  ],
};

export function getProductHelpLinks(category: string): ProductHelpLink[] {
  const extra = BY_CATEGORY[category] ?? [];
  const seen = new Set<string>();
  const merged: ProductHelpLink[] = [];
  for (const link of [...extra, ...UNIVERSAL]) {
    if (seen.has(link.slug)) continue;
    seen.add(link.slug);
    merged.push(link);
  }
  return merged.slice(0, 10);
}
