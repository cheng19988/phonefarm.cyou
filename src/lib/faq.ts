import { FAQ_REFERENCE_ADDITIONS } from "./help-reference-additions";
import { FAQ_AI_ADDITIONS } from "./faq-ai-additions";

export type FaqItem = { q: string; a: string };

const FAQ_CORE: FaqItem[] = [
  {
    q: "What is a phone farm?",
    a: "A phone farm is a chassis of real Android motherboards with shared power, cooling, and centralized control—optimized versus loose phones on desks. Cyou Phone Farm provides full setup from Guangzhou.",
  },
  {
    q: "What is a phone farm box?",
    a: "A factory-built box housing many battery-free boards with USB/OTG paths to your control PC—typically 20 nodes per 2U chassis.",
  },
  {
    q: "What is a motherboard box?",
    a: "A metal tray system for screenless, battery-less phone mainboards with dedicated cooling and PSU rails.",
  },
  {
    q: "Real device phone farm vs cloud phone?",
    a: "Real devices give authentic hardware fingerprints and local storage. Cloud seats are recurring and shared. We deploy real hardware and can document hybrid bridges if you already use cloud tools.",
  },
  {
    q: "Real device phone farm vs emulator?",
    a: "Emulators diverge from production devices. Our farms use physical boards for app QA testing, device compatibility validation, and automation that must match end-user hardware.",
  },
  {
    q: "Android phone farm vs iPhone phone farm?",
    a: "This shop focuses on Android brand boxes (Samsung, Oppo, Xiaomi, OnePlus, Pixel). iPhone programs are quoted separately.",
  },
  {
    q: "How many devices can one box support?",
    a: "Standard boxes support 20 nodes. Enterprise racks stack multiple boxes for larger fleets.",
  },
  {
    q: "Can you customize hardware?",
    a: "Yes—density, fans, PSU, hubs, and mixed motherboard trays are available.",
  },
  {
    q: "Do you provide remote control software?",
    a: "Yes. We configure mirror workspaces (USB, LAN OTG, WiFi handoff) during Remote Control Configuration—see Help Center.",
  },
  {
    q: "Do you support group control system configuration?",
    a: "Yes—sync control, batch APK, file push, ADB shortcuts, and device groups by test matrix.",
  },
  {
    q: "Do you support overseas shipping?",
    a: "Yes—DHL/FedEx/UPS export from Guangzhou with reinforced packaging.",
  },
  {
    q: "What is the MOQ?",
    a: "Single-box and sample packages available. Bulk discounts typically from 5+ units.",
  },
  {
    q: "Can I buy a sample?",
    a: "Yes—request a sample box quote or a Sample Solution package for evaluation.",
  },
  {
    q: "How long is delivery time?",
    a: "Standard configurations: commonly 7–21 business days after order confirmation, plus transit. Custom builds: 15–30 days depending on scope.",
  },
  {
    q: "How to pay?",
    a: "USD reference prices on the site. Sales confirms the proforma invoice, MOQ, lead time, and agreed payment method before you pay.",
  },
  {
    q: "How to contact sales?",
    a: "Telegram @huicheng1998, WhatsApp +85262155642, email qiuxui646@gmail.com, or the contact form.",
  },
  {
    q: "How do I connect devices after delivery?",
    a: "See Help Center articles for USB projection, LAN OTG, and USB-to-WiFi handoff—we walk through during onboarding.",
  },
  {
    q: "Do you sell third-party control software licenses?",
    a: "We provide setup and configuration services for control software. Customers use their own licensed tools—we do not resell third-party license keys unless explicitly agreed in writing.",
  },
  {
    q: "What are phone farm box dimensions and weight?",
    a: "Standard 20-node 2U chassis: approx. 480×400×88 mm, ~14 kg bare, ~18–22 kg packed for export. See Help: Buyer specifications & logistics.",
  },
  {
    q: "What voltage and power does a phone farm box need?",
    a: "110–220 V AC adaptive PSU (450–550 W rated). Typical draw ~280–420 W at full 20-node USB mirror load. Dedicated 10 A circuit per box recommended.",
  },
  {
    q: "How many farm boxes can one control PC manage?",
    a: "USB mirroring: typically one 20-node box per USB host controller; about two boxes with dual USB controller cards. LAN OTG can add more boxes on the same farm VLAN.",
  },
  {
    q: "Can I get photos before shipment?",
    a: "Yes—pre-shipment chassis and packed-carton photos or short video on request before we seal the export carton. Ask in your quotation or contact form.",
  },
  {
    q: "What is the warranty and RMA process?",
    a: "90-day hardware defect warranty from delivery. Report shipping damage within 7 days with photos. Contact support with burn-in serial for RMA; spare parts from Guangzhou.",
  },
  {
    q: "Do you offer remote installation?",
    a: "Yes—baseline connection guides with hardware; Remote Control Configuration and Starter/Studio/Enterprise packages include screenshare setup. See /services/packages.",
  },
];

function normalizeFaqKey(question: string) {
  return question.toLowerCase().replace(/\s+/g, " ").trim();
}

export function dedupeFaqItems(items: readonly FaqItem[]): FaqItem[] {
  const seen = new Set<string>();
  const unique: FaqItem[] = [];
  for (const item of items) {
    const key = normalizeFaqKey(item.q);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }
  return unique;
}

export const FAQ_ITEMS = dedupeFaqItems([
  ...FAQ_CORE,
  ...FAQ_REFERENCE_ADDITIONS,
  ...FAQ_AI_ADDITIONS,
]);

/** Top questions for homepage accordion + JSON-LD (aligned with /faq, no duplicates). */
export const HOME_FAQ_ITEMS = FAQ_ITEMS.slice(0, 18);
