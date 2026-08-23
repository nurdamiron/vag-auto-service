import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { BrandCard } from "@/components/site/BrandCard";
import { BrandLogo } from "@/components/site/BrandLogo";
import { DiagAreas } from "@/components/site/DiagAreas";
import { SectionHeading } from "@/components/site/SectionHeading";
import { brandGroups, brands, brandsByGroup, sectionsCopy } from "@/lib/data";

export const metadata: Metadata = {
  title: "Марки",
  description:
    "Volkswagen, Audi, Skoda, Porsche, Bentley, Kia и Hyundai — диагностика, ремонт и малярные работы в VAG Auto Service, Алматы.",
};

export default function BrandsPage() {
  return (
    <>
      <PageHero
        mark={
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            {brands.map((b) => (
              <BrandLogo
                key={b.slug}
                slug={b.slug}
                name={b.name}
                className="h-8 w-20 text-white/80"
              />
            ))}
          </div>
        }
        eyebrow="Марки"
        title="Немцы и корейцы — два профильных направления"
        text="Концерн VAG с самого начала, Kia и Hyundai — отдельным направлением. По каждой марке знаем типовые болячки и держим нужное оборудование."
        crumbs={[{ href: "/", label: "Главная" }, { label: "Марки" }]}
      />

      <section className="section-pad">
        <div className="site-container space-y-14">
          {brandGroups.map((group) => (
            <div key={group.id}>
              <Reveal>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border pb-4">
                  <h2 className="type-display text-2xl text-navy sm:text-3xl">
                    {group.label}
                  </h2>
                  <p className="max-w-xl text-sm text-slate">{group.text}</p>
                </div>
              </Reveal>
              <StaggerGrid className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {brandsByGroup(group.id).map((brand) => (
                  <StaggerItem key={brand.slug}>
                    <BrandCard brand={brand} />
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-bg">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow={sectionsCopy.diagEyebrow}
              title="Диагностика — одинаково подробно по любой марке"
              text={sectionsCopy.diagText}
            />
          </Reveal>
          <div className="mt-10">
            <DiagAreas />
          </div>
          <Reveal delay={0.1}>
            <div className="mt-10 text-center">
              <Link href="/contact" className="btn-primary">
                Записаться на диагностику
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
