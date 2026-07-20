"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  RiMenuLine,
  RiCloseLine,
  RiShoppingBag2Line,
  RiUserLine,
  RiHeartLine,
} from "react-icons/ri";
import { cn } from "@/lib/utils/cn";
import { NAV_LINKS } from "@/lib/utils/constants";
import Image from "next/image";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isHome =
    pathname === "/" ||
    pathname === "/services" ||
    pathname === "/portfolio" ||
    pathname === "/about" ||
    pathname === "/privacy" ||
    pathname === "/terms";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = isHome && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md border-b border-sand-200 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]",
      )}
    >
      {/* Hairline brass accent — only shows once the header solidifies */}
      <div
        className={cn(
          "h-px w-full bg-linear-to-r from-transparent via-brand-400/50 to-transparent transition-opacity duration-500",
          isTransparent ? "opacity-0" : "opacity-100",
        )}
      />

      <div className="relative flex items-center justify-between h-20 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Logo — wordmark + brass rule + locale, single baseline */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0 group"
          aria-label="Kaytee Furnitures — Home"
        >
          <Image
            src="/images/logo.png"
            alt="Kaytee Furnitures"
            width={717}
            height={421}
            priority
            className={cn("h-12 w-auto transition-all duration-500")}
            style={{
              filter: isTransparent
                ? "none"
                : "sepia(100%) saturate(3000%) hue-rotate(340deg) brightness(30%)",
            }}
          />
        </Link>

        {/* Desktop nav — absolutely centered */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-[11px] font-medium tracking-[0.14em] uppercase transition-colors pb-1",
                "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:rounded-full after:transition-opacity after:duration-300",
                isTransparent
                  ? "text-white/85 hover:text-white after:bg-brand-300"
                  : "text-charcoal-muted hover:text-charcoal after:bg-brand-600",
                pathname === link.href
                  ? "after:opacity-100"
                  : "after:opacity-0 hover:after:opacity-60",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2">
          {/* <Link
            href="/wishlist"
            className={cn(
              "w-9 h-9 flex items-center justify-center transition-colors",
              isTransparent
                ? "text-white/75 hover:text-white"
                : "text-charcoal-muted hover:text-charcoal",
            )}
          >
            <RiHeartLine className="w-4.5 h-4.5" />
          </Link>
          <Link
            href="/cart"
            className={cn(
              "w-9 h-9 flex items-center justify-center transition-colors",
              isTransparent
                ? "text-white/75 hover:text-white"
                : "text-charcoal-muted hover:text-charcoal",
            )}
          >
            <RiShoppingBag2Line className="w-4.5 h-4.5" />
          </Link> */}
          <Link href="/consultation">
            <button
              className={cn(
                "text-[11px] font-medium tracking-[0.16em] uppercase px-5 py-2.5 rounded-sm ml-2 transition-all duration-200 cursor-pointer",
                isTransparent
                  ? "bg-white/10 text-white border border-white/25 hover:bg-white/20"
                  : "bg-brand-600 text-white hover:bg-brand-700",
              )}
            >
              Book a consultation
            </button>
          </Link>
        </div>

        {/* Mobile: icons + burger */}
        <div className="flex lg:hidden items-center gap-1">
          {/* <Link
            href="/wishlist"
            className={cn(
              "w-9 h-9 flex items-center justify-center transition-colors",
              isTransparent
                ? "text-white/80 hover:text-white"
                : "text-charcoal-muted hover:text-charcoal",
            )}
          >
            <RiHeartLine className="w-5 h-5" />
          </Link>
          <Link
            href="/cart"
            className={cn(
              "w-9 h-9 flex items-center justify-center transition-colors",
              isTransparent
                ? "text-white/80 hover:text-white"
                : "text-charcoal-muted hover:text-charcoal",
            )}
          >
            <RiShoppingBag2Line className="w-5 h-5" />
          </Link> */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "w-9 h-9 flex items-center justify-center transition-colors ml-1",
              isTransparent ? "text-white" : "text-charcoal",
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <RiCloseLine className="w-5 h-5" />
            ) : (
              <RiMenuLine className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-sand-200">
          <nav className="max-w-7xl mx-auto px-6 py-5 space-y-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-3 text-sm font-light tracking-[0.08em] uppercase transition-colors rounded-sm",
                  pathname === link.href
                    ? "text-brand-600 bg-brand-50"
                    : "text-charcoal-muted hover:text-charcoal hover:bg-sand-100",
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="w-1 h-1 rounded-full bg-brand-500" />
                )}
              </Link>
            ))}

            <Link href="/consultation" onClick={() => setOpen(false)}>
              <button className="w-full bg-brand-600 hover:bg-brand-700 text-white text-[12px] tracking-widest uppercase font-light py-3 rounded-sm transition-colors">
                Book a consultation
              </button>
            </Link>

            {/* <div className="pt-4 mt-4 border-t border-sand-200 space-y-2">
              {session ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <button className="w-full text-left px-3 py-3 text-sm font-light tracking-[0.08em] uppercase text-charcoal-muted hover:text-charcoal flex items-center gap-2">
                      <RiUserLine className="w-4 h-4" /> My Account
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                    className="w-full text-left px-3 py-3 text-sm font-light tracking-[0.08em] uppercase text-charcoal-muted hover:text-charcoal"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <button className="w-full border border-sand-300 text-charcoal text-[12px] tracking-widest uppercase font-light py-3 rounded-sm hover:bg-sand-100 transition-colors">
                      Sign in
                    </button>
                  </Link>
                  <Link href="/consultation" onClick={() => setOpen(false)}>
                    <button className="w-full bg-brand-600 hover:bg-brand-700 text-white text-[12px] tracking-widest uppercase font-light py-3 rounded-sm transition-colors">
                      Book a consultation
                    </button>
                  </Link>
                </>
              )}
            </div> */}
          </nav>
        </div>
      )}
    </header>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { usePathname } from "next/navigation";
// import {
//   RiMenuLine,
//   RiCloseLine,
//   RiShoppingBag2Line,
//   RiUserLine,
//   RiHeartLine,
// } from "react-icons/ri";
// import { cn } from "@/lib/utils/cn";
// import { NAV_LINKS } from "@/lib/utils/constants";

// export function Header() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const { data: session } = useSession();
//   const pathname = usePathname();
//   const isHome = pathname === "/";

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const isTransparent = isHome && !scrolled && !open;

//   return (
//     <header
//       className={cn(
//         "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
//         isTransparent
//           ? "bg-transparent border-b border-white/10"
//           : "bg-white/97 backdrop-blur-md border-b border-sand-200",
//       )}
//     >
//       <div className="relative flex items-center justify-between h-18 max-w-7xl mx-auto px-6 lg:px-10">
//         {/* Logo */}
//         <Link href="/" className="flex flex-col leading-none shrink-0 group">
//           <span
//             className={cn(
//               "font-display text-[22px] font-light tracking-[0.04em] transition-colors",
//               isTransparent ? "text-white" : "text-charcoal",
//             )}
//           >
//             Kaytee Furnitures
//           </span>
//           <span
//             className={cn(
//               "text-[9px] tracking-[0.22em] uppercase font-light transition-colors",
//               isTransparent ? "text-white/45" : "text-charcoal-muted",
//             )}
//           >
//             Lagos, Nigeria
//           </span>
//         </Link>

//         {/* Desktop nav — absolutely centered */}
//         <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-9">
//           {NAV_LINKS.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={cn(
//                 "relative text-[12px] font-nornal tracking-[0.12em] uppercase transition-colors pb-0.5",
//                 "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:rounded-full after:transition-opacity",
//                 isTransparent
//                   ? "text-white hover:text-white after:bg-brand-400"
//                   : "text-charcoal-muted hover:text-charcoal after:bg-brand-500",
//                 pathname === link.href
//                   ? isTransparent
//                     ? "text-white after:opacity-100"
//                     : "text-charcoal after:opacity-100"
//                   : "after:opacity-0",
//               )}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         <Link href="/consultation">
//           <button
//             className={cn(
//               "text-[11px] font-normal tracking-widest uppercase px-5 py-2.5 rounded-sm ml-1 transition-all duration-200",
//               isTransparent
//                 ? "bg-brand-600/70 text-white border border-white/20 hover:bg-brand-600"
//                 : "bg-brand-600 text-white hover:bg-brand-700",
//             )}
//           >
//             Book a consultation
//           </button>
//         </Link>

//         {/* Desktop actions */}
//         {/* <div className="hidden lg:flex items-center gap-1">
//           <Link
//             href="/wishlist"
//             className={cn(
//               "w-9 h-9 flex items-center justify-center rounded-full transition-colors",
//               isTransparent
//                 ? "text-white/75 hover:text-white"
//                 : "text-charcoal-muted hover:text-charcoal",
//             )}
//           >
//             <RiHeartLine className="w-4.5 h-4.5" />
//           </Link>
//           <Link
//             href="/cart"
//             className={cn(
//               "w-9 h-9 flex items-center justify-center rounded-full transition-colors",
//               isTransparent
//                 ? "text-white/75 hover:text-white"
//                 : "text-charcoal-muted hover:text-charcoal",
//             )}
//           >
//             <RiShoppingBag2Line className="w-4.5 h-4.5" />
//           </Link>

//           <div
//             className={cn(
//               "w-px h-4.5 mx-2",
//               isTransparent ? "bg-white/20" : "bg-sand-300",
//             )}
//           />

//           {session ? (
//             <>
//               <Link href="/dashboard">
//                 <button
//                   className={cn(
//                     "flex items-center gap-1.5 text-[11px] font-light tracking-[0.12em] uppercase px-3 py-2 transition-colors",
//                     isTransparent
//                       ? "text-white/75 hover:text-white"
//                       : "text-charcoal-muted hover:text-charcoal",
//                   )}
//                 >
//                   <RiUserLine className="w-4 h-4" />
//                   Account
//                 </button>
//               </Link>
//               <button
//                 onClick={() => signOut()}
//                 className={cn(
//                   "text-[11px] font-light tracking-[0.12em] uppercase px-3 py-2 transition-colors",
//                   isTransparent
//                     ? "text-white/75 hover:text-white"
//                     : "text-charcoal-muted hover:text-charcoal",
//                 )}
//               >
//                 Sign out
//               </button>
//             </>
//           ) : (
//             <>
//               <Link href="/login">
//                 <button
//                   className={cn(
//                     "text-[11px] font-light tracking-[0.12em] uppercase px-3 py-2 transition-colors",
//                     isTransparent
//                       ? "text-white/75 hover:text-white"
//                       : "text-charcoal-muted hover:text-charcoal",
//                   )}
//                 >
//                   Sign in
//                 </button>
//               </Link>
//               <Link href="/consultation">
//                 <button
//                   className={cn(
//                     "text-[11px] font-normal tracking-widest uppercase px-5 py-2.5 rounded-sm ml-1 transition-all duration-200",
//                     isTransparent
//                       ? "bg-brand-600/70 text-white border border-white/20 hover:bg-brand-600"
//                       : "bg-brand-600 text-white hover:bg-brand-700",
//                   )}
//                 >
//                   Book a consultation
//                 </button>
//               </Link>
//             </>
//           )}
//         </div> */}

//         {/* Mobile: icons + burger */}
//         <div className="flex lg:hidden items-center gap-1">
//           <Link
//             href="/wishlist"
//             className={cn(
//               "w-9 h-9 flex items-center justify-center transition-colors",
//               isTransparent
//                 ? "text-white/80 hover:text-white"
//                 : "text-charcoal-muted hover:text-charcoal",
//             )}
//           >
//             <RiHeartLine className="w-5 h-5" />
//           </Link>
//           <Link
//             href="/cart"
//             className={cn(
//               "w-9 h-9 flex items-center justify-center transition-colors",
//               isTransparent
//                 ? "text-white/80 hover:text-white"
//                 : "text-charcoal-muted hover:text-charcoal",
//             )}
//           >
//             <RiShoppingBag2Line className="w-5 h-5" />
//           </Link>
//           <button
//             onClick={() => setOpen(!open)}
//             className={cn(
//               "w-9 h-9 flex items-center justify-center transition-colors ml-1",
//               isTransparent ? "text-white" : "text-charcoal",
//             )}
//           >
//             {open ? (
//               <RiCloseLine className="w-5 h-5" />
//             ) : (
//               <RiMenuLine className="w-5 h-5" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {open && (
//         <div className="lg:hidden bg-white border-t border-sand-200">
//           <nav className="max-w-7xl mx-auto px-6 py-5 space-y-0.5">
//             {NAV_LINKS.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setOpen(false)}
//                 className={cn(
//                   "flex items-center justify-between px-3 py-3 text-sm font-light tracking-[0.08em] uppercase transition-colors rounded-sm",
//                   pathname === link.href
//                     ? "text-brand-600 bg-brand-50"
//                     : "text-charcoal-muted hover:text-charcoal hover:bg-sand-100",
//                 )}
//               >
//                 {link.label}
//                 {pathname === link.href && (
//                   <span className="w-1 h-1 rounded-full bg-brand-500" />
//                 )}
//               </Link>
//             ))}

//             <div className="pt-4 mt-4 border-t border-sand-200 space-y-2">
//               {session ? (
//                 <>
//                   <Link href="/dashboard" onClick={() => setOpen(false)}>
//                     <button className="w-full text-left px-3 py-3 text-sm font-light tracking-[0.08em] uppercase text-charcoal-muted hover:text-charcoal flex items-center gap-2">
//                       <RiUserLine className="w-4 h-4" /> My Account
//                     </button>
//                   </Link>
//                   <button
//                     onClick={() => {
//                       signOut();
//                       setOpen(false);
//                     }}
//                     className="w-full text-left px-3 py-3 text-sm font-light tracking-[0.08em] uppercase text-charcoal-muted hover:text-charcoal"
//                   >
//                     Sign out
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link href="/login" onClick={() => setOpen(false)}>
//                     <button className="w-full border border-sand-300 text-charcoal text-[12px] tracking-widest uppercase font-light py-3 rounded-sm hover:bg-sand-100 transition-colors">
//                       Sign in
//                     </button>
//                   </Link>
//                   <Link href="/consultation" onClick={() => setOpen(false)}>
//                     <button className="w-full bg-brand-600 hover:bg-brand-700 text-white text-[12px] tracking-widest uppercase font-light py-3 rounded-sm transition-colors">
//                       Book a consultation
//                     </button>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }
