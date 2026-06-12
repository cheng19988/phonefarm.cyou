import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PAYMENT_STATUS } from "@/lib/payment-status";

/** Call periodically to mark unpaid orders past expiresAt as Expired */
export async function POST(req: Request) {
  const secret = req.headers.get("x-cron-secret");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const now = new Date();
  const result = await prisma.order.updateMany({
    where: {
      expiresAt: { lt: now },
      paymentStatus: {
        notIn: [
          PAYMENT_STATUS.PAID,
          PAYMENT_STATUS.QUOTE,
          PAYMENT_STATUS.OVERPAID,
          PAYMENT_STATUS.EXPIRED,
          PAYMENT_STATUS.CANCELLED,
        ],
      },
    },
    data: {
      status: "Expired",
      paymentStatus: PAYMENT_STATUS.EXPIRED,
      verificationStatus: PAYMENT_STATUS.EXPIRED,
    },
  });
  return NextResponse.json({ expired: result.count });
}
