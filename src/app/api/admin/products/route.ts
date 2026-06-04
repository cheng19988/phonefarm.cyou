import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { z } from "zod";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return NextResponse.json(await prisma.product.findMany({ orderBy: { name: "asc" } }));
}

const patchSchema = z.object({
  id: z.string(),
  priceUsd: z.number().optional(),
  stock: z.number().int().optional(),
  published: z.boolean().optional(),
});

export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const data = patchSchema.parse(await req.json());
  const { id, ...rest } = data;
  const updated = await prisma.product.update({ where: { id }, data: rest });
  return NextResponse.json(updated);
}
