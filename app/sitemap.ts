import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/shop`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/shop/${product.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: product.isTrending ? 0.8 : 0.7,
    images: product.image ? [product.image] : undefined,
  }));

  return [...staticRoutes, ...productRoutes];
}
