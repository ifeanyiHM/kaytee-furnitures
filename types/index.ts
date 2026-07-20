import { ReactNode } from "react";

export interface ProductType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  sku?: string;
  stock: number;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  featured: boolean;
  images: string[];
  categoryId: string;
  category?: CategoryType;
  tags: string[];
  materials: string[];
  colors: string[];
  metaTitle?: string;
  metaDesc?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
}

export interface CartItemType {
  productId: string;
  product?: ProductType;
  quantity: number;
  color?: string;
}

export interface CartType {
  _id: string;
  items: CartItemType[];
}

export interface OrderItemType {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
}

export interface OrderType {
  _id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: AddressType;
  items: OrderItemType[];
  createdAt: string;
}

export interface AddressType {
  _id?: string;
  label?: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  phone?: string;
  isDefault?: boolean;
}

export interface ServiceType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  features: string[];
  priceFrom?: number;
  duration?: string;
  image?: string;
  active: boolean;
  order: number;
}

export interface BookingType {
  _id: string;
  serviceId: string;
  service?: ServiceType;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  budget?: string;
  spaceSize?: string;
  description: string;
  createdAt: string;
}

export interface PortfolioMedia {
  type: "image" | "video";
  src: string;
  poster?: string; // thumbnail/fallback image for videos
  caption?: string;
  span?: "full" | "half"; // layout hint — "full" spans 2 columns
}

export interface PortfolioBeforeAfter {
  before: PortfolioMedia;
  after: PortfolioMedia;
  label?: string;
}

// A single media file — image or video, used inside either the "before"
// or "after" array. `poster` is only relevant for videos (thumbnail frame).
export type MediaFile = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
};

export type PortfolioItemType = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  location?: string;
  year?: number;
  style?: string;
  area?: string;
  duration?: string;
  client?: string;
  description: string;
  tags: string[];
  featured?: boolean;
  challenge?: string;
  solution?: string;
  highlights?: string[];

  // Replaces coverImage / coverVideo / images / media / beforeAfter.
  // Every file for this project lives in one of these two arrays —
  // no separate "cover" concept, no separate gallery array.
  media: {
    before: MediaFile[];
    after: MediaFile[];
  };
};

export interface BlogPostType {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  authorId: string;
  author?: UserType;
  status: string;
  featured: boolean;
  tags: string[];
  category?: string;
  readTime?: number;
  metaTitle?: string;
  metaDesc?: string;
  publishedAt?: string;
  createdAt: string;
}

export interface TestimonialType {
  projectRef: string;
  _id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
  featured: boolean;
  approved: boolean;
}

export interface InquiryType {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  adminReply?: string;
  createdAt: string;
}

export interface UserType {
  _id: string;
  name?: string;
  email: string;
  image?: string;
  phone?: string;
  role: "CUSTOMER" | "ADMIN";
  createdAt: string;
}

export interface NotificationType {
  _id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pages: number;
}

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
