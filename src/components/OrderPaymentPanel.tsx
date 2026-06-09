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
  const [copied, setCopied] = useState(false);

  async function submitTx() {
    const res = await fetch(`/api/orders/${order.id}/tx`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ txHash }),
    });
    if (res.ok) {
      const data = await res.json();
      setOrder(data);
      setMsg("Transaction hash submitted. Our team will verify payment manually.");
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg(data.error || "Could not save transaction hash.");
    }
  }

  async function copyAddress() {
    await navigator.clipboard.writeText(order.paymentAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const expired = new Date(order.expiresAt) < new Date();
  const paid = order.paymentStatus === "paid";

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
      <h2 className="text-lg font-semibold text-white">USDT TRC20 payment</h2>
      <p className="mt-2 text-sm text-slate-400">
        Payment will be checked manually after you submit the TRC20 transaction hash.
      </p>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-400">Order number</dt>
          <dd className="font-mono text-white">{order.orderNumber}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-400">Amount due (USD)</dt>
          <dd className="font-mono text-white">{order.expectedAmount} USDT</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-400">Network</dt>
          <dd>{PAYMENT.network} {PAYMENT.protocol}</dd>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <dt className="text-slate-400">Payment address</dt>
          <dd className="break-all font-mono text-cyan-300">{order.paymentAddress}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-400">Payment status</dt>
          <dd className="capitalize">{order.paymentStatus}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-400">Order status</dt>
          <dd>{order.status}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-400">Payment window</dt>
          <dd>{new Date(order.expiresAt).toLocaleString()}{expired ? " (expired)" : ""}</dd>
        </div>
      </dl>

      <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/60 p-4 text-xs text-slate-400">
        <p className="font-medium text-slate-300">Payment instructions</p>
        <ol className="mt-2 list-decimal space-y-1 pl-4">
          <li>Send exactly {order.expectedAmount} USDT on TRC20 to the address above.</li>
          <li>Use only the official USDT TRC20 contract: {PAYMENT.contract}</li>
          <li>After sending, paste your transaction hash below.</li>
          <li>Our team will confirm payment and update order status.</li>
        </ol>
      </div>

      <button
        type="button"
        onClick={copyAddress}
        className="mt-4 rounded-lg border border-slate-600 px-4 py-2 text-sm text-white hover:border-cyan-500"
      >
        {copied ? "Address copied" : "Copy payment address"}
      </button>

      {!paid && order.expectedAmount > 0 && (
        <>
          <label className="mt-6 block text-sm text-slate-300">Transaction hash</label>
          <input
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="Paste TRC20 tx hash after payment"
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-white"
          />
          <button
            type="button"
            onClick={submitTx}
            disabled={txHash.length < 10}
            className="mt-3 rounded-lg bg-cyan-600 px-4 py-2 text-sm text-white hover:bg-cyan-500 disabled:opacity-50"
          >
            Submit transaction hash
          </button>
        </>
      )}

      {msg && <p className="mt-3 text-sm text-slate-400">{msg}</p>}
    </div>
  );
}
