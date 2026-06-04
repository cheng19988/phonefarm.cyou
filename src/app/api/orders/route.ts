import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { PAYMENT } from "@/lib/constants";
import { generateOrderNumber, orderExpiryDate } from "@/lib/orders";

const schema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1).default(1),
  orderType: z.enum(["purchase", "quote"]).default("purchase"),
});

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "user") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await prisma.order.findMany({
    where: { userId: session.sub },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "user") {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }
  try {
    const { productId, quantity, orderType } = schema.parse(await req.json());
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || !product.published) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (orderType === "purchase" && product.stock < quantity) {
      return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
    }
    const unitPrice = product.priceUsd > 0 ? product.priceUsd : 0;
    const expectedAmount =
      orderType === "quote" ? 0 : Math.max(PAYMENT.minAmount, unitPrice * quantity);

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session.sub,
        productId: product.id,
        quantity,
        orderType,
        status: orderType === "quote" ? "Pending" : "Waiting for Payment",
        expectedAmount,
        paymentAddress: PAYMENT.address,
        paymentNetwork: PAYMENT.network,
        paymentCurrency: PAYMENT.currency,
        paymentStatus: orderType === "quote" ? "quote" : "unpaid",
        expiresAt: orderExpiryDate(),
      },
      include: { product: true },
    });

    if (orderType === "purchase" && product.stock >= quantity) {
      await prisma.product.update({
        where: { id: product.id },
        data: { stock: { decrement: quantity } },
      });
    }

    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Order failed" }, { status: 400 });
  }
}
