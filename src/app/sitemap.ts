import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { PUBLISHED_BLOG_POSTS } from "@/lib/blog";
import { HELP_ARTICLES } from "@/lib/help";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const staticRoutes = [
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
    "/guides/phone-farm-guide",
    "/privacy",
    "/terms",
  ];

  let products: { slug: string; updatedAt: Date }[] = [];
  try {
    products = await prisma.product.findMany({ select: { slug: true, updatedAt: true } });
  } catch {
    // Static routes still ship if DB unavailable at build time.
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
    ...PUBLISHED_BLOG_POSTS.map((p) => ({
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
