/** Статьи-советы: вход из поиска по симптомам, маркам и узлам */

import rawPosts from "@/content/blog/posts.json";
import type { BlogPost } from "./blog-types";

export type { BlogFaq, BlogPost, BlogSection } from "./blog-types";
export { BLOG_CATEGORIES } from "./blog-types";

const LEGACY_DATES: Record<string, { date: string; dateIso: string }> = {
  "proverka-avto-pered-pokupkoy": {
    date: "18 авг 2026",
    dateIso: "2026-08-18",
  },
  "diagnostika-kia-hyundai": { date: "12 авг 2026", dateIso: "2026-08-12" },
  "malyarnye-raboty-podbor-cveta": {
    date: "28 июл 2026",
    dateIso: "2026-07-28",
  },
  "zachem-diagnostika-vag": { date: "15 июл 2026", dateIso: "2026-07-15" },
  "abs-i-oshibki-passat": { date: "2 июн 2026", dateIso: "2026-06-02" },
  "sceplenie-i-korobka": { date: "18 мая 2026", dateIso: "2026-05-18" },
};

function withLegacyDates(posts: BlogPost[]): BlogPost[] {
  return posts.map((post) => {
    const legacy = LEGACY_DATES[post.slug];
    return legacy ? { ...post, ...legacy } : post;
  });
}

export const blogPosts: BlogPost[] = withLegacyDates(rawPosts as BlogPost[]).sort(
  (a, b) => (a.dateIso < b.dateIso ? 1 : a.dateIso > b.dateIso ? -1 : 0)
);

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function articleBody(post: BlogPost): string {
  return [
    ...post.lead,
    ...post.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ...post.takeaways,
    ...post.faqs.flatMap((f) => [f.q, f.a]),
  ].join("\n\n");
}

export function articleParagraphs(post: BlogPost): string[] {
  return [...post.lead, ...post.sections.flatMap((s) => s.paragraphs)];
}

export function relatedPosts(post: BlogPost, n = 3): BlogPost[] {
  const scored = blogPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = 0;
      if (p.category === post.category) score += 4;
      if (post.relatedService && p.relatedService === post.relatedService)
        score += 3;
      if (post.relatedBrand && p.relatedBrand === post.relatedBrand) score += 2;
      if (post.relatedModel && p.relatedModel === post.relatedModel) score += 2;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || (a.p.dateIso < b.p.dateIso ? 1 : -1));
  return scored.slice(0, n).map((x) => x.p);
}

export function postsMatching(
  opts: { service?: string; brand?: string },
  n = 3
): BlogPost[] {
  return blogPosts
    .filter((p) => {
      if (opts.service && opts.brand) {
        return (
          p.relatedService === opts.service || p.relatedBrand === opts.brand
        );
      }
      if (opts.service) return p.relatedService === opts.service;
      if (opts.brand) return p.relatedBrand === opts.brand;
      return false;
    })
    .slice(0, n);
}

export function blogCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of blogPosts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ru"));
}
