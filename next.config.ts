import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.karpen.com.tr" },
      { protocol: "https", hostname: "www.egepen.com.tr" },
      { protocol: "https", hostname: "www.kompen.com.tr" },
      { protocol: "https", hostname: "flashpen.az" }
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
