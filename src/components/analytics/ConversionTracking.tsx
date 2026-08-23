"use client";

import { useEffect } from "react";
import { GA_ID, YM_ID } from "@/lib/site";

type Conversion = "whatsapp_click" | "phone_click" | "form_submit";

/**
 * Отправляет цель в оба счётчика. Экспортируем, чтобы форма записи
 * могла отметить отправку заявки.
 */
export function trackConversion(name: Conversion, label?: string) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", name, { event_label: label });

  const ymId = Number(YM_ID);
  if (ymId) window.ym?.(ymId, "reachGoal", name, { label });
}

/**
 * Клики по WhatsApp и телефону — основные конверсии этого сайта.
 * Ловим делегированием на документе, чтобы не обвешивать обработчиками
 * каждую ссылку: они разбросаны по шапке, футеру, карточкам и hero.
 */
export function ConversionTracking() {
  useEffect(() => {
    if (!GA_ID && !YM_ID) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        trackConversion("phone_click", link.textContent?.trim().slice(0, 60));
        return;
      }

      if (href.includes("wa.me")) {
        trackConversion("whatsapp_click", link.textContent?.trim().slice(0, 60));
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
