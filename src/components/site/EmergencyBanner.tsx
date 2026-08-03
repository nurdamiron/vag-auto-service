import { Phone } from "lucide-react";
import { business, sectionsCopy, telLink, waLink } from "@/lib/data";

export function EmergencyBanner() {
  return (
    <section className="bg-orange">
      <div className="site-container flex flex-col items-start justify-between gap-5 py-8 sm:flex-row sm:items-center md:py-10">
        <div>
          <h3 className="type-display text-2xl text-white sm:text-3xl">
            {sectionsCopy.emergencyTitle}
          </h3>
          <p className="mt-2 max-w-xl text-sm text-white/90 sm:text-base">
            {sectionsCopy.emergencyText}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="flex flex-wrap gap-2">
            <a
              href={telLink()}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-orange shadow-lg transition hover:bg-bg"
            >
              <Phone className="h-4 w-4" />
              {business.phoneDisplay}
            </a>
            <a
              href={waLink("Здравствуйте! Нужна срочная запись.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-transparent px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-xs font-medium text-white/85">
            Сегодня до 20:00 · {business.address}
          </p>
        </div>
      </div>
    </section>
  );
}
