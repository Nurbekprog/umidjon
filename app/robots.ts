import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/projects/", "/blog/", "/avatar.jpeg", "/image_0.png", "/opengraph-image"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
