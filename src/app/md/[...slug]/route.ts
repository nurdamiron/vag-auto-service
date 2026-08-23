import { notFound } from "next/navigation";
import {
  areas,
  blogPosts,
  brands,
  combos,
  getArea,
  getBrand,
  getCombo,
  getPost,
  getService,
  services,
} from "@/lib/data";
import {
  areaMarkdown,
  brandMarkdown,
  businessMarkdown,
  comboMarkdown,
  diagnosticsMarkdown,
  faqMarkdown,
  postMarkdown,
  serviceMarkdown,
} from "@/lib/markdown";
import { absoluteUrl } from "@/lib/seo";

/**
 * Markdown-зеркало страниц сайта.
 *
 * Публичные адреса выглядят как `/services/computer-diagnostics.md` —
 * суффикс `.md` переписывается сюда в middleware. Такой формат
 * ассистенты и краулеры разбирают точнее, чем HTML со скриптами.
 */
export const dynamic = "force-static";

type Params = { params: Promise<{ slug: string[] }> };

const list = (title: string, items: { name: string; path: string }[]) =>
  [
    `# ${title}`,
    "",
    items
      .map((i) => `- [${i.name}](${absoluteUrl(i.path)}) — ${absoluteUrl(`${i.path}.md`)}`)
      .join("\n"),
  ].join("\n");

function render(slug: string[]): string | null {
  const [section, item] = slug;

  if (!section) {
    return [businessMarkdown(), diagnosticsMarkdown(), faqMarkdown()].join("\n\n");
  }

  if (section === "faq" && !item) return [businessMarkdown(), faqMarkdown()].join("\n\n");

  if (section === "services") {
    if (!item) {
      return list(
        "Услуги",
        services.map((s) => ({ name: s.title, path: `/services/${s.slug}` }))
      );
    }
    const brandSlug = slug[2];
    if (brandSlug) {
      const combo = getCombo(item, brandSlug);
      return combo ? comboMarkdown(combo) : null;
    }
    const service = getService(item);
    return service ? serviceMarkdown(service) : null;
  }

  if (section === "brands") {
    if (!item) {
      return list(
        "Марки",
        brands.map((b) => ({ name: b.name, path: `/brands/${b.slug}` }))
      );
    }
    const brand = getBrand(item);
    return brand ? brandMarkdown(brand) : null;
  }

  if (section === "areas") {
    if (!item) {
      return list(
        "Районы Алматы",
        areas.map((a) => ({ name: `Автосервис ${a.name}`, path: `/areas/${a.slug}` }))
      );
    }
    const area = getArea(item);
    return area ? areaMarkdown(area) : null;
  }

  if (section === "blog") {
    if (!item) {
      return list(
        "Статьи",
        blogPosts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` }))
      );
    }
    const post = getPost(item);
    return post ? postMarkdown(post) : null;
  }

  return null;
}

/** Заранее собираем все существующие адреса — отдаются как статика */
export function generateStaticParams() {
  return [
    { slug: ["index"] },
    { slug: ["faq"] },
    { slug: ["services"] },
    { slug: ["brands"] },
    { slug: ["blog"] },
    { slug: ["areas"] },
    ...services.map((s) => ({ slug: ["services", s.slug] })),
    ...combos.map((c) => ({ slug: ["services", c.service, c.brand] })),
    ...brands.map((b) => ({ slug: ["brands", b.slug] })),
    ...areas.map((a) => ({ slug: ["areas", a.slug] })),
    ...blogPosts.map((p) => ({ slug: ["blog", p.slug] })),
  ];
}

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  // `index` — служебный алиас главной: пустой catch-all статикой не собрать
  const path = slug[0] === "index" ? slug.slice(1) : slug;
  const body = render(path);
  if (!body) notFound();

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
