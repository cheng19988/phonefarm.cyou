import type { NextConfig } from "next";

const ROOT_HOST = "phonefarm.cyou";
const CANONICAL_HOST = "www.phonefarm.cyou";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: ROOT_HOST }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      {
        source: "/products/20-slot-motherboard-box",
        destination: "/products/motherboard-box-20-slot",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
