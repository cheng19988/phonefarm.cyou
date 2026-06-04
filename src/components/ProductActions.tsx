"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { addToCart } from "@/lib/cart";

export function ProductActions({
  productId,
  slug,
  name,
  imageCard,
  priceUsd,
  inStock,
}: {
  productId: string;
  slug: string;
  name: string;
  imageCard: string;
  priceUsd: number;
  inStock: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const isQuote = priceUsd <= 0;

  async function createOrder(orderType: "purchase" | "quote") {
    setLoading(orderType);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1, orderType }),
    });
    setLoading(null);
    if (res.status === 401) {
      router.push("/login?redirect=/shop");
      return;
    }
    if (!res.ok) {
      alert("Order failed. Check stock or login.");
      return;
    }
    const order = await res.json();
    router.push(`/account/orders/${order.id}`);
  }

  return (
    <div className="flex flex-wrap gap-3">
      {!isQuote && (
        <button
          type="button"
          disabled={!inStock || loading !== null}
          onClick={() => createOrder("purchase")}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white hover:bg-cyan-500 disabled:opacity-50"
        >
          {loading === "purchase" ? "Processing…" : "Buy Now"}
        </button>
      )}
      <button
        type="button"
        disabled={loading !== null}
        onClick={() => createOrder(isQuote ? "quote" : "quote")}
        className="rounded-lg border border-amber-500/60 px-6 py-3 font-medium text-amber-400 hover:bg-amber-950/40"
      >
        {loading === "quote" ? "Processing…" : "Get Quote"}
      </button>
      <button
        type="button"
        disabled={!inStock || isQuote || loading !== null}
        onClick={() => {
          addToCart({ productId, slug, name, priceUsd, imageCard });
          window.dispatchEvent(new Event("cyou-cart-updated"));
          router.push("/cart");
        }}
        className="rounded-lg border border-slate-600 px-6 py-3 text-slate-200 hover:border-cyan-500"
      >
        Add to Cart
      </button>
      <Link
        href="/contact"
        className="rounded-lg border border-slate-600 px-6 py-3 text-slate-200 hover:border-cyan-500"
      >
        Contact Sales
      </Link>
    </div>
  );
}
