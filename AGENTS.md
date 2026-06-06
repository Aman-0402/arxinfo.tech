# AGENTS.md — ARX Infotech Website

Agent instructions for working in this repository.

---

## Project Overview

**ARX Infotech** — IT services & tech solutions company, Kolkata, India.
Live site: `https://arxinfo.tech`

**Migration status:** Converting from static HTML/PHP → Next.js 15 (App Router) + Prisma + MySQL.
Phase 1 complete. Original HTML/PHP files kept at root for reference during migration.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15.5 (App Router, Turbopack) |
| Runtime | Node.js 22 (ESM) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 (primary) + Bootstrap 5.3 (where needed) |
| Fonts | Poppins (headings) + Inter (body) via `next/font/google` |
| Animations | Framer Motion 12 + AOS |
| State | React hooks (useState, useEffect) |
| Forms | React Hook Form 7 |
| DB | MySQL via Prisma 6 ORM |
| Dark mode | next-themes (default: light, persisted) |
| Icons | Lucide React |

---

## Build Phases

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Project setup: Next.js init, Tailwind, Prisma, layout, global components | ✅ Done |
| 2 | MySQL schema (prisma/schema.prisma) + db push + seed | ✅ Done |
| 3 | Home page (all sections) | ✅ Done |
| 4 | About, Services, Contact, Verify pages | ✅ Done |
| 5 | Team, Portfolio, Blog, FAQ pages | ✅ Done |
| 6 | Exam module — integrate external voucher-based exam site | 🔗 External |
| 7 | Exam admin dashboard — part of external exam site | 🔗 External |
| 8 | API routes (contact, verify) | ✅ Done |
| 9 | Final polish: animations, dark mode, SEO metadata, performance | ⏳ Pending |

---

## Project Structure

```
arxinfo.tech/
├── app/
│   ├── globals.css          # Tailwind base + custom utilities (btn-primary, section-title)
│   ├── layout.tsx           # Root layout — fonts, metadata, AOSInit, all providers + global components
│   └── page.tsx             # Home page — imports all 8 section components
├── components/
│   ├── Navbar.tsx           # Sticky nav, shrink-on-scroll, active link, mobile menu
│   ├── Footer.tsx           # 4-col footer — brand, quick links, services, contact
│   ├── Preloader.tsx        # Navy screen + logo + bouncing dots, fades after 1.8s
│   ├── WhatsAppButton.tsx   # Floating green WhatsApp button (bottom-left)
│   ├── BackToTop.tsx        # Gold chevron button, appears after 400px scroll
│   ├── DarkModeToggle.tsx   # Sun/Moon toggle via next-themes
│   ├── AOSInit.tsx          # Initialises AOS on mount (client component, renders null)
│   ├── providers.tsx        # ThemeProvider wrapper (client component)
│   ├── PageHero.tsx             # Reusable page banner: navy bg, video overlay, title+subtitle
│   ├── contact/
│   │   └── ContactForm.tsx          # React Hook Form contact form → POST /api/contact
│   ├── verify/
│   │   └── VerifyForm.tsx           # Certificate lookup → GET /api/verify?id=...
│   ├── portfolio/
│   │   └── PortfolioGrid.tsx        # "use client", category filter tabs + project cards
│   └── faq/
│       └── FaqAccordion.tsx         # "use client", accordion with open/close state
│   └── home/
│       ├── HeroSection.tsx          # Full-screen video bg, Framer Motion entry, 2 CTAs, 3 badges
│       ├── WhyChooseSection.tsx     # Checklist left + navy highlight box right (AOS)
│       ├── ServicesSection.tsx      # 6 service cards with icon hover, AOS stagger
│       ├── StatsCounter.tsx         # Animated counters: 50+ clients, 100+ projects, 5+ yrs, 24/7
│       ├── WhatWeDeliverSection.tsx # 2-col: light card (IT Infra) + navy card (Dev/Automation)
│       ├── ClientsMarquee.tsx       # CSS marquee with 10 placeholder client names
│       ├── TestimonialsSection.tsx  # 3 testimonial cards with star ratings (AOS)
│       └── CTASection.tsx           # Navy rounded box, 2 action buttons (consult + call)
├── lib/
│   ├── db.ts                # Singleton Prisma client
│   ├── utils.ts             # cn() helper (clsx + tailwind-merge)
│   └── markdown.tsx         # renderMarkdown() — line-by-line MD→JSX (h2/h3/ul/p/bold)
├── prisma/
│   ├── schema.prisma        # 10 models: Contact, Certificate, BlogPost, TeamMember,
│   │                        # PortfolioItem, ExamAdmin, ExamQuestion, ExamCandidate,
│   │                        # ExamResult, ExamVoucher
│   └── seed.ts              # Seeds: 4 certs, 5 team, 5 portfolio, 5 blog, 10 questions,
│                            # 5 vouchers, 1 exam admin (admin/Admin@2025)
├── public/
│   ├── images/              # logo.png, favicons, og-banner.png
│   └── video/hero.mp4       # Hero background video
├── app/
│   ├── about/page.tsx             # Who We Are, Vision/Mission, Core Strength, CTA
│   ├── services/page.tsx          # 6 service cards, What We Deliver, 3-tier pricing, CTA
│   ├── contact/page.tsx           # Info card + ContactForm + Google Maps embed
│   ├── verify/page.tsx            # Trust badge + VerifyForm
│   ├── team/page.tsx              # Team cards from DB (initials avatar + linkedin)
│   ├── portfolio/page.tsx         # Portfolio items with category filter (PortfolioGrid)
│   ├── blog/page.tsx              # Published blog post listing
│   ├── blog/[slug]/page.tsx       # Single blog post + markdown renderer + tags
│   ├── faq/page.tsx               # Accordion FAQ (4 categories, hardcoded)
│   └── api/
│       ├── contact/route.ts       # POST → prisma.contact.create()
│       └── verify/route.ts        # GET ?id= → prisma.certificate.findUnique()
├── next.config.ts
├── tailwind.config.ts       # Navy #0A1F44 + Gold #C9A84C theme, font vars
├── tsconfig.json
├── postcss.config.mjs
├── .env.local               # DATABASE_URL (gitignored)
├── package.json
│
│  ── Legacy files (reference only, do not edit) ──
├── index.html
├── about.html
├── services.html
├── contact.html
├── contact.php
├── verify.php
└── exam/                    # PHP exam module — will be replaced in Phase 6–7
```

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

**Navbar:** fixed top, navy bg, shrinks on scroll >50px (py-4 → py-2 + backdrop-blur). Active link = gold.
**Buttons:** `.btn-primary` (gold bg, navy text) / `.btn-outline` (gold border).
**Footer:** always navy-900, never affected by dark mode.

---

## Key Conventions

- **Imports:** `@/*` alias maps to repo root. Use `@/components/...`, `@/lib/...`, `@/app/...`
- **Client components:** add `"use client"` only when using hooks, browser APIs, or motion
- **Dark mode:** Tailwind `dark:` prefix. ThemeProvider uses `attribute="class"` on `<html>`
- **No inline `style={{}}`** — Tailwind classes only
- **No styled-components** — pure Tailwind + CSS modules if needed
- **Routing:** Next.js App Router file-system routing. No React Router.
- **API routes:** `app/api/**/route.ts` with named exports (`GET`, `POST`)
- **DB access:** always via `prisma` from `@/lib/db`
- **Schema changes:** edit `prisma/schema.prisma` → run `npm run db:push`. No migration files.

---

## Shell Commands

```powershell
npm run dev          # Next.js dev server (Turbopack) → http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npm run db:push      # Sync Prisma schema → MySQL (use after schema changes)
npm run db:seed      # Reseed database with sample data (destructive — clears first)
npm run db:studio    # Prisma Studio GUI → http://localhost:5555
npm run db:generate  # Regenerate Prisma client after schema change
```

---

## Environment

```
DATABASE_URL="mysql://root@localhost:3306/arx"
```
Two env files — both gitignored, never commit either:
- `.env` — read by Prisma CLI (`db:push`, `db:seed`, `db:studio`)
- `.env.local` — read by Next.js runtime (API routes, server components)

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
- `db:seed` deletes all rows before inserting — never run on production
- Prisma CLI reads `.env`; Next.js runtime reads `.env.local` — keep both in sync
