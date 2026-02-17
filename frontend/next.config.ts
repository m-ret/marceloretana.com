import withVercelToolbar from "@vercel/toolbar/plugins/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withVercelToolbar()(nextConfig);
