import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyContactSubmission } from "@/lib/contact-notify";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  country: z.string().optional(),
  messaging: z.string().optional(),
  phone: z.string().optional(),
  deviceQuantity: z.string().optional(),
  productInterest: z.string().optional(),
  controlMethod: z.string().optional(),
  useCase: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

function composeMessage(body: z.infer<typeof schema>) {
  const parts: string[] = [];
  if (body.controlMethod) parts.push(`Preferred control method: ${body.controlMethod}`);
  if (body.useCase) parts.push(`Use case: ${body.useCase}`);
  if (body.message?.trim()) parts.push(body.message.trim());
  return parts.join("\n\n") || undefined;
}

export async function POST(req: Request) {
  try {
    const parsed = schema.parse(await req.json());
    const { controlMethod, useCase, ...body } = parsed;
    void controlMethod;
    void useCase;
    const message = composeMessage(parsed);
    const record = {
      ...body,
      message,
    };
    await prisma.contactSubmission.create({ data: record });
    void notifyContactSubmission(record);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
}
