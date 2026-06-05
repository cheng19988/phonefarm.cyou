import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";

/** Vercel serverless FS is read-only except /tmp; SQLite must live there at runtime. */
function configureDatabaseUrl(): void {
  if (!process.env.VERCEL) {
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL = "file:./dev.db";
    }
    return;
  }

  const tmpDb = "/tmp/vercel.db";
  if (!existsSync(tmpDb)) {
    const bundled = [
      join(process.cwd(), "prisma", "vercel.db"),
      join(process.cwd(), "vercel.db"),
    ].find((path) => existsSync(path));

    if (bundled) {
      copyFileSync(bundled, tmpDb);
    }
  }

  process.env.DATABASE_URL = `file:${tmpDb}`;
}

configureDatabaseUrl();

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}
