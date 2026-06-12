"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { notifyContactSubmission } from "@/lib/contact-notify";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  country: z.string().min(1),
  messaging: z.string().optional(),
  deviceQuantity: z.string().optional(),
  productInterest: z.string().optional(),
  productSlug: z.string().optional(),
  controlMethod: z.string().optional(),
  useCase: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

function composeMessage(body: z.infer<typeof schema>) {
  const parts: string[] = [];
  if (body.productSlug) parts.push(`Product slug: ${body.productSlug}`);
  if (body.controlMethod) parts.push(`Preferred control method: ${body.controlMethod}`);
  if (body.useCase) parts.push(`Use case: ${body.useCase}`);
  if (body.message?.trim()) parts.push(body.message.trim());
  return parts.join("\n\n") || undefined;
}

export async function submitContactForm(formData: FormData) {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    country: formData.get("country"),
    messaging: formData.get("messaging") || undefined,
    deviceQuantity: formData.get("deviceQuantity") || undefined,
    productInterest: formData.get("productInterest") || undefined,
    productSlug: formData.get("productSlug") || undefined,
    controlMethod: formData.get("controlMethod") || undefined,
    useCase: formData.get("useCase") || undefined,
    message: formData.get("message") || undefined,
    source: formData.get("source") || "contact",
  });

  const returnPath = String(formData.get("returnPath") || "/contact");

  if (!parsed.success) {
    const qs = new URLSearchParams({ contact: "error" });
    redirect(`${returnPath}?${qs.toString()}`);
  }

  const data = parsed.data;
  const message = composeMessage(data);
  const record = {
    name: data.name,
    email: data.email,
    country: data.country,
    messaging: data.messaging,
    deviceQuantity: data.deviceQuantity,
    productInterest: data.productInterest,
    message,
    source: data.source,
  };

  try {
    await prisma.contactSubmission.create({ data: record });
    void notifyContactSubmission(record);
  } catch {
    const qs = new URLSearchParams({ contact: "error" });
    redirect(`${returnPath}?${qs.toString()}`);
  }

  const qs = new URLSearchParams({ contact: "success" });
  redirect(`${returnPath}?${qs.toString()}`);
}
