import { CircleDot, Gauge, Paintbrush, Settings2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { diagAreas, type DiagArea } from "@/lib/data";

const ICONS: Record<DiagArea["icon"], LucideIcon> = {
  engine: Gauge,
  chassis: CircleDot,
  gearbox: Settings2,
  paint: Paintbrush,
};

/** Четыре направления электронно-компьютерной диагностики */
export function DiagAreas() {
  return (
    <StaggerGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {diagAreas.map((area, i) => {
        const Icon = ICONS[area.icon];
        return (
          <StaggerItem key={area.slug}>
            <SpotlightCard className="surface-card surface-card-hover flex h-full flex-col p-6">
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-orange">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="type-numeral text-3xl text-border">
                  0{i + 1}
                </span>
              </div>

              <h3 className="type-display mt-5 text-xl text-navy">
                {area.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {area.short}
              </p>

              <ul className="mt-5 space-y-2 border-t border-border pt-4">
                {area.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-2 text-[13px] leading-snug text-slate"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </StaggerItem>
        );
      })}
    </StaggerGrid>
  );
}
