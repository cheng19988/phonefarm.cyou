import type { NextConfig } from "next";
import { CANONICAL_HOST, ROOT_HOST } from "./src/lib/site-hosts";

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
