import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/for-ai",
        destination: "/ai",
        statusCode: 301,
      },
      {
        source: "/products/20-slot-motherboard-box",
        destination: "/products/motherboard-box-20-slot",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
