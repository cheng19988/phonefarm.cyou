"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartItem, clearCart, getCart, removeFromCart } from "@/lib/cart";
import { ContactBar } from "@/components/ContactBar";
import { CURRENCY } from "@/lib/constants";

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const total = items.reduce((s, i) => s + i.priceUsd * i.quantity, 0);

  async function checkout() {
    setLoading(true);
    let lastOrderId: string | null = null;
    for (const item of items) {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.productId,
          quantity: item.quantity,
          orderType: item.priceUsd > 0 ? "purchase" : "quote",
        }),
      });
      if (res.status === 401) {
        router.push("/login?redirect=/cart");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        alert(`Checkout failed for ${item.name}`);
        setLoading(false);
        return;
      }
      const order = await res.json();
      lastOrderId = order.id;
    }
    clearCart();
    window.dispatchEvent(new Event("cyou-cart-updated"));
    setLoading(false);
    if (lastOrderId) router.push(`/account/orders/${lastOrderId}`);
    else router.push("/account/orders");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
      <p className="mt-2 text-slate-400">{CURRENCY.label}</p>
      <div className="mt-4">
        <ContactBar />
      </div>
      {items.length === 0 ? (
        <p className="mt-10 text-slate-400">
          Cart is empty.{" "}
          <Link href="/shop" className="text-cyan-400 hover:underline">
            Browse shop
          </Link>
        </p>
      ) : (
        <>
          <ul className="mt-8 space-y-4">
            {items.map((item) => (
              <li
                key={item.productId}
                className="flex gap-4 rounded-xl border border-slate-800 p-4"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image src={item.imageCard} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <Link href={`/products/${item.slug}`} className="font-medium text-white hover:text-cyan-400">
                    {item.name}
                  </Link>
                  <p className="text-sm text-slate-400">Qty {item.quantity}</p>
                  <p className="text-cyan-400">${(item.priceUsd * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeFromCart(item.productId);
                    setItems(getCart());
                    window.dispatchEvent(new Event("cyou-cart-updated"));
                  }}
                  className="text-sm text-red-400 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xl font-bold text-white">Total: ${total.toFixed(2)}</p>
          <button
            type="button"
            disabled={loading}
            onClick={checkout}
            className="mt-4 rounded-lg bg-cyan-600 px-8 py-3 font-medium text-white hover:bg-cyan-500 disabled:opacity-50"
          >
            {loading ? "Creating orders…" : "Checkout (login required)"}
          </button>
        </>
      )}
    </div>
  );
}
