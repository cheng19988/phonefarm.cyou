import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatReferencePrice } from "@/lib/pricing";
import { LogoutButton } from "@/components/LogoutButton";

function orderSummary(order: {
  product: { name: string } | null;
  quantity: number;
  expectedAmount: number;
  items: { product: { name: string }; quantity: number }[];
}) {
  if (order.items.length > 0) {
    if (order.items.length === 1) {
      const item = order.items[0]!;
      return `${item.product.name} × ${item.quantity}`;
    }
    return `${order.items.length} items`;
  }
  return `${order.product?.name ?? "Order"} × ${order.quantity}`;
}

export default async function OrdersPage() {
  const session = await getSession();
  if (!session || session.role !== "user") redirect("/login?redirect=/account/orders");

  const orders = await prisma.order.findMany({
    where: { userId: session.sub },
    include: {
      product: true,
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="site-container py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="page-title">My Orders</h1>
        <LogoutButton />
      </div>
      <div className="mt-8 space-y-4">
        {orders.length === 0 && (
          <p className="text-slate-600">
            No orders yet.{" "}
            <Link href="/shop" className="link-accent">Browse catalog</Link>
            {" · "}
            <Link href="/contact" className="link-accent">Request a quote</Link>
          </p>
        )}
        {orders.map((o) => (
          <Link
            key={o.id}
            href={`/account/orders/${o.id}`}
            className="card-premium block p-4 hover:border-sky-300"
          >
            <div className="flex flex-wrap justify-between gap-2">
              <span className="font-mono font-medium text-slate-900">{o.orderNumber}</span>
              <span className="font-medium capitalize text-sky-700">{o.paymentStatus}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{orderSummary(o)}</p>
            <p className="text-sm font-medium text-slate-800">{formatReferencePrice(o.expectedAmount)}</p>
            <p className="text-sm text-slate-500">{new Date(o.createdAt).toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
