# AGENTS.md — ARX Infotech Website

Agent instructions for working in this repository.

---

## Project Overview

**ARX Infotech** — IT services & tech solutions company, Kolkata, India.
Live site: `https://arxinfo.tech`

**Migration status:** Rebuild from static HTML/PHP → Next.js 15 (App Router) + Prisma + MySQL. Complete.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15.5 (App Router, Turbopack) |
| Runtime | Node.js 22 (ESM) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 (primary) |
| Fonts | Poppins (headings) + Inter (body) via `next/font/google` |
| Animations | Framer Motion 12 + AOS |
| State | React hooks (useState, useEffect) |
| Forms | React Hook Form 7 |
| DB | MySQL via Prisma 6 ORM |
| Dark mode | next-themes (default: light, persisted via class on `<html>`) |
| Icons | Lucide React |

---

## Build Phases

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Project setup: Next.js init, Tailwind, Prisma, layout, global components | ✅ Done |
| 2 | MySQL schema + db push + seed | ✅ Done |
| 3 | Home page (all sections) | ✅ Done |
| 4 | About, Services, Contact, Verify pages + API routes | ✅ Done |
| 5 | Team, Portfolio, Blog, FAQ pages | ✅ Done |
| 6 | Exam module — integrate external voucher-based exam site | 🔗 External |
| 7 | Exam admin dashboard — part of external exam site | 🔗 External |
| 8 | API routes (contact, verify) | ✅ Done |
| 9 | Final polish: animations, SEO metadata, sitemap, robots, 404, loading | ✅ Done |
| 10 | Admin dashboard — auth + overview + per-section CRUD | 🔨 In Progress |

---

## Project Structure

```
arxinfo.tech/
├── app/
│   ├── globals.css                    # Tailwind base + custom utilities
│   ├── layout.tsx                     # Root layout — fonts, JSON-LD, AOSInit, Navbar, Footer
│   ├── page.tsx                       # Home page — 8 section components
│   ├── not-found.tsx                  # Custom 404: navy bg, gold 404, back-home + contact
│   ├── loading.tsx                    # Global loading: gold spinner
│   ├── sitemap.ts                     # Dynamic sitemap: static routes + published blog slugs
│   ├── robots.ts                      # robots.txt: allow all, disallow /api/
│   ├── about/page.tsx                 # Who We Are, Vision/Mission, Core Strength, CTA
│   ├── services/page.tsx              # 6 service cards, What We Deliver, 3-tier pricing, CTA
│   ├── contact/page.tsx               # Info card + ContactForm + Google Maps embed
│   ├── verify/page.tsx                # Trust badge + VerifyForm
│   ├── team/page.tsx                  # Team cards from DB (initials avatar + LinkedIn)
│   ├── portfolio/page.tsx             # Portfolio items with client-side category filter
│   ├── blog/page.tsx                  # Published blog listing
│   ├── blog/[slug]/page.tsx           # Single post + markdown renderer + generateMetadata
│   ├── faq/page.tsx                   # Accordion FAQ (4 categories, hardcoded)
│   ├── admin/
│   │   ├── layout.tsx                 # Pass-through root layout (metadata + robots:noindex)
│   │   ├── login/page.tsx             # Standalone login form — no AdminShell wrapper
│   │   └── (shell)/
│   │       ├── layout.tsx             # AdminShell wrapper (sidebar + topbar)
│   │       └── page.tsx               # Dashboard: 5 stat cards + recent contacts table
│   └── api/
│       ├── contact/route.ts           # POST → prisma.contact.create()
│       ├── verify/route.ts            # GET ?id= → prisma.certificate.findUnique()
│       └── admin/
│           ├── login/route.ts         # POST: verify env creds → set HTTP-only session cookie
│           └── logout/route.ts        # POST: clear session cookie
├── components/
│   ├── Navbar.tsx                     # Fixed nav, shrink-on-scroll, active link, mobile menu
│   ├── Footer.tsx                     # 4-col footer, dynamic year, always navy-900
│   ├── Preloader.tsx                  # Navy screen + logo + bouncing dots, fades at 1.8s
│   ├── WhatsAppButton.tsx             # Floating WhatsApp button (bottom-left)
│   ├── BackToTop.tsx                  # Gold chevron, appears after 400px scroll
│   ├── DarkModeToggle.tsx             # Sun/Moon toggle via next-themes
│   ├── AOSInit.tsx                    # Initialises AOS on mount (returns null)
│   ├── providers.tsx                  # ThemeProvider wrapper
│   ├── PageHero.tsx                   # Reusable page banner: navy bg, video, title+subtitle
│   ├── admin/
│   │   └── AdminShell.tsx             # "use client", sidebar nav + topbar + logout button
│   ├── contact/
│   │   └── ContactForm.tsx            # React Hook Form → POST /api/contact
│   ├── verify/
│   │   └── VerifyForm.tsx             # Certificate lookup → GET /api/verify?id=
│   ├── portfolio/
│   │   └── PortfolioGrid.tsx          # "use client", category filter tabs + project cards
│   ├── faq/
│   │   └── FaqAccordion.tsx           # "use client", accordion open/close state
│   └── home/
│       ├── HeroSection.tsx            # Full-screen video bg, Framer Motion entry, 2 CTAs
│       ├── WhyChooseSection.tsx        # Checklist left + navy stat box right (AOS)
│       ├── ServicesSection.tsx         # 6 service cards, icon hover, AOS stagger
│       ├── StatsCounter.tsx            # 4 animated counters (Framer useInView)
│       ├── WhatWeDeliverSection.tsx    # 2-col: IT Infra card + Dev/Automation card
│       ├── ClientsMarquee.tsx          # CSS marquee, 10 client names looped
│       ├── TestimonialsSection.tsx     # 3 testimonial cards with star ratings (AOS)
│       └── CTASection.tsx              # Navy rounded box, 2 action buttons
├── lib/
│   ├── db.ts                          # Singleton PrismaClient
│   ├── utils.ts                       # cn() helper (clsx + tailwind-merge)
│   ├── markdown.tsx                   # renderMarkdown(): line-by-line MD→JSX
│   └── admin-auth.ts                  # verifyCredentials(), getSessionSecret(), cookie constants
├── middleware.ts                      # Protects /admin/* → redirect to /admin/login
├── prisma/
│   ├── schema.prisma                  # 10 models: Contact, Certificate, BlogPost, TeamMember,
│   │                                  # PortfolioItem, ExamAdmin, ExamQuestion, ExamCandidate,
│   │                                  # ExamResult, ExamVoucher
│   └── seed.ts                        # Seeds: 4 certs, 5 team, 5 portfolio, 5 blog posts,
│                                      # 10 exam questions, 5 vouchers, 1 exam admin
├── public/
│   ├── images/                        # logo.png, favicons, og-banner.png
│   └── video/hero.mp4                 # Hero background video
├── next.config.ts
├── tailwind.config.ts                 # Navy #0A1F44 + Gold #C9A84C, font vars, marquee keyframe
├── tsconfig.json                      # strict, @/* alias → ./
├── postcss.config.mjs
├── .env                               # DATABASE_URL — read by Prisma CLI only (gitignored)
├── .env.local                         # DATABASE_URL + ADMIN_* — read by Next.js runtime (gitignored)
└── package.json
```

---

## Admin Dashboard

### Auth
- Middleware (`middleware.ts`) protects all `/admin/*` except `/admin/login`
- Session = HTTP-only cookie `arx_admin_session` whose value = `ADMIN_SESSION_SECRET`
- Login: POST `/api/admin/login` → verify username+password from env → set cookie
- Logout: POST `/api/admin/logout` → clear cookie

### Route structure
- `/admin/login` → `app/admin/login/page.tsx` — no shell (uses pass-through root layout)
- `/admin` → `app/admin/(shell)/page.tsx` — wrapped by AdminShell
- Future admin pages → `app/admin/(shell)/<section>/page.tsx`

### AdminShell sidebar nav items
| Label | Route |
|-------|-------|
| Dashboard | /admin |
| Blog Posts | /admin/blog |
| Certificates | /admin/certificates |
| Contacts | /admin/contacts |
| Team Members | /admin/team |
| Portfolio | /admin/portfolio |

### Admin sections status
| Section | Status |
|---------|--------|
| Auth + login | ✅ Done |
| Dashboard overview | ✅ Done |
| Blog posts CRUD | ⏳ Pending |
| Certificates CRUD | ⏳ Pending |
| Contacts (read-only) | ⏳ Pending |
| Team members CRUD | ⏳ Pending |
| Portfolio CRUD | ⏳ Pending |

---

## Design System

| Token | Value | Tailwind class |
|-------|-------|----------------|
| Primary navy | `#0A1F44` | `bg-navy-900`, `text-navy-900` |
| Accent gold | `#C9A84C` | `bg-gold-400`, `text-gold-400` |
| Gold hover | `#b5932f` | `bg-gold-500` |
| Background | `#FFFFFF` / `gray-950` (dark) | `bg-white dark:bg-gray-950` |
| Body font | Inter | `font-inter` |
| Heading font | Poppins | `font-poppins` |

**Section heading pattern:**
```tsx
<p className="text-gold-400 font-semibold font-poppins text-sm uppercase tracking-wider mb-3">
  Small Label
</p>
<h2 className="section-title mb-4">Main Heading</h2>
<p className="section-subtitle">Descriptive text below heading.</p>
```

**Navbar:** fixed top, navy bg, shrinks on scroll >50px (py-4 → py-2 + backdrop-blur). Active link = gold.
**Buttons:** `.btn-primary` (gold bg, navy text) / `.btn-outline` (gold border).
**Footer:** always navy-900, never affected by dark mode.

---

## Key Conventions

- **Imports:** `@/*` alias maps to repo root
- **Client components:** `"use client"` only when using hooks, browser APIs, or motion
- **Dark mode:** Tailwind `dark:` prefix. ThemeProvider `attribute="class"` on `<html>`
- **No inline `style={{}}`** — Tailwind classes only
- **No styled-components** — pure Tailwind only
- **Routing:** Next.js App Router file-system routing. No React Router.
- **API routes:** `app/api/**/route.ts` with named exports (`GET`, `POST`, `PUT`, `DELETE`)
- **DB access:** always via `prisma` from `@/lib/db`
- **Admin pages:** go inside `app/admin/(shell)/` to get the AdminShell sidebar wrapper
- **Schema changes:** edit `prisma/schema.prisma` → run `npm run db:push`. No migration files.

---

## Shell Commands

```powershell
npm run dev          # Next.js dev server (Turbopack) → http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npm run db:push      # Sync Prisma schema → MySQL
npm run db:seed      # Reseed database — DESTRUCTIVE, never run on production
npm run db:studio    # Prisma Studio GUI → http://localhost:5555
npm run db:generate  # Regenerate Prisma client after schema change
```

---

## Environment Variables

| Variable | File | Purpose |
|----------|------|---------|
| `DATABASE_URL` | `.env` + `.env.local` | MySQL connection string |
| `ADMIN_USERNAME` | `.env.local` | Admin panel login username |
| `ADMIN_PASSWORD` | `.env.local` | Admin panel login password |
| `ADMIN_SESSION_SECRET` | `.env.local` | HTTP-only session cookie value |

Both env files are gitignored — never commit either. Keep `.env` and `.env.local` in sync for `DATABASE_URL`.

---

## Contact Info (public)

- **Email:** info@arxinfo.tech
- **Phone:** +91 8317818107
- **WhatsApp:** wa.me/918317818107
- **Address:** 1st Floor, 150, Panchita, Bongaon-Bagdh Rd, Kolkata 743235, India

---

## What NOT To Do

- Do not edit legacy `.html` / `.php` files — reference only
- Do not add inline `style={{}}` props — use Tailwind
- Do not hardcode `DATABASE_URL` — always use `process.env.DATABASE_URL`
- Do not commit `.env` or `.env.local` — both are gitignored
- Do not generate Prisma migration files — use `db push` only
- Do not use React Router — App Router file-system routing only
- Do not duplicate Prisma client — import from `@/lib/db` only
- Do not place new admin pages outside `app/admin/(shell)/` — they will miss the AdminShell wrapper
- `db:seed` deletes all rows before inserting — never run on production
- Prisma CLI reads `.env`; Next.js runtime reads `.env.local` — keep both in sync
