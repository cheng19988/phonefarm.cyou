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
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-white">My Orders</h1>
        <LogoutButton />
      </div>
      <div className="mt-8 space-y-4">
        {orders.length === 0 && (
          <p className="text-slate-400">
            No orders yet.{" "}
            <Link href="/shop" className="text-cyan-400">Browse catalog</Link>
            {" · "}
            <Link href="/contact" className="text-cyan-400">Request a quote</Link>
          </p>
        )}
        {orders.map((o) => (
          <Link
            key={o.id}
            href={`/account/orders/${o.id}`}
            className="block rounded-xl border border-slate-800 p-4 hover:border-cyan-600/40"
          >
            <div className="flex flex-wrap justify-between gap-2">
              <span className="font-mono text-white">{o.orderNumber}</span>
              <span className="text-cyan-400 capitalize">{o.paymentStatus}</span>
            </div>
            <p className="mt-1 text-sm text-slate-400">{orderSummary(o)}</p>
            <p className="text-sm text-slate-300">{formatReferencePrice(o.expectedAmount)}</p>
            <p className="text-sm text-slate-500">{new Date(o.createdAt).toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
