import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
      paymentStatus: { notIn: ["paid", "quote"] },
      status: { in: ["Pending", "Waiting for Payment", "pending payment", "pending"] },
    },
    data: { status: "Expired", paymentStatus: "expired", verificationStatus: "expired" },
  });
  return NextResponse.json({ expired: result.count });
}
