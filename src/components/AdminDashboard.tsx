"use client";

import { Fragment, useEffect, useState } from "react";
import { ADMIN_PAYMENT_STATUSES, PAYMENT_STATUS, formatUsdtAmount } from "@/lib/payment-status";
import { formatPaymentStatus } from "@/lib/order-labels";

type Tab = "orders" | "products" | "users" | "contacts";

type OrderRow = {
  id: string;
  orderNumber: string;
  createdAt: string;
  expectedAmount: number;
  receivedAmount: number | null;
  status: string;
  paymentStatus: string;
  verificationStatus: string;
  expiresAt: string;
  txHash: string | null;
  customerName: string | null;
  customerEmail: string | null;
  contactMessaging: string | null;
  country: string | null;
  shippingAddress: string | null;
  orderNotes: string | null;
  adminNote: string | null;
  user: { email: string; name: string | null };
  product: { name: string } | null;
  items: { quantity: number; lineTotalUsd: number; product: { name: string } }[];
};

const ORDER_STATUSES = [
  "pending payment",
  "processing",
  "shipped",
  "cancelled",
] as const;

type ContactRow = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  country?: string | null;
  messaging?: string | null;
  deviceQuantity?: string | null;
  productInterest?: string | null;
  message?: string | null;
  source?: string | null;
};

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [products, setProducts] = useState<{ id: string; name: string; priceUsd: number; stock: number }[]>([]);
  const [users, setUsers] = useState<unknown[]>([]);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});

  function loadOrders() {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => setOrders(data as OrderRow[]));
  }

  useEffect(() => {
    const path = tab === "orders" ? "orders" : tab === "products" ? "products" : tab === "users" ? "users" : "contacts";
    fetch(`/api/admin/${path}`)
      .then((r) => r.json())
      .then((data) => {
        if (tab === "orders") setOrders(data as OrderRow[]);
        if (tab === "products") setProducts(data);
        if (tab === "users") setUsers(data);
        if (tab === "contacts") setContacts(data as ContactRow[]);
      });
  }, [tab]);

  async function updateProduct(id: string, field: "priceUsd" | "stock", value: number) {
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [field]: value }),
    });
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  async function patchOrder(
    id: string,
    patch: { status?: string; paymentStatus?: string; receivedAmount?: number; adminNote?: string }
  ) {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    loadOrders();
  }

  function productList(o: OrderRow) {
    if (o.items.length > 0) {
      return o.items.map((i) => `${i.product.name} x${i.quantity}`).join(", ");
    }
    return o.product?.name ?? "-";
  }

  return (
    <div className="site-container py-8">
      <h1 className="page-title">Admin Dashboard</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {(["orders", "products", "users", "contacts"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm capitalize transition ${tab === t ? "bg-sky-600 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        {tab === "orders" && (
          <table className="w-full min-w-[1100px] text-sm text-left">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-2">Order</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Contact</th>
                <th className="p-2">Products</th>
                <th className="p-2">USDT due</th>
                <th className="p-2">Received</th>
                <th className="p-2">TX</th>
                <th className="p-2">Payment</th>
                <th className="p-2">Verification</th>
                <th className="p-2">Status</th>
                <th className="p-2">Created</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <Fragment key={o.id}>
                  <tr className="border-t border-slate-200 align-top">
                    <td className="p-2 font-mono">{o.orderNumber}</td>
                    <td className="p-2">
                      <div>{o.customerName || o.user.name || "-"}</div>
                      <div className="text-xs text-sky-700">{o.customerEmail || o.user.email}</div>
                      {o.country && <div className="text-xs text-slate-500">{o.country}</div>}
                    </td>
                    <td className="p-2 text-xs text-slate-600">{o.contactMessaging || "-"}</td>
                    <td className="p-2 max-w-[200px] text-xs">{productList(o)}</td>
                    <td className="p-2 font-mono">{formatUsdtAmount(o.expectedAmount)}</td>
                    <td className="p-2 font-mono text-xs">
                      {o.receivedAmount != null ? formatUsdtAmount(o.receivedAmount) : "—"}
                    </td>
                    <td className="p-2 max-w-[120px] truncate font-mono text-xs">{o.txHash || "-"}</td>
                    <td className="p-2">
                      <select
                        className="rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800"
                        value={o.paymentStatus}
                        onChange={(e) => patchOrder(o.id, { paymentStatus: e.target.value })}
                      >
                        {ADMIN_PAYMENT_STATUSES.map((s) => (
                          <option key={s} value={s}>{formatPaymentStatus(s)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2 text-xs text-slate-600">{formatPaymentStatus(o.verificationStatus)}</td>
                    <td className="p-2">
                      <select
                        className="rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800"
                        value={o.status}
                        onChange={(e) => patchOrder(o.id, { status: e.target.value })}
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2 whitespace-nowrap text-xs text-slate-500">
                      {new Date(o.createdAt).toLocaleString()}
                    </td>
                    <td className="p-2">
                      <button
                        type="button"
                        className="text-xs font-medium text-sky-700 hover:text-sky-600"
                        onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)}
                      >
                        {expandedOrder === o.id ? "Hide" : "Note"}
                      </button>
                    </td>
                  </tr>
                  {expandedOrder === o.id && (
                    <tr className="border-t border-slate-100 bg-slate-50/80">
                      <td colSpan={12} className="p-4">
                        {o.shippingAddress && (
                          <p className="text-xs text-slate-600 mb-2 whitespace-pre-wrap">Address: {o.shippingAddress}</p>
                        )}
                        {o.orderNotes && <p className="text-xs text-slate-600 mb-2">Customer notes: {o.orderNotes}</p>}
                        <p className="text-xs text-slate-500 mb-2">
                          Expires: {new Date(o.expiresAt).toLocaleString()}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <button
                            type="button"
                            onClick={() =>
                              patchOrder(o.id, {
                                paymentStatus: PAYMENT_STATUS.PAID,
                                receivedAmount: o.expectedAmount,
                                status: "processing",
                              })
                            }
                            className="rounded border border-emerald-300 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-100"
                          >
                            Mark paid
                          </button>
                          <button
                            type="button"
                            onClick={() => patchOrder(o.id, { paymentStatus: PAYMENT_STATUS.MANUAL_REVIEW })}
                            className="rounded border border-amber-300 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 hover:bg-amber-100"
                          >
                            Manual review
                          </button>
                          <button
                            type="button"
                            onClick={() => patchOrder(o.id, { paymentStatus: PAYMENT_STATUS.UNDERPAID })}
                            className="rounded border border-orange-300 bg-orange-50 px-2 py-1 text-xs font-medium text-orange-800 hover:bg-orange-100"
                          >
                            Underpaid
                          </button>
                          <button
                            type="button"
                            onClick={() => patchOrder(o.id, { paymentStatus: PAYMENT_STATUS.OVERPAID })}
                            className="rounded border border-sky-300 bg-sky-50 px-2 py-1 text-xs font-medium text-sky-800 hover:bg-sky-100"
                          >
                            Overpaid
                          </button>
                          <button
                            type="button"
                            onClick={() => patchOrder(o.id, { paymentStatus: PAYMENT_STATUS.EXPIRED, status: "Expired" })}
                            className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            Mark expired
                          </button>
                          <button
                            type="button"
                            onClick={() => patchOrder(o.id, { status: "processing" })}
                            className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            Mark processing
                          </button>
                          <button
                            type="button"
                            onClick={() => patchOrder(o.id, { status: "shipped" })}
                            className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            Mark shipped
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              patchOrder(o.id, {
                                status: "cancelled",
                                paymentStatus: PAYMENT_STATUS.CANCELLED,
                              })
                            }
                            className="rounded border border-red-300 bg-red-50 px-2 py-1 text-xs font-medium text-red-800 hover:bg-red-100"
                          >
                            Mark cancelled
                          </button>
                        </div>
                        <textarea
                          defaultValue={o.adminNote || ""}
                          onChange={(e) => setAdminNotes((prev) => ({ ...prev, [o.id]: e.target.value }))}
                          rows={2}
                          className="form-input text-xs"
                          placeholder="Admin note (internal)"
                        />
                        <button
                          type="button"
                          onClick={() => patchOrder(o.id, { adminNote: adminNotes[o.id] ?? o.adminNote ?? "" })}
                          className="mt-2 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-700"
                        >
                          Save note
                        </button>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
        {tab === "products" && (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr><th className="p-2">Name</th><th className="p-2">Price</th><th className="p-2">Stock</th></tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-slate-200">
                  <td className="p-2 text-slate-800">{p.name}</td>
                  <td className="p-2">
                    <input
                      type="number"
                      defaultValue={p.priceUsd}
                      className="w-24 form-input !py-1 !text-sm"
                      onBlur={(e) => updateProduct(p.id, "priceUsd", parseFloat(e.target.value))}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      defaultValue={p.stock}
                      className="w-20 form-input !py-1 !text-sm"
                      onBlur={(e) => updateProduct(p.id, "stock", parseInt(e.target.value, 10))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "users" && (
          <pre className="p-4 text-xs text-slate-600 overflow-auto">{JSON.stringify(users, null, 2)}</pre>
        )}
        {tab === "contacts" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 py-2">Time</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Country</th>
                  <th className="px-3 py-2">Messaging</th>
                  <th className="px-3 py-2">Quantity</th>
                  <th className="px-3 py-2">Product</th>
                  <th className="px-3 py-2">Source</th>
                  <th className="px-3 py-2">Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} className="border-t border-slate-200 align-top">
                    <td className="px-3 py-2 whitespace-nowrap text-slate-500">
                      {new Date(c.createdAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 font-medium text-slate-900">{c.name}</td>
                    <td className="px-3 py-2 text-sky-700">{c.email}</td>
                    <td className="px-3 py-2 text-slate-700">{c.country || "-"}</td>
                    <td className="px-3 py-2 text-slate-700">{c.messaging || "-"}</td>
                    <td className="px-3 py-2 text-slate-700">{c.deviceQuantity || "-"}</td>
                    <td className="px-3 py-2 text-slate-700">{c.productInterest || "-"}</td>
                    <td className="px-3 py-2 text-slate-500">{c.source || "-"}</td>
                    <td className="max-w-xs px-3 py-2 text-slate-600 whitespace-pre-wrap">{c.message || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {contacts.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-slate-500">No inquiries yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
