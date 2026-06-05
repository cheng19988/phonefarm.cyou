import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductActions } from "@/components/ProductActions";
import { ContactBar } from "@/components/ContactBar";
import { JsonLd } from "@/components/JsonLd";
import { productJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { FaqAccordion } from "@/components/FaqAccordion";

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
  return buildMetadata({
    title: product.name,
    description: product.shortDesc,
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

  const features = parseJson<string[]>(product.features, []);
  const specs = parseJson<Record<string, string>>(product.specs, {});
  const scenarios = parseJson<string[]>(product.scenarios, []);
  const accessories = parseJson<string[]>(product.accessories, []);
  const delivery = parseJson<string[]>(product.delivery, []);
  const maintenance = parseJson<string[]>(product.maintenance, []);
  const miniFaq = parseJson<{ q: string; a: string }[]>(product.faq, []);
  const listPrice = (specs as { listPriceUsd?: number }).listPriceUsd;
  const inStock = product.stock > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <JsonLd
        data={[
          productJsonLd({
            name: product.name,
            description: product.shortDesc,
            slug: product.slug,
            priceUsd: product.priceUsd,
            stock: product.stock,
            image: product.imageHero,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-800">
          <Image src={product.imageDetail} alt={product.name} fill className="object-cover" priority />
        </div>
        <div>
          <p className="text-sm uppercase text-cyan-500">{product.category.replace(/-/g, " ")}</p>
          <h1 className="mt-2 text-3xl font-bold text-white">{product.name}</h1>
          <p className="mt-4 text-slate-400">{product.shortDesc}</p>
          <div className="mt-4">
            {product.priceUsd > 0 ? (
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-bold text-white">${product.priceUsd.toFixed(2)}</p>
                {listPrice && (
                  <p className="text-xl text-slate-500 line-through">${listPrice.toFixed(2)}</p>
                )}
              </div>
            ) : (
              <p className="text-2xl font-bold text-amber-400">Contact for Quote</p>
            )}
            <p className={`text-sm ${inStock ? "text-emerald-400" : "text-red-400"}`}>
              {inStock ? `${product.stock} in stock` : "Out of stock — contact for lead time"}
            </p>
          </div>
          <div className="mt-6">
            <ProductActions
              productId={product.id}
              slug={product.slug}
              name={product.name}
              imageCard={product.imageCard}
              priceUsd={product.priceUsd}
              inStock={inStock}
            />
          </div>
          <div className="mt-6">
            <ContactBar />
          </div>
        </div>
      </div>

      <div className="prose-farm mt-16 max-w-4xl">
        <h2>Product Introduction</h2>
        <p>{product.description}</p>
        <h2>Key Features</h2>
        <ul>{features.map((f) => <li key={f}>{f}</li>)}</ul>
        <h2>Technical Parameters</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm text-left">
            <tbody>
              {Object.entries(specs).map(([k, v]) => (
                <tr key={k} className="border-b border-slate-800">
                  <th className="px-4 py-2 text-slate-300">{k}</th>
                  <td className="px-4 py-2 text-slate-400">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2>Use Cases</h2>
        <ul>{scenarios.map((s) => <li key={s}>{s}</li>)}</ul>
        <h2>Accessories</h2>
        <ul>{accessories.map((a) => <li key={a}>{a}</li>)}</ul>
        <h2>Delivery Package</h2>
        <ul>{delivery.map((d) => <li key={d}>{d}</li>)}</ul>
        <h2>Maintenance</h2>
        <ul>{maintenance.map((m) => <li key={m}>{m}</li>)}</ul>
      </div>

      {miniFaq.length > 0 && (
        <section className="mt-12 max-w-3xl">
          <h2 className="text-xl font-bold text-white">Product FAQ</h2>
          <div className="mt-4">
            <FaqAccordion items={miniFaq} />
          </div>
        </section>
      )}
    </div>
  );
}
