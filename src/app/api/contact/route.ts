import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  country: z.string().optional(),
  messaging: z.string().optional(),
  phone: z.string().optional(),
  deviceQuantity: z.string().optional(),
  productInterest: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    await prisma.contactSubmission.create({ data: body });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
}
