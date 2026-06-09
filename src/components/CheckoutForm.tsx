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
      <p className="text-slate-600">
        Loading cart… or{" "}
        <Link href="/cart" className="link-accent">
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
        <h2 className="page-section-title">Shipping & contact</h2>
        <label className="form-field">
          <span className="form-label">Name *</span>
          <input name="customerName" required className="form-input" />
        </label>
        <label className="form-field">
          <span className="form-label">Email *</span>
          <input name="customerEmail" type="email" required className="form-input" />
        </label>
        <label className="form-field">
          <span className="form-label">WhatsApp / Telegram</span>
          <input name="contactMessaging" className="form-input" placeholder="@username or phone" />
        </label>
        <label className="form-field">
          <span className="form-label">Country / Region</span>
          <input name="country" className="form-input" />
        </label>
        <label className="form-field">
          <span className="form-label">Shipping address *</span>
          <textarea name="shippingAddress" required rows={3} className="form-input" />
        </label>
        <label className="form-field">
          <span className="form-label">Order notes</span>
          <textarea
            name="orderNotes"
            rows={3}
            className="form-input"
            placeholder="Model preferences, delivery window, customs info…"
          />
        </label>

        <h2 className="page-section-title pt-4">Payment method</h2>
        <div className="panel-highlight">
          <p className="font-semibold text-slate-900">USDT TRC20</p>
          <p className="mt-2 text-slate-600">
            After placing the order you will receive payment instructions. Payment will be checked manually after you
            submit the TRC20 transaction hash.
          </p>
        </div>

        {error && <p className="form-error">{error}</p>}
        <p className="text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login?redirect=/checkout" className="link-accent">
            Log in
          </Link>
          {" · "}
          <Link href="/register?redirect=/checkout" className="link-accent">
            Register
          </Link>
        </p>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60 sm:w-auto sm:px-8">
          {loading ? "Placing order…" : "Place Order"}
        </button>
      </div>

      <aside className="card-premium h-fit p-6 lg:col-span-2">
        <h2 className="font-semibold text-slate-900">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-2 text-slate-600">
              <span className="min-w-0 truncate">{item.name} × {item.quantity}</span>
              <span className="shrink-0 font-medium text-slate-900">
                {formatReferencePrice(item.priceUsd * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 font-semibold text-slate-900">
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
