import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { blogPosts } from "@/lib/data";

export const BLOG_PAGE_SIZE = 24;
export const blogPageCount = Math.ceil(blogPosts.length / BLOG_PAGE_SIZE);

export function blogPagePath(n: number) {
  return n <= 1 ? "/blog" : `/blog/page/${n}`;
}

/** Список статей с постраничной навигацией: 24 карточки на страницу */
export function BlogList({ page }: { page: number }) {
  const posts = blogPosts.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);
  const pages = Array.from({ length: blogPageCount }, (_, i) => i + 1);

  return (
    <>
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
            {posts.map((post) => (
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

          {blogPageCount > 1 ? (
            <nav aria-label="Страницы блога" className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {pages.map((n) => (
                <Link
                  key={n}
                  href={blogPagePath(n)}
                  aria-current={n === page ? "page" : undefined}
                  className={
                    n === page
                      ? "rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white"
                      : "rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-orange hover:text-orange"
                  }
                >
                  {n}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </section>
    </>
  );
}
