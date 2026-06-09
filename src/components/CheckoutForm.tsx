"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cartSubtotal, clearCart, getCart, type CartItem } from "@/lib/cart";
import { formatReferencePrice } from "@/lib/pricing";
import { PAYMENT } from "@/lib/constants";

export function CheckoutForm() {
  const router = useRouter();
  const [items] = useState<CartItem[]>(() =>
    typeof window === "undefined" ? [] : getCart()
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) router.replace("/cart");
  }, [items.length, router]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      customerName: String(fd.get("customerName")),
      customerEmail: String(fd.get("customerEmail")),
      contactMessaging: String(fd.get("contactMessaging") || ""),
      country: String(fd.get("country") || ""),
      shippingAddress: String(fd.get("shippingAddress")),
      orderNotes: String(fd.get("orderNotes") || ""),
      paymentMethod: "USDT_TRC20" as const,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      if (res.status === 401) {
        router.push(`/login?redirect=${encodeURIComponent("/checkout")}`);
        return;
      }
      setError(data.error || "Checkout failed. Please try again or contact sales.");
      return;
    }

    clearCart();
    router.push(`/account/orders/${data.id}`);
    router.refresh();
  }

  if (items.length === 0) {
    return (
      <p className="text-slate-400">
        Loading cart… or{" "}
        <Link href="/cart" className="text-cyan-400 hover:underline">
          return to cart
        </Link>
        .
      </p>
    );
  }

  const subtotal = cartSubtotal(items);

  return (
    <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-5">
      <div className="space-y-4 lg:col-span-3">
        <h2 className="text-lg font-semibold text-white">Shipping & contact</h2>
        <label className="block text-sm">
          <span className="text-slate-300">Name *</span>
          <input name="customerName" required className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">Email *</span>
          <input name="customerEmail" type="email" required className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">WhatsApp / Telegram</span>
          <input name="contactMessaging" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" placeholder="@username or phone" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">Country / Region</span>
          <input name="country" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">Shipping address *</span>
          <textarea name="shippingAddress" required rows={3} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">Order notes</span>
          <textarea name="orderNotes" rows={3} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" placeholder="Model preferences, delivery window, customs info…" />
        </label>

        <h2 className="pt-4 text-lg font-semibold text-white">Payment method</h2>
        <div className="rounded-xl border border-cyan-800/50 bg-cyan-950/20 p-4 text-sm text-slate-300">
          <p className="font-medium text-white">USDT TRC20</p>
          <p className="mt-2 text-slate-400">
            After placing the order you will receive payment instructions. Payment will be checked manually
            after you submit the TRC20 transaction hash.
          </p>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        <p className="text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login?redirect=/checkout" className="text-cyan-400 hover:underline">
            Log in
          </Link>
          {" · "}
          <Link href="/register?redirect=/checkout" className="text-cyan-400 hover:underline">
            Register
          </Link>
        </p>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-600 py-3 font-medium text-white hover:bg-cyan-500 disabled:opacity-60 sm:w-auto sm:px-8"
        >
          {loading ? "Placing order…" : "Place Order"}
        </button>
      </div>

      <aside className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 lg:col-span-2 h-fit">
        <h2 className="font-semibold text-white">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-2 text-slate-300">
              <span className="min-w-0 truncate">
                {item.name} × {item.quantity}
              </span>
              <span className="shrink-0 text-white">{formatReferencePrice(item.priceUsd * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-slate-800 pt-4 font-medium text-white">
          <span>Subtotal</span>
          <span>{formatReferencePrice(subtotal)}</span>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Minimum payment {PAYMENT.minAmount} USDT if applicable. Final amount shown on order page.
        </p>
      </aside>
    </form>
  );
}
