import type { MetadataRoute } from "next";

const SITE_URL = "https://www.rayhanfitnessbd.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/icon-*.png", "/favicon.ico", "/icon.png"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
