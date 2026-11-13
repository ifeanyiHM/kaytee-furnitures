"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils/cn";
import { NAV_LINKS } from "@/lib/utils/constants";

import { AnimatePresence, motion } from "motion/react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  RiArrowRightUpLine,
  RiCloseLine,
  RiMenu3Line,
  RiPhoneLine,
} from "react-icons/ri";

const EASE = [0.16, 1, 0.3, 1] as const;

const DARK_HERO = [
  "/",
  "/about",
  "/services",
  "/portfolio",
  "/contact",
  "/consultation",
  "/privacy",
  "/terms",
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const hasDarkHero =
    DARK_HERO.includes(pathname) || pathname.startsWith("/portfolio/");

  const onDark = hasDarkHero && !scrolled && !open;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Track scroll position.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the menu when the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent background scrolling while the menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Allow Escape to close the mobile menu.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const primaryLinks = NAV_LINKS.filter((link) => link.href !== "/");

  return (
    <>
      {/* Header */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
          onDark
            ? "border-transparent bg-transparent"
            : "border-sand-200/80 bg-sand-50/95 shadow-[0_4px_24px_rgba(58,38,15,0.035)] backdrop-blur-xl",
          open && "border-sand-200 bg-sand-50",
        )}
      >
        <div
          className={cn(
            "site-container flex items-center justify-between",
            "h-17 sm:h-18 lg:h-20 xl3:h-24",
          )}
        >
          {/* Brand */}
          <Link
            href="/"
            aria-label="Kaytee Furnitures & Interior — Home"
            onClick={() => setOpen(false)}
            className="relative z-10 flex shrink-0 items-center"
          >
            <Image
              src="/images/kaytee_logo.png"
              alt="Kaytee Furnitures & Interior"
              width={717}
              height={421}
              priority
              className="h-9 w-auto object-contain sm:h-10 lg:h-11 xl3:h-14"
              style={{
                filter: onDark
                  ? "none"
                  : "sepia(100%) saturate(3000%) hue-rotate(340deg) brightness(30%)",
              }}
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 lg:flex xl1:gap-9 xl3:gap-12"
          >
            {primaryLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "site-nav-link relative py-2",
                    "after:absolute after:inset-x-0 after:bottom-0",
                    "after:h-px after:origin-left after:transition-transform after:duration-500",
                    active
                      ? "after:scale-x-100"
                      : "after:scale-x-0 hover:after:scale-x-100",
                    onDark
                      ? "text-white/80 hover:text-white after:bg-brand-300"
                      : "text-charcoal/70 hover:text-charcoal after:bg-brand-600",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop CTA */}
            <Link
              href="/consultation"
              className={cn(
                "hidden items-center gap-2 border px-5 py-3",
                "font-sans text-[10px] font-medium uppercase tracking-[0.16em]",
                "transition-all duration-300 lg:inline-flex xl1:px-6 xl1:py-3.5 xl3:text-[12px]",
                onDark
                  ? "border-white/40 text-white hover:bg-white hover:text-charcoal"
                  : "border-brand-600 text-brand-800 hover:bg-brand-600 hover:text-white",
              )}
            >
              Start a project
              <RiArrowRightUpLine size={15} />
            </Link>

            {/* Mobile consultation shortcut */}
            <Link
              href="/consultation"
              onClick={() => setOpen(false)}
              className={cn(
                "inline-flex items-center gap-1.5 px-2 py-2",
                "text-[10px] font-semibold uppercase tracking-[0.12em]",
                "transition-colors duration-300 sm:px-3 lg:hidden",
                onDark ? "text-white" : "text-brand-800",
              )}
            >
              Enquire
              <RiArrowRightUpLine size={14} />
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              aria-label={
                open ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={cn(
                "relative z-10 flex size-10 shrink-0 items-center justify-center",
                "border transition-all duration-300 lg:hidden",
                onDark
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-sand-300 text-brand-900 hover:border-brand-600 hover:bg-brand-100",
                open && "border-brand-300 bg-brand-100 text-brand-900",
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <RiCloseLine size={21} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <RiMenu3Line size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            data-lenis-prevent
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={cn(
              "fixed inset-0 z-40 flex flex-col overflow-y-auto",
              "bg-sand-50 px-5 pb-7 pt-24",
              "sm:px-8 sm:pt-28",
              "lg:hidden",
            )}
          >
            {/* Menu introduction */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="mb-8 flex items-end justify-between border-b border-sand-300 pb-5"
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-600">
                  Kaytee Furnitures & Interior
                </p>

                <p className="mt-2 font-hero text-2xl tracking-[-0.03em] text-brand-900 sm:text-3xl">
                  Explore our world.
                </p>
              </div>

              <span className="pb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-charcoal-muted">
                Menu
              </span>
            </motion.div>

            {/* Navigation links */}
            <nav aria-label="Mobile navigation" className="flex-1">
              <ul>
                {NAV_LINKS.map((link, index) => {
                  const active = isActive(link.href);

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.12 + index * 0.055,
                        ease: EASE,
                      }}
                      className="border-b border-sand-200"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className="group flex min-h-16.5 items-center justify-between gap-4 py-4 sm:min-h-19"
                      >
                        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
                          <span
                            className={cn(
                              "w-6 shrink-0 text-[10px] font-medium tracking-[0.12em]",
                              active ? "text-brand-600" : "text-brand-400",
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span
                            className={cn(
                              "truncate font-hero text-[1.8rem] leading-tight tracking-[-0.035em]",
                              "transition-colors duration-300 sm:text-4xl",
                              active
                                ? "text-brand-700"
                                : "text-charcoal group-hover:text-brand-600",
                            )}
                          >
                            {link.label}
                          </span>
                        </div>

                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full",
                            "transition-all duration-300",
                            active
                              ? "bg-brand-600 text-white"
                              : "border border-sand-300 text-brand-600 group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white",
                          )}
                        >
                          <RiArrowRightUpLine size={16} />
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom contact area */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + NAV_LINKS.length * 0.055,
                ease: EASE,
              }}
              className="mt-8"
            >
              <Link
                href="/consultation"
                onClick={() => setOpen(false)}
                className="group flex w-full items-center justify-between bg-brand-900 px-5 py-5 text-sand-50 transition-colors duration-300 hover:bg-brand-800 sm:px-7"
              >
                <div>
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-300">
                    Have a project in mind?
                  </span>

                  <span className="mt-1.5 block font-hero text-xl sm:text-2xl">
                    Let's talk about it.
                  </span>
                </div>

                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 transition-transform duration-300 group-hover:translate-x-1">
                  <RiArrowRightUpLine size={19} />
                </span>
              </Link>

              <div className="mt-6 flex flex-col gap-4 border-t border-sand-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-600">
                    Visit our studio
                  </p>

                  <p className="mt-1.5 text-xs leading-5 text-charcoal-muted">
                    22 Oremerin, Itire, Surulere, Lagos
                  </p>
                </div>

                <a
                  href="tel:+2348079197554"
                  className="inline-flex items-center gap-2 text-xs font-medium text-brand-800 transition-colors hover:text-brand-600"
                >
                  <RiPhoneLine size={14} />
                  +234 807 919 7554
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
