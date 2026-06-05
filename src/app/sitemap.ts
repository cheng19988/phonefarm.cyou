import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog";
import { HELP_ARTICLES } from "@/lib/help";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const staticRoutes = [
    "",
    "/shop",
    "/cart",
    "/services",
    "/services/packages",
    "/deployment",
    "/help",
    "/support",
    "/solutions/phone-farming",
    "/about",
    "/faq",
    "/contact",
    "/blog",
    "/guides/hardware-selection",
    "/guides/phone-farm-guide",
    "/privacy",
    "/terms",
  ];

  let products: { slug: string; updatedAt: Date }[] = [];
  try {
    products = await prisma.product.findMany({ select: { slug: true, updatedAt: true } });
  } catch {
    // Build/deploy may run before DB is ready; static routes still ship.
  }

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...BLOG_POSTS.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...HELP_ARTICLES.map((a) => ({
      url: `${base}/help/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
