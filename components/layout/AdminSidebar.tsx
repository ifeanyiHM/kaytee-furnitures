"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils/cn";
import {
  RiDashboardLine, RiShoppingBag2Line, RiGridLine, RiCalendarLine,
  RiImageLine, RiArticleLine, RiUserLine, RiStarLine, RiMailLine,
  RiSettings3Line, RiLogoutBoxLine, RiStoreLine
} from "react-icons/ri";

const navGroups = [
  {
    label: "Overview",
    items: [{ href: "/admin", icon: RiDashboardLine, label: "Dashboard" }],
  },
  {
    label: "Catalogue",
    items: [
      { href: "/admin/products",   icon: RiStoreLine,         label: "Products" },
      { href: "/admin/categories", icon: RiGridLine,          label: "Categories" },
    ],
  },
  {
    label: "Commerce",
    items: [
      { href: "/admin/orders",   icon: RiShoppingBag2Line, label: "Orders" },
      { href: "/admin/bookings", icon: RiCalendarLine,     label: "Bookings" },
      { href: "/admin/customers", icon: RiUserLine,        label: "Customers" },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/portfolio",     icon: RiImageLine,   label: "Portfolio" },
      { href: "/admin/blog",          icon: RiArticleLine, label: "Blog" },
      { href: "/admin/testimonials",  icon: RiStarLine,    label: "Testimonials" },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/inquiries", icon: RiMailLine,       label: "Inquiries" },
      { href: "/admin/settings",  icon: RiSettings3Line,  label: "Settings" },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 shrink-0 hidden lg:flex flex-col bg-charcoal min-h-screen">
      <div className="p-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-600 rounded flex items-center justify-center">
            <span className="text-white font-display font-semibold text-xs">L</span>
          </div>
          <span className="font-display text-white text-base font-semibold">Admin</span>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-5 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="font-sans text-[10px] text-white/30 uppercase tracking-widest mb-2 px-3">{group.label}</p>
            {group.items.map((item) => (
              <Link key={item.href} href={item.href}
                className={cn("flex items-center gap-3 px-3 py-2 rounded font-sans text-sm transition-colors mb-0.5",
                  pathname === item.href ? "bg-brand-600 text-white" : "text-white/50 hover:bg-white/5 hover:text-white")}>
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2 rounded font-sans text-sm text-white/40 hover:bg-white/5 hover:text-white transition-colors">
          <RiLogoutBoxLine className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
