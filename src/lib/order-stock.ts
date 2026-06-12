import { prisma } from "./prisma";
import { PAYMENT_STATUS } from "./payment-status";

/** Payment states where checkout reserved inventory and should be released on cancel/expire. */
export const STOCK_RESERVED_PAYMENT_STATUSES = [
  PAYMENT_STATUS.PENDING,
  "unpaid",
] as const;

export function shouldRestoreStockForPaymentStatus(paymentStatus: string): boolean {
  const key = paymentStatus.toLowerCase().trim();
  return (STOCK_RESERVED_PAYMENT_STATUSES as readonly string[]).includes(key);
}

export async function restoreOrderStock(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order || !shouldRestoreStockForPaymentStatus(order.paymentStatus)) return;

  await prisma.$transaction(
    order.items.map((item) =>
      prisma.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } },
      })
    )
  );
}

export async function expireOrderWithStockRestore(orderId: string) {
  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
    if (!order || order.paymentStatus === PAYMENT_STATUS.EXPIRED) return;

    if (shouldRestoreStockForPaymentStatus(order.paymentStatus)) {
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
    }

    await tx.order.update({
      where: { id: orderId },
      data: {
        status: "Expired",
        paymentStatus: PAYMENT_STATUS.EXPIRED,
        verificationStatus: PAYMENT_STATUS.EXPIRED,
      },
    });
  });
}

export async function expireAwaitingPaymentOrders(now = new Date()): Promise<number> {
  const awaiting = await prisma.order.findMany({
    where: {
      expiresAt: { lt: now },
      paymentStatus: { in: [...STOCK_RESERVED_PAYMENT_STATUSES] },
    },
    select: { id: true },
  });

  for (const order of awaiting) {
    await expireOrderWithStockRestore(order.id);
  }
  return awaiting.length;
}
