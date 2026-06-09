/** Chassis / product-box images only — never office or workstation scenes. */
export const CHASSIS_PRODUCT_IMAGES = [
  "/images/real-factory/box-shots/2025_10_25_11_21_IMG_0547.png",
  "/images/real-factory/box-shots/2025_10_25_11_24_IMG_0549.png",
  "/images/real-factory/box-shots/2025_10_25_11_27_IMG_0551.png",
  "/images/real-factory/box-shots/2025_10_25_11_28_IMG_0553.png",
  "/images/real-factory/box-shots/2025_10_25_11_33_IMG_0561.png",
  "/images/real-factory/box-shots/2025_10_25_11_37_IMG_0566.png",
  "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-24-img-0549-f696b-card_800x800.webp",
  "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-27-img-0551-a9b35-card_800x800.webp",
  "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-28-img-0553-47327-card_800x800.webp",
  "/images/card_800x800/phonefarm.cyou-product-box-2025-10-25-11-33-img-0561-db197-card_800x800.webp",
] as const;

export function chassisImageByIndex(index: number): string {
  return CHASSIS_PRODUCT_IMAGES[index % CHASSIS_PRODUCT_IMAGES.length];
}
