import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CoverImage } from "@/components/site/CoverImage";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  articleBody,
  blogPosts,
  brands,
  business,
  getPost,
  relatedPosts,
  services,
  telLink,
} from "@/lib/data";
import {
  absoluteUrl,
  breadcrumbNode,
  faqNode,
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
    title: post.seoTitle ?? post.title,
    standaloneTitle: true,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: ogImageUrl(`/blog/${post.slug}`),
    type: "article",
    publishedTime: post.dateIso,
    modifiedTime: post.dateIso,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(post, 3);
  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(path);
  const crumbs = [
    { name: "Главная", path: "/" },
    { name: "Советы", path: "/blog" },
    { name: post.title },
  ];
  const service = services.find((s) => s.slug === post.relatedService);
  const brand = brands.find((b) => b.slug === post.relatedBrand);
  const body = articleBody(post);

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
            image: absoluteUrl(post.image),
          }),
          breadcrumbNode(path, crumbs),
          {
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: post.title,
            description: post.excerpt,
            articleSection: post.category,
            keywords: post.keywords.join(", "),
            articleBody: body,
            wordCount: body.split(/\s+/).length,
            image: absoluteUrl(post.image),
            datePublished: post.dateIso,
            dateModified: post.dateIso,
            inLanguage: LANGUAGE,
            mainEntityOfPage: { "@id": `${url}#webpage` },
            isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
            author: { "@id": ORG_ID },
            publisher: { "@id": ORG_ID },
            about: { "@id": ORG_ID },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", "article p"],
            },
          },
          faqNode(path, post.faqs)
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
              <CoverImage
                src={post.image}
                alt={post.coverAlt}
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
              {post.lead.map((p) => (
                <p
                  key={p.slice(0, 48)}
                  className="text-base leading-relaxed text-slate sm:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {post.sections.map((section) => (
            <Reveal key={section.heading} delay={0.05}>
              <h2 className="type-display mt-10 text-2xl text-navy sm:text-3xl">
                {section.heading}
              </h2>
              <div className="prose-site mt-4 space-y-4">
                {section.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className="text-base leading-relaxed text-slate sm:text-lg"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}

          {post.takeaways.length ? (
            <Reveal delay={0.05}>
              <h2 className="type-display mt-10 text-2xl text-navy">Коротко</h2>
              <ul className="mt-4 space-y-2 text-base text-slate sm:text-lg">
                {post.takeaways.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {post.faqs.length ? (
            <Reveal delay={0.05}>
              <h2 className="type-display mt-10 text-2xl text-navy">
                Вопросы и ответы
              </h2>
              <div className="mt-4 space-y-5">
                {post.faqs.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-lg font-semibold text-navy">{item.q}</h3>
                    <p className="mt-1 text-base leading-relaxed text-slate">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}

          {service || brand ? (
            <Reveal delay={0.05}>
              <div className="mt-10 flex flex-wrap gap-3">
                {service ? (
                  <Link
                    href={`/services/${service.slug}`}
                    className="rounded-full bg-bg px-4 py-2 text-sm font-semibold text-navy ring-1 ring-border hover:text-orange"
                  >
                    Услуга: {service.title}
                  </Link>
                ) : null}
                {brand ? (
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="rounded-full bg-bg px-4 py-2 text-sm font-semibold text-navy ring-1 ring-border hover:text-orange"
                  >
                    Марка: {brand.name}
                  </Link>
                ) : null}
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl bg-navy p-6 text-white sm:p-8">
              <h2 className="type-display text-2xl">
                {service
                  ? `Нужна услуга: ${service.title}?`
                  : "Нужна диагностика?"}
              </h2>
              <p className="mt-2 text-white/70">
                {business.name}, Таугуль — найдём причину и скажем, что реально
                надо чинить. Смета до начала работ.
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
            <h2 className="type-display text-2xl text-navy">Ещё по теме</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="surface-card surface-card-hover overflow-hidden p-0"
                >
                  <div className="relative aspect-[16/9]">
                    <CoverImage
                      src={p.image}
                      alt={p.coverAlt}
                      className="object-cover"
                      sizes="(min-width:640px) 33vw, 100vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase text-orange">
                      {p.category}
                    </p>
                    <h3 className="type-display mt-1 text-xl text-navy">
                      {p.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-slate">
                      Читать <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
