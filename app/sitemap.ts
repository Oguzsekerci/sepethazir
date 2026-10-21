import type { MetadataRoute } from "next";
import { getGuide, guides } from "@/data/guides";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date("2026-10-21"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/rehber`,
      lastModified: new Date("2026-10-21"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/hakkimizda`,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/yayin-ilkeleri`,
      lastModified: new Date("2026-10-21"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/yazar/oguz-sekerci`,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/cookies`,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  return [
    ...staticRoutes,
    {
      url: `${siteUrl}/araclar/urun-karsilastir`,
      lastModified: new Date("2026-10-21"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...guides.map((guide) => ({
      url: `${siteUrl}/rehber/${guide.slug}`,
      lastModified: getGuide(guide.slug)?.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
