import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  areas,
  business,
  getArea,
  services,
  telLink,
  waLink,
} from "@/lib/data";
import {
  breadcrumbNode,
  composeDescription,
  faqNode,
  graph,
  ogImageUrl,
  pageMetadata,
  webPageNode,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return { title: "Район" };

  return pageMetadata({
    title: area.seoTitle,
    standaloneTitle: true,
    description: composeDescription([
      area.excerpt,
      `${business.name}, ${business.address}.`,
    ]),
    path: `/areas/${area.slug}`,
    image: ogImageUrl(`/areas/${area.slug}`),
    keywords: [
      area.keyword,
      "автосервис Алматы",
      "диагностика VAG Алматы",
      `СТО ${area.name}`,
    ],
  });
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const path = `/areas/${area.slug}`;
  const others = areas.filter((a) => a.slug !== slug).slice(0, 3);
  const crumbs = [
    { name: "Главная", path: "/" },
    { name: "Районы", path: "/areas" },
    { name: area.name },
  ];

  return (
    <>
      <JsonLd
        id="ld-area"
        data={graph(
          webPageNode({
            path,
            name: area.seoTitle,
            description: area.excerpt,
            crumbs,
          }),
          breadcrumbNode(path, crumbs),
          faqNode(path, area.faqs)
        )}
      />

      <PageHero
        eyebrow="Алматы"
        title={`Автосервис ${area.name}`}
        text={area.excerpt}
        crumbs={[
          { href: "/", label: "Главная" },
          { href: "/areas", label: "Районы" },
          { label: area.name },
        ]}
      />

      <article className="section-pad">
        <div className="site-container max-w-3xl">
          <Reveal>
            <dl className="grid gap-4 sm:grid-cols-3">
              <div className="surface-card p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-orange">
                  Как ехать
                </dt>
                <dd className="mt-1 text-sm text-navy">{area.drive}</dd>
              </div>
              <div className="surface-card p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-orange">
                  Что приезжает
                </dt>
                <dd className="mt-1 text-sm text-navy">{area.typical}</dd>
              </div>
              <div className="surface-card p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-orange">
                  Дороги
                </dt>
                <dd className="mt-1 text-sm text-navy">{area.roads}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="prose-site mt-8 space-y-4">
              {area.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="text-base leading-relaxed text-slate sm:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="type-display mt-10 text-2xl text-navy">
              Вопросы из {area.name}
            </h2>
            <div className="mt-4 space-y-5">
              {area.faqs.map((item) => (
                <div key={item.q}>
                  <h3 className="text-lg font-semibold text-navy">{item.q}</h3>
                  <p className="mt-1 text-base leading-relaxed text-slate">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="type-display mt-10 text-2xl text-navy">Услуги</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {services.slice(0, 8).map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="chip">
                  {s.title}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10 rounded-2xl bg-navy p-6 text-white sm:p-8">
              <h2 className="type-display text-2xl">
                Едете из {area.name}? Напишите симптом
              </h2>
              <p className="mt-2 text-white/70">
                {business.fullAddress}. {business.hours}. Смета до работ.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={waLink(
                    `Здравствуйте! Еду из района ${area.name}. Марка и симптом — `
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  WhatsApp
                </a>
                <a href={telLink()} className="btn-secondary">
                  {business.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      {others.length ? (
        <section className="border-t border-border bg-bg section-pad">
          <div className="site-container">
            <h2 className="type-display text-2xl text-navy">Другие районы</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="surface-card surface-card-hover p-5"
                >
                  <p className="text-xs font-semibold uppercase text-orange">
                    {a.name}
                  </p>
                  <h3 className="type-display mt-1 text-xl text-navy">
                    {a.short}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-slate">
                    Смотреть <ArrowRight className="h-3.5 w-3.5" />
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
