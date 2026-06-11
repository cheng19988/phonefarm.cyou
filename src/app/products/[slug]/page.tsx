import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductActions } from "@/components/ProductActions";
import { ProductInquiryPanel } from "@/components/ProductInquiryPanel";
import { JsonLd } from "@/components/JsonLd";
import { productJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getProductProfile } from "@/lib/productProfiles";
import { getProductSummary } from "@/lib/productSummaries";
import { buildPublicSpecTable, formatReferencePrice } from "@/lib/pricing";
import { isServiceCatalogItem, publicCategoryLabel } from "@/lib/catalog";
import { QuotationDeliveryNotes } from "@/components/QuotationDeliveryNotes";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { getProductGallery } from "@/lib/product-images";

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
  return buildMetadata({
    title: product.name,
    description: profile?.intro ?? summary?.summary ?? product.shortDesc,
    path: `/products/${slug}`,
    image: product.imageHero,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) notFound();

  const profile = getProductProfile(slug);
  const summary = getProductSummary(slug);
  const specTable = buildPublicSpecTable(
    product.shortDesc,
    product.specs,
    profile?.specOverrides
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
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-10 md:grid-cols-2">
            <ProductImageGallery images={gallery} name={product.name} />
            <div>
              <p className="text-sm uppercase text-sky-600 font-medium">{publicCategoryLabel(product.category)}</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">{product.name}</h1>
              <p className="mt-4 text-slate-600 leading-relaxed">{product.shortDesc}</p>
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {isServiceCatalogItem(product.category) ? "Service quote" : "Reference price"}
                </p>
                <p className="text-3xl font-bold text-slate-900">{formatReferencePrice(product.priceUsd)}</p>
                <p className="mt-1 text-sm text-slate-500">
                  Bulk quote available · availability confirmed by sales · configuration confirmed before invoice
                </p>
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
            <h2>Overview</h2>
            <p>{intro}</p>
            {quoteNote && (
              <>
                <h2>Quote note</h2>
                <p>{quoteNote}</p>
              </>
            )}
            {!profile && features.length > 0 && (
              <>
                <h2>Key features</h2>
                <ul>{features.map((f) => <li key={f}>{f}</li>)}</ul>
              </>
            )}
            <h2>Specification table</h2>
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
            <h2>What is included</h2>
            <ul>{included.map((item) => <li key={item}>{item}</li>)}</ul>
            <h2>Recommended for</h2>
            <ul>{recommended.map((item) => <li key={item}>{item}</li>)}</ul>
            {setupNotes && (
              <>
                <h2>Setup notes</h2>
                <p>{setupNotes}</p>
              </>
            )}
          </div>

          <QuotationDeliveryNotes notes={profile?.quotationDelivery} />

          {faq.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-slate-900">MOQ / lead time / warranty FAQ</h2>
              <div className="mt-4 max-w-3xl">
                <FaqAccordion items={faq} />
              </div>
            </section>
          )}
        </div>
        <div className="lg:col-span-1">
          <ProductInquiryPanel productSlug={product.slug} productName={product.name} />
        </div>
      </div>
    </div>
  );
}
