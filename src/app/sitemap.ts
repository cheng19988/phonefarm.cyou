import type { MetadataRoute } from "next";
import { PUBLISHED_BLOG_POSTS } from "@/lib/blog";
import { SHOP_BRANDS } from "@/lib/constants";
import { canonicalPageUrl } from "@/lib/canonical-url";
import { SITE } from "@/lib/constants";
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
    changeFrequency: path === "" ? "weekly" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = SHOP_BRANDS.map((brand) => ({
    url: canonicalPageUrl(`/shop?category=${brand.slug}`, origin),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.75,
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
