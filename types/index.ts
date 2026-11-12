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
  category: string[];
  location?: string;
  year?: number;
  style?: string;
  area?: string;
  duration?: string;
  client?: string;
  description: string;
  tags: string[];
  featured?: boolean;
  published?: boolean;
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
