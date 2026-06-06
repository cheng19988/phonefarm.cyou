"use client";

import { useEffect, useState } from "react";

type Tab = "orders" | "products" | "users" | "contacts";

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
  const [orders, setOrders] = useState<unknown[]>([]);
  const [products, setProducts] = useState<{ id: string; name: string; priceUsd: number; stock: number }[]>([]);
  const [users, setUsers] = useState<unknown[]>([]);
  const [contacts, setContacts] = useState<ContactRow[]>([]);

  useEffect(() => {
    const path = tab === "orders" ? "orders" : tab === "products" ? "products" : tab === "users" ? "users" : "contacts";
    fetch(`/api/admin/${path}`)
      .then((r) => r.json())
      .then((data) => {
        if (tab === "orders") setOrders(data);
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
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  }

  async function updateOrderStatus(id: string, status: string) {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      <div className="mt-4 flex gap-2">
        {(["orders", "products", "users", "contacts"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm capitalize ${tab === t ? "bg-cyan-600 text-white" : "border border-slate-700 text-slate-400"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-8 overflow-x-auto">
        {tab === "orders" && (
          <table className="w-full text-sm text-left">
            <thead className="text-slate-400">
              <tr>
                <th className="p-2">Order</th>
                <th className="p-2">User</th>
                <th className="p-2">Product</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2">Payment</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {(orders as { id: string; orderNumber: string; user: { email: string }; product: { name: string }; expectedAmount: number; status: string; paymentStatus: string }[]).map((o) => (
                <tr key={o.id} className="border-t border-slate-800">
                  <td className="p-2 font-mono">{o.orderNumber}</td>
                  <td className="p-2">{o.user?.email}</td>
                  <td className="p-2">{o.product?.name}</td>
                  <td className="p-2">{o.expectedAmount}</td>
                  <td className="p-2">{o.status}</td>
                  <td className="p-2">{o.paymentStatus}</td>
                  <td className="p-2">
                    <select
                      className="rounded bg-slate-900 border border-slate-700 text-xs"
                      defaultValue={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    >
                      {["Pending", "Waiting for Payment", "Paid", "Confirmed", "Cancelled", "Expired"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "products" && (
          <table className="w-full text-sm">
            <thead className="text-slate-400">
              <tr><th className="p-2">Name</th><th className="p-2">Price</th><th className="p-2">Stock</th></tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-slate-800">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">
                    <input
                      type="number"
                      defaultValue={p.priceUsd}
                      className="w-24 rounded bg-slate-900 border border-slate-700 px-2"
                      onBlur={(e) => updateProduct(p.id, "priceUsd", parseFloat(e.target.value))}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      defaultValue={p.stock}
                      className="w-20 rounded bg-slate-900 border border-slate-700 px-2"
                      onBlur={(e) => updateProduct(p.id, "stock", parseInt(e.target.value, 10))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "users" && (
          <pre className="text-xs text-slate-400 overflow-auto">{JSON.stringify(users, null, 2)}</pre>
        )}
        {tab === "contacts" && (
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="bg-slate-900 text-slate-400">
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
                  <tr key={c.id} className="border-t border-slate-800 align-top">
                    <td className="px-3 py-2 whitespace-nowrap text-slate-500">
                      {new Date(c.createdAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-white">{c.name}</td>
                    <td className="px-3 py-2 text-cyan-400">{c.email}</td>
                    <td className="px-3 py-2 text-slate-300">{c.country || "—"}</td>
                    <td className="px-3 py-2 text-slate-300">{c.messaging || "—"}</td>
                    <td className="px-3 py-2 text-slate-300">{c.deviceQuantity || "—"}</td>
                    <td className="px-3 py-2 text-slate-300">{c.productInterest || "—"}</td>
                    <td className="px-3 py-2 text-slate-500">{c.source || "—"}</td>
                    <td className="max-w-xs px-3 py-2 text-slate-400 whitespace-pre-wrap">{c.message || "—"}</td>
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
