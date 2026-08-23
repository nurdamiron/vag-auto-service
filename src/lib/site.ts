/**
 * Адрес сайта и идентификаторы счётчиков.
 *
 * SITE_URL берётся из переменной окружения, чтобы при подключении
 * своего домена не пришлось править код — достаточно задать
 * NEXT_PUBLIC_SITE_URL в настройках проекта на Vercel.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vag-auto-service.vercel.app"
).replace(/\/$/, "");

/** Google Analytics 4: G-XXXXXXXXXX */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** Яндекс.Метрика: номер счётчика */
export const YM_ID = process.env.NEXT_PUBLIC_YM_ID ?? "";
