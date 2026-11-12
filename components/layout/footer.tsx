import { Reveal } from "@/components/motion/Reveal";
import Image from "next/image";
import Link from "next/link";
import {
  RiArrowRightUpLine,
  RiInstagramLine,
  RiMailLine,
  RiMapPin2Line,
  RiPhoneLine,
  RiTiktokFill,
} from "react-icons/ri";

const NAV = {
  Explore: [
    { href: "/about", label: "About the studio" },
    { href: "/services", label: "Interior design" },
    { href: "/portfolio", label: "Selected work" },
    { href: "/contact", label: "Contact" },
  ],
  Projects: [
    { href: "/consultation", label: "Start a project" },
    { href: "/portfolio", label: "View the portfolio" },
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
      <section className="site-container pt-16 sm:pt-20 xl1:pt-24 xl3:pt-32">
        <Reveal>
          <div className="relative overflow-hidden bg-sand-100 px-6 py-12 text-charcoal sm:px-10 sm:py-16 lg:px-14 lg:py-20 xl3:px-20 xl3:py-24">
            {/* Decorative detail */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-brand-400/20 sm:-right-20 sm:-top-32 sm:h-96 sm:w-96"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-16 h-48 w-48 rounded-full border border-brand-400/20 sm:-right-10 sm:-top-24 sm:h-72 sm:w-72"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.5fr_0.7fr] lg:items-end lg:gap-16">
              <div>
                <p className="site-kicker mb-6 flex items-center gap-3 text-brand-600">
                  <span className="h-px w-8 bg-brand-500" />
                  Have a space in mind?
                </p>

                <h2 className="display-page max-w-[13ch] text-charcoal">
                  Let&apos;s make somewhere feel like yours.
                </h2>
              </div>

              <div className="max-w-sm lg:justify-self-end">
                <p className="mb-7 font-sans text-sm leading-7 text-charcoal-muted sm:text-base">
                  Every considered space begins with a conversation. Tell us
                  what you have in mind, and let&apos;s explore what we can
                  create together.
                </p>

                <Link
                  href="/consultation"
                  className="group inline-flex min-h-14 w-full items-center justify-between gap-6 bg-charcoal px-6 py-4 font-sans text-sm font-medium text-white transition-colors duration-300 hover:bg-brand-800 sm:w-auto sm:min-w-64"
                >
                  <span>Start a conversation</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
                    <RiArrowRightUpLine className="h-4 w-4" />
                  </span>
                </Link>

                <p className="mt-4 font-sans text-xs text-charcoal-muted">
                  No pressure. Just a conversation about your space.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Main footer */}
      <div className="site-container pb-8 pt-20 sm:pt-24 xl3:pb-10 xl3:pt-28">
        <div className="grid gap-14 border-b border-white/10 pb-14 lg:grid-cols-[1.35fr_0.7fr_0.7fr_1fr] lg:gap-12 xl3:gap-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="Kaytee Furnitures & Interior — Home"
              className="mb-5 inline-flex"
            >
              <Image
                src="/images/kaytee_logo.png"
                alt="Kaytee Furnitures & Interior"
                width={717}
                height={421}
                className="h-12 w-auto object-contain xl3:h-14"
              />
            </Link>

            <p className="max-w-xs font-sans text-sm leading-7 text-white/50 xl3:text-base">
              Thoughtful interior design, shaped around the way you live and the
              spaces you call home.
            </p>

            <div className="mt-8">
              <p className="site-label mb-4 text-brand-400">Follow our work</p>

              <div className="flex gap-3">
                {SOCIALS.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${label}`}
                    className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/60 transition-all duration-300 hover:border-brand-400 hover:bg-brand-400 hover:text-charcoal"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          {Object.entries(NAV).map(([title, items]) => (
            <nav key={title} aria-label={title}>
              <h2 className="site-label mb-6 text-brand-400">{title}</h2>

              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={`${title}-${item.href}`}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 font-sans text-sm text-white/55 transition-colors duration-300 hover:text-white"
                    >
                      <span>{item.label}</span>
                      <RiArrowRightUpLine className="h-3.5 w-3.5 -translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-70" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Studio details */}
          <div>
            <h2 className="site-label mb-6 text-brand-400">
              Visit or get in touch
            </h2>

            <div className="space-y-5 font-sans text-sm leading-6 text-white/55">
              <a
                href="https://maps.google.com/?q=22+Oremerin+Itire+Surulere+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 transition-colors hover:text-white"
              >
                <RiMapPin2Line className="mt-1 h-4 w-4 shrink-0 text-brand-400" />
                <span>
                  22 Oremerin, Itire,
                  <br />
                  Surulere, Lagos
                </span>
              </a>

              <a
                href="tel:+2348079197554"
                className="group flex items-center gap-3 transition-colors hover:text-white"
              >
                <RiPhoneLine className="h-4 w-4 shrink-0 text-brand-400" />
                <span>+234 807 919 7554</span>
              </a>

              <a
                href="mailto:kayteefurnitureandinterior@gmail.com"
                className="group flex items-start gap-3 break-all transition-colors hover:text-white"
              >
                <RiMailLine className="mt-1 h-4 w-4 shrink-0 text-brand-400" />
                <span>kayteefurnitureandinterior@gmail.com</span>
              </a>
            </div>

            <div className="mt-7 border-t border-white/10 pt-5">
              <p className="site-label mb-2 text-brand-400">Studio hours</p>
              <p className="font-sans text-sm text-white/55">
                Monday – Friday
                <br />
                9am – 5pm WAT
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs leading-5 text-white/35">
            © {new Date().getFullYear()} Kaytee Furnitures &amp; Interior. All
            rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 font-sans text-xs text-white/35">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Use
            </Link>

            <span>
              Website by{" "}
              <a
                href="https://www.ihemestudio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-brand-300"
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
