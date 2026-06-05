import { ContentImage } from "./ContentImage";
import { ImagePlaceholderCard } from "./ImagePlaceholderCard";

function headingId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderBlock(line: string, key: string | number) {
  const trimmed = line.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("[Image placeholder:")) {
    return <ImagePlaceholderCard key={key} label={trimmed} />;
  }

  if (trimmed.startsWith("[Image:")) {
    const inner = trimmed.slice(7, -1);
    const [src, alt, caption] = inner.split("|").map((part) => part.trim());
    if (src) {
      return <ContentImage key={key} src={src} alt={alt || ""} caption={caption} />;
    }
  }

  if (/^\d+\.\s/.test(trimmed)) {
    const items = trimmed.split(/\n(?=\d+\.\s)/);
    return (
      <ol key={key}>
        {items.map((item, k) => (
          <li key={k}>{item.replace(/^\d+\.\s*/, "")}</li>
        ))}
      </ol>
    );
  }

  if (trimmed.startsWith("- ")) {
    const items = trimmed.split(/\n(?=- )/);
    return (
      <ul key={key}>
        {items.map((item, k) => (
          <li key={k}>{item.replace(/^- /, "")}</li>
        ))}
      </ul>
    );
  }

  if (
    !trimmed.includes("\n") &&
    trimmed.length < 72 &&
    !trimmed.endsWith(".") &&
    !/^\d+\./.test(trimmed) &&
    !trimmed.startsWith("[")
  ) {
    return (
      <h3 key={key} id={headingId(trimmed)} className="mt-8 text-lg font-semibold text-white">
        {trimmed}
      </h3>
    );
  }

  return <p key={key}>{trimmed}</p>;
}

function renderParagraphBlocks(body: string, keyPrefix: string) {
  return body
    .split(/\n\n+/)
    .filter(Boolean)
    .map((p, j) => renderBlock(p, `${keyPrefix}-${j}`));
}

/** Renders simple ## headings and paragraphs from markdown-style strings. */
export function ProseMarkdown({ content }: { content: string }) {
  const sections = content.split(/\n(?=## )/);

  return (
    <div className="prose-farm mt-8 space-y-2">
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
              {renderParagraphBlocks(body, `s${i}`)}
            </section>
          );
        }

        const parts = trimmed.split(/\n\n+/).filter(Boolean);
        const first = parts[0]?.trim() ?? "";
        const isTitle =
          first.length > 0 &&
          first.length < 120 &&
          !first.endsWith(".") &&
          !first.startsWith("[Image placeholder:") &&
          !/^\d+\.\s/.test(first);

        return (
          <section key={i}>
            {isTitle && <h2 className="text-2xl font-bold text-white">{first}</h2>}
            {renderParagraphBlocks(isTitle ? parts.slice(1).join("\n\n") : trimmed, `b${i}`)}
          </section>
        );
      })}
    </div>
  );
}
