/** Image paths under /public/images — phonefarm.cyou site pack + company photos */
export const IMAGES = {
  hero: "/images/hero_1600x900/phonefarm.cyou-product-box-2025-10-25-11-21-img-0547-4b35a-hero_1600x900.webp",
  heroAlt: "/images/hero_1600x900/phonefarm.cyou-product-box-2025-10-25-11-37-img-0566-ee21b-hero_1600x900.webp",
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
  og: "/images/hero_1600x900/phonefarm.cyou-product-box-2025-10-25-11-21-img-0547-4b35a-hero_1600x900.webp",
} as const;

export const FACILITY_GALLERY = [
  { key: "assembly", src: IMAGES.facility.assembly, label: "Assembly floor", alt: "Cyou Phone Farm assembly bench in Guangzhou" },
  { key: "burnIn", src: IMAGES.facility.burnIn, label: "Burn-in & QA", alt: "Pre-shipment burn-in and testing station" },
  { key: "exportPacking", src: IMAGES.facility.exportPacking, label: "Export packing", alt: "Export cartons prepared for overseas shipment" },
  { key: "warehouse", src: IMAGES.facility.warehouse, label: "Guangzhou warehouse", alt: "Warehouse inventory and outbound staging" },
  { key: "assemblyLine", src: IMAGES.facility.assemblyLine, label: "Motherboard tray build", alt: "Motherboard tray assembly line" },
] as const;

export const HOME_TRUST_PHOTOS = [
  { src: IMAGES.facility.assembly, label: "Assembly bench", alt: "Factory assembly bench with phone farm chassis" },
  { src: IMAGES.facility.burnIn, label: "Burn-in testing", alt: "Burn-in and QA testing before shipment" },
  { src: IMAGES.facility.exportPacking, label: "Export packing", alt: "Export packing and ready-to-ship pallets" },
] as const;
