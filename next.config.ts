import type { NextConfig } from "next";

const productionSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://jlaise.dev";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/home/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        source: "/home/Jakob_Laise_Resume.pdf",
        headers: [
          {
            key: "Link",
            value: `<${productionSiteUrl}/resume>; rel="canonical"`,
          },
        ],
      },
      {
        source: "/pic",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
