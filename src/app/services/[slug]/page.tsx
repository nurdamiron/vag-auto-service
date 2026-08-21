import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, ArrowRight, SprayCan } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { DiagAreas } from "@/components/site/DiagAreas";
import {
  brands,
  getService,
  services,
  telLink,
  waLink,
  business,
} from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Услуга" };
  return {
    title: service.title,
    description: service.short,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

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
                  /* Услуга без фото — дизайн-панель в той же системе */
                  <>
                    <div className="stripes-ember absolute inset-0" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(234,90,30,0.35),transparent_60%)]" />
                    <SprayCan className="absolute bottom-6 left-6 h-12 w-12 text-white/80" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/55 to-transparent" />
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="prose-site mt-8">
                <p className="text-lg text-slate leading-relaxed">
                  {service.description}
                </p>
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
                    {b.name}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <aside className="sticky top-24 surface-card p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate">
                Стоимость
              </p>
              <p className="type-display mt-1 text-3xl text-orange">
                {service.priceFrom}
              </p>
              <p className="mt-3 text-sm text-slate">
                Точную сумму скажем после диагностики или осмотра. Работы — только
                после вашего «ок» по смете.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/contact" className="btn-primary w-full">
                  Записаться
                </Link>
                <a
                  href={waLink(
                    `Здравствуйте! Интересует услуга: ${service.title}`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline w-full"
                >
                  WhatsApp
                </a>
                <a href={telLink()} className="btn-dark w-full">
                  {business.phoneDisplay}
                </a>
              </div>
              <p className="mt-5 text-xs text-slate">{business.hours}</p>
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
                комплексную проверку перед покупкой и дальней дорогой.
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
                  className="surface-card surface-card-hover p-5"
                >
                  <h3 className="type-display text-lg text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate line-clamp-2">{s.short}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-orange">
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
