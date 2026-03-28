import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-03-28");

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
