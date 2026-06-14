import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductActions } from "@/components/ProductActions";
import { ProductInquiryPanel } from "@/components/ProductInquiryPanel";
import { JsonLd } from "@/components/JsonLd";
import { productJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getProductProfile } from "@/lib/productProfiles";
import { getProductSummary } from "@/lib/productSummaries";
import {
  buildPublicSpecTable,
  formatReferencePrice,
} from "@/lib/pricing";
import { SITE } from "@/lib/constants";
import { isServiceCatalogItem, publicCategoryLabel } from "@/lib/catalog";
import { QuotationDeliveryNotes } from "@/components/QuotationDeliveryNotes";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { getProductGallery } from "@/lib/product-images";
import { ProductRelatedHelp } from "@/components/ProductRelatedHelp";
import { localePath } from "@/lib/i18n/paths";

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return {};
  const profile = getProductProfile(slug);
  const summary = getProductSummary(slug);
  const isHardware = !isServiceCatalogItem(product.category);
  const desc = profile?.intro ?? summary?.summary ?? product.shortDesc;
  return buildMetadata({
    locale: "zh",
    title: isHardware
      ? `${product.name} 手机农场机箱 | ${SITE.name}`
      : `${product.name} | ${SITE.name}`,
    description: `${desc.slice(0, 120)}… 广州手机农场 B2B 硬件，RFQ 询价 MOQ、交期与出口包装。`,
    path: `/products/${slug}`,
    image: product.imageHero,
    keywords: ["手机农场", "phone farm box", product.name, "广州手机农场"],
  });
}

export default async function ZhProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ contact?: string }>;
}) {
  const { slug } = await params;
  const { contact } = await searchParams;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) notFound();

  const profile = getProductProfile(slug);
  const summary = getProductSummary(slug);
  const specTable = buildPublicSpecTable(
    product.shortDesc,
    product.specs,
    profile?.specOverrides,
    { category: product.category, productType: product.productType }
  );
  const intro = profile?.intro ?? summary?.summary ?? product.description;
  const included = profile?.included ?? parseJson<string[]>(product.delivery, []);
  const recommended =
    profile?.recommendedFor ??
    (summary ? [summary.bestFor] : parseJson<string[]>(product.scenarios, []));
  const setupNotes = profile?.setupNotes ?? summary?.hardwareNote;
  const quoteNote = summary?.quoteNote;
  const faq = profile?.faq ?? parseJson<{ q: string; a: string }[]>(product.faq, []);
  const features = parseJson<string[]>(product.features, []);
  const gallery = getProductGallery(product.slug, product.imageDetail);
  const isHardware = !isServiceCatalogItem(product.category);

  return (
    <div className="site-container py-12 pb-24 lg:pb-12">
      <JsonLd
        data={[
          productJsonLd({
            name: product.name,
            description: intro.slice(0, 160),
            slug: product.slug,
            priceUsd: product.priceUsd,
            image: product.imageHero,
            category: publicCategoryLabel(product.category),
          }),
          breadcrumbJsonLd([
            { name: "首页", path: "/zh" },
            { name: "商城", path: "/zh/shop" },
            { name: product.name, path: `/zh/products/${product.slug}` },
          ]),
        ]}
      />

      <p className="mb-6 text-sm text-slate-500">
        <Link href={localePath("zh", "/shop")} className="link-accent">商城</Link>
        {" · "}
        <Link href={`/products/${product.slug}`} className="link-accent">English product page</Link>
      </p>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-10 md:grid-cols-2">
            <ProductImageGallery images={gallery} name={product.name} />
            <div>
              <p className="text-sm uppercase text-sky-600 font-medium">
                {publicCategoryLabel(product.category)}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                {product.name}
                {isHardware && (
                  <span className="mt-1 block text-lg font-semibold text-slate-600">手机农场机箱 · B2B 参考价</span>
                )}
              </h1>
              <p className="mt-4 text-slate-600 leading-relaxed">{product.shortDesc}</p>
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {isServiceCatalogItem(product.category) ? "服务询价" : "参考价"}
                </p>
                <p className="text-3xl font-bold text-slate-900">{formatReferencePrice(product.priceUsd)}</p>
                <p className="mt-1 text-sm text-slate-500">付款前确认最终报价</p>
              </div>
              <div className="mt-6">
                <ProductActions
                  productId={product.id}
                  slug={product.slug}
                  name={product.name}
                  imageCard={product.imageCard}
                  priceUsd={product.priceUsd}
                  directPurchaseEnabled={product.directPurchaseEnabled}
                  quoteOnly={product.quoteOnly}
                  productType={product.productType}
                  category={product.category}
                />
              </div>
            </div>
          </div>

          <div className="prose-farm mt-12">
            <h2>产品概览</h2>
            <p>{intro}</p>
            {quoteNote && (
              <>
                <h2>报价说明</h2>
                <p>{quoteNote}</p>
              </>
            )}
            {!profile && features.length > 0 && (
              <>
                <h2>主要特点</h2>
                <ul>{features.map((f) => <li key={f}>{f}</li>)}</ul>
              </>
            )}
            <h2>规格与采购</h2>
            <p className="text-sm text-slate-600 not-prose">
              MOQ、交期、包装、重量、电压、保修、物流与付款流程供 B2B 买家参考。付款前请与销售确认形式发票。
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 not-prose">
              <table className="w-full text-sm text-left">
                <tbody>
                  {Object.entries(specTable)
                    .filter(([k]) => k !== "listPriceUsd")
                    .map(([k, v]) => (
                      <tr key={k} className="border-b border-slate-100">
                        <th className="px-4 py-2 text-slate-700 font-medium">{k}</th>
                        <td className="px-4 py-2 text-slate-600">{v}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <h2>包含内容</h2>
            <ul>{included.map((item) => <li key={item}>{item}</li>)}</ul>
            <h2>适用场景</h2>
            <ul>{recommended.map((item) => <li key={item}>{item}</li>)}</ul>
            {setupNotes && (
              <>
                <h2>配置说明</h2>
                <p>{setupNotes}</p>
              </>
            )}
          </div>

          <QuotationDeliveryNotes notes={profile?.quotationDelivery} />

          <ProductRelatedHelp category={product.category} />

          {faq.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-slate-900">MOQ / 交期 / 保修 FAQ</h2>
              <div className="mt-4 max-w-3xl">
                <FaqAccordion items={faq} />
              </div>
            </section>
          )}
        </div>
        <div className="lg:col-span-1">
          <ProductInquiryPanel
            productSlug={product.slug}
            productName={product.name}
            contactStatus={contact}
          />
        </div>
      </div>
    </div>
  );
}
