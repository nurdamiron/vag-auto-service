"use client";

import { FormEvent, useState } from "react";
import { trackConversion } from "@/components/analytics/ConversionTracking";
import { business, services, waLink } from "@/lib/data";

type Props = {
  /** compact — для hero / главной; full — страница контактов */
  variant?: "full" | "compact";
  className?: string;
  source?: string;
};

const inputClass =
  "w-full rounded-xl border border-border bg-bg px-3.5 py-3 text-navy outline-none transition placeholder:text-slate/60 focus:border-orange focus:ring-2 focus:ring-orange/20";

export function ContactForm({
  variant = "full",
  className = "",
  source = "сайт",
}: Props) {
  const [sent, setSent] = useState(false);
  const compact = variant === "compact";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const phone = String(fd.get("phone") || "");
    const car = String(fd.get("car") || "");
    const service = String(fd.get("service") || "");
    const message = String(fd.get("message") || "");

    const text = [
      `Здравствуйте! Заявка с сайта VAG Auto Service (${source}).`,
      name && `Имя: ${name}`,
      phone && `Телефон: ${phone}`,
      car && `Авто: ${car}`,
      service && `Что нужно: ${service}`,
      message && `Описание: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");

    trackConversion("form_submit", source);
    window.open(waLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div
        className={`surface-card text-center ${compact ? "p-6" : "p-8"} ${className}`}
      >
        <p className="type-display text-xl text-navy sm:text-2xl">
          Осталось отправить
        </p>
        <p className="mt-3 text-sm text-slate sm:text-base">
          WhatsApp открылся с готовым текстом — нажмите «отправить». Ответим в
          рабочие часы ({business.hoursShort}).
        </p>
        <button
          type="button"
          className="btn-outline mt-5"
          onClick={() => setSent(false)}
        >
          Новая заявка
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`surface-card space-y-3.5 ${compact ? "p-5 sm:p-6" : "space-y-4 p-6 sm:p-8"} ${className}`}
    >
      {compact ? (
        <div className="mb-1">
          <p className="eyebrow !normal-case !tracking-normal">Запись</p>
          <h2 className="type-display mt-1 text-xl text-navy sm:text-2xl">
            Опишите проблему
          </h2>
          <p className="mt-1.5 text-sm text-slate">
            Диагноз знать не нужно. Ответим в WhatsApp · {business.hoursShort}
          </p>
        </div>
      ) : null}

      <div className={`grid gap-3.5 ${compact ? "" : "gap-4 sm:grid-cols-2"}`}>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy">Имя</span>
          <input
            name="name"
            required
            className={inputClass}
            placeholder="Как к вам обращаться"
            autoComplete="name"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy">Телефон</span>
          <input
            name="phone"
            type="tel"
            required
            className={inputClass}
            placeholder="+7 ___ ___ __ __"
            autoComplete="tel"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-navy">Автомобиль</span>
        <input
          name="car"
          className={inputClass}
          placeholder="VW Passat 2012 / Kia Rio 2018 / Hyundai Tucson…"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-navy">Что нужно</span>
        <select
          name="service"
          className={inputClass}
          defaultValue={services[0].title}
        >
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Срочный ремонт">Срочный ремонт</option>
          <option value="Другое">Другое / консультация</option>
        </select>
      </label>

      {!compact ? (
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy">Сообщение</span>
          <textarea
            name="message"
            rows={4}
            className={`${inputClass} resize-y`}
            placeholder="Напр. горит ABS, стук спереди, нет тяги…"
          />
        </label>
      ) : (
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy">
            Кратко о проблеме
          </span>
          <textarea
            name="message"
            rows={2}
            className={`${inputClass} resize-y`}
            placeholder="Горит Check Engine, стук…"
          />
        </label>
      )}

      <button type="submit" className="btn-primary w-full">
        Записаться через WhatsApp
      </button>
      <p className="text-center text-xs text-slate">
        {business.phoneDisplay} · без спама, только ваш диалог
      </p>
    </form>
  );
}
