import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { business, services, telLink } from "@/lib/data";
import { graph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description: "Такой страницы на сайте нет. Загляните в услуги или напишите нам.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      {/* Страница закрыта от индексации, но сущность бизнеса
          оставляем: ассистент может прийти по битой ссылке */}
      <JsonLd id="ld-404" data={graph()} />

      <PageHero
        eyebrow="404"
        title="Такой страницы нет"
        text="Возможно, ссылка устарела. Вот куда обычно идут дальше."
        crumbs={[{ href: "/", label: "Главная" }, { label: "404" }]}
      />

      <section className="section-pad">
        <div className="site-container">
          <h2 className="type-display text-2xl text-navy">Популярные услуги</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="surface-card surface-card-hover p-5"
              >
                <span className="type-display text-base text-navy">{s.title}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              На главную
            </Link>
            <a href={telLink()} className="btn-outline">
              {business.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
