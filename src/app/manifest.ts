import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Cyou Farm",
    description: SITE.intro,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0284c7",
    lang: "en",
    icons: [
      { src: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icon", type: "image/png", sizes: "32x32" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
