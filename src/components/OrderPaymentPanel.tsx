"use client";

import { useState } from "react";
import { PAYMENT } from "@/lib/constants";

type Order = {
  id: string;
  orderNumber: string;
  status: string;
  expectedAmount: number;
  paymentAddress: string;
  paymentStatus: string;
  expiresAt: string;
  txHash: string | null;
};

export function OrderPaymentPanel({ order: initial }: { order: Order }) {
  const [order, setOrder] = useState(initial);
  const [txHash, setTxHash] = useState(order.txHash || "");
  const [msg, setMsg] = useState("");

  async function submitTx() {
    const res = await fetch(`/api/orders/${order.id}/tx`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ txHash }),
    });
    if (res.ok) {
      setOrder(await res.json());
      setMsg("Transaction hash saved.");
    }
  }

  async function verify() {
    setMsg("Checking payment…");
    const res = await fetch(`/api/orders/${order.id}/verify-payment`, { method: "POST" });
    const data = await res.json();
    if (data.order) setOrder(data.order);
    setMsg(data.verification?.message || data.error || "Verification complete.");
  }

  const expired = new Date(order.expiresAt) < new Date();

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
      <h2 className="text-lg font-semibold text-white">USDT Payment ({PAYMENT.protocol})</h2>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between"><dt className="text-slate-400">Network</dt><dd>{PAYMENT.network} {PAYMENT.protocol}</dd></div>
        <div className="flex justify-between"><dt className="text-slate-400">Amount</dt><dd className="font-mono">{order.expectedAmount} USDT (min {PAYMENT.minAmount})</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-slate-400">Address</dt><dd className="break-all font-mono text-cyan-300">{order.paymentAddress}</dd></div>
        <div className="flex justify-between"><dt className="text-slate-400">Contract</dt><dd className="break-all font-mono text-xs">{PAYMENT.contract}</dd></div>
        <div className="flex justify-between"><dt className="text-slate-400">Expires</dt><dd>{new Date(order.expiresAt).toLocaleString()}{expired ? " (expired)" : ""}</dd></div>
        <div className="flex justify-between"><dt className="text-slate-400">Status</dt><dd>{order.status} / {order.paymentStatus}</dd></div>
      </dl>
      {order.expectedAmount > 0 && order.paymentStatus !== "paid" && (
        <>
          <label className="mt-4 block text-sm text-slate-300">Transaction hash (after you pay)</label>
          <input
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-white"
          />
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={submitTx} className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-white">
              Save TX
            </button>
            <button type="button" onClick={verify} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm text-white">
              Check Payment
            </button>
          </div>
        </>
      )}
      {msg && <p className="mt-3 text-sm text-slate-400">{msg}</p>}
      <p className="mt-4 text-xs text-slate-500">
        Automated Tron verification requires TRON_API_KEY. We never mark paid without confirmed on-chain match.
      </p>
    </div>
  );
}
