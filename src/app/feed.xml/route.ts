import { blogPosts, business } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

/**
 * RSS-лента статей.
 *
 * Нужна не только читателям: агрегаторы и краулеры ИИ-поисковиков
 * используют её как самый дешёвый способ узнать о новых материалах.
 */
export const dynamic = "force-static";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function GET() {
  const items = blogPosts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return [
        "    <item>",
        `      <title>${escape(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <category>${escape(post.category)}</category>`,
        `      <pubDate>${new Date(post.dateIso).toUTCString()}</pubDate>`,
        `      <description>${escape(post.excerpt)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const lastBuild = blogPosts.length
    ? new Date(blogPosts[0].dateIso).toUTCString()
    : new Date(0).toUTCString();

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escape(business.name)} — советы автосервиса</title>`,
    `    <link>${SITE_URL}</link>`,
    `    <description>${escape(business.description)}</description>`,
    "    <language>ru</language>",
    `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
    `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
