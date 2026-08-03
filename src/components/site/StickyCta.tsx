"use client";

import { Phone } from "lucide-react";
import { business, telLink, waLink } from "@/lib/data";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-2.5 backdrop-blur md:hidden">
      <div className="flex gap-2">
        <a
          href={telLink()}
          className="btn-dark flex min-w-0 flex-[1.4] items-center justify-center gap-1.5 !px-2.5 !py-2.5 !text-[11px] !leading-none whitespace-nowrap sm:!text-xs"
        >
          <Phone className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{business.phoneDisplay}</span>
        </a>
        <a
          href={waLink()}
          target="_blank"
          rel="noreferrer"
          className="btn-primary flex flex-1 items-center justify-center !px-3 !py-2.5 !text-xs !leading-none whitespace-nowrap"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
