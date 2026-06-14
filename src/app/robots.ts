import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { CANONICAL_HOST } from "@/lib/site-hosts";

const DISALLOW = [
  "/admin/",
  "/api/",
  "/account/",
  "/cart",
  "/checkout",
  "/login",
  "/register",
];

const CRAWLER_ALLOW = [
  "/",
  "/sitemap.xml",
  "/robots.txt",
  "/zh",
  "/zh/",
  "/llms.txt",
  "/llms-full.txt",
  "/ai.txt",
  "/ai-catalog.json",
  "/ai",
  "/for-ai",
  "/help/",
  "/faq",
  "/blog/",
  "/shop",
  "/products/",
] as const;

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
  "Bytespider",
  "DeepSeekBot",
  "CCBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: [...CRAWLER_ALLOW],
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: CANONICAL_HOST,
  };
}
