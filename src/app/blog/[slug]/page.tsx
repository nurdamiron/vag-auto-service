import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { blogPosts, getPost, business, telLink } from "@/lib/data";

const SITE_URL = "https://www.vag-service.kz";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Статья" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const sameCategory = blogPosts.filter(
    (p) => p.slug !== slug && p.category === post.category
  );
  const others = blogPosts.filter(
    (p) => p.slug !== slug && p.category !== post.category
  );
  const related = [...sameCategory, ...others].slice(0, 4);

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateIso,
    dateModified: post.dateIso,
    url: postUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    image: post.image,
    author: { "@type": "Organization", name: business.name },
    publisher: { "@type": "Organization", name: business.name },
  };
  const faqJsonLd = post.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
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
            <p
              id="short-answer"
              className="mt-6 rounded-2xl border border-orange/30 bg-orange/5 p-5 text-base leading-relaxed text-navy sm:p-6 sm:text-lg"
            >
              <strong>Коротко.</strong> {post.answer}
            </p>
            <div className="prose-site mt-6 space-y-4">
              {post.content.map((p) => (
                <p key={p.slice(0, 40)} className="text-base leading-relaxed text-slate sm:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {post.faqs.length ? (
            <Reveal delay={0.08}>
              <div className="mt-10">
                <h2 className="type-display text-2xl text-navy">Частые вопросы</h2>
                <div className="mt-4 space-y-5">
                  {post.faqs.map((item) => (
                    <div key={item.q}>
                      <h3 className="type-display text-lg text-navy">{item.q}</h3>
                      <p className="mt-1 text-base leading-relaxed text-slate">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}

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
