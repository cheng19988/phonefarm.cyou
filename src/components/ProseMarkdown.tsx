function headingId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

import { ImagePlaceholderCard } from "./ImagePlaceholderCard";

/** Renders simple ## headings and paragraphs from markdown-style strings. */
export function ProseMarkdown({ content }: { content: string }) {
  const sections = content.split(/\n(?=## )/);

  return (
    <div className="prose-farm mt-8 space-y-6">
      {sections.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith("## ")) {
          const nl = trimmed.indexOf("\n");
          const title = nl === -1 ? trimmed.slice(3) : trimmed.slice(3, nl);
          const body = nl === -1 ? "" : trimmed.slice(nl + 1);
          return (
            <section key={i}>
              <h2 id={headingId(title)}>{title}</h2>
              {body.split(/\n\n+/).map((p, j) => {
                const line = p.trim();
                if (!line) return null;
                if (/^\d+\.\s/.test(line)) {
                  const items = line.split(/\n(?=\d+\.\s)/);
                  return (
                    <ol key={j}>
                      {items.map((item, k) => (
                        <li key={k}>{item.replace(/^\d+\.\s*/, "")}</li>
                      ))}
                    </ol>
                  );
                }
                if (line.startsWith("- ")) {
                  const items = line.split(/\n(?=- )/);
                  return (
                    <ul key={j}>
                      {items.map((item, k) => (
                        <li key={k}>{item.replace(/^- /, "")}</li>
                      ))}
                    </ul>
                  );
                }
                if (line.startsWith("[Image placeholder:")) {
                  return <ImagePlaceholderCard key={j} label={line} />;
                }
                return <p key={j}>{line}</p>;
              })}
            </section>
          );
        }
        return (
          <p key={i}>{trimmed}</p>
        );
      })}
    </div>
  );
}
