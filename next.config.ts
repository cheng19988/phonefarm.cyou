import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
