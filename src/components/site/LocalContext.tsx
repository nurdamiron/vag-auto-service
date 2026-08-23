import { Fuel, Mountain, Snowflake, TrafficCone, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { almatyContext } from "@/lib/data";

/** Иконки идут в том же порядке, что и пункты в almatyContext */
const ICONS: LucideIcon[] = [TrafficCone, Mountain, Wrench, Snowflake, Fuel];

/**
 * Локальный контекст Алматы: пробки, подъёмы, дворы, зима, топливо.
 * Показывает, что сервис работает именно здесь, а не пишет универсальный текст.
 */
export function LocalContext() {
  return (
    <StaggerGrid className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {almatyContext.map((item, i) => {
        const Icon = ICONS[i] ?? Wrench;
        return (
          <StaggerItem key={item.title}>
            <SpotlightCard className="surface-card surface-card-hover h-full p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="type-display mt-4 text-lg text-navy sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {item.text}
              </p>
            </SpotlightCard>
          </StaggerItem>
        );
      })}
    </StaggerGrid>
  );
}
