import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { verifyTronUsdtPayment } from "@/lib/orders";

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

  if (new Date() > order.expiresAt && order.paymentStatus !== "paid") {
    await prisma.order.update({
      where: { id },
      data: { status: "Expired", paymentStatus: "expired", verificationStatus: "expired" },
    });
    return NextResponse.json({ error: "Order expired", status: "Expired" }, { status: 410 });
  }

  const result = await verifyTronUsdtPayment({
    address: order.paymentAddress,
    expectedAmount: order.expectedAmount,
    since: order.createdAt,
    txHash: order.txHash,
  });

  if (result.verified && result.receivedAmount && result.receivedAmount >= order.expectedAmount) {
    const updated = await prisma.order.update({
      where: { id },
      data: {
        status: "Paid",
        paymentStatus: "paid",
        verificationStatus: "confirmed",
        receivedAmount: result.receivedAmount,
        txHash: result.txHash ?? order.txHash,
        paidAt: new Date(),
      },
    });
    return NextResponse.json({ order: updated, verification: result });
  }

  await prisma.order.update({
    where: { id },
    data: { verificationStatus: "pending" },
  });

  return NextResponse.json({
    order,
    verification: result,
    pending: true,
  });
}
