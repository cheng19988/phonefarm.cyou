/** Image paths under /public/images — site pack + local real photos (sync-local-assets.ps1) */
const REAL_HERO = "/images/real-factory/slides/slide-01.png";
const REAL_HERO_ALT = "/images/real-factory/slides/slide-02.png";
const WEBP_HERO =
  "/images/hero_1600x900/phonefarm.cyou-product-box-2025-10-25-11-21-img-0547-4b35a-hero_1600x900.webp";
const WEBP_HERO_ALT =
  "/images/hero_1600x900/phonefarm.cyou-product-box-2025-10-25-11-37-img-0566-ee21b-hero_1600x900.webp";

export const IMAGES = {
  hero: REAL_HERO,
  heroAlt: REAL_HERO_ALT,
  heroFallback: WEBP_HERO,
  heroAltFallback: WEBP_HERO_ALT,
  facility: {
    assembly: "/images/company/生产车间.png",
    burnIn: "/images/company/1b4a6930-9fa5-45d3-a705-015e8b1e7df9.png",
    exportPacking: "/images/company/58f94f04-bf34-4e3d-9a0a-285477ae66e2.png",
    warehouse: "/images/company/仓库.png",
    assemblyLine: "/images/company/e25cc4f5-ca12-4530-935e-2c9fc630d411.png",
  },
  diagrams: {
    usbTopology:
      "/images/hero_1600x900/phonefarm.cyou-accessories-networkdevice-cablesaccessoriesshowcase-e6cc8-hero_1600x900.webp",
    lanTopology:
      "/images/hero_1600x900/phonefarm.cyou-accessories-networkdevice-accessories-36665-hero_1600x900.webp",
    controlWorkstation:
      "/images/hero_1600x900/phonefarm.cyou-service-scenes-moderntechoffice-devicecontrol-2663b-hero_1600x900.webp",
  },
  productCards: [
    "/images/card_800x800/phonefarm.cyou-product-box-0f5501e1584de9a625d220f62951bc6d-d04df-card_800x800.webp",
    "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-24-img-0549-f696b-card_800x800.webp",
    "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-27-img-0551-a9b35-card_800x800.webp",
    "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-28-img-0553-47327-card_800x800.webp",
    "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-29-img-0556-25-10-2025-22-02-38-73237-card_800x800.webp",
    "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-33-img-0561-db197-card_800x800.webp",
  ],
  accessories: "/images/hero_1600x900/phonefarm.cyou-accessories-networkdevice-cablesaccessoriesshowcase-e6cc8-hero_1600x900.webp",
  controlScene:
    "/images/hero_1600x900/phonefarm.cyou-service-scenes-moderndevicemanagementcontrol-ae6b9-hero_1600x900.webp",
  officeScene:
    "/images/hero_1600x900/phonefarm.cyou-service-scenes-modernofficephonetestingworkspace-f7056-hero_1600x900.webp",
  company: {
    office: "/images/company/办公室.png",
    front: "/images/company/前台.png",
    meeting: "/images/company/会议室开会.png",
    production: "/images/company/生产车间.png",
    warehouse: "/images/company/仓库.png",
  },
  og: REAL_HERO,
} as const;

export const FACILITY_GALLERY = [
  { key: "facility-1", src: "/images/real-factory/slides/slide-03.png", label: "Phone farm chassis", alt: "Real-device phone farm motherboard box lineup" },
  { key: "facility-2", src: "/images/real-factory/slides/slide-04.png", label: "Assembly overview", alt: "Guangzhou assembly and integration overview" },
  { key: "facility-3", src: "/images/real-factory/slides/slide-05.png", label: "Burn-in & QA", alt: "Burn-in testing before export shipment" },
  { key: "facility-4", src: "/images/real-factory/slides/slide-06.png", label: "Export packing", alt: "Export cartons prepared for overseas buyers" },
  { key: "facility-5", src: "/images/real-factory/slides/slide-07.png", label: "Factory floor", alt: "Cyou Phone Farm production floor in Guangzhou" },
  { key: "facility-6", src: "/images/real-factory/slides/slide-08.png", label: "Motherboard trays", alt: "Motherboard tray build and labeling" },
] as const;

export const HOME_TRUST_PHOTOS = [
  { src: "/images/real-factory/slides/slide-09.png", label: "Real-device hardware", alt: "Real Android motherboard phone farm boxes" },
  { src: "/images/real-factory/slides/slide-10.png", label: "Burn-in testing", alt: "Burn-in and QA testing station" },
  { src: "/images/real-factory/slides/slide-11.png", label: "Export ready", alt: "Export packing and logistics preparation" },
] as const;
