import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { verifyTronUsdtPayment } from "@/lib/orders";
import { expireOrderWithStockRestore } from "@/lib/order-stock";
import { PAYMENT_STATUS } from "@/lib/payment-status";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: { product: true },
  });
  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (session.role === "user" && order.userId !== session.sub) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (
    new Date() > order.expiresAt &&
    order.paymentStatus !== PAYMENT_STATUS.PAID &&
    order.paymentStatus !== PAYMENT_STATUS.OVERPAID
  ) {
    await expireOrderWithStockRestore(id);
    return NextResponse.json({ error: "Order expired", status: "Expired" }, { status: 410 });
  }

  const result = await verifyTronUsdtPayment({
    address: order.paymentAddress,
    expectedAmount: order.expectedAmount,
    since: order.createdAt,
    txHash: order.txHash,
  });

  if (result.verified && result.receivedAmount != null) {
    const received = result.receivedAmount;
    const expected = order.expectedAmount;
    let paymentStatus: string = PAYMENT_STATUS.MANUAL_REVIEW;
    let orderStatus = order.status;

    if (received >= expected) {
      paymentStatus =
        received > expected ? PAYMENT_STATUS.OVERPAID : PAYMENT_STATUS.PAID;
      orderStatus = "Paid";
    } else {
      paymentStatus = PAYMENT_STATUS.UNDERPAID;
    }

    const updated = await prisma.order.update({
      where: { id },
      data: {
        status: orderStatus === "Paid" ? "Paid" : order.status,
        paymentStatus,
        verificationStatus:
          paymentStatus === PAYMENT_STATUS.PAID || paymentStatus === PAYMENT_STATUS.OVERPAID
            ? PAYMENT_STATUS.PAID
            : PAYMENT_STATUS.MANUAL_REVIEW,
        receivedAmount: received,
        txHash: result.txHash ?? order.txHash,
        paidAt: paymentStatus === PAYMENT_STATUS.PAID || paymentStatus === PAYMENT_STATUS.OVERPAID ? new Date() : order.paidAt,
      },
    });
    return NextResponse.json({ order: updated, verification: result });
  }

  const manualReview =
    order.txHash || order.paymentStatus === PAYMENT_STATUS.MANUAL_REVIEW;
  await prisma.order.update({
    where: { id },
    data: {
      verificationStatus: manualReview ? PAYMENT_STATUS.MANUAL_REVIEW : PAYMENT_STATUS.PENDING,
    },
  });

  return NextResponse.json({
    order,
    verification: result,
    manualConfirmation: true,
    message: result.message,
  });
}
