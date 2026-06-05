import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export default async function OrdersPage() {
  const session = await getSession();
  if (!session || session.role !== "user") redirect("/login?redirect=/account/orders");

  const orders = await prisma.order.findMany({
    where: { userId: session.sub },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">My Orders</h1>
      <div className="mt-8 space-y-4">
        {orders.length === 0 && (
          <p className="text-slate-400">
            No orders yet.{" "}
            <Link href="/contact" className="text-cyan-400">Request a quote</Link>
            {" · "}
            <Link href="/shop" className="text-cyan-400">Browse catalog</Link>
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
              <span className="text-cyan-400">{o.status}</span>
            </div>
            <p className="mt-1 text-sm text-slate-400">{o.product.name} × {o.quantity}</p>
            <p className="text-sm text-slate-500">{new Date(o.createdAt).toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
