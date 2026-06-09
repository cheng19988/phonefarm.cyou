import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ShopFilters } from "@/components/ShopFilters";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import {
  CONTROL_SOFTWARE_SERVICES_SECTION,
  isControlSoftwareCategory,
  normalizeCategorySlug,
  publicCategoryLabel,
} from "@/lib/catalog";

const SECTION_LABEL_OVERRIDES: Record<string, string> = {
  "samsung-box": "Samsung phone farm boxes",
  "oppo-box": "Oppo phone farm boxes",
  "xiaomi-box": "Xiaomi phone farm boxes",
  "oneplus-box": "OnePlus phone farm boxes",
  "pixel-box": "Google Pixel phone farm boxes",
  "motherboard-box": "Motherboard chassis",
  "usb-hub": "USB control accessories",
  "power-supply": "Power supplies",
  "cooling-solution": "Cooling kits",
  "network-equipment": "Network equipment",
  "service-package": "Setup service packages",
};

function shopGroupKey(category: string) {
  if (isControlSoftwareCategory(category)) return "control-software-services";
  return normalizeCategorySlug(category);
}

function sectionLabel(category: string) {
  if (category === "control-software-services") return CONTROL_SOFTWARE_SERVICES_SECTION;
  const slug = normalizeCategorySlug(category);
  if (isControlSoftwareCategory(slug)) return CONTROL_SOFTWARE_SERVICES_SECTION;
  return SECTION_LABEL_OVERRIDES[slug] ?? publicCategoryLabel(slug);
}

export const metadata = buildMetadata({
  title: "Phone Farm Devices & Motherboard Boxes",
  description:
    "Browse reference configurations for real-device phone farm deployments. Final pricing depends on model availability, quantity, shipping destination, and setup requirements.",
  path: "/shop",
});

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q } },
              { shortDesc: { contains: q } },
              { category: { contains: q } },
            ],
          }
        : {}),
    },
    orderBy: [{ category: "asc" }, { priceUsd: "desc" }],
  });

  const grouped = products.reduce<Record<string, typeof products>>((acc, p) => {
    const key = shopGroupKey(p.category);
    (acc[key] ??= []).push(p);
    return acc;
  }, {});

  const showGrouped = !category && !q;

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
          <SectionHeading
            title="Phone farm shop"
            subtitle="Browse reference configurations for real-device deployments. Final pricing depends on model availability, quantity, shipping destination, and setup requirements."
          />
          <p className="mt-4 text-sm text-slate-500">{products.length} catalog items · Bulk quote available</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16">
        <Suspense>
          <div className="mt-2">
            <ShopFilters />
          </div>
        </Suspense>

        {showGrouped ? (
          <div className="mt-10 space-y-14">
            {Object.entries(grouped).map(([cat, items]) => (
              <section key={cat}>
                <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                  {sectionLabel(cat)}
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
