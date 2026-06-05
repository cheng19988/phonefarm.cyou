import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./prisma/vercel.db"],
    "/api/*": ["./prisma/vercel.db"],
  },
};

export default nextConfig;
