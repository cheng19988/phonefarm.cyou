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
    <div className="card-premium p-6">
      <h2 className="text-lg font-semibold text-slate-900">USDT TRC20 payment</h2>
      <p className="mt-2 text-sm text-slate-600">
        Payment will be checked manually after you submit the TRC20 transaction hash.
      </p>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Order number</dt>
          <dd className="font-mono font-medium text-slate-900">{order.orderNumber}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Amount due (USD)</dt>
          <dd className="font-mono font-medium text-slate-900">{order.expectedAmount} USDT</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Network</dt>
          <dd className="text-slate-800">{PAYMENT.network} {PAYMENT.protocol}</dd>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <dt className="text-slate-500">Payment address</dt>
          <dd className="break-all font-mono text-sky-700">{order.paymentAddress}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Payment status</dt>
          <dd className="capitalize text-slate-800">{order.paymentStatus}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Order status</dt>
          <dd className="text-slate-800">{order.status}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Payment window</dt>
          <dd className="text-slate-800">
            {new Date(order.expiresAt).toLocaleString()}{expired ? " (expired)" : ""}
          </dd>
        </div>
      </dl>

      <div className="panel-muted mt-4 text-xs text-slate-600">
        <p className="font-semibold text-slate-800">Payment instructions</p>
        <ol className="mt-2 list-decimal space-y-1 pl-4">
          <li>Send exactly {order.expectedAmount} USDT on TRC20 to the address above.</li>
          <li>Use only the official USDT TRC20 contract: {PAYMENT.contract}</li>
          <li>After sending, paste your transaction hash below.</li>
          <li>Our team will confirm payment and update order status.</li>
        </ol>
      </div>

      <button type="button" onClick={copyAddress} className="btn-secondary mt-4 text-sm">
        {copied ? "Address copied" : "Copy payment address"}
      </button>

      {!paid && order.expectedAmount > 0 && (
        <>
          <label className="form-field mt-6">
            <span className="form-label">Transaction hash</span>
            <input
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="Paste TRC20 tx hash after payment"
              className="form-input font-mono text-sm"
            />
          </label>
          <button
            type="button"
            onClick={submitTx}
            disabled={txHash.length < 10}
            className="btn-primary mt-3 text-sm disabled:opacity-50"
          >
            Submit transaction hash
          </button>
        </>
      )}

      {msg && <p className="mt-3 text-sm text-slate-600">{msg}</p>}
    </div>
  );
}
