import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { ServiceCard } from "@/components/site/ServiceCard";
import { DiagAreas } from "@/components/site/DiagAreas";
import { SectionHeading } from "@/components/site/SectionHeading";
import { sectionsCopy, services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Электронно-компьютерная диагностика по мотору, ходовке, коробке и малярке, ремонт двигателя, КПП, электрики, малярные работы и ТО — VAG Auto Service, Алматы.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="Диагностика, мотор, ходовая, коробка и малярка"
        text="То, с чем реально приезжают: Check Engine, ABS, стук в подвеске, рывки коробки, течи, сколы и притёртые бампера. Смета — до работ."
        crumbs={[{ href: "/", label: "Главная" }, { label: "Услуги" }]}
      />

      <section className="section-pad bg-bg">
        <div className="site-container">
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
