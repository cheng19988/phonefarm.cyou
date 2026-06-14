import { AI_KNOWS_ABOUT } from "./ai-discovery";
import { CONTACT, SITE } from "./constants";
import type { Locale } from "./i18n/config";
import { buildLanguageAlternates, localePath } from "./i18n/paths";
import {
  SITE_PRIMARY_LANGUAGE,
  SITE_PRIMARY_LOCALE,
  SITE_SECONDARY_LANGUAGE,
  SITE_SECONDARY_LOCALE,
} from "./site-language";

const DEFAULT_OG_IMAGE = `${SITE.url}/images/hero_1600x900/phonefarm.cyou-product-box-2025-10-25-11-21-img-0547-4b35a-hero_1600x900.webp`;

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
  keywords,
  locale = "en",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  locale?: Locale;
}) {
  const sitePath = path === "/" ? "" : path;
  const canonicalPath = localePath(locale, sitePath);
  const url = `${SITE.url}${canonicalPath === "/" ? "" : canonicalPath}`;
  const ogImage = image || DEFAULT_OG_IMAGE;
  const trimmedDescription =
    description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description;
  const ogLocale = locale === "zh" ? SITE_SECONDARY_LOCALE.replace("-", "_") : SITE_PRIMARY_LOCALE.replace("-", "_");
  const ogAlternate =
    locale === "zh"
      ? [SITE_PRIMARY_LOCALE.replace("-", "_")]
      : [SITE_SECONDARY_LOCALE.replace("-", "_")];

  return {
    title,
    description: trimmedDescription,
    keywords: keywords?.length ? keywords : undefined,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(sitePath),
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" as const },
        },
    openGraph: {
      title,
      description: trimmedDescription,
      url,
      siteName: SITE.name,
      locale: ogLocale,
      alternateLocale: ogAlternate,
      type: "website" as const,
      images: [{ url: ogImage, width: 1600, height: 900, alt: title }],
    },
    twitter: { card: "summary_large_image" as const, title, description: trimmedDescription, images: [ogImage] },
  };
}

export function buildNoIndexMetadata(title: string, description: string, path: string) {
  return buildMetadata({ title, description, path, noIndex: true });
}

export function organizationJsonLd() {
  const logo = `${SITE.url}/images/real-factory/box-shots/2025_10_25_11_21_IMG_0547.png`;
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Manufacturer"],
    name: SITE.name,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: logo },
    image: logo,
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
      email: CONTACT.email,
      telephone: CONTACT.phoneDisplay,
      url: `${SITE.url}/contact`,
      areaServed: "Worldwide",
      availableLanguage: ["English", "Chinese"],
    },
    sameAs: [CONTACT.telegramUrl, CONTACT.whatsappUrl],
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
  category?: string;
}) {
  const productUrl = `${SITE.url}/products/${product.slug}`;
  const offerUrl = `${SITE.url}/contact?product=${encodeURIComponent(product.slug)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${SITE.url}${product.image}`,
    sku: product.slug,
    url: productUrl,
    category: product.category,
    itemCondition: "https://schema.org/NewCondition",
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      url: offerUrl,
      priceCurrency: "USD",
      price: product.priceUsd > 0 ? product.priceUsd : undefined,
      availability: "https://schema.org/LimitedAvailability",
      itemCondition: "https://schema.org/NewCondition",
      description:
        "B2B reference price. Request quotation for MOQ, lead time, shipping, and setup scope.",
      seller: { "@type": "Organization", name: SITE.name, url: SITE.url },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "USD",
        price: product.priceUsd > 0 ? product.priceUsd : undefined,
        description: "Reference price — final quote confirmed before payment",
      },
    },
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
  locale = "en",
}: {
  name: string;
  description: string;
  path: string;
  locale?: Locale;
}) {
  const canonicalPath = localePath(locale, path === "/" ? "" : path);
  const url = `${SITE.url}${canonicalPath === "/" ? "" : canonicalPath}`;
  const inLanguage = locale === "zh" ? SITE_SECONDARY_LANGUAGE : SITE_PRIMARY_LANGUAGE;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    inLanguage,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
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
  const logo = `${SITE.url}/images/real-factory/box-shots/2025_10_25_11_21_IMG_0547.png`;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.intro,
    inLanguage: SITE_PRIMARY_LANGUAGE,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: logo },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/shop?q={search_term_string}`,
      },
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
        url,
        areaServed: "Worldwide",
        availableLanguage: ["English", "Chinese"],
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
