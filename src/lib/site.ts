/**
 * Адрес сайта и идентификаторы счётчиков.
 *
 * SITE_URL берётся из переменной окружения, чтобы при подключении
 * своего домена не пришлось править код — достаточно задать
 * NEXT_PUBLIC_SITE_URL в настройках проекта на Vercel.
 *
 * Запасной адрес — боевой домен. Раньше здесь стоял vercel.app, переменную
 * так и не задали, и canonical, sitemap и robots месяц отправляли поисковики
 * на технический адрес вместо vag-service.kz.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.vag-service.kz"
).replace(/\/$/, "");

/** Google Analytics 4: G-XXXXXXXXXX */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** Яндекс.Метрика: номер счётчика */
export const YM_ID = process.env.NEXT_PUBLIC_YM_ID ?? "";
