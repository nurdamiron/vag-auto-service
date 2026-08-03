import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { business, telLink, waLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Адрес, телефон и запись в ${business.name}: ${business.fullAddress}, ${business.phoneDisplay}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Запись"
        title="Позвоните, напишите или оставьте заявку"
        text="Лучше сразу: марка, год, что беспокоит. Ответим в WhatsApp или по телефону с 10:00 до 20:00."
        crumbs={[
          { href: "/", label: "Главная" },
          { label: "Контакты" },
        ]}
      />

      <section className="section-pad bg-bg">
        <div className="site-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="space-y-4">
              <a
                href={telLink()}
                className="surface-card surface-card-hover flex items-start gap-4 p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                    Телефон
                  </p>
                  <p className="mt-1 type-display text-xl text-navy">
                    {business.phoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="surface-card surface-card-hover flex items-start gap-4 p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                    WhatsApp
                  </p>
                  <p className="mt-1 type-display text-xl text-navy">
                    Написать в чат
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${business.email}`}
                className="surface-card surface-card-hover flex items-start gap-4 p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                    Email
                  </p>
                  <p className="mt-1 type-display text-xl text-navy">
                    {business.email}
                  </p>
                </div>
              </a>

              <div className="surface-card flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                    Адрес
                  </p>
                  <p className="mt-1 type-display text-xl text-navy">
                    {business.address}
                  </p>
                  <p className="mt-1 text-sm text-slate">
                    {business.district}, {business.city}
                  </p>
                  <a
                    href={business.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-orange hover:underline"
                  >
                    Открыть в 2ГИС →
                  </a>
                </div>
              </div>

              <div className="surface-card flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                    Режим работы
                  </p>
                  <p className="mt-1 type-display text-xl text-navy">
                    {business.hours}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="type-display mb-4 text-2xl text-navy sm:text-3xl">
              Форма записи
            </h2>
            <ContactForm source="страница контактов" />
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="site-container">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-border bg-navy">
              <iframe
                title="Карта 2ГИС — VAG Auto Service"
                src={`https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(
                  JSON.stringify({
                    pos: {
                      lat: business.lat,
                      lon: business.lon,
                      zoom: 16,
                    },
                    opt: { city: "almaty" },
                    org: "70000001068542185",
                  })
                )}`}
                className="h-[380px] w-full border-0"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
