export type QuotationDelivery = {
  priceNote: string;
  moq: string;
  leadTime: string;
  packing: string;
  accessories: string;
  remoteSetup: string;
  warranty: string;
};

export const DEFAULT_QUOTATION_DELIVERY: QuotationDelivery = {
  priceNote:
    "Reference price depends on board availability, quantity, and accessory bundle. Sales confirms the proforma invoice before any payment.",
  moq: "Single box or accessory unit available for evaluation. Volume pricing typically discussed from 5+ boxes.",
  leadTime:
    "Standard configurations are commonly quoted at 7–21 business days after order confirmation. Custom mixes may take longer.",
  packing:
    "Foam-braced export carton, accessory checklist inside the lid, serial burn-in sheet, and commercial invoice for customs.",
  accessories:
    "USB hub, PSU tier, cooling kit, and network kit are quoted to match your control method and node count.",
  remoteSetup:
    "Baseline USB connection guidance included with hardware. Full control-workstation setup is available as a service package.",
  warranty:
    "90-day hardware defect coverage on chassis and bundled PSU/fans. Spare parts available from Guangzhou stock.",
};

export const BUYER_TRUST_ITEMS = [
  {
    title: "Guangzhou-based hardware sourcing and assembly",
    desc: "Motherboard trays, PSU rails, fan kits, and USB routing are assembled and labeled in our Guangzhou facility—not drop-shipped from unnamed third parties.",
    imageLabel: "factory assembly bench",
  },
  {
    title: "Real-device motherboard box configurations",
    desc: "Each quote specifies SoC tier, RAM/storage, Android branch, and node count per chassis so your QA matrix stays uniform.",
    imageLabel: "motherboard tray layout",
  },
  {
    title: "Pre-shipment burn-in and connectivity check",
    desc: "Nodes are cold-booted, control-connected, and logged on a serial sheet before the export carton is sealed.",
    imageLabel: "pre-shipment testing",
  },
  {
    title: "Export packing for overseas buyers",
    desc: "Anti-shock foam, accessory checklist, commercial invoice support, and carrier handoff documentation for DHL/FedEx/UPS.",
    imageLabel: "export packing",
  },
  {
    title: "Remote setup guidance after delivery",
    desc: "Screenshare onboarding for first USB or LAN connection, group labeling, and a troubleshooting checklist your operators can follow.",
    imageLabel: "remote setup session",
  },
  {
    title: "Spare parts and accessory support",
    desc: "Fans, PSU units, USB hubs, and empty trays are stocked in Guangzhou for RMA and expansion—not only initial shipment.",
    imageLabel: "spare parts shelf",
  },
  {
    title: "WhatsApp / Telegram after-sales communication",
    desc: "Direct messaging with the sales and support desk during US/EU-friendly hours for day-two connection issues.",
    imageLabel: "support channel",
  },
] as const;

export const DELIVERY_SOP = [
  {
    step: 1,
    title: "Requirement confirmation",
    deliverables: [
      "Written scope: device model and SoC tier",
      "Target quantity and spare-tray needs",
      "Control method: USB, LAN OTG, or undecided",
      "Destination country and voltage preference",
      "Accessory list: hub, PSU, cooling, network kit",
    ],
  },
  {
    step: 2,
    title: "Hardware preparation",
    deliverables: [
      "Motherboard box or chassis assembly",
      "Matched adaptive power supply",
      "Cooling fan kit installed and labeled",
      "USB hub or LAN OTG accessories when quoted",
      "Slot-to-port map prepared for control PC",
    ],
  },
  {
    step: 3,
    title: "System and connectivity check",
    deliverables: [
      "Android boot test on each node",
      "USB debugging and control connection check",
      "Thermal observation under short load",
      "Network connection check when LAN path is ordered",
      "Burn-in serial sheet signed off",
    ],
  },
  {
    step: 4,
    title: "Packing and shipment",
    deliverables: [
      "Anti-shock inner foam and corner bracing",
      "Accessory checklist taped inside lid",
      "Export carton labeling with handling marks",
      "Commercial invoice and packing list",
      "Logistics handoff to express carrier",
    ],
  },
  {
    step: 5,
    title: "Remote handover",
    deliverables: [
      "Basic connection guidance for your control PC",
      "Control workstation layout suggestion",
      "Troubleshooting checklist for first 72 hours",
      "WhatsApp / Telegram / email support channel",
      "Escalation path for RMA or spare parts",
    ],
  },
] as const;

export const LEGAL_USE_CASES = [
  "App QA testing",
  "Mobile device lab",
  "Device compatibility testing",
  "Enterprise device fleet",
  "Remote device management",
  "Batch APK deployment for internal testing",
  "Long-duration stability testing",
  "Control workstation setup",
  "Hardware deployment support",
] as const;
