"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  cartSubtotal,
  getCart,
  removeFromCart,
  updateCartQuantity,
  type CartItem,
} from "@/lib/cart";
import { formatReferencePrice } from "@/lib/pricing";
import { CONTACT } from "@/lib/constants";

export function CartPageContent() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>(() =>
    typeof window === "undefined" ? [] : getCart()
  );

  useEffect(() => {
    const sync = () => setItems(getCart());
    window.addEventListener("cyou-cart-updated", sync);
    return () => window.removeEventListener("cyou-cart-updated", sync);
  }, []);

  const subtotal = cartSubtotal(items);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Cart</h1>
      <p className="mt-3 max-w-2xl text-sm text-slate-400">
        Standard configurations can be ordered online. For bulk quantities, custom models, or
        international shipping questions, contact sales before payment.
      </p>

      {items.length === 0 ? (
        <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
          <p className="text-slate-400">Your cart is empty.</p>
          <Link href="/shop" className="mt-4 inline-block text-cyan-400 hover:underline">
            Continue browsing products
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 space-y-4">
            {items.map((item) => (
              <li
                key={item.productId}
                className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-700">
                  <Image src={item.imageCard} alt={item.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/products/${item.slug}`} className="font-medium text-white hover:text-cyan-400">
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-slate-400">{formatReferencePrice(item.priceUsd)} each</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-slate-400">
                    Qty
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        updateCartQuantity(item.productId, parseInt(e.target.value, 10) || 1);
                        setItems(getCart());
                      }}
                      className="w-16 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-white"
                    />
                  </label>
                  <p className="min-w-[5rem] text-right font-medium text-white">
                    {formatReferencePrice(item.priceUsd * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      removeFromCart(item.productId);
                      setItems(getCart());
                    }}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Subtotal (USD)</p>
              <p className="text-2xl font-bold text-white">{formatReferencePrice(subtotal)}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm text-slate-200 hover:border-cyan-500"
              >
                Continue browsing
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm text-slate-200 hover:border-cyan-500"
              >
                Request Bulk Quote
              </Link>
              <button
                type="button"
                onClick={() => router.push("/checkout")}
                className="rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-cyan-500"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}

      <p className="mt-8 text-xs text-slate-500">
        Need help before ordering?{" "}
        <a href={CONTACT.whatsappUrl} className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">
          WhatsApp Sales
        </a>
        {" · "}
        <a href={CONTACT.telegramUrl} className="text-sky-400 hover:underline" target="_blank" rel="noopener noreferrer">
          Telegram Support
        </a>
      </p>
    </div>
  );
}
