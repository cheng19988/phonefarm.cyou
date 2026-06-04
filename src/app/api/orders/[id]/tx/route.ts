import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

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
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order || order.userId !== session.sub) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const { txHash } = schema.parse(await req.json());
  const updated = await prisma.order.update({
    where: { id },
    data: { txHash, verificationStatus: "submitted" },
  });
  return NextResponse.json(updated);
}
