"use client";
import { cn } from "@/lib/utils/cn";
import { NAV_LINKS } from "@/lib/utils/constants";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiArrowRightUpLine } from "react-icons/ri";

const EASE = [0.16, 1, 0.3, 1] as const;
// Routes that open on a dark full-bleed hero, so the bar starts transparent.
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
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const hasDarkHero =
    DARK_HERO.includes(pathname) || pathname.startsWith("/portfolio/");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Tuck away while reading down, return on any upward scroll.
      setHidden(y > 500 && y > last + 4 ? true : y < last - 4 ? false : hidden);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const onDark = !scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          scrolled && !open
            ? "border-b border-sand-200 bg-sand-50/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="site-container flex h-16 items-center justify-between xl1:h-20 xl3:h-24">
          <Link
            href="/"
            aria-label="Kaytee Furnitures & Interior — Home"
            className="relative z-10 shrink-0"
          >
            <Image
              src="/images/kaytee_logo.png"
              alt="Kaytee Furnitures & Interior"
              width={717}
              height={421}
              priority
              className="h-11 w-auto transition-[filter] duration-500 xl1:h-12 xl3:h-14"
              style={{
                filter: onDark
                  ? "none"
                  : "sepia(100%) saturate(3000%) hue-rotate(340deg) brightness(30%)",
              }}
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-9 lg:flex xl1:gap-11 xl3:gap-14"
          >
            {NAV_LINKS.filter((l) => l.href !== "/").map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "site-nav-link after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-500 hover:after:scale-x-100",
                    active && "after:scale-x-100",
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

          <div className="flex items-center gap-4">
            <Link
              href="/consultation"
              className={cn(
                "hidden items-center gap-2 border px-5 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 lg:inline-flex xl1:px-6 xl1:py-3.5 xl3:text-[13px]",
                onDark
                  ? "border-white/40 text-white hover:bg-white hover:text-charcoal"
                  : "border-charcoal/70 text-charcoal hover:bg-charcoal hover:text-white",
              )}
            >
              Start a project
            </Link>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={cn(
                "relative z-10 flex h-11 w-11 items-center justify-center lg:hidden",
                onDark ? "text-white" : "text-charcoal",
              )}
            >
              <span className="relative block h-3 w-7">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-full bg-current transition-all duration-500",
                    open ? "top-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px bg-current transition-all duration-500",
                    open ? "top-1/2 w-full -rotate-45" : "top-full w-2/3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-charcoal px-5 pb-10 pt-28 sm:px-8 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex-1">
              <ul className="border-t border-white/10">
                {NAV_LINKS.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <li
                      key={link.href}
                      className="overflow-hidden border-b border-white/10"
                    >
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 0.9,
                          delay: 0.25 + i * 0.07,
                          ease: EASE,
                        }}
                      >
                        <Link
                          href={link.href}
                          className="flex items-baseline justify-between py-4 sm:py-5"
                        >
                          <span
                            className={cn(
                              "font-hero text-[2.6rem] leading-none sm:text-6xl",
                              active ? "text-brand-300" : "text-white",
                            )}
                          >
                            {link.label}
                          </span>
                          <span className="font-sans text-[10px] tracking-[0.2em] text-white/35">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              className="mt-10"
            >
              <Link href="/consultation" className="site-button-primary w-full">
                Start a project <RiArrowRightUpLine className="h-4 w-4" />
              </Link>
              <p className="mt-6 font-sans text-xs leading-relaxed text-white/45">
                22 Oremerin, Itire Surulere, Lagos
                <br />
                <a href="tel:+2348079197554" className="hover:text-white">
                  +234 807 919 7554
                </a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
