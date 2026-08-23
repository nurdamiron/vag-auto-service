import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosts, getPost, business, telLink } from "@/lib/data";
import {
  absoluteUrl,
  breadcrumbNode,
  graph,
  LANGUAGE,
  ogImageUrl,
  ORG_ID,
  pageMetadata,
  webPageNode,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Статья" };

  return pageMetadata({
    // Заголовок статьи длинный сам по себе — суффикс бренда
    // вытолкнул бы его за пределы сниппета
    title: post.seoTitle ?? post.title,
    standaloneTitle: true,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: ogImageUrl(`/blog/${post.slug}`),
    type: "article",
    publishedTime: post.dateIso,
    modifiedTime: post.dateIso,
    keywords: [post.category, "автосервис Алматы", "диагностика авто Алматы"],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);
  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(path);
  const crumbs = [
    { name: "Главная", path: "/" },
    { name: "Советы", path: "/blog" },
    { name: post.title },
  ];

  return (
    <>
      <JsonLd
        id="ld-post"
        data={graph(
          webPageNode({
            path,
            name: post.title,
            description: post.excerpt,
            crumbs,
            image: post.image,
          }),
          breadcrumbNode(path, crumbs),
          {
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: post.title,
            description: post.excerpt,
            articleSection: post.category,
            articleBody: post.content.join("\n\n"),
            wordCount: post.content.join(" ").split(/\s+/).length,
            image: post.image,
            datePublished: post.dateIso,
            dateModified: post.dateIso,
            inLanguage: LANGUAGE,
            mainEntityOfPage: { "@id": `${url}#webpage` },
            isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
            author: { "@id": ORG_ID },
            publisher: { "@id": ORG_ID },
            about: { "@id": ORG_ID },
          }
        )}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        text={post.excerpt}
        crumbs={[
          { href: "/", label: "Главная" },
          { href: "/blog", label: "Блог" },
          { label: post.title },
        ]}
      />

      <article className="section-pad">
        <div className="site-container max-w-3xl">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(min-width:768px) 768px, 100vw"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <time
              dateTime={post.dateIso}
              className="mt-6 block text-sm font-medium text-slate"
            >
              {post.date}
            </time>
            <div className="prose-site mt-6 space-y-4">
              {post.content.map((p) => (
                <p key={p.slice(0, 40)} className="text-base leading-relaxed text-slate sm:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl bg-navy p-6 text-white sm:p-8">
              <h2 className="type-display text-2xl">Нужна диагностика VAG?</h2>
              <p className="mt-2 text-white/70">
                {business.name}, Таугуль — найдём причину и скажем, что реально
                надо чинить.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Записаться
                </Link>
                <a href={telLink()} className="btn-secondary">
                  {business.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>

          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-orange"
            >
              <ArrowLeft className="h-4 w-4" />
              Все статьи
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-border bg-bg section-pad">
          <div className="site-container">
            <h2 className="type-display text-2xl text-navy">Ещё почитать</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="surface-card surface-card-hover p-5"
                >
                  <p className="text-xs font-semibold uppercase text-orange">
                    {p.category}
                  </p>
                  <h3 className="type-display mt-1 text-xl text-navy">
                    {p.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-slate">
                    Читать <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
