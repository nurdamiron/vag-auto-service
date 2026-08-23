import type { MetadataRoute } from "next";
import { blogPosts, brands, services } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1, lastModified: now },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: "monthly",
      priority: 0.9,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/brands`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "yearly",
      priority: 0.6,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.6,
      lastModified: now,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${SITE_URL}/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.dateIso),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticPages, ...servicePages, ...brandPages, ...postPages];
}
