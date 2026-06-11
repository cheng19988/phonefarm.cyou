import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { OrderPaymentPanel } from "@/components/OrderPaymentPanel";
import { formatReferencePrice } from "@/lib/pricing";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session || session.role !== "user") redirect("/login");

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      product: true,
      items: { include: { product: true } },
    },
  });
  if (!order || order.userId !== session.sub) notFound();

  const lines =
    order.items.length > 0
      ? order.items
      : order.product
        ? [
            {
              quantity: order.quantity,
              unitPriceUsd: order.expectedAmount / Math.max(order.quantity, 1),
              lineTotalUsd: order.expectedAmount,
              product: order.product,
            },
          ]
        : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/account/orders" className="link-accent text-sm">
        ← Orders
      </Link>
      <h1 className="page-title mt-4">Order {order.orderNumber}</h1>
      <p className="mt-2 text-slate-600 capitalize">
        Payment: {order.paymentStatus} · Status: {order.status}
      </p>

      <div className="card-premium mt-6 p-4">
        <h2 className="font-medium text-slate-900">Items</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {lines.map((line) => (
            <li key={line.product.id} className="flex justify-between gap-4">
              <span>{line.product.name} × {line.quantity}</span>
              <span className="font-medium text-slate-900">{formatReferencePrice(line.lineTotalUsd)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between border-t border-slate-200 pt-4 font-semibold text-slate-900">
          <span>Total (USD)</span>
          <span>{formatReferencePrice(order.expectedAmount)}</span>
        </p>
      </div>

      {(order.customerName || order.shippingAddress) && (
        <div className="card-premium mt-6 p-4 text-sm text-slate-600">
          <h2 className="font-medium text-slate-900">Shipping details</h2>
          {order.customerName && <p className="mt-2">Name: {order.customerName}</p>}
          {order.customerEmail && <p>Email: {order.customerEmail}</p>}
          {order.contactMessaging && <p>WhatsApp/Telegram: {order.contactMessaging}</p>}
          {order.country && <p>Country: {order.country}</p>}
          {order.shippingAddress && <p className="mt-2 whitespace-pre-wrap">{order.shippingAddress}</p>}
          {order.orderNotes && (
            <p className="mt-2">
              <span className="text-slate-500">Notes: </span>
              {order.orderNotes}
            </p>
          )}
        </div>
      )}

      {order.orderType === "purchase" && order.expectedAmount > 0 ? (
        <div className="mt-8">
          <OrderPaymentPanel
            order={{
              id: order.id,
              orderNumber: order.orderNumber,
              status: order.status,
              expectedAmount: order.expectedAmount,
              paymentAddress: order.paymentAddress,
              paymentStatus: order.paymentStatus,
              expiresAt: order.expiresAt.toISOString(),
              txHash: order.txHash,
            }}
          />
        </div>
      ) : (
        <p className="mt-6 text-slate-600">
          Quote request received. Sales will contact you via email or messaging apps.
        </p>
      )}
      <div className="mt-8">
      </div>
    </div>
  );
}
