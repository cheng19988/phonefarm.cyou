import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ContactForm } from "@/components/ContactForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { BrandProductSection } from "@/components/BrandProductSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustStatsBar } from "@/components/TrustStatsBar";
import { CONTACT, HOME_SECTIONS, SITE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { ZH_HOME_FAQ } from "@/lib/i18n/zh-content";
import { localePath } from "@/lib/i18n/paths";
import { buildMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { isServiceCatalogItem } from "@/lib/catalog";

export const metadata = buildMetadata({
  locale: "zh",
  title: "手机农场机箱制造商 | Phone Farm Box 广州工厂 B2B",
  description:
    "广州手机农场（phone farm）机箱制造商，自 2017 年工厂直供。真实 Android 主板农场、三星/OPPO/小米/一加/Pixel 品牌线、远程群控配置、全球出口与 RFQ 形式发票订购。",
  path: "/",
  keywords: [
    "手机农场",
    "phone farm",
    "手机农场机箱",
    "phone farm box",
    "手机农场厂家",
    "广州手机农场",
    "Android 设备农场",
    "主板机箱",
  ],
});

async function productsForSection(section: (typeof HOME_SECTIONS)[number]) {
  const rows =
    "categories" in section && section.categories
      ? await prisma.product.findMany({
          where: { published: true, category: { in: [...section.categories] } },
          take: 16,
          orderBy: { priceUsd: "asc" },
        })
      : await prisma.product.findMany({
          where: { published: true, category: section.slug },
          take: 16,
          orderBy: { priceUsd: "asc" },
        });

  return rows.filter((p) => !isServiceCatalogItem(p.category)).slice(0, 8);
}

const ZH_SECTION_NAMES: Record<string, string> = {
  samsung: "三星手机农场机箱",
  oppo: "OPPO 手机农场机箱",
  xiaomi: "小米手机农场机箱",
  oneplus: "一加手机农场机箱",
  pixel: "Google Pixel 手机农场机箱",
  motherboard: "主板机箱",
};

export default async function ZhHomePage() {
  const sections = await Promise.all(
    HOME_SECTIONS.map(async (section) => ({
      section,
      products: await productsForSection(section),
    }))
  );

  return (
    <>
      <JsonLd
        data={[
          faqPageJsonLd(ZH_HOME_FAQ),
          webPageJsonLd({
            name: `${SITE.name} — 手机农场机箱制造商`,
            description:
              "广州手机农场机箱制造商，真实 Android 主板农场、远程配置与全球 B2B 出口。",
            path: "/",
            locale: "zh",
          }),
        ]}
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="site-container py-12 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold text-sky-800">
                {SITE.location} | 工厂直供 | 自 {SITE.since} 年
              </div>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[2.75rem]">
                手机农场机箱制造商
                <span className="mt-2 block text-2xl font-semibold text-sky-700 sm:text-3xl">
                  Phone Farm Box · 真实 Android 设备农场
                </span>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600 lg:text-lg">
                B2B 手机农场硬件 — 三星、OPPO、小米、一加、Pixel 品牌线主板机箱。批量 RFQ 询价、全球出口、远程群控配置可选。
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                <strong className="font-medium text-slate-700">订购方式：</strong>
                批量与出口订单先收形式发票（MOQ、交期）再付款。部分标准 SKU 可在销售确认后使用 USDT TRC20 结账。
              </p>
              <ul className="mt-6 space-y-3 text-base text-slate-600 lg:text-lg">
                {[
                  "真实 Android 主板机箱 — 广州工厂组装",
                  "工程师配置远程投屏与群控系统",
                  "出口包装、全球物流与售后支持",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                      +
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={localePath("zh", "/contact")} className="btn-primary px-7 py-3.5 text-base shadow-lg shadow-sky-500/20">
                  索取报价
                </Link>
                <Link href={localePath("zh", "/shop")} className="btn-secondary px-7 py-3.5 text-base">
                  浏览商城
                </Link>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-emerald px-7 py-3.5 text-base"
                >
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="relative lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-lg">
                <Image
                  src={IMAGES.heroChassisTransparent}
                  alt="手机农场机箱产品图"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width:1024px) 100vw, 55vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustStatsBar />

      <section className="site-container py-16">
        <SectionHeading
          title="产品与技术说明"
          subtitle="面向专业 QA、远程设备管理与企业部署的真实设备农场硬件选型参考。"
        />
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href={localePath("zh", "/phone-farm")} className="link-accent">
            什么是手机农场？
          </Link>
          <Link href={localePath("zh", "/shop")} className="link-accent">
            浏览全部机箱 SKU
          </Link>
          <Link href={localePath("zh", "/contact")} className="link-accent">
            联系销售询价
          </Link>
        </div>
      </section>

      {sections.map(({ section, products }) => (
        <BrandProductSection
          key={section.slug}
          slug={section.slug}
          name={ZH_SECTION_NAMES[section.slug] ?? section.name}
          products={products}
          categoryHref={`${localePath("zh", "/shop")}?category=${"categories" in section && section.categories ? section.categories[0] : section.slug}`}
          locale="zh"
        />
      ))}

      <section className="border-t border-slate-200 py-16">
        <div className="site-container">
          <SectionHeading title="常见问题" actionHref={localePath("zh", "/faq")} actionLabel="全部 FAQ" />
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={ZH_HOME_FAQ.slice(0, 6)} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-slate-200 bg-sky-50 py-20">
        <div className="relative site-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900">索取手机农场报价</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                请提供品牌线、节点数量、目的国与连接方式。销售回复书面 BOM、MOQ、QC 范围与形式发票 — 网站仅为参考价。
              </p>
            </div>
            <div className="card-premium p-6">
              <ContactForm source="zh-home-cta" variant="compact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
