import { notFound } from "next/navigation";
import Link from "next/link";
import { getHelpArticle, HELP_ARTICLES } from "@/lib/help";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ContactBar } from "@/components/ContactBar";

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

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Help", path: "/help" },
          { name: article.title, path: `/help/${slug}` },
        ])}
      />
      <Link href="/help" className="text-sm text-cyan-400 hover:underline">← Document Center</Link>
      <h1 className="mt-4 text-3xl font-bold text-white">{article.title}</h1>
      <p className="mt-6 whitespace-pre-line text-slate-400 leading-relaxed">{article.body}</p>
      <div className="mt-8">
        <ContactBar />
      </div>
    </article>
  );
}
