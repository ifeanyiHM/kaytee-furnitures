# Kaytee Furnitures & Interior — Portfolio Website

A portfolio website for a furniture manufacturing and interior design studio in Lagos. No accounts, no shop, no database.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Motion**: motion + Lenis smooth scroll
- **Forms**: react-hook-form + Zod
- **Email**: Nodemailer (SMTP) for contact-form enquiries
- **Icons**: React Icons

## Quick Start

```bash
npm install
npm run dev
```

### Environment variables

```bash
# Contact form email (lib/email.ts)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_SECURE="true"
SMTP_USER="you@example.com"
SMTP_PASS="app-password"
ADMIN_EMAIL="where-enquiries-should-arrive@example.com"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Chat widget (app/api/chat, lib/ai)
AI_PROVIDER="gemini"
GEMINI_API_KEY="..."   # or the key for whichever provider you pick

# Chat widget "email me this" (app/api/email)
GMAIL_USER="..."
GMAIL_APP_PASSWORD="..."
```

## Content

Projects live in `lib/portfolio-data.ts` (`PORTFOLIO_PROJECTS`), in display order. Set `featured: true` to show a project on the home page. Services are defined in `lib/services-data.ts` and used by both `/services` and the `/consultation` form. `lib/portfolio.ts` provides the read helpers used by the pages.

## Structure

```
app/
├── (public)/      # Home, About, Services, Portfolio (+ [slug]), Contact, Consultation, Privacy, Terms
└── api/           # chat, email, export (chat widget)
components/        # home, layout, motion, portfolio, services, booking, forms, ui, legal
actions/           # inquiries.ts (contact), bookings.ts (consultation) — email only
lib/               # portfolio.ts, portfolio-data.ts, email.ts, ai/, utils/, validations/
types/
```
