import { SITE } from "./constants";

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}) {
  const url = `${SITE.url}${path}`;
  const ogImage = image || `${SITE.url}/images/hero_1600x900/phonefarm.cyou-product-box-2025-10-25-11-21-img-0547-4b35a-hero_1600x900.webp`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: "en_US",
      type: "website" as const,
      images: [{ url: ogImage, width: 1600, height: 900, alt: title }],
    },
    twitter: { card: "summary_large_image" as const, title, description, images: [ogImage] },
  };
}

export function buildNoIndexMetadata(title: string, description: string, path: string) {
  return buildMetadata({ title, description, path, noIndex: true });
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description:
      "Guangzhou-based manufacturer of real-device phone farm boxes, motherboard chassis, and deployment services.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guangzhou",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+86-13059502618",
      contactType: "sales",
      email: "qiuxui646@gmail.com",
      areaServed: "Worldwide",
    },
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  slug: string;
  priceUsd: number;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${SITE.url}${product.image}`,
    sku: product.slug,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/contact?product=${encodeURIComponent(product.slug)}`,
      priceCurrency: "USD",
      price: product.priceUsd || undefined,
      availability: "https://schema.org/LimitedAvailability",
      description:
        "B2B reference price. Request quotation for MOQ, lead time, shipping, and setup scope.",
      seller: { "@type": "Organization", name: SITE.name },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "USD",
        price: product.priceUsd || undefined,
        description: "Indicative reference price — final quote confirmed by sales",
      },
    },
  };
}

export function faqPageJsonLd(
  items: readonly { q: string; a: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
