import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createToken, setSessionCookie, verifyPassword } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  admin: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const { email, password, admin } = schema.parse(await req.json());
    if (admin) {
      const a = await prisma.adminUser.findUnique({ where: { email } });
      if (!a || !(await verifyPassword(password, a.passwordHash))) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
      const token = await createToken({ sub: a.id, email: a.email, role: "admin" });
      await setSessionCookie(token);
      return NextResponse.json({ ok: true, role: "admin" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = await createToken({ sub: user.id, email: user.email, role: "user" });
    await setSessionCookie(token);
    return NextResponse.json({ ok: true, role: "user" });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 400 });
  }
}
