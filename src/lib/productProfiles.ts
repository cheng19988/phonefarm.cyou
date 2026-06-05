export type ProductProfile = {
  intro: string;
  specOverrides: Record<string, string>;
  included: string[];
  recommendedFor: string[];
  setupNotes: string;
  faq: { q: string; a: string }[];
};

export const PRODUCT_PROFILES: Record<string, ProductProfile> = {
  "samsung-s8-farm-4-64": {
    intro:
      "Entry-tier Samsung farm box for teams starting a 20-node QA lab. Snapdragon 835 / Exynos 8895 boards with 4G+64G and Android 9—cost-effective for compatibility testing and remote device management pilots.",
    specOverrides: {
      Model: "SAMSUNG S8 Farm 4+64",
      CPU: "Snapdragon 835 / Exynos 8895",
      "RAM / Storage": "4G + 64G",
      "Android version": "Android 9",
      "Device count / chassis": "20 nodes per 2U chassis",
      "Control method": "USB projection · LAN OTG optional",
      "Recommended workload": "App compatibility QA · light multi-device ops",
      "Power / cooling notes": "450W adaptive PSU · quad-fan cooling",
      "Optional accessories": "20-port USB hub · gigabit switch kit",
    },
    included: [
      "20-node Samsung S8 motherboard chassis",
      "Adaptive power supply and cooling kit",
      "USB control path documentation",
      "Pre-shipment burn-in serial sheet",
      "Export packing and invoice support",
      "Remote first-connection guidance",
    ],
    recommendedFor: [
      "QA testing labs validating apps on mid-tier SoC",
      "Agency device fleets for remote device management",
      "Enterprise pilot programs before scaling to S10/S22 tiers",
      "App compatibility testing across Android 9 baseline",
    ],
    setupNotes:
      "Mount chassis with rear exhaust clearance, connect powered USB hub to a dedicated host controller, run factory burn-in sheet before grouping nodes, and label each slot to match your control software map.",
    faq: [
      { q: "What is the MOQ?", a: "Single box available. Bulk pricing typically from 5 units." },
      { q: "Lead time?", a: "7–12 business days after payment confirmation for standard config." },
      { q: "Android upgrade path?", a: "Shipped on Android 9 optimized ROM; official ROM available on request." },
      { q: "Cooling under 24/7 load?", a: "Quad-fan layout rated for continuous draw; quarterly fan cleaning recommended." },
      { q: "Shipping?", a: "DHL/FedEx/UPS from Guangzhou with reinforced export carton." },
      { q: "Warranty?", a: "90-day hardware defect coverage; extended SLA for enterprise contracts." },
      { q: "Remote setup included?", a: "Baseline USB onboarding included; full group-control setup is a separate service package." },
    ],
  },
  "samsung-s10-farm-8-128": {
    intro:
      "Mid-range Samsung farm for production QA and multi-device operations. Snapdragon 855 class with 8G+128G and Android 11/12—balanced thermals and stronger multitasking than S8-tier boxes.",
    specOverrides: {
      Model: "SAMSUNG S10 Farm 8+128",
      CPU: "Snapdragon 855 / Exynos 9820",
      "RAM / Storage": "8G + 128G",
      "Android version": "Android 11 / 12",
      "Device count / chassis": "20 nodes per chassis",
      "Control method": "USB · LAN OTG",
      "Recommended workload": "QA device lab · enterprise device deployment",
      "Power / cooling notes": "500W PSU recommended · enhanced fan curve",
    },
    included: [
      "20-node S10 motherboard chassis",
      "PSU, cooling, and internal USB routing",
      "Burn-in report per node",
      "Packing for overseas freight",
      "Remote mirror workspace baseline setup",
    ],
    recommendedFor: [
      "App compatibility testing on flagship-era SoC",
      "Multi-device operations with heavier APK sets",
      "Enterprise device lab expansion",
      "Remote device management at studio scale",
    ],
    setupNotes:
      "Use 500W PSU tier, enable LAN OTG only after USB baseline is stable, configure group labels before batch APK pushes, and schedule quarterly fan cleaning for 24/7 QA loads.",
    faq: [
      { q: "MOQ?", a: "One box; volume discounts from 5+ units." },
      { q: "Lead time?", a: "10–14 business days standard." },
      { q: "Difference vs S8 box?", a: "More RAM, faster SoC, better multitasking for modern apps." },
      { q: "Cooling?", a: "Upgraded fan profile vs S8; monitor chassis temp in summer months." },
      { q: "Shipping weight?", a: "Approx. 18–22 kg packed—quoted per destination." },
      { q: "Warranty?", a: "90-day hardware warranty; spare fans and PSU available." },
      { q: "Setup support?", a: "USB/LAN onboarding included; group policies via Studio Pro package." },
    ],
  },
  "samsung-s22-farm-8-128": {
    intro:
      "Flagship-tier Samsung farm for demanding enterprise device labs. Snapdragon 8 Gen 1, 8G+128G, Android 14—use when your workload needs current-generation performance and longer Android support.",
    specOverrides: {
      Model: "SAMSUNG S22 Farm 8+128",
      CPU: "Snapdragon 8 Gen 1",
      "RAM / Storage": "8G + 128G",
      "Android version": "Android 14",
      "Device count / chassis": "20 nodes",
      "Control method": "USB · LAN OTG · WiFi handoff",
      "Recommended workload": "Enterprise QA · high-throughput device fleet",
      "Power / cooling notes": "550W adaptive PSU · premium fan kit",
    },
    included: [
      "20-node S22 chassis with Gen1 boards",
      "550W PSU and premium cooling",
      "Extended burn-in (48h option)",
      "Export documentation",
      "Remote setup session (2h)",
    ],
    recommendedFor: [
      "Enterprise device deployment programs",
      "QA labs testing on latest Android APIs",
      "High-density remote device management",
      "Teams replacing aging S10 fleets",
    ],
    setupNotes:
      "Deploy with 550W adaptive PSU and premium fan kit, keep ambient below 28°C where possible, wire control PC on gigabit Ethernet for LAN mirror, and document Android 14 branch per node on burn-in sheet.",
    faq: [
      { q: "MOQ?", a: "Single unit; lead time varies with board supply." },
      { q: "Lead time?", a: "14–21 business days depending on board supply." },
      { q: "Why S22 over S10?", a: "Newer Android, faster SoC, better future-proofing for app matrices." },
      { q: "Thermal design?", a: "Premium fan kit; we recommend rack airflow above 25°C ambient." },
      { q: "International shipping?", a: "Full commercial invoice; buyer handles import duties." },
      { q: "Warranty?", a: "90-day standard; 12-month optional on enterprise PO." },
      { q: "Remote setup?", a: "2h screenshare included; annual maintenance available." },
    ],
  },
  "xiaomi-mix-2-farm-6-64": {
    intro:
      "Cost-efficient Xiaomi chassis for multi-device operations. Snapdragon 835 with 6G+64G on Android 10—popular with teams that want Xiaomi-class behavior without flagship pricing.",
    specOverrides: {
      Model: "Xiaomi MIX 2 Farm 6+64",
      CPU: "Snapdragon 835",
      "RAM / Storage": "6G + 64G",
      "Android version": "Android 10",
      "Device count / chassis": "20 nodes",
      "Control method": "USB · LAN OTG",
      "Recommended workload": "QA testing · agency device fleet",
    },
    included: ["Chassis", "PSU", "cooling", "burn-in sheet", "packing", "setup guide"],
    recommendedFor: ["QA device lab", "App compatibility testing", "Remote device management pilots"],
    setupNotes:
      "Confirm MIUI branch with sales before grouping, use standard quad-fan layout, map USB ports 1–20 to node IDs, and run a 24h stability script before production QA scheduling.",
    faq: [
      { q: "MOQ?", a: "1 box." },
      { q: "Lead time?", a: "7–12 days." },
      { q: "Android version fixed?", a: "Android 10 optimized ROM; confirm app requirements with sales." },
      { q: "Cooling adequate?", a: "Yes for 24/7 with scheduled fan maintenance." },
      { q: "Shipping?", a: "Guangzhou export via express freight." },
      { q: "Warranty?", a: "90 days hardware." },
      { q: "Setup?", a: "Remote USB baseline included." },
    ],
  },
  "oppo-find-x2-farm-8-128": {
    intro:
      "Oppo Find X2 farm for teams standardizing on ColorOS-class behavior. Snapdragon 865, 8G+128G, Android 13—solid choice for compatibility testing outside the Samsung ecosystem.",
    specOverrides: {
      Model: "OPPO Find X2 Farm 8+128",
      CPU: "Snapdragon 865",
      "RAM / Storage": "8G + 128G",
      "Android version": "Android 13",
      "Device count / chassis": "20 nodes",
      "Control method": "USB · LAN OTG",
      "Recommended workload": "Enterprise device lab · QA automation",
    },
    included: ["Chassis", "PSU", "cooling", "burn-in", "export pack", "remote onboarding"],
    recommendedFor: ["App compatibility testing", "Multi-device operations", "Enterprise device deployment"],
    setupNotes:
      "Validate ColorOS build against your app matrix, connect via USB first then enable LAN OTG scan range, and separate test groups by ROM branch to avoid mixed-tier installs.",
    faq: [
      { q: "MOQ?", a: "1 unit." },
      { q: "Lead time?", a: "10–14 days." },
      { q: "Oppo vs Samsung?", a: "Choose based on your app OEM targets; we help size either." },
      { q: "Cooling?", a: "Standard quad-fan; monitor in warm climates." },
      { q: "Shipping?", a: "Express export from Guangzhou." },
      { q: "Warranty?", a: "90-day hardware." },
      { q: "Setup?", a: "Included USB/LAN baseline." },
    ],
  },
  "oneplus-9-pro-farm-8-128": {
    intro:
      "OnePlus 9 Pro farm for high-performance QA fleets. Snapdragon 888, 8G+128G, Android 14—when your matrix needs fast SoC and near-stock OxygenOS-class images.",
    specOverrides: {
      Model: "OnePlus 9 Pro Farm 8+128",
      CPU: "Snapdragon 888",
      "RAM / Storage": "8G + 128G",
      "Android version": "Android 14",
      "Device count / chassis": "20 nodes",
      "Control method": "USB · LAN OTG",
      "Recommended workload": "Enterprise QA · device fleet automation",
    },
    included: ["Chassis", "PSU", "cooling", "burn-in", "packing", "remote setup"],
    recommendedFor: ["QA testing", "Enterprise device lab", "Remote device management"],
    setupNotes:
      "888-class nodes need strong intake airflow—avoid stacking boxes without clearance, use powered hub per 20 nodes, and pin OxygenOS-class image version in your CMDB before wide APK rollout.",
    faq: [
      { q: "MOQ?", a: "1 box." },
      { q: "Lead time?", a: "12–16 days." },
      { q: "Thermal notes?", a: "888-class boards need good rack airflow." },
      { q: "Android updates?", a: "Shipped version documented on burn-in sheet." },
      { q: "Shipping?", a: "DHL/FedEx available." },
      { q: "Warranty?", a: "90 days." },
      { q: "Setup?", a: "Remote onboarding included." },
    ],
  },
  "pixel-5-farm-8-128": {
    intro:
      "Google Pixel 5 farm for teams that require Pixel software behavior. Snapdragon 765, 8G+128G, Android 13—ideal for Google Play compatibility and enterprise Pixel-standard QA.",
    specOverrides: {
      Model: "Pixel 5 Farm 8+128",
      CPU: "Snapdragon 765",
      "RAM / Storage": "8G + 128G",
      "Android version": "Android 13",
      "Device count / chassis": "20 nodes",
      "Control method": "USB · LAN OTG",
      "Recommended workload": "Google ecosystem QA · compatibility testing",
    },
    included: ["Pixel 5 chassis", "PSU", "cooling", "burn-in", "export carton", "setup guide"],
    recommendedFor: ["App compatibility testing on Pixel images", "Enterprise device lab", "QA automation"],
    setupNotes:
      "Register Pixel build fingerprints in your test plan, keep USB cables under 1m on mirror paths, and run Google Play services smoke test on canary nodes before fleet-wide validation.",
    faq: [
      { q: "MOQ?", a: "1 unit." },
      { q: "Lead time?", a: "14–18 days (board supply dependent)." },
      { q: "Why Pixel farm?", a: "When your matrix explicitly requires Pixel builds." },
      { q: "Cooling?", a: "765 runs cooler than flagship tiers." },
      { q: "Shipping?", a: "Express export." },
      { q: "Warranty?", a: "90-day hardware." },
      { q: "Setup?", a: "USB onboarding included." },
    ],
  },
  "motherboard-box-20-slot": {
    intro:
      "Empty 20-slot metal chassis for Samsung-class motherboards. Use when you supply boards or want a spare tray for expansion—includes PSU rails and cooling mounts.",
    specOverrides: {
      Model: "20-Slot Motherboard Box",
      "Device count / chassis": "20 slots",
      "Control method": "USB hub ready",
      "Recommended workload": "Expansion tray · spare chassis",
      "Power / cooling notes": "PSU and fans quoted separately",
    },
    included: ["Metal chassis", "Cooling mounts", "Label sheet", "Assembly guide"],
    recommendedFor: ["Farm expansion", "Spare tray inventory", "Custom board programs"],
    setupNotes:
      "Torque board mounts per assembly guide, install PSU and fans before inserting boards, label slots before powering on, and request assembly service from Guangzhou if mixing board generations.",
    faq: [
      { q: "MOQ?", a: "1 chassis." },
      { q: "Lead time?", a: "5–8 days." },
      { q: "Boards included?", a: "No—chassis only unless bundled in a quote." },
      { q: "PSU included?", a: "Quoted separately; we match draw to your board mix." },
      { q: "Shipping?", a: "Lighter than full farms—freight quoted per order." },
      { q: "Warranty?", a: "90 days on chassis fabrication defects." },
      { q: "Assembly service?", a: "Available as add-on from Guangzhou line." },
    ],
  },
  "industrial-usb-hub-20-port": {
    intro:
      "Industrial 20-port powered USB hub matched to a standard 20-node farm. Separates control traffic from the control PC's root controller when scaling hubs.",
    specOverrides: {
      Model: "Industrial 20-Port USB Hub",
      "Recommended workload": "20-node USB control path",
      "Optional accessories": "Secondary hub for 40+ nodes",
    },
    included: ["Hub", "power adapter", "mounting notes"],
    recommendedFor: ["USB mirroring farms", "Control workstation upgrades"],
    setupNotes:
      "Connect hub to dedicated USB root controller, use short shielded cables, document port-to-node map on chassis label, and avoid daisy-chaining consumer hubs on mirror paths.",
    faq: [
      { q: "MOQ?", a: "1 unit." },
      { q: "Lead time?", a: "3–7 days." },
      { q: "Powered?", a: "Yes—required for stable 20-node trees." },
      { q: "Compatible brands?", a: "All our 20-node chassis tiers." },
      { q: "Shipping?", a: "Ships with farm or standalone." },
      { q: "Warranty?", a: "6 months on hub electronics." },
      { q: "Setup help?", a: "Port map documented in help center." },
    ],
  },
  "gigabit-farm-network-kit": {
    intro:
      "Baseline gigabit router/switch/cabling kit for LAN OTG fleets. Sized for one control PC and one 20-node subnet—expand with VLAN plan for multi-box sites.",
    specOverrides: {
      Model: "Gigabit Farm Network Kit",
      "Recommended workload": "LAN OTG · 20–40 node subnet",
    },
    included: ["Router or switch tier per quote", "Cabling baseline", "IP plan template"],
    recommendedFor: ["LAN OTG deployments", "Multi-box enterprise sites"],
    setupNotes:
      "Wire control PC on same subnet as farm VLAN, expand DHCP pool before adding nodes, maintain updated port map diagram, and review proxy egress policy with sales if tests require regional IP separation.",
    faq: [
      { q: "MOQ?", a: "1 kit." },
      { q: "Lead time?", a: "5–10 days." },
      { q: "Config included?", a: "IP template + remote review; on-site by quote." },
      { q: "WiFi handoff?", a: "Documented in help center; AP count depends on mirror count." },
      { q: "Shipping?", a: "With hardware or standalone." },
      { q: "Warranty?", a: "Manufacturer warranty on network gear." },
      { q: "Support?", a: "Network BOM review in Enterprise package." },
    ],
  },
};

export function getProductProfile(slug: string) {
  return PRODUCT_PROFILES[slug];
}
