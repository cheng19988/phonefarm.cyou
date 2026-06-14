import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type ProductRow = Awaited<ReturnType<typeof prisma.product.findMany>>[number];

/** Avoid failing `next build` when the DB is unreachable at build time (Neon cold start, etc.). */
export async function safeProductFindMany(
  args: Prisma.ProductFindManyArgs
): Promise<ProductRow[]> {
  try {
    return await prisma.product.findMany(args);
  } catch (error) {
    console.warn("[prisma] product.findMany failed during build — using empty list:", error);
    return [];
  }
}
