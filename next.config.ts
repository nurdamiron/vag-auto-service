import type { NextConfig } from "next";

/** Канонический хост сайта — без протокола */
const CANONICAL_HOST = "vag-service.com";

/** Хосты, которые склеиваем на канонический (301/308) */
const LEGACY_HOSTS = [`www.${CANONICAL_HOST}`, "vag-auto-service.vercel.app"];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return LEGACY_HOSTS.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `https://${CANONICAL_HOST}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
