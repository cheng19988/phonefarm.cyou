import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { z } from "zod";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const orders = await prisma.order.findMany({
    include: { product: true, user: { select: { email: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

const patchSchema = z.object({
  id: z.string(),
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
});

export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id, status, paymentStatus } = patchSchema.parse(await req.json());
  const updated = await prisma.order.update({
    where: { id },
    data: { status, paymentStatus },
  });
  return NextResponse.json(updated);
}
