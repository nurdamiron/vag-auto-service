import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { BrandLogo } from "@/components/site/BrandLogo";
import { JsonLd } from "@/components/seo/JsonLd";
import { brands, business, whyUs, trustBadges, waLink } from "@/lib/data";
import { BadgeCheck } from "lucide-react";
import {
  breadcrumbNode,
  graph,
  pageMetadata,
  webPageNode,
} from "@/lib/seo";

const PATH = "/about";
const CRUMBS = [{ name: "Главная", path: "/" }, { name: "О нас" }];

export const metadata: Metadata = pageMetadata({
  title: "О нас",
  description: `${business.name} — автосервис в Алматы, мкр. Таугуль. VW, Audi, Skoda, Kia и Hyundai: диагностика, ремонт и малярка. Смета до работ.`,
  path: PATH,
});

const aboutImage =
  "https://framerusercontent.com/images/JvlMrZBpxG3mmlVw12DVl8epGw.jpg";
const shopImage =
  "https://framerusercontent.com/images/Nj0LpREjR6nGaUDPcKrlCFLPNdg.jpg";

export default function AboutPage() {
  return (
    <>
      <JsonLd
        id="ld-about"
        data={graph(
          webPageNode({
            path: PATH,
            name: `О сервисе ${business.name}`,
            description: business.description,
            type: "AboutPage",
            crumbs: CRUMBS,
            image: aboutImage,
          }),
          breadcrumbNode(PATH, CRUMBS)
        )}
      />

      <PageHero
        eyebrow="О сервисе"
        title="Сервис, куда едут после того, как в другом месте «не нашли»"
        text={`Немцы и корейцы в одном боксе: диагностика, механика и малярка. Таугуль, Алматы. ★ ${business.rating} и ${business.reviewCount}+ оценок на 2ГИС.`}
        crumbs={[
          { href: "/", label: "Главная" },
          { label: "О нас" },
        ]}
      />

      <section className="section-pad">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={aboutImage}
                alt="VAG Auto Service"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 50vw, 100vw"
                priority
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">Кто мы</p>
            <h2 className="type-display mt-3 text-3xl text-navy sm:text-4xl">
              Сначала диагноз. Потом смета. Потом ремонт.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">
              Клиенты приезжают, когда в других местах «не нашли», предложили
              менять половину машины или просто сбросили ошибку. Мы копаем
              глубже: электронно-компьютерная диагностика по мотору, ходовке,
              коробке и малярке — с объяснением на понятном языке.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate">
              В отзывах чаще всего благодарят за то, что{" "}
              <strong className="text-navy">не навязывают лишнее</strong>,
              делают в срок и по адекватной цене. Есть постоянные клиенты с
              Passat, Golf, Polo, Octavia, Rapid — и с Rio, Cerato, Sportage,
              Accent, Tucson, Creta.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate">
              Ремонт и малярные работы делаем на месте: не нужно возить машину
              по трём подрядчикам — диагностика, механика и покраска идут одной
              сметой.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate">
              Ориентир по возрасту авто — примерно с{" "}
              <strong className="text-navy">{business.carsFromYear} года</strong>{" "}
              и новее. По старым машинам уточняйте заранее.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-6 inline-flex"
            >
              Написать в WhatsApp
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-bg">
        <div className="site-container">
          <Reveal>
            <h2 className="type-display text-3xl text-navy sm:text-4xl">
              На чём держится сервис
            </h2>
          </Reveal>
          <StaggerGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <StaggerItem key={item.num}>
                <div className="surface-card h-full p-6">
                  <span className="type-display text-2xl text-orange">
                    {item.num}
                  </span>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate">
                    {item.label}
                  </p>
                  <h3 className="type-display mt-1 text-xl text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="type-display text-3xl text-navy sm:text-4xl">
              Марки в приоритете
            </h2>
            <p className="mt-4 text-slate leading-relaxed">
              Концерн VAG — Volkswagen, Audi, Skoda, Porsche, Bentley. Плюс
              отдельное направление по корейским маркам: Kia и Hyundai. Не
              «универсальный гараж на всё подряд»: по этим маркам мы знаем
              типовые болячки и держим под них оборудование.
            </p>
            <p className="mt-3 text-slate leading-relaxed">
              {business.guarantee}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
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
            <ul className="mt-8 space-y-2.5">
              {trustBadges.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-navy">
                  <BadgeCheck className="h-4 w-4 text-orange" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate">
              Оплата: {business.payment.join(" · ")}.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={shopImage}
                alt="Бокс СТО"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy section-pad">
        <div className="site-container text-center">
          <Reveal>
            <h2 className="type-display text-3xl text-white sm:text-4xl">
              Приезжайте — разберёмся по делу
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              {business.fullAddress} · {business.hours}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                Контакты и запись
              </Link>
              <a
                href={business.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Открыть в 2ГИС
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
