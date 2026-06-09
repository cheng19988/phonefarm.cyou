import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { OrderPaymentPanel } from "@/components/OrderPaymentPanel";
import { ContactBar } from "@/components/ContactBar";
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
      <Link href="/account/orders" className="text-sm text-cyan-400 hover:underline">
        ← Orders
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-white">Order {order.orderNumber}</h1>
      <p className="mt-2 text-slate-400 capitalize">
        Payment: {order.paymentStatus} · Status: {order.status}
      </p>

      <div className="mt-6 rounded-xl border border-slate-800 p-4">
        <h2 className="font-medium text-white">Items</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          {lines.map((line) => (
            <li key={line.product.id} className="flex justify-between gap-4">
              <span>
                {line.product.name} × {line.quantity}
              </span>
              <span>{formatReferencePrice(line.lineTotalUsd)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between border-t border-slate-800 pt-4 font-medium text-white">
          <span>Total (USD)</span>
          <span>{formatReferencePrice(order.expectedAmount)}</span>
        </p>
      </div>

      {(order.customerName || order.shippingAddress) && (
        <div className="mt-6 rounded-xl border border-slate-800 p-4 text-sm text-slate-300">
          <h2 className="font-medium text-white">Shipping details</h2>
          {order.customerName && <p className="mt-2">Name: {order.customerName}</p>}
          {order.customerEmail && <p>Email: {order.customerEmail}</p>}
          {order.contactMessaging && <p>WhatsApp/Telegram: {order.contactMessaging}</p>}
          {order.country && <p>Country: {order.country}</p>}
          {order.shippingAddress && <p className="mt-2 whitespace-pre-wrap">{order.shippingAddress}</p>}
          {order.orderNotes && (
            <p className="mt-2 text-slate-400">
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
        <p className="mt-6 text-slate-400">Quote request received. Sales will contact you via email or messaging apps.</p>
      )}
      <div className="mt-8">
        <ContactBar />
      </div>
    </div>
  );
}
