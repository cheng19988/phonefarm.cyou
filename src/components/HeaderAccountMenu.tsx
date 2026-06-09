"use client";

import Link from "next/link";

export function HeaderAccountMenu() {
  return (
    <Link
      href="/account/orders"
      className="text-slate-600 hover:text-sky-700"
      title="Account & orders"
    >
      Account
    </Link>
  );
}
