import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Компьютерная диагностика VAG, ходовая, двигатель, КПП, электрика, замена масла — VAG Auto Service, Алматы.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="Диагностика, ходовая, мотор, коробка — под VAG"
        text="То, с чем реально приезжают: Check Engine, ABS, стук в подвеске, сцепление, течи, ТО. Смета до работ."
        crumbs={[
          { href: "/", label: "Главная" },
          { label: "Услуги" },
        ]}
      />

      <section className="section-pad bg-bg">
        <div className="site-container">
          <StaggerGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="type-display text-2xl text-navy">{s.title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                      {s.short}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <span className="font-semibold text-orange">{s.priceFrom}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-navy">
                        Подробнее
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <Reveal>
            <div className="mt-12 rounded-2xl bg-navy p-8 text-center text-white sm:p-10">
              <h3 className="type-display text-2xl sm:text-3xl">
                Не уверены, к какому разделу относится проблема?
              </h3>
              <p className="mx-auto mt-3 max-w-lg text-white/70">
                Напишите в WhatsApp марку, год и симптом — скажем, нужна
                диагностика или сразу понятный ремонт, и есть ли окно сегодня.
              </p>
              <Link href="/contact" className="btn-primary mt-6 inline-flex">
                Записаться
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
