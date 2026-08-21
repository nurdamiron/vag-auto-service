"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

  // Закрываем меню при смене маршрута — корректировкой состояния в рендере,
  // а не эффектом (иначе лишний каскадный рендер)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  // Блокируем прокрутку под открытым мобильным меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-border bg-white/90 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="site-container flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-orange text-sm font-extrabold text-white transition-transform duration-300 group-hover:scale-105">
            V
            <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
          </span>
          <span
            className={`type-display text-lg leading-none transition-colors ${
              solid ? "text-navy" : "text-white"
            }`}
          >
            {business.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  solid
                    ? active
                      ? "text-navy"
                      : "text-slate hover:text-navy"
                    : active
                      ? "text-white"
                      : "text-white/75 hover:text-white"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className={`absolute inset-0 rounded-full ${
                      solid ? "bg-bg" : "bg-white/12"
                    }`}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telLink()}
            className={`hidden items-center gap-2 text-sm font-semibold transition-colors xl:inline-flex ${
              solid
                ? "text-navy hover:text-orange"
                : "text-white hover:text-orange"
            }`}
          >
            <Phone className="h-4 w-4" />
            {business.phoneDisplay}
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="btn-primary !px-4 !py-2.5 !text-sm"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
            solid ? "border-border text-navy" : "border-white/25 text-white"
          }`}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-white lg:hidden"
          >
            <div className="site-container flex flex-col gap-1 py-4">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-navy transition-colors hover:bg-bg"
                  >
                    {item.label}
                  </Link>
                </motion.div>
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
