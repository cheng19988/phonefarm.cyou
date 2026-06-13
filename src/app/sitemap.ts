import type { MetadataRoute } from "next";
import { PUBLISHED_BLOG_POSTS } from "@/lib/blog";
import { PRODUCT_CATEGORIES, SHOP_BRANDS, SITE } from "@/lib/constants";
import { canonicalPageUrl } from "@/lib/canonical-url";
import { HELP_ARTICLES } from "@/lib/help";
import { prisma } from "@/lib/prisma";

const INDEXABLE_STATIC_PATHS = [
  "",
  "/shop",
  "/services",
  "/services/packages",
  "/phone-farm",
  "/deployment",
  "/help",
  "/solutions/phone-farming",
  "/about",
  "/faq",
  "/contact",
  "/ai",
  "/blog",
  "/guides/hardware-selection",
  "/privacy",
  "/terms",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = SITE.url;

  let products: { slug: string; updatedAt: Date; published: boolean }[] = [];
  try {
    products = await prisma.product.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, published: true },
    });
  } catch {
    // Static routes still ship if DB unavailable at build time.
  }

  const staticEntries: MetadataRoute.Sitemap = INDEXABLE_STATIC_PATHS.map((path) => ({
    url: canonicalPageUrl(path, origin),
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : path.startsWith("/help") ? "monthly" : "weekly",
    priority:
      path === ""
        ? 1
        : path === "/shop" || path === "/phone-farm" || path === "/contact"
          ? 0.9
          : path === "/ai"
            ? 0.85
            : 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = PRODUCT_CATEGORIES.map((cat) => ({
    url: canonicalPageUrl(`/shop?category=${cat.slug}`, origin),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: SHOP_BRANDS.some((b) => b.slug === cat.slug) ? 0.78 : 0.72,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: canonicalPageUrl(`/products/${p.slug}`, origin),
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = PUBLISHED_BLOG_POSTS.map((p) => ({
    url: canonicalPageUrl(`/blog/${p.slug}`, origin),
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const helpEntries: MetadataRoute.Sitemap = HELP_ARTICLES.map((a) => ({
    url: canonicalPageUrl(`/help/${a.slug}`, origin),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries, ...blogEntries, ...helpEntries];
}
