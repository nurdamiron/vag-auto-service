"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { business, nav, telLink, waLink } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="site-container flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange text-sm font-extrabold text-white">
            V
          </span>
          <span
            className={`type-display text-lg leading-none transition-colors ${
              scrolled || open ? "text-navy" : "text-white"
            }`}
          >
            {business.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  scrolled
                    ? active
                      ? "bg-bg text-navy"
                      : "text-slate hover:text-navy"
                    : active
                      ? "bg-white/12 text-white"
                      : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telLink()}
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              scrolled ? "text-navy hover:text-orange" : "text-white hover:text-orange"
            }`}
          >
            <Phone className="h-4 w-4" />
            {business.phoneDisplay}
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="btn-primary !py-2.5 !px-4 !text-sm"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          className={`flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
            scrolled || open
              ? "border-border text-navy"
              : "border-white/25 text-white"
          }`}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-white lg:hidden">
          <div className="site-container flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-navy hover:bg-bg"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={telLink()}
              className="mt-2 flex items-center gap-2 rounded-xl px-3 py-3 font-semibold text-navy"
            >
              <Phone className="h-4 w-4 text-orange" />
              {business.phoneDisplay}
            </a>
            <div className="mt-2 flex flex-col gap-2 px-1 pb-2">
              <a
                href={waLink()}
                className="btn-primary w-full"
                target="_blank"
                rel="noreferrer"
              >
                Написать в WhatsApp
              </a>
              <Link href="/contact" className="btn-outline w-full">
                Контакты и карта
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
