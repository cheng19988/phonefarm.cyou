import { ALL_HARDWARE_CATALOG } from "./hardware-catalog";
import { parseShortDescHardware } from "./pricing";

export type ProductSummary = {
  summary: string;
  bestFor: string;
  hardwareNote: string;
  quoteNote: string;
};

function catalogDerivedSummary(slug: string): ProductSummary | undefined {
  const item = ALL_HARDWARE_CATALOG.find((p) => p.slug === slug);
  if (!item) return undefined;
  const hw = parseShortDescHardware(item.shortDesc);
  const cpu = hw.cpu ?? "See specification table";
  const ram = hw.ram ?? "See specification table";
  const android = hw.android ?? "Documented on burn-in sheet";
  return {
    summary: `${item.name} ships as a factory-assembled 20-node motherboard chassis from Cyou Phone Farm, Guangzhou. ${item.shortDesc}`,
    bestFor: `App QA testing, device compatibility labs, and enterprise device fleets running ${cpu.split("/")[0].trim()} class SoC hardware.`,
    hardwareNote: `Quad-fan cooling and adaptive PSU; RAM/storage ${ram}; Android ${android}. Plan rack airflow for 24/7 operation.`,
    quoteNote:
      "Reference USD price on shop. Sales confirms MOQ, lead time, export packing, and remote setup scope before invoice.",
  };
}

/** Light differentiation for SKUs without full productProfiles entries. */
export const PRODUCT_SUMMARIES: Record<string, ProductSummary> = {
  "samsung-s8-farm-4-64": {
    summary: "Snapdragon 835 S8+ tier with 4G+64G—workhorse chassis for Android 9 compatibility labs and long-run stability testing.",
    bestFor: "Entry enterprise device labs and studios standardizing on proven 835 thermals.",
    hardwareNote: "835 boards are mature for 24/7 burn-in; plan quarterly fan cleaning in warm rooms.",
    quoteNote: "Share destination country and node count; we confirm board availability and export lead time.",
  },
  "samsung-s10-farm-8-128": {
    summary: "Snapdragon 855 S10 tier with 8G+128G—stronger multitasking for modern APK sets and heavier logging during QA.",
    bestFor: "Teams moving from S8/S9 fleets who need Android 10–11 matrix coverage.",
    hardwareNote: "855 thermals need solid rack airflow; include spare fan kit in warm-site quotes.",
    quoteNote: "Bulk MOQ typically discussed from 5+ boxes; sample single-box evaluation available.",
  },
  "samsung-s9-farm-6-64": {
    summary: "Snapdragon 845 / Exynos 9810 tier with 6G+64G—step up from S8 when your QA matrix needs Android 10 and stronger multitasking.",
    bestFor: "Mid-size app compatibility labs moving off S8 fleets.",
    hardwareNote: "845-class thermals sit between S8 and S10; plan standard quad-fan maintenance.",
    quoteNote: "Share target Android apps and node count; we confirm board mix and lead time.",
  },
  "samsung-s22-farm-8-128": {
    summary: "Snapdragon 8 Gen 1 flagship tier with 8G+128G and Android 14—for enterprise labs that need current-generation Samsung performance.",
    bestFor: "High-throughput QA matrices and modern Android 14 compatibility testing.",
    hardwareNote: "550W PSU tier recommended; premium fan kit for warm rooms and 24/7 loads.",
    quoteNote: "Flagship pricing; bulk MOQ and lead time confirmed by sales before payment.",
  },
  "oppo-find-x2-pro-farm-12-256": {
    summary: "Flagship Oppo chassis with 12G+256G storage for heavier APK sets and longer on-device test data retention.",
    bestFor: "ColorOS compatibility testing with large app bundles and media assets.",
    hardwareNote: "Extra RAM helps parallel WebView and logging during stability runs.",
    quoteNote: "Quote includes export packing; bulk pricing from 5+ units.",
  },
  "oppo-find-x3-neo-farm-8-128": {
    summary: "Snapdragon 888 Oppo farm for teams standardizing on newer ColorOS builds with 8G+128G balance.",
    bestFor: "Enterprise device labs testing on 888-class performance without max storage SKU cost.",
    hardwareNote: "888 boards need solid rack airflow—spec premium fan kit in warm sites.",
    quoteNote: "MOQ 1 box; lead time quoted after board availability check.",
  },
  "oppo-reno5-pro-farm-8-128": {
    summary: "Dimensity 1000+ Reno farm for MTK behavior coverage alongside Snapdragon Oppo lines.",
    bestFor: "OEM matrix expansion when apps must validate on Dimensity paths.",
    hardwareNote: "Uniform MTK tier across all nodes in the box for script consistency.",
    quoteNote: "Tell sales if you need matched Dimensity firmware branch for CI.",
  },
  "xiaomi-6x-a2-farm-4-64": {
    summary: "Entry Xiaomi chassis on Snapdragon 660—budget-friendly nodes for light compatibility sweeps.",
    bestFor: "Pilot labs and secondary device pools for low-intensity QA scripts.",
    hardwareNote: "660 tier is not for heavy video encode; size workloads accordingly.",
    quoteNote: "Ideal sample tier before committing to MIX 2 or Mi 8 boxes.",
  },
  "xiaomi-8se-farm-6-64": {
    summary: "Snapdragon 710 Xiaomi farm with 6G+64G for mid-tier MIUI behavior without flagship cost.",
    bestFor: "Regional MIUI builds and mid-range device compatibility matrices.",
    hardwareNote: "710 runs cooler than 845; good for dense desk deployments.",
    quoteNote: "Reference price assumes standard 20-node chassis configuration.",
  },
  "xiaomi-8-farm-8-128": {
    summary: "Snapdragon 845 Mi 8 farm with 8G+128G for stronger multitasking on MIUI 10-era images.",
    bestFor: "Teams needing Xiaomi flagship-era performance below MIX-tier pricing.",
    hardwareNote: "845 USB stability benefits from industrial powered hub on control path.",
    quoteNote: "Bundled with burn-in sheet and remote USB onboarding baseline.",
  },
  "oneplus-3-farm-6-64": {
    summary: "Legacy OnePlus 3 boards on Snapdragon 820 for Android 8 baseline and long-running legacy app support.",
    bestFor: "Maintaining minimum API floors for older enterprise APK branches.",
    hardwareNote: "820 tier is end-of-life for heavy apps—confirm workload with sales first.",
    quoteNote: "Limited board supply; lead time may exceed standard Samsung tiers.",
  },
  "oneplus-8-pro-farm-8-128": {
    summary: "OnePlus 8 Pro farm with 12G+256G on Snapdragon 865 for high-memory QA and large test artifacts.",
    bestFor: "OxygenOS-class testing with storage headroom for logging and captures.",
    hardwareNote: "865 + 12G handles parallel installs better than 6G entry tiers.",
    quoteNote: "Enterprise PO and extended warranty available on request.",
  },
  "oneplus-11-farm-16-256": {
    summary: "Current-gen OnePlus 11 farm on Snapdragon 8 Gen 2 with 12G+256G for latest Android API testing.",
    bestFor: "Forward-looking QA labs validating on newest OnePlus software branches.",
    hardwareNote: "Gen 2 thermals require premium cooling and documented rack clearance.",
    quoteNote: "Flagship tier—sales confirms PSU and fan kit match continuous draw.",
  },
  "pixel-4a-farm-6-128": {
    summary: "Compact Pixel 4a farm for teams needing mid-tier Google software behavior on a smaller memory footprint.",
    bestFor: "Pixel-specific compatibility checks below Pixel 5 price point.",
    hardwareNote: "6G RAM suits standard UI tests; avoid heavy parallel Gradle on-node.",
    quoteNote: "Pixel board supply fluctuates—confirm lead time before project lock-in.",
  },
  "pixel-6-farm-8-128": {
    summary: "Google Tensor Pixel 6 farm for modern Google Play compatibility and Android 16-era validation.",
    bestFor: "App teams with explicit Tensor hardware requirements in the test matrix.",
    hardwareNote: "Tensor thermals differ from Snapdragon—follow Cyou cooling guide for Pixel tier.",
    quoteNote: "Includes export documentation; setup session available as add-on.",
  },
  "pixel-7-pro-farm-12-128": {
    summary: "Top-tier Pixel 7 Pro farm with 12G+128G Tensor nodes for flagship Google ecosystem QA.",
    bestFor: "Enterprise labs requiring latest Pixel builds and maximum per-node performance.",
    hardwareNote: "Highest Pixel farm tier—plan dedicated circuit and airflow for 24/7 runs.",
    quoteNote: "Quote on request when list shows reference pricing only.",
  },
  "mirror-setup-basic-renewal": {
    summary: "Remote onboarding for your chosen control workspace—USB paths, device discovery, and operator handover.",
    bestFor: "First-time buyers connecting a single 20-node box to a control PC.",
    hardwareNote: "Service assumes hardware already passed factory burn-in.",
    quoteNote: "From $350 reference · book after hardware ETA; include control PC OS and tool name.",
  },
  "mirror-setup-cloud-bridge": {
    summary: "Multi-monitor layout, LAN scan ranges, and operator accounts for studio-scale control workstations.",
    bestFor: "Teams scaling past one monitor or mixing USB with LAN OTG discovery.",
    hardwareNote: "Requires stable wired Ethernet between control PC and farm subnet.",
    quoteNote: "Scoped per site; VLAN plans reviewed before session.",
  },
  "mirror-setup-annual-pro": {
    summary: "Quarterly health review covering fans, PSU headroom, and control-stack update planning.",
    bestFor: "Operations teams running 24/7 device labs who want scheduled check-ins.",
    hardwareNote: "Remote review uses logs and screenshare—no on-site visit unless quoted.",
    quoteNote: "Annual contract; aligns with enterprise SLA packages.",
  },
  "group-control-onboarding": {
    summary: "Group policies, batch APK map, and ADB script baseline for one farm under your control suite.",
    bestFor: "Labs ready to move from manual mirroring to grouped device operations.",
    hardwareNote: "All nodes should be Online and labeled before onboarding session.",
    quoteNote: "Specify control software brand when requesting quote.",
  },
  "package-starter-setup": {
    summary: "Box consult, remote baseline connection, and seven-day messaging support for new deployments.",
    bestFor: "Overseas buyers validating first shipment and control path.",
    hardwareNote: "Covers one chassis tier; multi-box sites upgrade to Studio Pro.",
    quoteNote: "Often bundled with first hardware PO—ask sales for package pricing.",
  },
  "package-studio-pro": {
    summary: "Multi-box grouping, bulk APK policy, and thirty-day support for growing device labs.",
    bestFor: "Studios expanding from one box to a small fleet with unified policies.",
    hardwareNote: "Includes network BOM review template for LAN OTG sites.",
    quoteNote: "Custom node count and SLA hours confirmed in written scope.",
  },
  "package-enterprise-deploy": {
    summary: "Custom cabinet layout, commissioning checklist, and SLA-backed deployment for large sites.",
    bestFor: "Enterprise device fleets and distributor rollouts with formal acceptance testing.",
    hardwareNote: "On-site or remote commissioning per region and quote.",
    quoteNote: "Price on application—submit floor plan and target node count.",
  },
  "adaptive-power-supply-550w": {
    summary: "110–220V adaptive PSU sized for continuous draw on 20-node flagship-tier farms.",
    bestFor: "Replacing weak PSUs or spec-ing new S22 / 888-class deployments.",
    hardwareNote: "Match PSU to measured draw—sales calculates headroom from your board mix.",
    quoteNote: "Ships standalone or bundled with chassis quote.",
  },
  "quad-fan-cooling-kit": {
    summary: "Four-fan replacement kit maintaining target airflow for 24/7 chassis operation.",
    bestFor: "Maintenance spares and warm-climate sites needing refreshed cooling.",
    hardwareNote: "Standard sizes for Cyou chassis—confirm chassis generation before order.",
    quoteNote: "Low MOQ; often added to hardware PO for spare parts inventory.",
  },
  "motherboard-box-20-slot": {
    summary: "Empty 20-slot metal chassis for Samsung-class motherboard trays—shared PSU path, cooling rails, and export packing.",
    bestFor: "Buyers sourcing bare chassis to populate with their own board inventory or phased rollouts.",
    hardwareNote: "Tray spacing matches standard Cyou Samsung/Oppo tier; confirm board generation before mix-and-match.",
    quoteNote: "Often paired with hub, PSU, and cooling kit—ask for bundled accessory quote.",
  },
  "industrial-usb-hub-20-port": {
    summary: "Industrial powered USB hub matched to 20-node farms—stable enumeration for long USB cable runs.",
    bestFor: "Replacing consumer hubs that drop nodes during overnight burn-in.",
    hardwareNote: "Use dedicated host controllers on the control PC for 40+ total ports.",
    quoteNote: "Specify chassis tier and cable length; sales matches hub firmware tier.",
  },
  "gigabit-farm-network-kit": {
    summary: "Router, switch, and cabling baseline for LAN OTG discovery on a dedicated farm subnet.",
    bestFor: "Sites moving from USB-only mirroring to LAN OTG at 20–40 nodes.",
    hardwareNote: "Consumer WiFi APs limit concurrent mirrors—plan wired LAN for production walls.",
    quoteNote: "Include target node count and rack layout for switch port sizing.",
  },
};

export function getProductSummary(slug: string) {
  return PRODUCT_SUMMARIES[slug] ?? catalogDerivedSummary(slug);
}
