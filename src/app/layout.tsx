import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileContactFab } from "@/components/MobileContactFab";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/constants";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE_PRIMARY_LANGUAGE } from "@/lib/site-language";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.intro,
  robots: { index: true, follow: true },
  other: { "content-language": SITE_PRIMARY_LANGUAGE },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM site guide" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM extended catalog" />
        <link rel="alternate" type="text/plain" href="/ai.txt" title="AI crawler pointer" />
        <link rel="alternate" type="application/json" href="/ai-catalog.json" title="AI product catalog" />
      </head>
      <body className="bg-site min-h-screen flex flex-col font-sans antialiased">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileContactFab />
      </body>
    </html>
  );
}
