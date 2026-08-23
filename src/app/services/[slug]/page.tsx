import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, SearchCheck, Snowflake, SprayCan } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { DiagAreas } from "@/components/site/DiagAreas";
import { BrandLogo } from "@/components/site/BrandLogo";
import {
  brands,
  business,
  getService,
  services,
  telLink,
  waLink,
} from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

const PANEL_ICONS: Record<"spray" | "search" | "snow", LucideIcon> = {
  spray: SprayCan,
  search: SearchCheck,
  snow: Snowflake,
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Услуга" };

  return {
    title: `${service.title} в Алматы`,
    description: `${service.short} ${business.name}, ${business.district}. Смета до начала работ, гарантия на выполненные работы.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);
  const paragraphs = service.description.split("\n\n");
  const PanelIcon = service.panel ? PANEL_ICONS[service.panel.icon] : null;

  return (
    <>
      <PageHero
        eyebrow="Услуга"
        title={service.title}
        text={service.short}
        crumbs={[
          { href: "/", label: "Главная" },
          { href: "/services", label: "Услуги" },
          { label: service.title },
        ]}
      />

      {/* Симптомы — чтобы человек сразу узнал свою ситуацию */}
      <section className="border-b border-border bg-bg py-8">
        <div className="site-container">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate">
              С чем приезжают на эту услугу
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.symptoms.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-navy">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 60vw, 100vw"
                    priority
                  />
                ) : (
                  <>
                    <div className="stripes-ember absolute inset-0" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(234,90,30,0.38),transparent_62%)]" />
                    {PanelIcon ? (
                      <PanelIcon className="absolute bottom-7 left-7 h-12 w-12 text-white" />
                    ) : null}
                    {service.panel ? (
                      <span className="type-display absolute bottom-8 left-24 text-xl uppercase tracking-[0.18em] text-white/70">
                        {service.panel.label}
                      </span>
                    ) : null}
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/55 to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="prose-site mt-8">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="text-lg leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="type-display mt-10 text-2xl text-navy">
                Что входит
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

            <Reveal delay={0.12}>
              <h2 className="type-display mt-10 text-2xl text-navy">
                Марки, по которым делаем эту работу
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {brands.map((b) => (
                  <Link key={b.slug} href={`/brands/${b.slug}`} className="chip">
                    <BrandLogo
                      slug={b.slug}
                      name={b.name}
                      decorative
                      className="h-4 w-8"
                    />
                    {b.name}
                  </Link>
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

              <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm text-slate">
                <p className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  Смету называем до начала работ — цена не растёт по ходу
                </p>
                <p className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  {business.guaranteeShort}
                </p>
                <p className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  Помогаем с подбором запчастей, можно со своими
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={waLink(
                    `Здравствуйте! Интересует: ${service.title}. Марка и год авто — `
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
                <Link href="/contact" className="btn-outline w-full">
                  Оставить заявку
                </Link>
              </div>
              <p className="mt-5 text-xs text-slate">
                {business.hours} · {business.address}
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {slug === "computer-diagnostics" ? (
        <section className="section-pad border-t border-border bg-bg">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Направления</p>
              <h2 className="type-display mt-3 max-w-2xl text-3xl text-navy sm:text-4xl">
                Четыре направления диагностики
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
                Можно взять одно направление под конкретный симптом или
                комплексную проверку — перед покупкой и перед дальней дорогой.
              </p>
            </Reveal>
            <div className="mt-10">
              <DiagAreas />
            </div>
          </div>
        </section>
      ) : null}

      {others.length > 0 ? (
        <section className="section-pad border-t border-border">
          <div className="site-container">
            <h2 className="type-display text-2xl text-navy sm:text-3xl">
              Другие услуги
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="surface-card surface-card-hover group p-5"
                >
                  <h3 className="type-display text-lg text-navy transition-colors group-hover:text-orange">
                    {s.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate">
                    {s.short}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-orange">
                    Смотреть
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
