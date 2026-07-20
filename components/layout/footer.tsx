import Link from "next/link";
import Image from "next/image";
import {
  RiInstagramLine,
  RiTwitterXLine,
  RiFacebookBoxLine,
  RiPinterestLine,
  RiArrowRightLine,
  RiMapPin2Line,
  RiPhoneLine,
  RiMailLine,
} from "react-icons/ri";
import { NewsletterForm } from "../forms/NewsLetterForm";
import { cn } from "@/lib/utils/cn";

const NAV = {
  Services: [
    { href: "/services#interior-design", label: "Interior Design" },
    { href: "/services#space-planning", label: "Space Planning" },
    { href: "/services#furniture-procurement", label: "Furniture Procurement" },
    { href: "/services#virtual-consultation", label: "Virtual Consultation" },
    { href: "/services#renovation-management", label: "Renovation Management" },
  ],
  Explore: [
    { href: "/portfolio", label: "Portfolio" },
    // { href: "/shop", label: "Shop furniture" },
    // { href: "/blog", label: "Design journal" },
    { href: "/about", label: "Our story" },
    { href: "/services", label: "Our services" },
  ],
  Client: [
    { href: "/consultation", label: "Book a consultation" },
    // { href: "/dashboard", label: "My account" },
    // { href: "/orders", label: "Track my order" },
    { href: "/contact", label: "Get in touch" },
    { href: "/faq", label: "FAQ" },
  ],
};

const SOCIALS = [
  {
    href: "https://www.instagram.com/kayteefurnitureandinteriors?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    Icon: RiInstagramLine,
    label: "Instagram",
  },
  { href: "https://twitter.com", Icon: RiTwitterXLine, label: "X (Twitter)" },
  { href: "https://facebook.com", Icon: RiFacebookBoxLine, label: "Facebook" },
  { href: "https://pinterest.com", Icon: RiPinterestLine, label: "Pinterest" },
];

const CONTACT = [
  { Icon: RiMapPin2Line, value: "14 Design Blvd, Victoria Island, Lagos" },
  { Icon: RiPhoneLine, value: "+234 801 234 5678" },
  { Icon: RiMailLine, value: "hello@kayteefurnitures.com" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white overflow-hidden">
      {/* ── Top band: newsletter ── */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-sm">
              <p className="font-display text-xl text-white mb-1">
                Stay in the loop.
              </p>
              <p className="font-sans text-sm text-white/40 leading-relaxed">
                Design inspiration, project reveals, and studio news — straight
                to your inbox.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 lg:gap-8">
          {/* Brand column */}
          <div>
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 mb-6 group"
              aria-label="Kaytee Furnitures — Home"
            >
              <Image
                src="/images/logo.png"
                alt="Kaytee Furnitures"
                width={717}
                height={421}
                priority
                className={cn("h-12 w-auto transition-all duration-500")}
              />
            </Link>

            {/* Contact details */}
            <div className="space-y-3 mb-8">
              {CONTACT.map(({ Icon, value }) => (
                <div key={value} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                  <p className="font-sans text-xs text-white/40 leading-relaxed">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-brand-400 hover:bg-brand-600/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(NAV).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-sans text-[10px] font-semibold tracking-[0.24em] uppercase text-brand-400 mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => {
                  // Items pointing at a hash on /services are same-page
                  // anchor jumps wearing a URL. next/link updates the URL
                  // via the History API directly and never fires a native
                  // `hashchange` event — which is what the services
                  // accordion listens for to know which panel to open.
                  // That's true whether you arrive via a fresh page load,
                  // an in-page click, or a browser-back then click, since
                  // Next can reuse an already-mounted /services instance
                  // in any of those cases. A plain <a> always goes through
                  // the browser's real navigation/hash path, so it behaves
                  // consistently no matter how you arrive at it.
                  const isHashLink = item.href.includes("#");

                  return (
                    <li key={item.href}>
                      {isHashLink ? (
                        <a
                          href={item.href}
                          className="group inline-flex items-center gap-1.5 font-sans text-sm text-white/45 hover:text-white transition-colors"
                        >
                          <span className="w-0 group-hover:w-3 h-px bg-brand-400 transition-all duration-200 shrink-0" />
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="group inline-flex items-center gap-1.5 font-sans text-sm text-white/45 hover:text-white transition-colors"
                        >
                          <span className="w-0 group-hover:w-3 h-px bg-brand-400 transition-all duration-200 shrink-0" />
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/25">
            © {new Date().getFullYear()} Kaytee Furnitures Ltd. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Use" },
              // { href: "/cookies", label: "Cookie Settings" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-sans text-xs text-white/25 hover:text-white/60 transition-colors"
              >
                {label}
              </Link>
            ))}
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.78rem",
              }}
              className="font-sans text-xs text-white/25 hover:text-white/60 transition-colors"
            >
              Website by
              <a
                href="https://ihemestudio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
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
