"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/cart";

export function CartLink() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const sync = () =>
      setCount(getCart().reduce((n, i) => n + i.quantity, 0));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("cyou-cart-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("cyou-cart-updated", sync);
    };
  }, []);
  return (
    <Link href="/cart" className="relative text-slate-600 hover:text-sky-700">
      Cart
      {count > 0 && (
        <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-cyan-600 px-1 text-[10px] text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
