import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 transition group-hover:shadow-cyan-500/40"
        aria-hidden
      >
        <span className="font-display text-lg font-bold text-white">C</span>
      </div>
      <div className="min-w-0">
        <span className="font-display text-base font-bold tracking-tight text-white sm:text-lg">{SITE.name}</span>
        {!compact && (
          <span className="hidden truncate text-xs text-slate-400 sm:block">{SITE.tagline}</span>
        )}
      </div>
    </Link>
  );
}
