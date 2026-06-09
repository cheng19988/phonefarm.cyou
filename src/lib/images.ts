/** Image paths — real chassis photos preferred; no office scene art for products. */
const CHASSIS_HERO = "/images/real-factory/box-shots/2025_10_25_11_21_IMG_0547.png";
const CHASSIS_HERO_ALT = "/images/real-factory/box-shots/2025_10_25_11_37_IMG_0566.png";
const WEBP_HERO =
  "/images/hero_1600x900/phonefarm.cyou-product-box-2025-10-25-11-21-img-0547-4b35a-hero_1600x900.webp";
/** Homepage hero — honeycomb chassis with internal trays (user-preferred background) */
const WEBP_HERO_HOME =
  "/images/hero_1600x900/phonefarm.cyou-product-box-2025-10-25-11-37-img-0566-ee21b-hero_1600x900.webp";

export const IMAGES = {
  hero: WEBP_HERO_HOME,
  heroAlt: CHASSIS_HERO_ALT,
  heroFallback: WEBP_HERO,
  heroAltFallback: WEBP_HERO_HOME,
  facility: {
    assembly: "/images/real-factory/photos/2025_05_27_00_28_IMG_0332.JPG",
    burnIn: "/images/real-factory/box-shots/2025_10_25_11_45_IMG_0575.png",
    exportPacking: "/images/real-factory/photos/photo_2025-09-26_12-29-15.jpg",
    warehouse: "/images/real-factory/photos/2025_05_26_23_56_IMG_0310.JPG",
    assemblyLine: "/images/real-factory/box-shots/2025_10_25_11_28_IMG_0553.png",
  },
  diagrams: {
    usbTopology:
      "/images/hero_1600x900/phonefarm.cyou-accessories-networkdevice-cablesaccessoriesshowcase-e6cc8-hero_1600x900.webp",
    lanTopology:
      "/images/hero_1600x900/phonefarm.cyou-accessories-networkdevice-accessories-36665-hero_1600x900.webp",
    controlWorkstation: CHASSIS_HERO_ALT,
  },
  productCards: [
    "/images/card_800x800/phonefarm.cyou-product-box-0f5501e1584de9a625d220f62951bc6d-d04df-card_800x800.webp",
    "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-24-img-0549-f696b-card_800x800.webp",
    "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-27-img-0551-a9b35-card_800x800.webp",
    "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-28-img-0553-47327-card_800x800.webp",
    "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-29-img-0556-25-10-2025-22-02-38-73237-card_800x800.webp",
    "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-33-img-0561-db197-card_800x800.webp",
  ],
  accessories:
    "/images/hero_1600x900/phonefarm.cyou-accessories-networkdevice-cablesaccessoriesshowcase-e6cc8-hero_1600x900.webp",
  controlScene: CHASSIS_HERO,
  officeScene: CHASSIS_HERO_ALT,
  company: {
    office: "/images/company/办公室.png",
    front: "/images/company/前台.png",
    meeting: "/images/company/会议室开会.png",
    production: "/images/company/生产车间.png",
    warehouse: "/images/company/仓库.png",
  },
  og: CHASSIS_HERO,
} as const;

export const FACILITY_GALLERY = [
  { key: "box-1", src: "/images/real-factory/box-shots/2025_10_25_11_21_IMG_0547.png", label: "Phone farm chassis", alt: "Real-device phone farm motherboard box" },
  { key: "box-2", src: "/images/real-factory/box-shots/2025_10_25_11_24_IMG_0549.png", label: "Samsung-class box", alt: "Samsung phone farm box lineup" },
  { key: "box-3", src: "/images/real-factory/box-shots/2025_10_25_11_27_IMG_0551.png", label: "Motherboard tray", alt: "Motherboard tray inside chassis" },
  { key: "factory-1", src: "/images/real-factory/photos/2025_05_27_00_28_IMG_0332.JPG", label: "Assembly floor", alt: "Guangzhou assembly floor" },
  { key: "factory-2", src: "/images/real-factory/photos/photo_2025-09-26_12-29-15.jpg", label: "Export packing", alt: "Export cartons ready for shipment" },
  { key: "box-4", src: "/images/real-factory/box-shots/2025_10_25_11_33_IMG_0561.png", label: "Multi-slot chassis", alt: "Multi-slot phone farm chassis" },
] as const;

export const HOME_TRUST_PHOTOS = [
  { src: "/images/real-factory/box-shots/2025_10_25_11_28_IMG_0553.png", label: "Real-device hardware", alt: "Phone farm box hardware" },
  { src: "/images/real-factory/box-shots/2025_10_25_11_45_IMG_0575.png", label: "Burn-in testing", alt: "Burn-in testing rack" },
  { src: "/images/real-factory/photos/2025_05_26_23_56_IMG_0310.JPG", label: "Factory production", alt: "Guangzhou factory production" },
] as const;
