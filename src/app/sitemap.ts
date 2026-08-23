import type { MetadataRoute } from "next";
import { areas, blogPosts, brands, combos, services } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

/** Дата сборки: единая отметка для страниц без собственной даты */
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
      { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
      { url: absoluteUrl("/brands"), changeFrequency: "monthly", priority: 0.8 },
      { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.8 },
      { url: absoluteUrl("/faq"), changeFrequency: "monthly", priority: 0.7 },
      { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.6 },
      { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.6 },
      { url: absoluteUrl("/areas"), changeFrequency: "monthly", priority: 0.7 },
    ] satisfies MetadataRoute.Sitemap
  ).map((page) => ({ ...page, lastModified: BUILD_DATE }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}`),
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
    ...(s.image ? { images: [s.image] } : {}),
  }));

  const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
    url: absoluteUrl(`/brands/${b.slug}`),
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const areaPages: MetadataRoute.Sitemap = areas.map((a) => ({
    url: absoluteUrl(`/areas/${a.slug}`),
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comboPages: MetadataRoute.Sitemap = combos.map((c) => ({
    url: absoluteUrl(`/services/${c.service}/${c.brand}`),
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const postPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.dateIso),
    changeFrequency: "yearly",
    priority: 0.5,
    images: [p.image.startsWith("http") ? p.image : absoluteUrl(p.image)],
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...brandPages,
    ...areaPages,
    ...comboPages,
    ...postPages,
  ];
}
