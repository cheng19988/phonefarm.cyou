import { AI_KNOWS_ABOUT } from "./ai-discovery";
import { SITE } from "./constants";
import { SITE_PRIMARY_LANGUAGE, SITE_PRIMARY_LOCALE } from "./site-language";

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
    alternates: {
      canonical: url,
      languages: { en: url, "x-default": url },
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE_PRIMARY_LOCALE.replace("-", "_"),
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
    "@type": ["Organization", "Manufacturer"],
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE_PRIMARY_LANGUAGE,
    foundingDate: String(SITE.since),
    description:
      "Guangzhou-based manufacturer and supplier of real-device phone farm boxes, motherboard chassis, remote control setup, and worldwide export.",
    knowsAbout: AI_KNOWS_ABOUT,
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guangzhou",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "qiuxui646@gmail.com",
      url: "https://t.me/huicheng1998",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
    sameAs: ["https://t.me/huicheng1998"],
  };
}

export function itemListJsonLd(
  items: readonly { name: string; url: string; description?: string }[],
  listName: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      description: item.description,
      url: item.url.startsWith("http") ? item.url : `${SITE.url}${item.url}`,
    })),
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

export function articleJsonLd(article: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  image?: string;
  type?: "Article" | "TechArticle" | "BlogPosting";
}) {
  const url = `${SITE.url}${article.path}`;
  const image = article.image?.startsWith("http")
    ? article.image
    : `${SITE.url}${article.image ?? "/images/real-factory/box-shots/2025_10_25_11_21_IMG_0547.png"}`;
  return {
    "@context": "https://schema.org",
    "@type": article.type ?? "Article",
    headline: article.title,
    description: article.description,
    url,
    image,
    datePublished: article.datePublished ?? "2017-01-01",
    dateModified: article.datePublished ?? "2026-06-01",
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/images/real-factory/box-shots/2025_10_25_11_21_IMG_0547.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.intro,
    inLanguage: SITE_PRIMARY_LANGUAGE,
    publisher: { "@type": "Organization", name: SITE.name },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/shop?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
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

export function contactPageJsonLd() {
  const url = `${SITE.url}/contact`;
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Sales — Request a Quotation",
    description:
      "Request a phone farm quotation from Cyou Phone Farm. Share node count, destination, and control method for MOQ, lead time, and proforma invoice.",
    url,
    inLanguage: SITE_PRIMARY_LANGUAGE,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "qiuxui646@gmail.com",
        url: "https://t.me/huicheng1998",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    },
  };
}

export function collectionPageJsonLd({
  name,
  path,
  description,
}: {
  name: string;
  path: string;
  description: string;
}) {
  const url = `${SITE.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    inLanguage: SITE_PRIMARY_LANGUAGE,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };
}
