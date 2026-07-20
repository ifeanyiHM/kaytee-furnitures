"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils/cn";
import { RiDashboardLine, RiShoppingBag2Line, RiCalendarLine, RiHeartLine, RiUserLine, RiMapPinLine, RiLogoutBoxLine } from "react-icons/ri";

const navItems = [
  { href: "/dashboard",  icon: RiDashboardLine,      label: "Dashboard" },
  { href: "/orders",     icon: RiShoppingBag2Line,    label: "My Orders" },
  { href: "/bookings",   icon: RiCalendarLine,        label: "My Bookings" },
  { href: "/wishlist",   icon: RiHeartLine,           label: "Wishlist" },
  { href: "/profile",    icon: RiUserLine,            label: "Profile" },
  { href: "/addresses",  icon: RiMapPinLine,          label: "Addresses" },
];

export function CustomerSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 shrink-0 hidden md:block">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}
            className={cn("flex items-center gap-3 px-3 py-2.5 rounded font-sans text-sm transition-colors",
              pathname === item.href ? "bg-brand-600 text-white" : "text-charcoal-muted hover:bg-sand-100 hover:text-charcoal")}>
            <item.icon className="w-4 h-4 shrink-0" />
            {item.label}
          </Link>
        ))}
        <button onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded font-sans text-sm text-charcoal-muted hover:bg-red-50 hover:text-red-600 transition-colors">
          <RiLogoutBoxLine className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </nav>
    </aside>
  );
}
