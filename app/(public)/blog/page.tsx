import type { Metadata } from "next";
import { getBlogPosts } from "@/actions/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Pagination } from "@/components/ui/pagination";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Interior design inspiration, tips, and trend reports from the Luxe Interiors team.",
};

const placeholderPosts = [
  {
    _id: "1",
    title: "10 Ways to Make a Small Living Room Feel Larger",
    slug: "small-living-room-tips",
    excerpt:
      "Strategic furniture placement, lighting tricks, and colour choices that expand your space visually.",
    coverImage:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    authorId: "",
    status: "PUBLISHED" as const,
    featured: true,
    tags: [],
    category: "Tips & Advice",
    readTime: 6,
    publishedAt: "2024-11-01",
    createdAt: "",
    updatedAt: "",
    content: "",
  },
  {
    _id: "2",
    title: "The Rise of Biophilic Design in Nigerian Homes",
    slug: "biophilic-design-nigeria",
    excerpt:
      "How bringing nature indoors is transforming urban living spaces across Lagos and Abuja.",
    coverImage:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    authorId: "",
    status: "PUBLISHED" as const,
    featured: false,
    tags: [],
    category: "Trends",
    readTime: 8,
    publishedAt: "2024-10-15",
    createdAt: "",
    updatedAt: "",
    content: "",
  },
  {
    _id: "3",
    title: "Choosing the Perfect Sofa: A Complete Guide",
    slug: "perfect-sofa-guide",
    excerpt:
      "From fabric to frame, everything you need to know before investing in your next sofa.",
    coverImage:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    authorId: "",
    status: "PUBLISHED" as const,
    featured: false,
    tags: [],
    category: "Buying Guides",
    readTime: 10,
    publishedAt: "2024-09-20",
    createdAt: "",
    updatedAt: "",
    content: "",
  },
];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const {
    data: posts,
    total,
    pages,
  } = await getBlogPosts({ page, limit: 9, category: sp.category }).catch(
    () => ({
      data: placeholderPosts,
      total: placeholderPosts.length,
      pages: 1,
    }),
  );
  const display = posts.length > 0 ? posts : placeholderPosts;

  return (
    <>
      <section className="pt-32 pb-12 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-xs text-brand-400 tracking-[0.25em] uppercase mb-4">
            Ideas &amp; inspiration
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-white mb-6">
            Design journal
          </h1>
          <p className="font-sans text-white/60 text-lg max-w-lg mx-auto">
            Tips, trends, and behind-the-scenes stories from our studio.
          </p>
        </div>
      </section>

      <section className="py-16 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {display.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
          <Pagination page={page} pages={pages} total={total} />
        </div>
      </section>
    </>
  );
}
