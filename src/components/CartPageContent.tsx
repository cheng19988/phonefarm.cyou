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
import { FINAL_QUOTE_BEFORE_PAYMENT, formatReferencePrice, REFERENCE_PRICE_LABEL } from "@/lib/pricing";
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
      <h1 className="page-title">Standard order review</h1>
      <p className="page-lead text-sm">
        {REFERENCE_PRICE_LABEL} · {FINAL_QUOTE_BEFORE_PAYMENT}. Bulk, mixed deployments, and export packing require an
        RFQ first —{" "}
        <Link href="/contact" className="link-accent font-medium">
          request quotation
        </Link>
        . This cart is for sales-confirmed standard SKUs only.
      </p>

      {items.length === 0 ? (
        <div className="mt-10 card-premium p-8 text-center">
          <p className="text-slate-600">No standard SKUs selected yet.</p>
          <Link href="/shop" className="link-accent mt-4 inline-block">
            Continue browsing products
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 space-y-4">
            {items.map((item) => (
              <li
                key={item.productId}
                className="card-premium flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200">
                  <Image src={item.imageCard} alt={item.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/products/${item.slug}`} className="font-medium text-slate-900 hover:text-sky-700">
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-slate-500">{formatReferencePrice(item.priceUsd)} each</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    Qty
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        updateCartQuantity(item.productId, parseInt(e.target.value, 10) || 1);
                        setItems(getCart());
                      }}
                      className="form-input form-input-sm w-16"
                    />
                  </label>
                  <p className="min-w-[5rem] text-right font-semibold text-slate-900">
                    {formatReferencePrice(item.priceUsd * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      removeFromCart(item.productId);
                      setItems(getCart());
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Catalog subtotal ({REFERENCE_PRICE_LABEL.toLowerCase()})</p>
              <p className="text-2xl font-bold text-slate-900">{formatReferencePrice(subtotal)}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className="btn-secondary text-sm !py-2.5 !px-5">
                Continue browsing
              </Link>
              <Link href="/contact" className="btn-secondary text-sm !py-2.5 !px-5">
                Request Bulk Quote
              </Link>
              <button type="button" onClick={() => router.push("/checkout")} className="btn-primary text-sm !py-2.5 !px-5">
                Review order details
              </button>
            </div>
          </div>
        </>
      )}

      <p className="mt-8 text-xs text-slate-500">
        Need help before ordering?{" "}
        <a href={CONTACT.whatsappUrl} className="link-accent" target="_blank" rel="noopener noreferrer">
          WhatsApp Sales
        </a>
        {" · "}
        <a href={CONTACT.telegramUrl} className="link-accent" target="_blank" rel="noopener noreferrer">
          Telegram Support
        </a>
      </p>
    </div>
  );
}
