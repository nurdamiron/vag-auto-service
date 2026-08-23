import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import { areas, business } from "@/lib/data";
import {
  breadcrumbNode,
  graph,
  itemListNode,
  pageMetadata,
  webPageNode,
} from "@/lib/seo";

const PATH = "/areas";
const CRUMBS = [{ name: "Главная", path: "/" }, { name: "Районы Алматы" }];

export const metadata: Metadata = pageMetadata({
  title: "Автосервис по районам Алматы",
  description:
    "VAG Auto Service в Таугуле. Едут из Аксая, Орбиты, Бостандыка, Медеу. VW, Audi, Skoda, Kia, Hyundai.",
  path: PATH,
  keywords: [
    "автосервис Алматы районы",
    "автосервис Таугуль",
    "автосервис Ауэзовский район",
    "СТО VAG Алматы",
  ],
});

export default function AreasPage() {
  return (
    <>
      <JsonLd
        id="ld-areas"
        data={graph(
          webPageNode({
            path: PATH,
            name: "Автосервис по районам Алматы",
            description: `Бокс ${business.name} в Таугуле. Отдельные страницы районов, откуда едут клиенты.`,
            type: "CollectionPage",
            crumbs: CRUMBS,
          }),
          breadcrumbNode(PATH, CRUMBS),
          itemListNode(
            PATH,
            areas.map((a) => ({
              name: `Автосервис ${a.name}`,
              path: `/areas/${a.slug}`,
            }))
          )
        )}
      />
      <PageHero
        eyebrow="Алматы"
        title="Откуда к нам едут"
        text={`${business.fullAddress}. Не сеть на весь город — один бокс, понятная дорога, смета до работ.`}
        crumbs={[
          { href: "/", label: "Главная" },
          { label: "Районы" },
        ]}
      />
      <section className="section-pad bg-bg">
        <div className="site-container">
          <StaggerGrid className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <StaggerItem key={area.slug}>
                <Link
                  href={`/areas/${area.slug}`}
                  className="surface-card surface-card-hover group flex h-full flex-col p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-orange">
                    {area.name}
                  </p>
                  <h2 className="type-display mt-2 text-2xl text-navy group-hover:text-orange">
                    Автосервис {area.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                    {area.short}
                  </p>
                  <p className="mt-3 text-xs text-slate">{area.drive}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy">
                    Открыть
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
