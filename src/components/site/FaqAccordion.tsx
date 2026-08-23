"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/lib/data";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {/* Разметка FAQPage живёт на /faq — здесь только визуальный блок,
          иначе один и тот же FAQPage дублируется на двух адресах */}
      <div className="divide-y divide-border rounded-2xl border border-border bg-white">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="type-display text-base font-semibold text-navy sm:text-lg">
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate transition-transform ${
                    isOpen ? "rotate-180 text-orange" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate sm:px-6 sm:text-base">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
