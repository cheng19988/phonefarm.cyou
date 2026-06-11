import { notFound } from "next/navigation";
import Link from "next/link";
import { getHelpArticle, HELP_ARTICLES } from "@/lib/help";
import { HELP_EXPANDED } from "@/lib/help-expanded";
import { HELP_SUPPLEMENT } from "@/lib/help-supplement";
import { HELP_REFERENCE_EXPANDED } from "@/lib/help-reference-expanded";
import { buildMetadata, breadcrumbJsonLd, articleJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ProseMarkdown } from "@/components/ProseMarkdown";
import { HelpTableOfContents } from "@/components/HelpTableOfContents";

export async function generateStaticParams() {
  return HELP_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getHelpArticle(slug);
  if (!a) return {};
  return buildMetadata({ title: a.title, description: a.excerpt, path: `/help/${slug}` });
}

export default async function HelpArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) notFound();
  const isRich = Boolean(
    HELP_EXPANDED[slug] || HELP_SUPPLEMENT[slug] || HELP_REFERENCE_EXPANDED[slug]
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 pb-24 lg:pb-12">
      <JsonLd
        data={[
          articleJsonLd({
            title: article.title,
            description: article.excerpt,
            path: `/help/${slug}`,
            type: "TechArticle",
          }),
          breadcrumbJsonLd([
            { name: "Help", path: "/help" },
            { name: article.title, path: `/help/${slug}` },
          ]),
        ]}
      />
      <Link href="/help" className="text-sm font-medium text-sky-700 hover:text-sky-600">
        ← Document Center
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold text-slate-900">{article.title}</h1>
      <p className="mt-2 text-slate-600">{article.excerpt}</p>
      {isRich ? (
        <>
          <HelpTableOfContents content={article.body} />
          <ProseMarkdown content={article.body} />
        </>
      ) : (
        <p className="mt-6 whitespace-pre-line text-slate-600 leading-relaxed">{article.body}</p>
      )}
      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-medium text-slate-900">Need deployment help?</p>
        <p className="mt-1">
          <Link href="/contact" className="text-sky-700 hover:underline">Request a quote</Link>
          {" · "}
          <Link href="/shop" className="text-sky-700 hover:underline">Browse phone farm boxes</Link>
          {" · "}
          <Link href="/faq" className="text-sky-700 hover:underline">FAQ</Link>
        </p>
      </div>
    </article>
  );
}
