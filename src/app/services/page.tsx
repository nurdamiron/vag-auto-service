import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { ServiceCard } from "@/components/site/ServiceCard";
import { DiagAreas } from "@/components/site/DiagAreas";
import { SymptomGrid } from "@/components/site/SymptomGrid";
import { SectionHeading } from "@/components/site/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { sectionsCopy, services } from "@/lib/data";
import {
  breadcrumbNode,
  graph,
  itemListNode,
  pageMetadata,
  serviceNode,
  webPageNode,
} from "@/lib/seo";

const PATH = "/services";
const CRUMBS = [{ name: "Главная", path: "/" }, { name: "Услуги" }];

export const metadata: Metadata = pageMetadata({
  title: "Услуги",
  description:
    "Диагностика, ремонт двигателя и КПП, ходовая, электрика, малярка, ТО и проверка перед покупкой. VAG Auto Service, Алматы, Таугуль.",
  path: PATH,
  keywords: services.map((s) => `${s.title} Алматы`),
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        id="ld-services"
        data={graph(
          webPageNode({
            path: PATH,
            name: "Услуги автосервиса в Алматы",
            description:
              "Двенадцать направлений работ: диагностика, двигатель, ходовая, коробка, электрика, малярка, ТО и проверка перед покупкой.",
            type: "CollectionPage",
            crumbs: CRUMBS,
          }),
          breadcrumbNode(PATH, CRUMBS),
          itemListNode(
            PATH,
            services.map((s) => ({ name: s.title, path: `/services/${s.slug}` }))
          ),
          ...services.map(serviceNode)
        )}
      />
      <PageHero
        eyebrow="Услуги"
        title="Двенадцать направлений — и одно правило: сначала диагноз"
        text="Check Engine, стук в подвеске, рывки коробки, течи, сколы и притёртые бампера. По каждому направлению смету называем до начала работ и даём гарантию на сделанное."
        crumbs={[{ href: "/", label: "Главная" }, { label: "Услуги" }]}
      />

      <section className="section-pad bg-bg">
        <div className="site-container">
          {/* Заголовок скрыт визуально — в героблоке он уже есть.
              Нужен, чтобы карточки с h3 не висели без уровня выше */}
          <h2 className="sr-only">Направления работ</h2>
          <StaggerGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} index={i} size="feature" />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
            <Reveal from="left">
              <SectionHeading
                eyebrow={sectionsCopy.symptomsEyebrow}
                title={sectionsCopy.symptomsTitle}
                text={sectionsCopy.symptomsText}
              />
            </Reveal>
            <Reveal delay={0.05} from="right">
              <SymptomGrid />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad bg-bg">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow={sectionsCopy.diagEyebrow}
              title={sectionsCopy.diagTitle}
              text={sectionsCopy.diagText}
            />
          </Reveal>
          <div className="mt-10">
            <DiagAreas />
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="site-container">
          <Reveal>
            <div className="grain relative overflow-hidden rounded-3xl bg-navy p-8 text-center text-white sm:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,90,30,0.2),transparent_65%)]" />
              <div className="relative">
                <h2 className="type-display text-2xl sm:text-3xl">
                  Не уверены, к какому разделу относится проблема?
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-white/70">
                  Напишите в WhatsApp марку, год и симптом — скажем, нужна
                  диагностика или сразу понятный ремонт, и есть ли окно сегодня.
                </p>
                <Link href="/contact" className="btn-primary mt-7 inline-flex">
                  Записаться
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
