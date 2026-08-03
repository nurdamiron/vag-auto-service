import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { href?: string; label: string };

type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
  crumbs?: Crumb[];
};

export function PageHero({ eyebrow, title, text, crumbs }: Props) {
  return (
    <section className="relative overflow-hidden bg-navy pt-[calc(var(--header-h)+2.5rem)] pb-14 md:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(234,90,30,0.22),transparent_55%)]" />
      <div className="site-container relative">
        {crumbs?.length ? (
          <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-white/55">
            {crumbs.map((c, i) => (
              <span key={`${c.label}-${i}`} className="inline-flex items-center gap-1.5">
                {i > 0 ? <ChevronRight className="h-3.5 w-3.5" /> : null}
                {c.href ? (
                  <Link href={c.href} className="hover:text-orange">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h1 className="type-display max-w-3xl text-4xl text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {text ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {text}
          </p>
        ) : null}
      </div>
    </section>
  );
}
