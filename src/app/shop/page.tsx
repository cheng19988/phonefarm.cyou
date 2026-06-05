import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ContactBar } from "@/components/ContactBar";
import { ShopFilters } from "@/components/ShopFilters";
import { buildMetadata } from "@/lib/seo";
import { publicCategoryLabel } from "@/lib/catalog";

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
  "mirror-vip": "Control software setup services",
  "control-software": "Control software setup services",
  "service-package": "Setup service packages",
};

function sectionLabel(category: string) {
  return SECTION_LABEL_OVERRIDES[category] ?? publicCategoryLabel(category);
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
    (acc[p.category] ??= []).push(p);
    return acc;
  }, {});

  const showGrouped = !category && !q;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Phone Farm Devices & Motherboard Boxes</h1>
      <p className="mt-3 max-w-3xl text-slate-400 leading-relaxed">
        Browse reference configurations for real-device phone farm deployments. Final pricing depends on
        model availability, quantity, shipping destination, and setup requirements.
      </p>
      <p className="mt-2 text-sm text-slate-500">Bulk quote available · Contact sales for MOQ and lead time</p>
      <div className="mt-4">
        <ContactBar />
      </div>
      <Suspense>
        <div className="mt-8">
          <ShopFilters />
        </div>
      </Suspense>
      <p className="mt-6 text-sm text-slate-500">{products.length} catalog items</p>

      {showGrouped ? (
        <div className="mt-8 space-y-12">
          {Object.entries(grouped).map(([cat, items]) => (
            <section key={cat}>
              <h2 className="text-xl font-semibold text-white">
                {sectionLabel(cat)}
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
