import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  MapPin,
  Quote,
  SearchCheck,
  Star,
  Wrench,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { EmergencyBanner } from "@/components/site/EmergencyBanner";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { ContactForm } from "@/components/site/ContactForm";
import { BrandMarquee } from "@/components/site/BrandMarquee";
import { BrandCard } from "@/components/site/BrandCard";
import { DiagAreas } from "@/components/site/DiagAreas";
import { ServiceCard } from "@/components/site/ServiceCard";
import { StatsStrip } from "@/components/site/StatsStrip";
import { SymptomGrid } from "@/components/site/SymptomGrid";
import { Objections } from "@/components/site/Objections";
import { LocalContext } from "@/components/site/LocalContext";
import {
  blogPosts,
  brandGroups,
  brandsByGroup,
  business,
  heroCopy,
  reviews,
  sectionsCopy,
  services,
  specials,
  steps,
  telLink,
  trustBadges,
  waLink,
  whyUs,
} from "@/lib/data";

const heroImage = "/images/hero-auto-service.jpg";
const aboutImage =
  "https://framerusercontent.com/images/g4JKIXKxUHdkYwtBbzHXNpFaPdg.jpg";

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------- */}
      {/*  Hero                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="grain relative overflow-hidden bg-navy pt-[var(--header-h)]">
        <Image
          src={heroImage}
          alt="VAG Auto Service — автосервис в Алматы"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/88 via-navy/55 to-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-navy/35" />
        <div className="grid-lines pointer-events-none absolute inset-0" />

        <div className="site-container relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:py-20">
          <div>
            <Reveal from="none">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/85 backdrop-blur">
                <Star className="h-4 w-4 shrink-0 fill-orange text-orange" />
                <span className="truncate">{heroCopy.eyebrow}</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="type-display mt-5 max-w-2xl text-3xl text-white sm:text-4xl md:text-5xl lg:text-[3.1rem] lg:leading-[1.08]">
                {heroCopy.titleLead}{" "}
                <span className="accent-underline">{heroCopy.titleAccent}</span>{" "}
                {heroCopy.titleTail}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {heroCopy.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#zapis" className="btn-primary lg:hidden">
                  Описать проблему
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary hidden sm:inline-flex"
                >
                  {heroCopy.ctaPrimary}
                </a>
                <a href={telLink()} className="btn-secondary">
                  {heroCopy.ctaSecondary} {business.phoneDisplay}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-orange" />
                  {heroCopy.meta}
                </span>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange" />
                  {business.hoursShort} каждый день
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange" />
                  {business.address}, Таугуль
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 grid max-w-xl gap-2 sm:grid-cols-2">
                {trustBadges.slice(0, 4).map((b) => (
                  <div
                    key={b}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 backdrop-blur transition-colors hover:border-orange/40"
                  >
                    <BadgeCheck className="h-4 w-4 shrink-0 text-orange" />
                    {b}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} from="right">
            <div id="zapis" className="scroll-mt-28 lg:scroll-mt-24">
              <ContactForm variant="compact" source="главная — hero" />
            </div>
          </Reveal>
        </div>

        <div className="site-container relative">
          <StatsStrip />
        </div>
      </section>

      <BrandMarquee />

      {/* ---------------------------------------------------------- */}
      {/*  Симптомы — вход на языке клиента                           */}
      {/* ---------------------------------------------------------- */}
      <section className="section-pad">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
            <Reveal from="left">
              <SectionHeading
                eyebrow={sectionsCopy.symptomsEyebrow}
                title={sectionsCopy.symptomsTitle}
                text={sectionsCopy.symptomsText}
              />
              <a
                href={waLink(
                  "Здравствуйте! Опишу проблему с машиной — подскажите, что это может быть."
                )}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-6 inline-flex"
              >
                Описать своими словами
                <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
            <Reveal delay={0.05} from="right">
              <SymptomGrid />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Диагностика по направлениям                                */}
      {/* ---------------------------------------------------------- */}
      <section className="section-pad bg-bg">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <SectionHeading
                eyebrow={sectionsCopy.diagEyebrow}
                title={sectionsCopy.diagTitle}
                text={sectionsCopy.diagText}
              />
            </Reveal>
            <Reveal delay={0.05}>
              <Link
                href="/services/computer-diagnostics"
                className="btn-outline shrink-0"
              >
                О диагностике
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-10">
            <DiagAreas />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Услуги                                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="section-pad">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <SectionHeading
                eyebrow={sectionsCopy.servicesEyebrow}
                title={sectionsCopy.servicesTitle}
                text={sectionsCopy.servicesText}
              />
            </Reveal>
            <Reveal delay={0.05}>
              <Link href="/services" className="btn-outline shrink-0">
                Все услуги
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <StaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* На главной — девять самых востребованных, остальные на /services */}
            {services.slice(0, 9).map((s, i) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} index={i} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Проверка перед покупкой — отдельный оффер                  */}
      {/* ---------------------------------------------------------- */}
      <section className="grain relative overflow-hidden bg-navy py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(234,90,30,0.22),transparent_60%)]" />
        <div className="site-container relative">
          <Reveal>
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-5">
                <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange/15 text-orange sm:flex">
                  <SearchCheck className="h-7 w-7" />
                </span>
                <div>
                  <p className="eyebrow">{sectionsCopy.checkEyebrow}</p>
                  <h2 className="type-display mt-2 text-2xl text-white sm:text-3xl">
                    {sectionsCopy.checkTitle}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                    {sectionsCopy.checkText}
                  </p>
                </div>
              </div>
              <Link
                href="/services/pre-purchase-check"
                className="btn-primary shrink-0"
              >
                Как это проходит
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Марки: VAG + Корея                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="section-pad">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <SectionHeading
                eyebrow={sectionsCopy.brandsEyebrow}
                title={sectionsCopy.brandsTitle}
                text={sectionsCopy.brandsText}
              />
            </Reveal>
            <Reveal delay={0.05}>
              <Link href="/brands" className="btn-outline shrink-0">
                Все марки
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 space-y-10">
            {brandGroups.map((group) => (
              <div key={group.id}>
                <Reveal>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border pb-3">
                    <h3 className="type-display text-xl text-navy">
                      {group.label}
                    </h3>
                    <p className="text-sm text-slate">{group.text}</p>
                  </div>
                </Reveal>
                <StaggerGrid className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {brandsByGroup(group.id).map((brand) => (
                    <StaggerItem key={brand.slug}>
                      <BrandCard brand={brand} />
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Возражения                                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="section-pad bg-bg">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow={sectionsCopy.objectionsEyebrow}
              title={sectionsCopy.objectionsTitle}
              text={sectionsCopy.objectionsText}
            />
          </Reveal>
          <div className="mt-10">
            <Objections />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Как мы работаем                                            */}
      {/* ---------------------------------------------------------- */}
      <section className="grain relative overflow-hidden bg-navy text-white section-pad">
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="site-container relative">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal from="left">
              <div>
                <p className="eyebrow">{sectionsCopy.whyEyebrow}</p>
                <h2 className="type-display mt-3 text-3xl sm:text-4xl md:text-[2.75rem]">
                  {sectionsCopy.whyTitle}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {sectionsCopy.whyText}
                </p>
                <div className="group relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={aboutImage}
                    alt="Работа на VAG Auto Service"
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    sizes="(min-width:1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                </div>
              </div>
            </Reveal>

            <div className="space-y-4">
              {whyUs.map((item, i) => (
                <Reveal key={item.num} delay={i * 0.06} from="right">
                  <div className="surface-dark p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <span className="type-numeral text-3xl text-orange">
                        {item.num}
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-orange">
                          {item.label}
                        </p>
                        <h3 className="type-display mt-1 text-xl sm:text-2xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-base">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Алматинский контекст                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="section-pad">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow={sectionsCopy.localEyebrow}
              title={sectionsCopy.localTitle}
              text={sectionsCopy.localText}
            />
          </Reveal>
          <div className="mt-10">
            <LocalContext />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Почему к нам едут                                          */}
      {/* ---------------------------------------------------------- */}
      <section className="section-pad bg-bg">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow={sectionsCopy.specialsEyebrow}
              title={sectionsCopy.specialsTitle}
              text={sectionsCopy.specialsText}
            />
          </Reveal>
          <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-3">
            {specials.map((sp) => (
              <StaggerItem key={sp.title}>
                <SpotlightCard
                  href="/contact"
                  className="surface-card surface-card-hover flex h-full flex-col p-6"
                >
                  <p className="type-display text-2xl text-orange sm:text-3xl">
                    {sp.price}
                  </p>
                  <h3 className="type-display mt-3 text-xl text-navy">
                    {sp.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                    {sp.text}
                  </p>
                  <p className="mt-5 rounded-lg bg-bg px-3 py-2 text-xs font-medium text-slate">
                    {sp.code}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Как попасть — таймлайн                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="section-pad">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow={sectionsCopy.stepsEyebrow}
              title={sectionsCopy.stepsTitle}
            />
          </Reveal>

          <div className="relative mt-12">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-border via-orange/40 to-border lg:block"
            />
            <StaggerGrid className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {steps.map((step) => (
                <StaggerItem key={step.n}>
                  <div className="relative">
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-orange text-sm font-bold text-white ring-8 ring-white">
                      {step.n}
                    </span>
                    <h3 className="type-display mt-5 text-xl text-navy">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">
                      {step.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </div>
      </section>

      <EmergencyBanner />

      {/* ---------------------------------------------------------- */}
      {/*  Отзывы                                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="section-pad bg-bg">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow={sectionsCopy.reviewsEyebrow}
              title={sectionsCopy.reviewsTitle}
              text={sectionsCopy.reviewsText}
            />
          </Reveal>
          <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <StaggerItem key={r.name}>
                <blockquote className="surface-card surface-card-hover relative flex h-full flex-col overflow-hidden p-6">
                  <Quote
                    aria-hidden
                    className="absolute -right-2 -top-2 h-20 w-20 rotate-180 fill-orange/[0.06] text-transparent"
                  />
                  <div className="relative flex gap-0.5 text-orange">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange" />
                    ))}
                  </div>
                  <p className="relative mt-4 flex-1 text-base leading-relaxed text-navy/90">
                    “{r.text}”
                  </p>
                  <footer className="relative mt-5 border-t border-border pt-4">
                    <p className="font-semibold text-navy">{r.name}</p>
                    <p className="text-sm text-slate">{r.source}</p>
                  </footer>
                </blockquote>
              </StaggerItem>
            ))}
          </StaggerGrid>
          <Reveal delay={0.1}>
            <div className="mt-8 text-center">
              <a
                href={business.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Все отзывы на 2ГИС
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  FAQ                                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="section-pad">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <Reveal from="left">
              <SectionHeading
                eyebrow={sectionsCopy.faqEyebrow}
                title={sectionsCopy.faqTitle}
                text={sectionsCopy.faqText}
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={telLink()} className="btn-primary">
                  {business.phoneDisplay}
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  WhatsApp
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.05} from="right">
              <FaqAccordion />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Блог                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="section-pad bg-bg">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Reveal>
              <SectionHeading
                eyebrow={sectionsCopy.blogEyebrow}
                title={sectionsCopy.blogTitle}
              />
            </Reveal>
            <Reveal delay={0.05}>
              <Link href="/blog" className="btn-outline">
                Все статьи
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <StaggerItem key={post.slug}>
                <SpotlightCard
                  href={`/blog/${post.slug}`}
                  className="surface-card surface-card-hover group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      sizes="(min-width:768px) 33vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
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
                    <h3 className="type-display mt-2 text-xl text-navy transition-colors group-hover:text-orange">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">
                      {post.excerpt}
                    </p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Финальный CTA                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="grain relative overflow-hidden bg-navy section-pad">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,90,30,0.22),transparent_62%)]" />
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="site-container relative text-center">
          <Reveal>
            <h2 className="type-display text-3xl text-white sm:text-4xl md:text-5xl">
              {sectionsCopy.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/70 sm:text-lg">
              {sectionsCopy.ctaText}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Написать в WhatsApp
              </a>
              <a href={telLink()} className="btn-secondary">
                {business.phoneDisplay}
              </a>
            </div>
            <p className="mt-6 text-sm text-white/50">
              {business.hours} · {business.fullAddress}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
