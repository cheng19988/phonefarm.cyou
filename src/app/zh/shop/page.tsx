import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ShopFilters } from "@/components/ShopFilters";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { REFERENCE_HOMEPAGE_SKUS } from "@/lib/ai-discovery";
import { buildMetadata, collectionPageJsonLd, itemListJsonLd } from "@/lib/seo";
import {
  isControlSoftwareCategory,
  normalizeCategorySlug,
  publicCategoryLabel,
} from "@/lib/catalog";
import { localePath } from "@/lib/i18n/paths";

const ZH_SECTION_LABELS: Record<string, string> = {
  "samsung-box": "三星手机农场机箱",
  "oppo-box": "OPPO 手机农场机箱",
  "xiaomi-box": "小米手机农场机箱",
  "oneplus-box": "一加手机农场机箱",
  "pixel-box": "Google Pixel 手机农场机箱",
  "motherboard-box": "主板机箱",
  "usb-hub": "USB 控制配件",
  "power-supply": "电源",
  "cooling-solution": "散热套件",
  "network-equipment": "网络设备",
  "service-package": "配置服务套餐",
};

function shopGroupKey(category: string) {
  if (isControlSoftwareCategory(category)) return "control-software-services";
  return normalizeCategorySlug(category);
}

function sectionLabel(category: string) {
  if (category === "control-software-services") return "远程控制与群控配置服务";
  const slug = normalizeCategorySlug(category);
  if (isControlSoftwareCategory(slug)) return "远程控制与群控配置服务";
  return ZH_SECTION_LABELS[slug] ?? publicCategoryLabel(slug);
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;

  if (q?.trim()) {
    return buildMetadata({
      locale: "zh",
      title: `商城搜索：${q.trim()}`,
      description: `在 Cyou Phone Farm 搜索手机农场硬件与主板机箱。询价 MOQ、出口包装与配置服务。`,
      path: `/shop?q=${encodeURIComponent(q.trim())}`,
      noIndex: true,
    });
  }

  if (category) {
    const label = sectionLabel(category);
    const slug = normalizeCategorySlug(category);
    return buildMetadata({
      locale: "zh",
      title: `${label} — 手机农场商城目录`,
      description: `浏览广州工厂直供 ${label}。USD 参考价，RFQ 询价 MOQ、交期、出口包装与远程配置。`,
      path: `/shop?category=${slug}`,
      keywords: ["手机农场", "phone farm box", label, "广州手机农场"],
    });
  }

  return buildMetadata({
    locale: "zh",
    title: "手机农场设备商城 — 主板机箱 B2B 硬件",
    description:
      "浏览 Android 手机农场机箱、设备农场硬件与主板机箱。广州 B2B 供应商 — 三星、OPPO、小米、一加、Pixel 参考 SKU，RFQ 询价 MOQ 与出口报价。",
    path: "/shop",
    keywords: [
      "手机农场商城",
      "手机农场机箱",
      "phone farm box",
      "主板机箱",
      "广州手机农场",
      "Android 设备农场",
    ],
  });
}

export default async function ZhShopPage({
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
  const shopBase = localePath("zh", "/shop");

  const shopHeadingTitle = category
    ? sectionLabel(category)
    : q?.trim()
      ? `搜索：${q.trim()}`
      : "手机农场商城";

  const flagshipSlugs = new Set<string>(REFERENCE_HOMEPAGE_SKUS);
  const flagshipList = products
    .filter((p) => flagshipSlugs.has(p.slug))
    .map((p) => ({
      name: p.name,
      url: localePath("zh", `/products/${p.slug}`),
      description: `${p.shortDesc} · USD $${p.priceUsd} 参考价`,
    }));

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: "手机农场设备与主板机箱",
            path: "/zh/shop",
            description: "广州 B2B 手机农场机箱与 Android 设备农场硬件目录。",
          }),
          ...(flagshipList.length > 0
            ? [itemListJsonLd(flagshipList, "Cyou Phone Farm 参考手机农场机箱")]
            : []),
        ]}
      />
      <section className="border-b border-slate-200 bg-white">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading
            as="h1"
            title={shopHeadingTitle}
            subtitle="品牌线主板农场目录 — 三星、OPPO、小米、一加、Pixel。参考价 · 付款前确认最终报价。"
          />
          <p className="mt-4 text-sm text-slate-500">
            {products.length} 个参考 SKU · RFQ 获取书面 BOM、形式发票与出口包装
          </p>
        </div>
      </section>

      <div className="site-container pb-16">
        <Suspense>
          <div className="mt-2">
            <ShopFilters basePath={shopBase} locale="zh" />
          </div>
        </Suspense>

        {products.length === 0 ? (
          <div className="card-premium mt-10 p-10 text-center">
            <p className="text-slate-700">没有匹配的产品。</p>
            <p className="mt-2 text-sm text-slate-500">尝试其他分类或联系销售定制型号。</p>
            <Link href={shopBase} className="link-accent mt-4 inline-block text-sm">
              查看全部目录
            </Link>
          </div>
        ) : showGrouped ? (
          <div className="mt-10 space-y-14">
            {Object.entries(grouped).map(([cat, items]) => (
              <section key={cat}>
                <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                  {sectionLabel(cat)}
                </h2>
                <div className="product-grid mt-6">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} locale="zh" />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="product-grid mt-10">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} locale="zh" />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
