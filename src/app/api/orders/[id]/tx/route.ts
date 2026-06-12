import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { notifyOrderEvent } from "@/lib/order-notify";
import { PAYMENT_STATUS } from "@/lib/payment-status";

const schema = z.object({ txHash: z.string().min(10) });

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getSession();
  if (!session || session.role !== "user") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });
  if (!order || order.userId !== session.sub) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const { txHash } = schema.parse(await req.json());
  const updated = await prisma.order.update({
    where: { id },
    data: {
      txHash,
      paymentStatus: PAYMENT_STATUS.MANUAL_REVIEW,
      verificationStatus: PAYMENT_STATUS.MANUAL_REVIEW,
    },
    include: { items: { include: { product: true } } },
  });

  void notifyOrderEvent({
    kind: "tx_submitted",
    orderNumber: updated.orderNumber,
    customerName: updated.customerName,
    customerEmail: updated.customerEmail,
    contactMessaging: updated.contactMessaging,
    country: updated.country,
    shippingAddress: updated.shippingAddress,
    orderNotes: updated.orderNotes,
    expectedAmount: updated.expectedAmount,
    paymentStatus: updated.paymentStatus,
    txHash,
    items: updated.items.map((i) => ({
      name: i.product.name,
      quantity: i.quantity,
      lineTotalUsd: i.lineTotalUsd,
    })),
  });

  return NextResponse.json(updated);
}
