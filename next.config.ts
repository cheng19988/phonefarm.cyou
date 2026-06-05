import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./prisma/vercel.db"],
    "/api/*": ["./prisma/vercel.db"],
  },
  async redirects() {
    return [
      {
        source: "/products/20-slot-motherboard-box",
        destination: "/products/motherboard-box-20-slot",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
