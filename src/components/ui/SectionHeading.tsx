import Link from "next/link";

export function SectionHeading({
  title,
  subtitle,
  actionHref,
  actionLabel,
}: {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          {title}
        </h2>
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
