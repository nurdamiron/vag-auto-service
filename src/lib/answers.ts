/**
 * Готовые пары «вопрос — ответ» для услуг и марок.
 *
 * Собираются из того же контента, что показан на странице, поэтому
 * ответ поисковика или LLM всегда совпадает с тем, что человек увидит
 * на сайте. Используются и как видимый блок, и как разметка FAQPage.
 */

import { business } from "./business";
import { brands, type Brand } from "./brands";
import type { Service } from "./services";

export type QA = { q: string; a: string };

const PRICE_ANSWER =
  "Точную сумму называем после осмотра и всегда до начала работ — так цена не растёт по ходу ремонта. Чтобы сориентироваться заранее, напишите в WhatsApp марку, год и симптом.";

const LOCATION_ANSWER = `${business.name}, ${business.fullAddress}. ${business.hours}. Телефон и WhatsApp: ${business.phoneDisplay}.`;

/**
 * Вопросы, которые задают именно про эту услугу.
 *
 * Название услуги ставим в начало вопроса: так оно остаётся в
 * именительном падеже и формулировка не ломается на склонении.
 */
export function serviceQa(service: Service): QA[] {
  return [
    {
      q: `${service.title} — когда пора в сервис?`,
      a: `${service.trigger}. С чем приезжают чаще всего: ${service.symptoms
        .join(", ")
        .toLowerCase()}.`,
    },
    {
      q: `${service.title} — что входит в работы?`,
      a: `${service.includes.join("; ")}.`,
    },
    {
      q: `${service.title} — сколько стоит в Алматы?`,
      a: PRICE_ANSWER,
    },
    {
      q: `${service.title} — на каких марках делаете?`,
      a: `${brands.map((b) => b.name).join(", ")}. Ориентир по возрасту — автомобили примерно с ${
        business.carsFromYear
      } года и новее.`,
    },
    {
      q: "Есть ли гарантия на эти работы?",
      a: business.guarantee,
    },
    {
      q: "Где вы находитесь и как записаться?",
      a: LOCATION_ANSWER,
    },
  ];
}

/** Вопросы, которые задают про конкретную марку */
export function brandQa(brand: Brand): QA[] {
  return [
    {
      q: `Ремонтируете ${brand.name} в Алматы?`,
      a: `${brand.intro} Работаем в ${business.district}, ${business.city}.`,
    },
    {
      q: `Какие модели ${brand.name} обслуживаете?`,
      a: `${brand.models.map((m) => `${brand.name} ${m}`).join(", ")}.`,
    },
    {
      q: `С какими проблемами ${brand.name} обращаются чаще всего?`,
      a: `${brand.issues.map((i) => i.title).join("; ")}.`,
    },
    {
      q: `Сколько стоит диагностика ${brand.name}?`,
      a: PRICE_ANSWER,
    },
    {
      q: `Даёте ли гарантию на ремонт ${brand.name}?`,
      a: business.guarantee,
    },
    {
      q: "Где вы находитесь и как записаться?",
      a: LOCATION_ANSWER,
    },
  ];
}
