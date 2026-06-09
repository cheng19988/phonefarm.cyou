"use client";

import Link from "next/link";

export function HeaderAccountMenu() {
  return (
    <Link
      href="/account/orders"
      className="text-slate-400 hover:text-slate-200"
      title="Account & orders"
    >
      Account
    </Link>
  );
}
