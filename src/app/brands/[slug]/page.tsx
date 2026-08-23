import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { DiagAreas } from "@/components/site/DiagAreas";
import { ContactForm } from "@/components/site/ContactForm";
import { BrandCard } from "@/components/site/BrandCard";
import { BrandLogo } from "@/components/site/BrandLogo";
import {
  brands,
  business,
  getBrand,
  services,
  telLink,
  waLink,
} from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: "Марка" };

  return {
    title: `Ремонт ${brand.name} в Алматы`,
    description: `${brand.name} в VAG Auto Service, Алматы: электронно-компьютерная диагностика по мотору, ходовке, коробке и малярке, ремонт и ТО. ${brand.short}.`,
    alternates: { canonical: `/brands/${brand.slug}` },
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const related = brands.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        mark={
          <BrandLogo
            slug={brand.slug}
            name={brand.name}
            decorative
            className="h-12 w-32 sm:h-14 sm:w-36"
          />
        }
        eyebrow={brand.group === "korea" ? "Корейские марки" : "Концерн VAG"}
        title={`Ремонт ${brand.name} в Алматы`}
        text={brand.intro}
        crumbs={[
          { href: "/", label: "Главная" },
          { href: "/brands", label: "Марки" },
          { label: brand.name },
        ]}
      />

      {/* Модели */}
      <section className="border-b border-border bg-bg py-8">
        <div className="site-container">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate">
              Модели, с которыми работаем чаще всего
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {brand.models.map((m) => (
                <span key={m} className="chip">
                  {brand.name} {m}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Типовые обращения + форма */}
      <section className="section-pad">
        <div className="site-container grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <Reveal>
              <p className="eyebrow">С чем приезжают</p>
              <h2 className="type-display mt-3 text-3xl text-navy sm:text-4xl">
                Типовые обращения по {brand.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Список не для галочки: это то, с чем реально едут в бокс. Точный
                диагноз всё равно ставим после осмотра — но вы уже понимаете,
                куда смотреть.
              </p>
            </Reveal>

            <StaggerGrid className="mt-8 space-y-4">
              {brand.issues.map((issue) => (
                <StaggerItem key={issue.title}>
                  <SpotlightCard className="surface-card surface-card-hover flex gap-4 p-5 sm:p-6">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
                      <Check className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="type-display text-lg text-navy sm:text-xl">
                        {issue.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate">
                        {issue.text}
                      </p>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGrid>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={waLink(
                    `Здравствуйте! У меня ${brand.name}. Хочу записаться на диагностику.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Записаться с {brand.name}
                </a>
                <a href={telLink()} className="btn-outline">
                  <Phone className="h-4 w-4" />
                  {business.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} from="right">
            <ContactForm
              variant="compact"
              source={`страница марки — ${brand.name}`}
            />
          </Reveal>
        </div>
      </section>

      {/* Диагностика */}
      <section className="section-pad bg-bg">
        <div className="site-container">
          <Reveal>
            <p className="eyebrow">Диагностика</p>
            <h2 className="type-display mt-3 max-w-2xl text-3xl text-navy sm:text-4xl">
              Что смотрим на {brand.name} по четырём направлениям
            </h2>
          </Reveal>
          <div className="mt-10">
            <DiagAreas />
          </div>
        </div>
      </section>

      {/* Услуги */}
      <section className="section-pad">
        <div className="site-container">
          <Reveal>
            <p className="eyebrow">Услуги</p>
            <h2 className="type-display mt-3 text-3xl text-navy sm:text-4xl">
              Работы, доступные для {brand.name}
            </h2>
          </Reveal>
          <StaggerGrid className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="surface-card surface-card-hover group flex h-full items-center justify-between gap-3 p-5"
                >
                  <span className="type-display text-base text-navy transition-colors group-hover:text-orange sm:text-lg">
                    {s.title}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate transition-transform duration-300 group-hover:translate-x-1 group-hover:text-orange" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Другие марки */}
      <section className="section-pad bg-bg">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Reveal>
              <h2 className="type-display text-2xl text-navy sm:text-3xl">
                Другие марки
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <Link href="/brands" className="btn-outline">
                Все марки
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <StaggerGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((b) => (
              <StaggerItem key={b.slug}>
                <BrandCard brand={b} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
