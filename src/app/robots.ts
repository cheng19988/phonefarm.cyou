import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

const DISALLOW = [
  "/admin/",
  "/api/",
  "/account/",
  "/cart",
  "/login",
  "/register",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: DISALLOW },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
