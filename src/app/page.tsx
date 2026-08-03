import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  MapPin,
  Shield,
  Star,
  Wrench,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/site/SectionHeading";
import { EmergencyBanner } from "@/components/site/EmergencyBanner";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { ContactForm } from "@/components/site/ContactForm";
import {
  blogPosts,
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

const heroImage =
  "https://framerusercontent.com/images/WR9o7KR6Qr7BCVUh8m9Gs2Nm0RY.jpg";
const aboutImage =
  "https://framerusercontent.com/images/g4JKIXKxUHdkYwtBbzHXNpFaPdg.jpg";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy pt-[var(--header-h)]">
        <Image
          src={heroImage}
          alt="VAG Auto Service — диагностика и ремонт в Алматы"
          fill
          priority
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/92 to-navy/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(234,90,30,0.18),transparent_50%)]" />

        <div className="site-container relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:py-20">
          <div>
            <Reveal>
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/85 backdrop-blur">
                <Star className="h-4 w-4 shrink-0 fill-orange text-orange" />
                <span className="truncate">{heroCopy.eyebrow}</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="type-display mt-5 max-w-2xl text-3xl text-white sm:text-4xl md:text-5xl lg:text-[3.15rem] lg:leading-[1.08]">
                {heroCopy.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {heroCopy.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#zapis" className="btn-primary lg:hidden">
                  Записаться
                </a>
                <a href={telLink()} className="btn-secondary">
                  {heroCopy.ctaSecondary} {business.phoneDisplay}
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary hidden sm:inline-flex"
                >
                  {heroCopy.ctaPrimary}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-orange" />
                  VW · Audi · Skoda · Porsche
                </span>
                <span className="inline-flex items-center gap-2">
                  <Shield className="h-4 w-4 text-orange" />
                  Без навязанного ремонта
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange" />
                  {business.hoursShort} каждый день
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange" />
                  {business.address}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 grid max-w-xl gap-2 sm:grid-cols-2">
                {trustBadges.slice(0, 4).map((b) => (
                  <div
                    key={b}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 backdrop-blur"
                  >
                    <BadgeCheck className="h-4 w-4 shrink-0 text-orange" />
                    {b}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div id="zapis" className="scroll-mt-28 lg:scroll-mt-24">
              <ContactForm variant="compact" source="главная — hero" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-bg">
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
            {services.map((s) => (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="surface-card surface-card-hover group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="type-display text-xl text-navy">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                      {s.short}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <span className="text-sm font-semibold text-orange">
                        {s.priceFrom}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-navy group-hover:text-orange">
                        Подробнее
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="section-pad">
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
                <Link
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
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="section-pad bg-navy text-white">
        <div className="site-container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <p className="eyebrow">{sectionsCopy.whyEyebrow}</p>
                <h2 className="type-display mt-3 text-3xl sm:text-4xl md:text-[2.75rem]">
                  {sectionsCopy.whyTitle}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {sectionsCopy.whyText}
                </p>
                <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={aboutImage}
                    alt="Работа на VAG Auto Service"
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 50vw, 100vw"
                  />
                </div>
              </div>
            </Reveal>

            <div className="space-y-5">
              {whyUs.map((item, i) => (
                <Reveal key={item.num} delay={i * 0.06}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
                    <div className="flex items-start gap-4">
                      <span className="type-display text-2xl text-orange">
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

      <section className="section-pad bg-bg">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow={sectionsCopy.stepsEyebrow}
              title={sectionsCopy.stepsTitle}
            />
          </Reveal>
          <StaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <StaggerItem key={step.n}>
                <div className="surface-card h-full p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                    {step.n}
                  </span>
                  <h3 className="type-display mt-4 text-xl text-navy">
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
      </section>

      <EmergencyBanner />

      <section className="section-pad">
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
                <blockquote className="surface-card flex h-full flex-col p-6">
                  <div className="flex gap-0.5 text-orange">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-navy/90">
                    “{r.text}”
                  </p>
                  <footer className="mt-5 border-t border-border pt-4">
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

      <section className="section-pad bg-bg">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <Reveal>
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
            <Reveal delay={0.05}>
              <FaqAccordion />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad">
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
            {blogPosts.map((post) => (
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
                    <h3 className="type-display mt-2 text-xl text-navy group-hover:text-orange">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy section-pad">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,90,30,0.2),transparent_60%)]" />
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
