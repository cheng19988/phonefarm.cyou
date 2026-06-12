import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { PAYMENT } from "@/lib/constants";
import { getUsdtTrc20Address } from "@/lib/payment";
import { computeUsdtChargeAmount, generateOrderNumber, orderExpiryDate } from "@/lib/orders";
import { PAYMENT_STATUS } from "@/lib/payment-status";
import { canAddToCart } from "@/lib/product-purchase";
import { notifyOrderEvent } from "@/lib/order-notify";

const legacySchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1).default(1),
  orderType: z.enum(["purchase", "quote"]).default("purchase"),
});

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().min(1),
      })
    )
    .min(1),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  contactMessaging: z.string().optional(),
  country: z.string().optional(),
  shippingAddress: z.string().min(1),
  orderNotes: z.string().optional(),
  paymentMethod: z.literal("USDT_TRC20").default("USDT_TRC20"),
});

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "user") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await prisma.order.findMany({
    where: { userId: session.sub },
    include: {
      product: true,
      items: { include: { product: true } },
    },
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
    const body = await req.json();

    if (Array.isArray(body.items)) {
      const data = checkoutSchema.parse(body);
      const products = await prisma.product.findMany({
        where: { id: { in: data.items.map((i) => i.productId) }, published: true },
      });
      if (products.length !== data.items.length) {
        return NextResponse.json({ error: "One or more products not found" }, { status: 404 });
      }

      const lines = data.items.map((item) => {
        const product = products.find((p) => p.id === item.productId)!;
        if (!canAddToCart(product)) {
          throw new Error(`Product not available for direct purchase: ${product.name}`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient availability for ${product.name}`);
        }
        const unitPrice = product.priceUsd;
        return {
          product,
          quantity: item.quantity,
          unitPriceUsd: unitPrice,
          lineTotalUsd: unitPrice * item.quantity,
        };
      });

      const subtotal = lines.reduce((sum, l) => sum + l.lineTotalUsd, 0);
      const expectedAmount = computeUsdtChargeAmount(subtotal);
      const paymentAddress = getUsdtTrc20Address();
      if (!paymentAddress) {
        return NextResponse.json({ error: "Payment address not configured" }, { status: 503 });
      }
      const first = lines[0]!.product;

      const order = await prisma.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          userId: session.sub,
          productId: first.id,
          quantity: lines.reduce((n, l) => n + l.quantity, 0),
          orderType: "purchase",
          status: "pending payment",
          expectedAmount,
          paymentAddress,
          paymentNetwork: PAYMENT.network,
          paymentCurrency: PAYMENT.currency,
          paymentStatus: PAYMENT_STATUS.PENDING,
          verificationStatus: PAYMENT_STATUS.PENDING,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          contactMessaging: data.contactMessaging,
          country: data.country,
          shippingAddress: data.shippingAddress,
          orderNotes: data.orderNotes,
          expiresAt: orderExpiryDate(),
          items: {
            create: lines.map((l) => ({
              productId: l.product.id,
              quantity: l.quantity,
              unitPriceUsd: l.unitPriceUsd,
              lineTotalUsd: l.lineTotalUsd,
            })),
          },
        },
        include: {
          items: { include: { product: true } },
        },
      });

      for (const line of lines) {
        await prisma.product.update({
          where: { id: line.product.id },
          data: { stock: { decrement: line.quantity } },
        });
      }

      void notifyOrderEvent({
        kind: "order_created",
        orderNumber: order.orderNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        contactMessaging: data.contactMessaging,
        country: data.country,
        shippingAddress: data.shippingAddress,
        orderNotes: data.orderNotes,
        expectedAmount,
        paymentStatus: PAYMENT_STATUS.PENDING,
        items: order.items.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          lineTotalUsd: i.lineTotalUsd,
        })),
      });

      return NextResponse.json(order);
    }

    const { productId, quantity, orderType } = legacySchema.parse(body);
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || !product.published) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (orderType === "purchase" && product.stock < quantity) {
      return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
    }
    const unitPrice = product.priceUsd > 0 ? product.priceUsd : 0;
    const lineTotal = unitPrice * quantity;
    const expectedAmount =
      orderType === "quote" ? 0 : computeUsdtChargeAmount(lineTotal);
    const paymentAddress = orderType === "purchase" ? getUsdtTrc20Address() : "";
    if (orderType === "purchase" && !paymentAddress) {
      return NextResponse.json({ error: "Payment address not configured" }, { status: 503 });
    }

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session.sub,
        productId: product.id,
        quantity,
        orderType,
        status: orderType === "quote" ? "pending" : "pending payment",
        expectedAmount,
        paymentAddress,
        paymentNetwork: PAYMENT.network,
        paymentCurrency: PAYMENT.currency,
        paymentStatus: orderType === "quote" ? PAYMENT_STATUS.QUOTE : PAYMENT_STATUS.PENDING,
        verificationStatus: orderType === "quote" ? PAYMENT_STATUS.QUOTE : PAYMENT_STATUS.PENDING,
        expiresAt: orderExpiryDate(),
        items: {
          create: {
            productId: product.id,
            quantity,
            unitPriceUsd: unitPrice,
            lineTotalUsd: unitPrice * quantity,
          },
        },
      },
      include: { product: true, items: { include: { product: true } } },
    });

    if (orderType === "purchase" && product.stock >= quantity) {
      await prisma.product.update({
        where: { id: product.id },
        data: { stock: { decrement: quantity } },
      });
    }

    return NextResponse.json(order);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Order failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
