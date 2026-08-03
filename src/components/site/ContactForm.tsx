"use client";

import { FormEvent, useState } from "react";
import { business, services, waLink } from "@/lib/data";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const phone = String(fd.get("phone") || "");
    const car = String(fd.get("car") || "");
    const service = String(fd.get("service") || "");
    const message = String(fd.get("message") || "");

    const text = [
      "Здравствуйте! Заявка с сайта VAG Auto Service (хочу записаться).",
      name && `Имя: ${name}`,
      phone && `Телефон: ${phone}`,
      car && `Авто: ${car}`,
      service && `Что нужно: ${service}`,
      message && `Описание: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(waLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="surface-card p-8 text-center">
        <p className="type-display text-2xl text-navy">Осталось отправить</p>
        <p className="mt-3 text-slate">
          WhatsApp открылся с готовым текстом — нажмите «отправить». Ответим в
          рабочие часы ({business.hoursShort}).
        </p>
        <button
          type="button"
          className="btn-outline mt-6"
          onClick={() => setSent(false)}
        >
          Новая заявка
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface-card space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy">Имя</span>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
            placeholder="Как к вам обращаться"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy">Телефон</span>
          <input
            name="phone"
            type="tel"
            required
            className="w-full rounded-xl border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
            placeholder="+7 ___ ___ __ __"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-navy">Автомобиль</span>
        <input
          name="car"
          className="w-full rounded-xl border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
          placeholder="Напр. VW Passat B7, 2012 / Skoda Octavia 1.4"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-navy">Услуга</span>
        <select
          name="service"
          className="w-full rounded-xl border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
          defaultValue=""
        >
          <option value="" disabled>
            Выберите услугу
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Другое">Другое / консультация</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-navy">Сообщение</span>
        <textarea
          name="message"
          rows={4}
          className="w-full resize-y rounded-xl border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
          placeholder="Напр. горит ABS, стук спереди, нет тяги…"
        />
      </label>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Отправить в WhatsApp
      </button>
      <p className="text-xs text-slate">
        Уйдёт в WhatsApp на {business.phoneDisplay}. Без спама — только ваш
        диалог с сервисом.
      </p>
    </form>
  );
}
