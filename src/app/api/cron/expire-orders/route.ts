import { NextResponse } from "next/server";
import { isCronAuthorized } from "@/lib/cron-auth";
import { expireAwaitingPaymentOrders } from "@/lib/order-stock";

async function runExpire(req: Request) {
  if (!isCronAuthorized(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const expired = await expireAwaitingPaymentOrders();
  return NextResponse.json({ expired });
}

/** Vercel cron invokes GET; manual jobs may POST with x-cron-secret. */
export async function GET(req: Request) {
  return runExpire(req);
}

export async function POST(req: Request) {
  return runExpire(req);
}
