import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { symptoms } from "@/lib/data";

/**
 * Вход в услуги на языке клиента. Человек не ищет «ремонт ходовой» —
 * он ищет «стучит на кочках».
 */
export function SymptomGrid() {
  return (
    <StaggerGrid className="grid gap-2.5 sm:grid-cols-2">
      {symptoms.map((s) => (
        <StaggerItem key={s.text}>
          <Link
            href={`/services/${s.service}`}
            className="group flex h-full items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange hover:shadow-[var(--shadow-soft)]"
          >
            <span className="flex items-center gap-2.5 text-[15px] leading-snug text-navy">
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange transition-transform duration-200 group-hover:scale-150"
              />
              {s.text}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-orange" />
          </Link>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
