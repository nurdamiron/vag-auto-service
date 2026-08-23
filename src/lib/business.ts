/** Реквизиты и базовые факты о сервисе (2ГИС: firm/70000001068542185) */

export const business = {
  name: "VAG Auto Service",
  shortName: "VAG",
  /** Слоган с карточки 2ГИС */
  tagline: "Компьютерная диагностика авто. Высокая точность выявления проблем",
  description:
    "Автосервис в Алматы: компьютерная диагностика, ремонт двигателя, ходовой, коробки, электрика и малярные работы. Volkswagen, Audi, Skoda, Porsche, Bentley, Kia и Hyundai. Смета до начала работ, гарантия на выполненные работы.",
  phone: "+77074056907",
  phoneDisplay: "+7 707 405 69 07",
  email: "baigozy@mail.ru",
  whatsapp: "77074056907",
  address: "ул. Цветочная, 1/1, бокс 8",
  district: "мкр. Таугуль, Ауэзовский район",
  city: "Алматы",
  postal: "050052",
  fullAddress: "ул. Цветочная, 1/1, бокс 8, мкр. Таугуль, Алматы",
  mapUrl: "https://2gis.kz/almaty/firm/70000001068542185",
  lat: 43.206337,
  lon: 76.852957,
  rating: 4.8,
  reviewCount: 105,
  reviewTextCount: 66,
  hours: "Ежедневно с 10:00 до 20:00",
  hoursShort: "10:00–20:00",
  /** Из ответа сервиса в 2ГИС */
  carsFromYear: 2006,
  payment: ["Наличные", "Перевод на карту", "Оплата через банк", "QR-код"],
  /** Гарантия: срок обсуждается под конкретный ремонт */
  guarantee:
    "На выполненные работы даём гарантию — срок оговариваем по конкретному ремонту, до начала работ.",
  guaranteeShort: "Гарантия на выполненные работы",
} as const;

export const nav = [
  { href: "/services", label: "Услуги" },
  { href: "/brands", label: "Марки" },
  { href: "/about", label: "О нас" },
  { href: "/blog", label: "Советы" },
  { href: "/contact", label: "Запись" },
] as const;

export function waLink(text?: string) {
  const msg =
    text ??
    "Здравствуйте! Пишу с сайта VAG Auto Service. Опишу проблему — подскажите, что это может быть.";
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export function telLink() {
  return `tel:${business.phone}`;
}
