import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { brands, business, nav, services, telLink, waLink } from "@/lib/data";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-navy text-white">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="site-container section-pad relative !pb-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange text-sm font-extrabold">
                V
              </span>
              <span className="type-display text-lg">{business.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              {business.tagline}. VW, Audi, Skoda, Porsche, Kia и Hyundai —{" "}
              {business.city}, {business.district}.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={telLink()} className="btn-primary !py-2.5 !text-sm">
                Позвонить
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary !py-2.5 !text-sm"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Страницы
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="link-underline text-sm text-white/80 hover:text-orange"
                >
                  Главная
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-white/80 hover:text-orange"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Услуги
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="link-underline text-sm text-white/80 hover:text-orange"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Контакты
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-white/80">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <span>
                  {business.fullAddress}
                  <br />
                  <a
                    href={business.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-orange"
                  >
                    Открыть в 2ГИС
                  </a>
                </span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <a href={telLink()} className="link-underline hover:text-orange">
                  {business.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <a
                  href={`mailto:${business.email}`}
                  className="link-underline hover:text-orange"
                >
                  {business.email}
                </a>
              </li>
              <li className="text-white/60">{business.hours}</li>
            </ul>
          </div>
        </div>

        {/* Марки — отдельной полосой, чтобы каждая имела свою ссылку */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
            Марки
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-sm text-white/75 transition-colors hover:border-orange/50 hover:text-orange"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. Все права защищены.
          </p>
          <p>
            ★ {business.rating} на 2ГИС · VAG · Kia · Hyundai · {business.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
