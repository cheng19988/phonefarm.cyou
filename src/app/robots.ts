import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

const DISALLOW = [
  "/admin/",
  "/api/",
  "/account/",
  "/cart",
  "/checkout",
  "/login",
  "/register",
];

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
        allow: ["/", "/llms.txt", "/llms-full.txt", "/ai.txt", "/ai-catalog.json", "/ai", "/for-ai", "/help/", "/faq", "/blog/", "/shop", "/products/"],
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
