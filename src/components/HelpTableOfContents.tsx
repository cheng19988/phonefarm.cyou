export function extractMarkdownHeadings(content: string) {
  return [...content.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
}

export function HelpTableOfContents({ content }: { content: string }) {
  const headings = extractMarkdownHeadings(content);
  if (headings.length < 3) return null;

  return (
    <nav className="card-premium mt-6 p-4 not-prose">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">On this page</p>
      <ul className="mt-3 space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h}>
            <a href={`#${slugify(h)}`} className="link-accent">
              {h}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
