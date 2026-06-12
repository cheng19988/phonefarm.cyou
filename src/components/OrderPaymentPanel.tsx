"use client";

import { useState } from "react";
import { PAYMENT } from "@/lib/constants";
import { formatPaymentStatus } from "@/lib/order-labels";
import {
  formatUsdtAmount,
  isPaidStatus,
  normalizePaymentStatus,
  PAYMENT_STATUS,
} from "@/lib/payment-status";
import { formatReferencePrice } from "@/lib/pricing";

type Order = {
  id: string;
  orderNumber: string;
  status: string;
  catalogSubtotalUsd: number;
  expectedAmount: number;
  receivedAmount?: number | null;
  paymentAddress: string;
  paymentStatus: string;
  verificationStatus?: string;
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
      setOrder((prev) => ({
        ...prev,
        ...data,
        catalogSubtotalUsd: prev.catalogSubtotalUsd,
      }));
      setMsg("Transaction hash saved. Payment is pending manual confirmation by our team.");
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
  const paid = isPaidStatus(order.paymentStatus);
  const normalized = normalizePaymentStatus(order.paymentStatus);
  const manualReview =
    normalized === PAYMENT_STATUS.MANUAL_REVIEW ||
    normalized === PAYMENT_STATUS.UNDERPAID ||
    normalized === PAYMENT_STATUS.OVERPAID;
  const amountsMatch = order.catalogSubtotalUsd === order.expectedAmount;

  return (
    <div className="card-premium p-6">
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <p className="font-semibold">Manual confirmation</p>
        <p className="mt-1 text-amber-800/90">
          USDT payments are not auto-confirmed on-chain. After you send USDT and submit your transaction hash, our team
          verifies the TRC20 transfer manually and updates this order.
        </p>
      </div>

      <h2 className="mt-6 text-lg font-semibold text-slate-900">USDT TRC20 payment</h2>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Order number</dt>
          <dd className="font-mono font-medium text-slate-900">{order.orderNumber}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Catalog subtotal (USD reference)</dt>
          <dd className="font-medium text-slate-900">{formatReferencePrice(order.catalogSubtotalUsd)}</dd>
        </div>
        <div className="flex justify-between border-t border-slate-100 pt-2">
          <dt className="font-medium text-slate-700">USDT amount due</dt>
          <dd className="font-mono text-lg font-bold text-slate-900">
            {formatUsdtAmount(order.expectedAmount)} USDT
          </dd>
        </div>
        {!amountsMatch && (
          <p className="text-xs text-slate-500">
            Minimum online checkout is USD ${PAYMENT.minAmount}. USDT due matches the order total, not a separate
            quote.
          </p>
        )}
        {order.receivedAmount != null && (
          <div className="flex justify-between">
            <dt className="text-slate-500">Received (on-chain check)</dt>
            <dd className="font-mono text-slate-800">{formatUsdtAmount(order.receivedAmount)} USDT</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-slate-500">Network</dt>
          <dd className="text-slate-800">{PAYMENT.network} {PAYMENT.protocol}</dd>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <dt className="text-slate-500">TRC20 address</dt>
          <dd className="break-all font-mono text-sky-700">{order.paymentAddress}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Payment status</dt>
          <dd className="font-medium text-slate-800">{formatPaymentStatus(order.paymentStatus)}</dd>
        </div>
        {order.verificationStatus && order.verificationStatus !== order.paymentStatus && (
          <div className="flex justify-between">
            <dt className="text-slate-500">Verification</dt>
            <dd className="text-slate-800">{formatPaymentStatus(order.verificationStatus)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-slate-500">Order status</dt>
          <dd className="text-slate-800">{order.status}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Payment window</dt>
          <dd className="text-slate-800">
            {new Date(order.expiresAt).toLocaleString()}
            {expired ? " (expired)" : ""}
          </dd>
        </div>
        {order.txHash && (
          <div className="flex flex-col gap-1">
            <dt className="text-slate-500">Transaction hash</dt>
            <dd className="break-all font-mono text-xs text-slate-700">{order.txHash}</dd>
          </div>
        )}
      </dl>

      <div className="panel-muted mt-4 text-xs text-slate-600">
        <p className="font-semibold text-slate-800">Payment instructions</p>
        <ol className="mt-2 list-decimal space-y-1 pl-4">
          <li>
            Send exactly <strong>{formatUsdtAmount(order.expectedAmount)} USDT</strong> on TRC20 to the address above.
          </li>
          <li>Use only the official USDT TRC20 contract: {PAYMENT.contract}</li>
          <li>Paste your transaction hash below after sending.</li>
          <li>Our team performs manual confirmation — allow time for verification.</li>
        </ol>
      </div>

      <button type="button" onClick={copyAddress} className="btn-secondary mt-4 text-sm">
        {copied ? "Address copied" : "Copy TRC20 address"}
      </button>

      {!paid && !expired && order.expectedAmount > 0 && (
        <>
          <label className="form-field mt-6">
            <span className="form-label">Transaction hash (TRC20)</span>
            <input
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="Paste tx hash after payment"
              className="form-input font-mono text-sm"
            />
          </label>
          <button
            type="button"
            onClick={submitTx}
            disabled={txHash.length < 10}
            className="btn-primary mt-3 text-sm disabled:opacity-50"
          >
            Submit transaction hash for manual confirmation
          </button>
        </>
      )}

      {manualReview && !paid && (
        <p className="mt-4 text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
          Your payment is in manual confirmation. We will update this page when verification is complete.
        </p>
      )}

      {msg && <p className="mt-3 text-sm text-slate-600">{msg}</p>}
    </div>
  );
}
