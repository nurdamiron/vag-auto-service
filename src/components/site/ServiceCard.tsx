import Image from "next/image";
import { ArrowRight, SearchCheck, Snowflake, SprayCan } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import type { Service } from "@/lib/data";

type Props = {
  service: Service;
  index: number;
  /** compact — сетка на главной, feature — крупные карточки на /services */
  size?: "compact" | "feature";
};

const PANEL_ICONS: Record<"spray" | "search" | "snow", LucideIcon> = {
  spray: SprayCan,
  search: SearchCheck,
  snow: Snowflake,
};

export function ServiceCard({ service, index, size = "compact" }: Props) {
  const feature = size === "feature";
  const num = String(index + 1).padStart(2, "0");
  const PanelIcon = service.panel ? PANEL_ICONS[service.panel.icon] : null;

  return (
    <SpotlightCard
      href={`/services/${service.slug}`}
      className="surface-card surface-card-hover group flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          />
        ) : (
          /* Без фото — рисованная панель в той же системе, что и фото-карточки */
          <div className="absolute inset-0">
            <div className="stripes-ember absolute inset-0 transition-transform duration-700 ease-out group-hover:translate-x-3" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(234,90,30,0.4),transparent_62%)]" />
            {PanelIcon ? (
              <PanelIcon className="absolute bottom-5 left-5 h-11 w-11 text-white" />
            ) : null}
            {service.panel ? (
              <span className="type-display absolute bottom-6 left-20 text-lg uppercase tracking-[0.18em] text-white/70">
                {service.panel.label}
              </span>
            ) : null}
          </div>
        )}

        {/* Единая подложка снизу — держит систему для фото и панели */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/10 to-transparent" />

        <span className="type-numeral absolute right-4 top-3 text-3xl text-white/35">
          {num}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${feature ? "p-6" : "p-5"}`}>
        <h3
          className={`type-display text-navy transition-colors group-hover:text-orange ${
            feature ? "text-2xl" : "text-xl"
          }`}
        >
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
          {service.short}
        </p>
        {/* Вместо цены — момент, когда пора обращаться */}
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-border pt-4">
          <span className="text-sm font-medium leading-snug text-orange">
            {service.trigger}
          </span>
          <ArrowRight className="mb-0.5 h-4 w-4 shrink-0 text-navy transition-transform duration-300 group-hover:translate-x-1 group-hover:text-orange" />
        </div>
      </div>
    </SpotlightCard>
  );
}
