import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Logo({ compact = false, inverted = false }: { compact?: boolean; inverted?: boolean }) {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-blue-700 shadow-md transition group-hover:shadow-lg"
        aria-hidden
      >
        <span className="font-display text-lg font-bold text-white">C</span>
      </div>
      <div className="min-w-0">
        <span
          className={`font-display text-base font-bold tracking-tight sm:text-lg ${inverted ? "text-white" : "text-slate-900"}`}
        >
          {SITE.name}
        </span>
        {!compact && (
          <span className={`hidden truncate text-xs sm:block ${inverted ? "text-slate-400" : "text-slate-500"}`}>
            {SITE.tagline}
          </span>
        )}
      </div>
    </Link>
  );
}
