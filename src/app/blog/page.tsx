import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { BlogIndex } from "@/components/site/BlogIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogCategories, blogPosts } from "@/lib/data";
import {
  absoluteUrl,
  breadcrumbNode,
  graph,
  itemListNode,
  ORG_ID,
  pageMetadata,
  webPageNode,
} from "@/lib/seo";

const PATH = "/blog";
const CRUMBS = [{ name: "Главная", path: "/" }, { name: "Советы" }];

export const metadata: Metadata = pageMetadata({
  title: "Советы автосервиса",
  description:
    "200 разборов для владельцев VW, Audi, Skoda, Kia и Hyundai в Алматы: симптомы, диагностика, вторичка. Без воды, со сметой до работ.",
  path: PATH,
  keywords: [
    "автосервис Алматы советы",
    "диагностика VAG",
    "проверка авто перед покупкой Алматы",
    "ремонт DSG Алматы",
  ],
});

export default function BlogPage() {
  const categories = blogCategories();
  return (
    <>
      <JsonLd
        id="ld-blog"
        data={graph(
          webPageNode({
            path: PATH,
            name: "Советы автосервиса",
            description:
              "Разборы типовых неисправностей VW, Audi, Skoda, Kia и Hyundai и советы, как не переплатить на СТО в Алматы.",
            type: "CollectionPage",
            crumbs: CRUMBS,
          }),
          breadcrumbNode(PATH, CRUMBS),
          {
            "@type": "Blog",
            "@id": `${absoluteUrl(PATH)}#blog`,
            name: "Советы VAG Auto Service",
            url: absoluteUrl(PATH),
            publisher: { "@id": ORG_ID },
            blogPost: blogPosts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: absoluteUrl(`/blog/${p.slug}`),
              datePublished: p.dateIso,
            })),
          },
          itemListNode(
            PATH,
            blogPosts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` }))
          )
        )}
      />
      <PageHero
        eyebrow="Советы"
        title="Чтобы не переплатить на СТО"
        text="Симптомы, марки и узлы — 200 статей под запросы, которые приходят в WhatsApp. Сначала причина, потом смета."
        crumbs={[
          { href: "/", label: "Главная" },
          { label: "Советы" },
        ]}
      />

      <section className="section-pad bg-bg">
        <div className="site-container">
          <Suspense
            fallback={
              <p className="text-slate">Загружаем {blogPosts.length} статей…</p>
            }
          >
            <BlogIndex posts={blogPosts} categories={categories} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
