import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { business, faq, services, telLink, waLink } from "@/lib/data";
import {
  breadcrumbNode,
  faqNode,
  graph,
  pageMetadata,
  webPageNode,
} from "@/lib/seo";

const PATH = "/faq";

const CRUMBS = [
  { name: "Главная", path: "/" },
  { name: "Вопросы и ответы" },
];

export const metadata: Metadata = pageMetadata({
  title: "Вопросы и ответы",
  description:
    "Сколько стоит диагностика, есть ли гарантия, можно ли со своими запчастями, с какого года берём авто и где находится сервис — коротко и по делу.",
  path: PATH,
  keywords: [
    "сколько стоит диагностика авто Алматы",
    "гарантия на ремонт авто Алматы",
    "автосервис Таугуль вопросы",
  ],
});

/**
 * Отдельная страница вопросов.
 *
 * Ответы выводим обычным текстом, а не в аккордеоне: так их видит
 * краулер без выполнения скриптов, и они целиком попадают в сниппет
 * и в ответы ИИ-поисковиков.
 */
export default function FaqPage() {
  return (
    <>
      <JsonLd
        id="ld-faq"
        data={graph(
          webPageNode({
            path: PATH,
            name: "Вопросы и ответы",
            description:
              "Частые вопросы о ремонте и диагностике в VAG Auto Service, Алматы.",
            type: "FAQPage",
            crumbs: CRUMBS,
          }),
          breadcrumbNode(PATH, CRUMBS),
          faqNode(PATH)
        )}
      />

      <PageHero
        eyebrow="Вопросы"
        title="Что спрашивают перед первым визитом"
        text={`Цены, гарантия, запись, оплата и адрес — ${business.name}, ${business.district}, ${business.city}.`}
        crumbs={[{ href: "/", label: "Главная" }, { label: "Вопросы и ответы" }]}
      />

      <section className="section-pad bg-bg">
        <div className="site-container max-w-3xl">
          <div className="space-y-6">
            {faq.map((item) => (
              <Reveal key={item.q}>
                <article className="surface-card p-6 sm:p-7">
                  <h2 className="type-display text-lg text-navy sm:text-xl">
                    {item.q}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-slate">
                    {item.a}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 rounded-2xl bg-navy p-6 text-white sm:p-8">
              <h2 className="type-display text-2xl">Не нашли свой вопрос?</h2>
              <p className="mt-2 text-white/70">
                Напишите марку, год и симптом — ответим в рабочие часы,{" "}
                {business.hoursShort}.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
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
            </div>
          </Reveal>

          <div className="mt-10">
            <h2 className="type-display text-xl text-navy">
              Вопросы по конкретной услуге
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="chip">
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
