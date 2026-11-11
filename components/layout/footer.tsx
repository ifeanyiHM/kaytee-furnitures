import { Reveal } from "@/components/motion/Reveal";
import Image from "next/image";
import Link from "next/link";
import {
  RiArrowRightUpLine,
  RiInstagramLine,
  RiTiktokFill,
} from "react-icons/ri";

const NAV = {
  Studio: [
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
  Services: [
    { href: "/services#interior-design", label: "Interior Design" },
    { href: "/services#space-planning", label: "Space Planning" },
    { href: "/services#furniture-procurement", label: "Furniture Procurement" },
    { href: "/services#virtual-consultation", label: "Virtual Consultation" },
    { href: "/services#renovation-management", label: "Renovation Management" },
  ],
};

const SOCIALS = [
  {
    href: "https://www.instagram.com/kayteefurnitureandinteriors?utm_source=qr",
    Icon: RiInstagramLine,
    label: "Instagram",
  },
  {
    href: "https://www.tiktok.com/@kayteefurnitureinteriors?_r=1&_t=ZS-98Zqp8c3Ytp",
    Icon: RiTiktokFill,
    label: "TikTok",
  },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-charcoal text-white">
      {/* Closing invitation */}
      <div className="border-b border-white/10">
        <div className="site-container py-24 xl1:py-28 xl3:py-36 xl4:py-44">
          <Reveal>
            <p className="site-kicker mb-8 flex items-center gap-4 text-brand-300">
              <span className="h-px w-10 bg-brand-400" />
              Start a project
            </p>
            <Link href="/consultation" className="group block">
              <span className="display-page block max-w-[14ch] text-white transition-colors duration-500 group-hover:text-brand-300 xl3:max-w-[16ch]">
                Let&apos;s make a room worth coming home to.
              </span>
              <span className="link-draw mt-10 text-white">
                Book a consultation <RiArrowRightUpLine className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="site-container py-16 xl3:py-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          <div>
            <Link
              href="/"
              aria-label="Kaytee Furnitures & Interior — Home"
              className="mb-6 inline-block"
            >
              <Image
                src="/images/kaytee_logo.png"
                alt="Kaytee Furnitures & Interior"
                width={717}
                height={421}
                className="h-12 w-auto xl3:h-14"
              />
            </Link>
            <p className="max-w-xs font-display text-xl font-light leading-snug text-white/60 xl3:text-2xl">
              Bespoke furniture and considered interiors, built room by room
              across Lagos.
            </p>
          </div>

          {Object.entries(NAV).map(([title, items]) => (
            <nav key={title} aria-label={title}>
              <h2 className="site-label mb-6 text-brand-400">{title}</h2>
              <ul className="space-y-3.5">
                {items.map((item) => (
                  <li key={item.href}>
                    {/* Hash links use a plain anchor so the services accordion
                        (which listens for native hashchange) always reacts. */}
                    {item.href.includes("#") ? (
                      <a
                        href={item.href}
                        className="font-sans text-sm text-white/55 transition-colors hover:text-white xl3:text-[15px]"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="font-sans text-sm text-white/55 transition-colors hover:text-white xl3:text-[15px]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="site-label mb-6 text-brand-400">Studio</h2>
            <address className="space-y-3.5 font-sans text-sm not-italic leading-relaxed text-white/55 xl3:text-[15px]">
              <p>
                22 Oremerin, Itire
                <br />
                Surulere, Lagos
              </p>
              <p>
                <a
                  href="tel:+2348079197554"
                  className="transition-colors hover:text-white"
                >
                  +234 807 919 7554
                </a>
              </p>
              <p>
                <a
                  href="mailto:kayteefurnitureandinterior@gmail.com"
                  className="break-all transition-colors hover:text-white"
                >
                  kayteefurnitureandinterior@gmail.com
                </a>
              </p>
            </address>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/55 transition-colors hover:border-brand-400 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="font-sans text-xs text-white/35">
            © {new Date().getFullYear()} Kaytee Furnitures &amp; Interior. All
            rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-xs text-white/35">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white/70"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-white/70"
            >
              Terms of Use
            </Link>
            <span>
              Website by{" "}
              <a
                href="https://www.ihemestudio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 hover:underline"
              >
                Iheme Studio
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
