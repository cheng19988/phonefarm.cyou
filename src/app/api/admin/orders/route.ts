import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { z } from "zod";
import { PAYMENT_STATUS } from "@/lib/payment-status";
import { expireOrderWithStockRestore } from "@/lib/order-stock";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const orders = await prisma.order.findMany({
    include: {
      product: true,
      user: { select: { email: true, name: true, phone: true, country: true } },
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

const patchSchema = z.object({
  id: z.string(),
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
  receivedAmount: z.number().optional(),
  adminNote: z.string().optional(),
});

export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id, status, paymentStatus, receivedAmount, adminNote } = patchSchema.parse(await req.json());
  const data: {
    status?: string;
    paymentStatus?: string;
    receivedAmount?: number;
    adminNote?: string;
    paidAt?: Date;
    verificationStatus?: string;
  } = {};
  if (status) data.status = status;
  if (paymentStatus) {
    data.paymentStatus = paymentStatus;
    if (
      paymentStatus === PAYMENT_STATUS.PAID ||
      paymentStatus === PAYMENT_STATUS.OVERPAID
    ) {
      data.paidAt = new Date();
      data.verificationStatus = PAYMENT_STATUS.PAID;
    }
    if (paymentStatus === PAYMENT_STATUS.MANUAL_REVIEW) {
      data.verificationStatus = PAYMENT_STATUS.MANUAL_REVIEW;
    }
    if (paymentStatus === PAYMENT_STATUS.EXPIRED) {
      data.verificationStatus = PAYMENT_STATUS.EXPIRED;
    }
  }
  if (receivedAmount !== undefined) data.receivedAmount = receivedAmount;
  if (adminNote !== undefined) data.adminNote = adminNote;

  if (paymentStatus === PAYMENT_STATUS.EXPIRED) {
    await expireOrderWithStockRestore(id);
    if (adminNote !== undefined) {
      await prisma.order.update({ where: { id }, data: { adminNote } });
    }
    const updated = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } }, user: true },
    });
    return NextResponse.json(updated);
  }

  const updated = await prisma.order.update({
    where: { id },
    data,
    include: { items: { include: { product: true } }, user: true },
  });
  return NextResponse.json(updated);
}
