# Luxe Interiors — Premium Interior Design & Furniture Platform

A production-ready, full-stack web platform combining a corporate website, portfolio showcase, consultation booking, and e-commerce store.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **Database**: MongoDB + Mongoose
- **Auth**: NextAuth.js v5 (Google OAuth + Email/Password)
- **Payments**: Paystack
- **Media**: Cloudinary
- **Email**: Resend
- **Icons**: React Icons

## Quick Start

### 1. Clone and install

```bash
cd luxe-interiors
npm install
```

### 2. Set up environment variables

Copy `.env.local` and fill in your credentials:

```bash
DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/luxe-interiors"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

GOOGLE_CLIENT_ID="from-google-cloud-console"
GOOGLE_CLIENT_SECRET="from-google-cloud-console"

CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"

PAYSTACK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_..."

RESEND_API_KEY="re_..."
FROM_EMAIL="hello@yourdomain.com"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
ADMIN_EMAIL="admin@yourdomain.com"
```

### 3. Create your first admin user

After starting the app, register a normal account, then update the role in MongoDB:

```js
// MongoDB shell or Compass
db.users.updateOne({ email: "admin@yourdomain.com" }, { $set: { role: "ADMIN" } })
```

### 4. Run development server

```bash
npm run dev
```

### 5. Seed initial data (optional)

Add services via the Admin → Settings panel or directly in MongoDB:

```js
db.services.insertMany([
  { name: "Interior Design", slug: "interior-design", description: "Full-service design...", features: ["Consultation", "3D renders", "Project management"], active: true, order: 1 },
  { name: "Virtual Consultation", slug: "virtual-consultation", description: "Online design advice...", features: ["Video call", "Mood board", "Product list"], active: true, order: 2 }
])
```

## Project Structure

```
luxe-interiors/
├── app/
│   ├── (public)/          # Visitor-facing pages
│   ├── (auth)/            # Login / Register
│   ├── (customer)/        # Authenticated customer dashboard
│   ├── (admin)/           # Admin dashboard (/admin/*)
│   ├── api/               # API routes (auth, webhooks, upload)
│   ├── cart/              # Shopping cart
│   └── checkout/          # Checkout + success
├── components/
│   ├── ui/                # Design system primitives
│   ├── layout/            # Header, Footer, Sidebars
│   ├── home/              # Homepage sections
│   ├── shop/              # Product cards, cart, checkout
│   ├── portfolio/         # Portfolio grid and cards
│   ├── blog/              # Blog cards
│   ├── booking/           # Consultation booking form
│   ├── forms/             # Auth, contact, profile forms
│   └── admin/             # Admin-specific components
├── actions/               # Server Actions
├── lib/
│   ├── models/            # Mongoose models
│   ├── utils/             # Helpers (format, cn, constants)
│   └── validations/       # Zod schemas
└── types/                 # TypeScript interfaces
```

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, services, portfolio, products, testimonials |
| `/about` | About page with team and values |
| `/services` | All design services |
| `/portfolio` | Filterable portfolio grid |
| `/portfolio/[slug]` | Portfolio case study |
| `/shop` | Product catalogue with search + filter |
| `/shop/[slug]` | Product detail with add to cart |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post |
| `/consultation` | 2-step consultation booking |
| `/contact` | Contact form |
| `/cart` | Shopping cart |
| `/checkout` | Checkout with Paystack |
| `/dashboard` | Customer dashboard |
| `/orders` | Customer order history |
| `/bookings` | Customer booking history |
| `/wishlist` | Saved products |
| `/admin` | Admin dashboard |
| `/admin/products` | Product management |
| `/admin/orders` | Order management |
| `/admin/bookings` | Booking management |
| `/admin/portfolio` | Portfolio management |
| `/admin/blog` | Blog management |
| `/admin/customers` | Customer list |
| `/admin/testimonials` | Testimonial management |
| `/admin/inquiries` | Contact inquiry management |

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set all environment variables in the Vercel dashboard.

### Paystack Webhook

In your Paystack dashboard, set the webhook URL to:
```
https://yourdomain.com/api/webhooks/paystack
```

## Design System

- **Font**: Cormorant Garamond (display) + Inter (body)
- **Primary**: `brand-600` (#8C6A3F) — warm brown gold
- **Background**: `sand-50` (#FDFAF6) — warm off-white
- **Text**: `charcoal` (#1C1917) — near-black

## License

MIT
