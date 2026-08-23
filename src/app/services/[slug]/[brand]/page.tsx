import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { CoverImage } from "@/components/site/CoverImage";
import {
  business,
  combos,
  getBrand,
  getCombo,
  getService,
  postsMatching,
  telLink,
  waLink,
} from "@/lib/data";
import {
  absoluteUrl,
  breadcrumbNode,
  composeDescription,
  faqNode,
  graph,
  ogImageUrl,
  ORG_ID,
  pageMetadata,
  webPageNode,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string; brand: string }> };

export async function generateStaticParams() {
  return combos.map((c) => ({ slug: c.service, brand: c.brand }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, brand: brandSlug } = await params;
  const combo = getCombo(slug, brandSlug);
  if (!combo) return { title: "Услуга" };

  return pageMetadata({
    title: combo.seoTitle ?? combo.title,
    standaloneTitle: true,
    description: composeDescription([
      combo.excerpt,
      `${business.name}, ${business.city}.`,
      "Смета до начала работ.",
    ]),
    path: `/services/${combo.service}/${combo.brand}`,
    image: ogImageUrl(`/services/${combo.service}/${combo.brand}`),
    keywords: [
      combo.keyword,
      `${combo.keyword} цена`,
      "автосервис Алматы",
    ],
  });
}

export default async function ServiceBrandPage({ params }: Props) {
  const { slug, brand: brandSlug } = await params;
  const combo = getCombo(slug, brandSlug);
  const service = getService(slug);
  const brand = getBrand(brandSlug);
  if (!combo || !service || !brand) notFound();

  const path = `/services/${combo.service}/${combo.brand}`;
  const related = postsMatching(
    { service: combo.service, brand: combo.brand },
    3
  );
  const crumbs = [
    { name: "Главная", path: "/" },
    { name: "Услуги", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
    { name: brand.name },
  ];

  return (
    <>
      <JsonLd
        id="ld-combo"
        data={graph(
          webPageNode({
            path,
            name: combo.title,
            description: combo.excerpt,
            crumbs,
          }),
          breadcrumbNode(path, crumbs),
          faqNode(path, combo.faqs),
          {
            "@type": "Service",
            "@id": `${absoluteUrl(path)}#combo`,
            name: combo.title,
            description: combo.excerpt,
            serviceType: combo.title,
            url: absoluteUrl(path),
            provider: { "@id": ORG_ID },
            brand: { "@type": "Brand", name: brand.name },
            areaServed: { "@type": "City", name: "Алматы" },
          }
        )}
      />

      <PageHero
        eyebrow={`${service.title} · ${brand.name}`}
        title={combo.title}
        text={combo.excerpt}
        crumbs={[
          { href: "/", label: "Главная" },
          { href: "/services", label: "Услуги" },
          { href: `/services/${service.slug}`, label: service.title },
          { label: brand.name },
        ]}
      />

      <article className="section-pad">
        <div className="site-container grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <Reveal>
              <div className="prose-site space-y-4">
                {combo.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="text-base leading-relaxed text-slate sm:text-lg"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="type-display mt-10 text-2xl text-navy">
                Что входит в {service.title.toLowerCase()}
              </h2>
              <ul className="mt-4 space-y-3">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-bg px-4 py-3 text-sm text-navy sm:text-base"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {brand.issues.length ? (
              <Reveal delay={0.08}>
                <h2 className="type-display mt-10 text-2xl text-navy">
                  Типовое по {brand.name}
                </h2>
                <ul className="mt-4 space-y-3">
                  {brand.issues.map((issue) => (
                    <li key={issue.title} className="text-base text-slate">
                      <span className="font-semibold text-navy">
                        {issue.title}.
                      </span>{" "}
                      {issue.text}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            <Reveal delay={0.1}>
              <h2 className="type-display mt-10 text-2xl text-navy">
                Вопросы и ответы
              </h2>
              <div className="mt-4 space-y-5">
                {combo.faqs.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-lg font-semibold text-navy">{item.q}</h3>
                    <p className="mt-1 text-base leading-relaxed text-slate">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} from="right">
            <aside className="surface-card sticky top-24 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                Когда пора
              </p>
              <p className="type-display mt-2 text-xl leading-snug text-navy">
                {service.trigger}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={waLink(
                    `Здравствуйте! ${combo.title}. Марка ${brand.name}, год — `
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary w-full"
                >
                  Узнать стоимость
                </a>
                <a href={telLink()} className="btn-dark w-full">
                  {business.phoneDisplay}
                </a>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="btn-outline w-full"
                >
                  Все по {brand.name}
                </Link>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-center text-sm font-semibold text-slate hover:text-orange"
                >
                  Об услуге целиком
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </article>

      {related.length ? (
        <section className="border-t border-border bg-bg section-pad">
          <div className="site-container">
            <h2 className="type-display text-2xl text-navy">Советы по теме</h2>
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
