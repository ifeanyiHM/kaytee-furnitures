export const SITE_NAME = "Luxe Interiors";
export const SITE_DESCRIPTION = "Premium interior design & furniture studio";
export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  // { href: "/shop", label: "Shop" },
  // { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Dining Room",
  "Home Office",
  "Bathroom",
  "Commercial",
];

export const PRODUCT_SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "featured", label: "Featured" },
];

export const BUDGET_RANGES = [
  "Under ₦2M",
  "₦2M – ₦5M",
  "₦5M – ₦10M",
  "₦10M – ₦20M",
  "Above ₦20M",
  "Let's discuss",
];

export const SPACE_SIZES = [
  "Studio / 1-bed",
  "2–3 bedroom",
  "4+ bedroom",
  "Commercial space",
  "Office space",
];

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  REVIEWED: "Reviewed",
  ACCEPTED: "Accepted",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const FREE_SHIPPING_THRESHOLD = 200000; // ₦200,000
export const SHIPPING_COST = 15000; // ₦15,000
export const TAX_RATE = 0.075; // 7.5% VAT
