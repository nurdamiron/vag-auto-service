import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosts } from "@/lib/data";
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
  title: "Советы",
  description:
    "Диагностика VAG, ABS на Passat/Golf, сцепление и КПП — полезно до визита на СТО в Алматы.",
  path: PATH,
});

export default function BlogPage() {
  return (
    <>
      <JsonLd
        id="ld-blog"
        data={graph(
          webPageNode({
            path: PATH,
            name: "Советы автосервиса",
            description:
              "Разборы типовых неисправностей и советы, как не переплатить на СТО.",
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
        text="Зачем нормальная диагностика VAG, что проверять при ABS и когда пора менять сцепление — без воды."
        crumbs={[
          { href: "/", label: "Главная" },
          { label: "Советы" },
        ]}
      />

      <section className="section-pad bg-bg">
        <div className="site-container">
          <StaggerGrid className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="surface-card surface-card-hover group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-orange">
                      <span>{post.category}</span>
                      <span className="text-muted">·</span>
                      <time
                        dateTime={post.dateIso}
                        className="font-medium normal-case tracking-normal text-slate"
                      >
                        {post.date}
                      </time>
                    </div>
                    <h2 className="type-display mt-2 text-2xl text-navy group-hover:text-orange">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy">
                      Читать
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
