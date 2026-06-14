import Link from "next/link";

export function SectionHeading({
  title,
  subtitle,
  actionHref,
  actionLabel,
  as = "h2",
}: {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
  /** Use h1 for the primary page heading (one per page). */
  as?: "h1" | "h2";
}) {
  const Tag = as;
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Tag className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          {title}
        </Tag>
        {subtitle && <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">{subtitle}</p>}
      </div>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="shrink-0 text-sm font-medium text-sky-700 hover:text-sky-600 transition"
        >
          {actionLabel} →
        </Link>
      )}
    </div>
  );
}
