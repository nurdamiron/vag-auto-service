"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CoverImage } from "@/components/site/CoverImage";
import type { BlogPost } from "@/lib/blog-types";

const PAGE_SIZE = 12;

type Props = {
  posts: BlogPost[];
  categories: { name: string; count: number }[];
};

export function BlogIndex({ posts, categories }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = searchParams.get("cat") ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const filtered = useMemo(
    () => (active ? posts.filter((p) => p.category === active) : posts),
    [posts, active]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const slice = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function setParams(next: { cat?: string; page?: number }) {
    const params = new URLSearchParams(searchParams.toString());
    const cat = next.cat === undefined ? active : next.cat;
    const nextPage = next.page === undefined ? 1 : next.page;
    if (cat) params.set("cat", cat);
    else params.delete("cat");
    if (nextPage > 1) params.set("page", String(nextPage));
    else params.delete("page");
    const q = params.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: true });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setParams({ cat: "", page: 1 })}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
            !active
              ? "bg-navy text-white"
              : "bg-white text-slate ring-1 ring-border hover:text-navy"
          }`}
        >
          Все · {posts.length}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            type="button"
            onClick={() => setParams({ cat: cat.name, page: 1 })}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
              active === cat.name
                ? "bg-navy text-white"
                : "bg-white text-slate ring-1 ring-border hover:text-navy"
            }`}
          >
            {cat.name} · {cat.count}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {slice.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="surface-card surface-card-hover group flex h-full flex-col overflow-hidden"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <CoverImage
                src={post.image}
                alt={post.coverAlt}
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
        ))}
      </div>

      {pages > 1 ? (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setParams({ page: n })}
              className={`min-w-10 rounded-lg px-3 py-2 text-sm font-semibold ${
                n === safePage
                  ? "bg-navy text-white"
                  : "bg-white text-slate ring-1 ring-border hover:text-navy"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
