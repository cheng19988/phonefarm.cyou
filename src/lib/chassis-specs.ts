/**
 * Reference physical specs for Cyou Phone Farm standard 20-node motherboard chassis.
 * Values are factory reference — exact batch measurements are confirmed on proforma / burn-in sheet.
 */
export const STANDARD_20_NODE_CHASSIS = {
  formFactor: "2U rack-style metal chassis (stackable; maintain rear exhaust clearance)",
  dimensionsMm: {
    length: 480,
    width: 400,
    height: 88,
    formatted: "480 × 400 × 88 mm (L × W × H, approximate)",
  },
  dimensionsNote:
    "External size for standard 20-node motherboard box. Custom trays or mixed-SKU builds may differ slightly (±10 mm per production batch).",
  weightKg: {
    bare: 14,
    packed: 20,
    formatted: "~14 kg bare chassis · ~18–22 kg packed for export",
  },
  weightNote: "Packed weight includes PSU, fans, foam bracing, and export carton. Flagship SoC tiers may add ~1–2 kg.",
  power: {
    psuRatedWatts: 550,
    psuEntryTierWatts: 450,
    inputVoltage: "110–220 V AC, 50/60 Hz adaptive PSU",
    plugNote: "IEC C13/C14 class inlet; region plug lead or local adapter quoted per destination country.",
    typicalDrawWatts: "280–420 W continuous at full 20-node load (SoC tier and mirror resolution dependent)",
    peakDrawNote: "Brief higher draw during simultaneous cold boot — size circuit with 25% headroom above nominal.",
    recommendedCircuit: "Dedicated 10 A circuit per box (or monitored PDU outlet per chassis)",
  },
  nodesPerChassis: 20,
} as const;

/** How many farm boxes one control PC typically manages (buyer-facing summary). */
export const CONTROL_PC_SCALE_GUIDANCE = {
  usbOneBox:
    "USB screen mirroring: one industrial powered hub + one USB host controller → typically **one 20-node box** reliably.",
  usbTwoBoxes:
    "Up to **~40 nodes (2 boxes)** on one workstation when using **two independent USB controller cards** and validated hub topology (not a laptop with a single root hub).",
  lanExpansion:
    "LAN OTG path: after USB authorization, additional boxes on the same farm VLAN can mirror over Ethernet — scale is limited by mirror software, switch, and operator layout, not only USB ports.",
  backupPc:
    "Deployments above **40 nodes** should plan a **primary + backup control PC** and documented VLAN/DHCP design.",
  enterpriseReview:
    "Enterprise Deployment packages include control PC and network BOM review before you connect multi-rack sites.",
} as const;

export const PRE_SHIPMENT_MEDIA = {
  summary:
    "Pre-shipment photos or a short factory video are available on request before the export carton is sealed.",
  includes: [
    "Chassis exterior and node tray overview",
    "Burn-in serial sheet snapshot",
    "Packed carton with handling labels (before carrier pickup)",
  ],
  howToRequest: "Ask in your quotation email or contact form — include order number or proforma reference.",
} as const;

export const RMA_GUIDANCE = {
  warrantyDays: 90,
  shippingDamageReportDays: 7,
  summary:
    "90-day hardware defect warranty from delivery date. Report transit damage within 7 days with photos. RMA spare parts shipped from Guangzhou stock when diagnostics confirm manufacturing fault.",
  steps: [
    "Message WhatsApp/Telegram with order number, node serial from burn-in sheet, and photos/video of the fault.",
    "Support confirms whether the issue is warranty-covered (manufacturing defect vs hub overload, unauthorized ROM, or environmental damage).",
    "Approved cases: spare board/fan/PSU shipment or return-to-factory repair — path confirmed in writing.",
    "Keep original export packaging for RMA eligibility when return shipment is required.",
  ],
  exclusions: [
    "Unauthorized ROM flashes",
    "Consumer USB hub overload",
    "Liquid, impact, or incorrect mains voltage",
    "Missing serial / burn-in mismatch after customer modification",
  ],
} as const;

export const SUPPORTED_PHONE_LINES_SUMMARY =
  "Samsung, Oppo, Xiaomi, OnePlus, and Google Pixel motherboard farm boxes — each shop SKU lists SoC, RAM/storage, and Android branch. Empty chassis and accessories are quoted separately.";
