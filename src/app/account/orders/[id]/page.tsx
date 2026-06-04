import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { OrderPaymentPanel } from "@/components/OrderPaymentPanel";
import { ContactBar } from "@/components/ContactBar";

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
    include: { product: true },
  });
  if (!order || order.userId !== session.sub) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/account/orders" className="text-sm text-cyan-400 hover:underline">← Orders</Link>
      <h1 className="mt-4 text-2xl font-bold text-white">Order {order.orderNumber}</h1>
      <p className="mt-2 text-slate-400">{order.product.name} × {order.quantity}</p>
      <p className="text-slate-400">Type: {order.orderType} · Status: {order.status}</p>
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
