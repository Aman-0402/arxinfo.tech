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
| Animations | Framer Motion 12 + custom IntersectionObserver (`data-arx`) |
| Notifications | SweetAlert2 (confirm dialogs) + Toastr.js (success/error toasts) |
| State | React hooks (useState, useEffect) |
| Forms | React Hook Form 7 |
| DB | MySQL via Prisma 6 ORM |
| Cache | Redis via ioredis (`lib/redis.ts`) |
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
| 5 | Team, Portfolio, Blog pages | ✅ Done |
| 6 | Exam module — integrate external voucher-based exam site | 🔗 External |
| 7 | Exam admin dashboard — part of external exam site | 🔗 External |
| 8 | API routes (contact, verify) | ✅ Done |
| 9 | Final polish: animations, SEO metadata, sitemap, robots, 404, loading | ✅ Done |
| 10 | Admin dashboard — auth + overview + full CRUD for all sections | ✅ Done |

---

## Project Structure

```
arxinfo.tech/
├── app/
│   ├── globals.css                    # Tailwind base + custom utilities + data-reveal animation CSS
│   ├── layout.tsx                     # Root layout — fonts, JSON-LD, AOSInit, Navbar, ConditionalFooter
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
│   ├── admin/
│   │   ├── layout.tsx                 # Pass-through root layout (metadata + robots:noindex)
│   │   ├── login/page.tsx             # Standalone login form — no AdminShell wrapper
│   │   └── (shell)/
│   │       ├── layout.tsx             # AdminShell wrapper (sidebar + topbar)
│   │       ├── page.tsx               # Dashboard: stat cards + recent contacts table
│   │       ├── blog/page.tsx
│   │       ├── certificates/page.tsx
│   │       ├── contacts/page.tsx
│   │       ├── team/page.tsx
│   │       ├── portfolio/page.tsx
│   │       ├── services/page.tsx
│   │       ├── stats/page.tsx
│   │       ├── clients/page.tsx
│   │       └── testimonials/page.tsx
│   └── api/
│       ├── contact/route.ts           # POST → prisma.contact.create()
│       ├── verify/route.ts            # GET ?id= → prisma.certificate.findUnique()
│       └── admin/
│           ├── login/route.ts         # POST: verify env creds → set HTTP-only session cookie
│           ├── logout/route.ts        # POST: clear session cookie
│           ├── blog/route.ts + [id]/route.ts
│           ├── certificates/route.ts + [id]/route.ts
│           ├── contacts/[id]/route.ts
│           ├── team/route.ts + [id]/route.ts
│           ├── portfolio/route.ts + [id]/route.ts
│           ├── services/route.ts + [id]/route.ts
│           ├── stats/route.ts + [id]/route.ts
│           ├── clients/route.ts + [id]/route.ts
│           └── testimonials/route.ts + [id]/route.ts
├── components/
│   ├── Navbar.tsx                     # Fixed nav, hidden on /admin/*, shrink-on-scroll, active link
│   ├── Footer.tsx                     # 4-col footer, dynamic year, always navy-900
│   ├── ConditionalFooter.tsx          # Client wrapper — hides Footer on /admin/* routes
│   ├── Preloader.tsx                  # Navy screen + logo + bouncing dots, fades at 1.8s
│   ├── WhatsAppButton.tsx             # Floating WhatsApp (bottom-right), hidden on /admin/*
│   ├── BackToTop.tsx                  # Gold chevron, appears after 400px scroll
│   ├── DarkModeToggle.tsx             # Sun/Moon toggle via next-themes
│   ├── AOSInit.tsx                    # Custom IntersectionObserver scroll reveal (no AOS lib)
│   ├── providers.tsx                  # ThemeProvider wrapper
│   ├── PageHero.tsx                   # Reusable page banner: navy bg, video, title+subtitle
│   ├── admin/
│   │   ├── AdminShell.tsx             # "use client", fixed sidebar nav + topbar + logout
│   │   ├── AdminModal.tsx             # Shared modal wrapper (wide prop for large forms)
│   │   ├── BlogTable.tsx              # Blog CRUD: slug auto-gen, markdown textarea, publish toggle
│   │   ├── CertificatesTable.tsx      # Cert CRUD: inline valid/revoke toggle
│   │   ├── ContactsTable.tsx          # Read-only inbox: expandable rows, delete
│   │   ├── TeamTable.tsx              # Team CRUD: initials avatar, order, active toggle
│   │   ├── PortfolioTable.tsx         # Portfolio CRUD: category select, featured toggle
│   │   ├── ServicesTable.tsx          # Services CRUD: icon select, image preview, active toggle
│   │   ├── StatsTable.tsx             # Stats CRUD: icon, target, suffix, label
│   │   ├── ClientsTable.tsx           # Clients CRUD: logo image or initials badge, marquee toggle
│   │   └── TestimonialsTable.tsx      # Testimonials CRUD: star rating, avatar, active toggle
│   ├── contact/
│   │   └── ContactForm.tsx            # React Hook Form → POST /api/contact
│   ├── verify/
│   │   └── VerifyForm.tsx             # Certificate lookup → GET /api/verify?id=
│   ├── portfolio/
│   │   └── PortfolioGrid.tsx          # "use client", category filter tabs + project cards
│   └── home/
│       ├── HeroSection.tsx            # Full-screen video bg, Framer Motion entry, 2 CTAs
│       ├── WhyChooseSection.tsx        # Checklist left + navy stat box right
│       ├── ServicesSection.tsx         # DB-driven: image cards, icon badge overlay, hover zoom
│       ├── StatsCounter.tsx            # Server wrapper — fetches from DB, passes to client
│       ├── StatsCounterClient.tsx      # "use client" — animated counters (Framer useInView)
│       ├── WhatWeDeliverSection.tsx    # 2-col: IT Infra card + Dev/Automation card
│       ├── ClientsMarquee.tsx          # DB-driven: dual-row marquee, gradient fades, logo/initials
│       ├── TestimonialsSection.tsx     # DB-driven: quote icon, avatar/initials, hover effects
│       └── CTASection.tsx              # Navy rounded box, 2 action buttons
├── lib/
│   ├── db.ts                          # Singleton PrismaClient
│   ├── redis.ts                       # Singleton ioredis client (lazyConnect, REDIS_URL)
│   ├── utils.ts                       # cn() helper (clsx + tailwind-merge)
│   ├── markdown.tsx                   # renderMarkdown(): line-by-line MD→JSX
│   ├── admin-auth.ts                  # verifyCredentials(), getSessionSecret(), cookie constants
│   ├── admin-api-guard.ts             # isAdminAuthenticated(req) — used by all admin API routes
│   └── notify.ts                      # toast() (Toastr) + confirmDelete() + confirmAction() (SweetAlert2)
├── middleware.ts                      # Protects /admin/* → redirect to /admin/login (Edge-safe)
├── prisma/
│   ├── schema.prisma                  # 13 models: Contact, Certificate, BlogPost, TeamMember,
│   │                                  # PortfolioItem, Service, Stat, Client, Testimonial,
│   │                                  # ExamAdmin, ExamQuestion, ExamCandidate, ExamResult, ExamVoucher
│   ├── seed.ts                        # Full reseed (DESTRUCTIVE) — never run on production
│   ├── seed-services.ts               # One-shot: seeds 6 services
│   └── seed-content.ts                # One-shot: seeds stats, clients, testimonials
├── public/
│   ├── images/                        # logo.png, favicons, og-banner.png
│   └── video/hero.mp4                 # Hero background video
├── next.config.ts                     # remotePatterns: allow all https images
├── tailwind.config.ts                 # Navy + Gold colors, font vars, marquee + marquee-reverse keyframes
├── tsconfig.json                      # strict, @/* alias → ./
├── postcss.config.mjs
├── .env                               # DATABASE_URL — read by Prisma CLI only (gitignored)
├── .env.local                         # DATABASE_URL + ADMIN_* + REDIS_URL (gitignored)
└── package.json
```

---

## Admin Dashboard

### Auth
- Middleware (`middleware.ts`) protects all `/admin/*` except `/admin/login`
- Session = HTTP-only cookie `arx_admin_session` whose value === `ADMIN_SESSION_SECRET`
- Login: POST `/api/admin/login` → verify username+password from env → set cookie
- Logout: POST `/api/admin/logout` → clear cookie

### Route structure
- `/admin/login` → `app/admin/login/page.tsx` — no shell (pass-through root layout)
- `/admin/*` → `app/admin/(shell)/<section>/page.tsx` — wrapped by AdminShell
- AdminShell is `fixed` sidebar; main content has `lg:pl-64` offset

### AdminShell sidebar nav
| Label | Route | Icon |
|-------|-------|------|
| Dashboard | /admin | LayoutDashboard |
| Blog Posts | /admin/blog | FileText |
| Services | /admin/services | Layers |
| Certificates | /admin/certificates | BadgeCheck |
| Contacts | /admin/contacts | Mail |
| Team Members | /admin/team | Users |
| Portfolio | /admin/portfolio | Briefcase |
| Stats Counter | /admin/stats | BarChart3 |
| Clients | /admin/clients | Building2 |
| Testimonials | /admin/testimonials | MessageSquare |

### Admin sections status
| Section | Features | Status |
|---------|----------|--------|
| Auth + login | env-var credentials, HTTP-only cookie | ✅ Done |
| Dashboard overview | stat cards + recent contacts table | ✅ Done |
| Blog posts | CRUD, slug auto-gen, markdown editor, publish/draft | ✅ Done |
| Certificates | CRUD, inline valid/revoke toggle | ✅ Done |
| Contacts | Read-only inbox, expandable rows, delete | ✅ Done |
| Team members | CRUD, initials avatar, order, active toggle | ✅ Done |
| Portfolio | CRUD, category select, featured toggle, auto-slug | ✅ Done |
| Services | CRUD, icon select, image URL + preview, active toggle | ✅ Done |
| Stats Counter | CRUD, icon, target number, suffix, label | ✅ Done |
| Clients (marquee) | CRUD, logo URL or initials badge, show/hide | ✅ Done |
| Testimonials | CRUD, star rating (0.5 step), avatar, role | ✅ Done |

### Admin API guard
All admin API routes use `isAdminAuthenticated(req)` from `lib/admin-api-guard.ts`.
Returns 401 if cookie missing or doesn't match `ADMIN_SESSION_SECRET`.

---

## Scroll Animations

AOS library removed — replaced with custom solution to avoid SSR hydration mismatches.

**Attributes:**
- `data-arx="fade-up|fade-down|fade-left|fade-right"` — animation direction
- `data-arx-delay="100"` — delay in milliseconds

**How it works (`AOSInit.tsx`):**
1. `requestAnimationFrame` + `setTimeout(fn, 50)` — runs after React fully commits
2. In-viewport elements get `arx-in` class immediately (no flash)
3. `js-ready` class added to `<body>` AFTER in-viewport elements have `arx-in` — activates CSS hiding
4. `IntersectionObserver` watches remaining elements, adds `arx-in` on scroll
5. Runs on every `pathname` change (re-scans on navigation)
6. `suppressHydrationWarning` on every `data-arx` element — browser extension may add `arx-in` before hydration

**CSS (`globals.css`):**
```css
.js-ready [data-arx] { opacity: 0; transition: opacity 700ms, transform 700ms; }
.js-ready [data-arx="fade-up"] { transform: translateY(30px); }
/* etc. */
.js-ready [data-arx].arx-in { opacity: 1; transform: none; }
```

**Note:** Attribute renamed twice due to browser extension interference:
- `data-aos` → `data-reveal` → `data-arx` (extension targeted each prior name)
- Class: `aos-animate` → `reveal-animate` → `arx-in`
- Never use `data-aos`, `data-reveal`, `aos-animate`, or `reveal-animate` — extension will add the class before React hydrates, causing mismatch.

---

## DB Models (Prisma)

| Model | Table | Key fields |
|-------|-------|------------|
| Contact | contacts | name, email, phone, subject, message |
| Certificate | certificates | certificateId (unique), holderName, courseName, issueDate, isValid |
| BlogPost | blog_posts | slug (unique), title, content, category, published, publishedAt |
| TeamMember | team_members | name, role, bio, photo, linkedin, order, active |
| PortfolioItem | portfolio_items | slug (unique), title, category, image, featured, order |
| Service | services | title, description, icon, image, order, active |
| Stat | stats | icon, target, suffix, label, order, active |
| Client | clients | name, logo, website, order, active |
| Testimonial | testimonials | name, company, role, text, stars, avatar, order, active |
| ExamAdmin | exam_admins | username, password (bcrypt) |
| ExamQuestion | exam_questions | question, optionA–D, correctOption |
| ExamCandidate | exam_candidates | name, email |
| ExamResult | exam_results | candidateId, score, total, passed |
| ExamVoucher | exam_vouchers | voucherCode (unique), isActive |

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

**Navbar:** fixed top, hidden on `/admin/*`, navy bg, shrinks on scroll >50px. Active link = gold.
**Buttons:** `.btn-primary` (gold bg, navy text) / `.btn-outline` (gold border).
**Footer:** always navy-900, hidden on `/admin/*` via `ConditionalFooter`.
**WhatsApp button:** bottom-right `right-6 bottom-24`, hidden on `/admin/*`.
**Back-to-top:** bottom-right `right-6 bottom-6`, gold, appears after 400px scroll.

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
- **Redis access:** always via `redis` from `@/lib/redis`
- **Admin pages:** go inside `app/admin/(shell)/` to get the AdminShell sidebar wrapper
- **Admin API routes:** must call `isAdminAuthenticated(req)` from `@/lib/admin-api-guard`
- **Schema changes:** edit `prisma/schema.prisma` → run `npm run db:push` then `npm run db:generate`
- **After schema change with dev server running:** run `db:push --skip-generate`, stop server, run `db:generate`, restart
- **Scroll animations:** use `data-arx="fade-up"` and `data-arx-delay="100"` — never `data-aos` or `data-reveal`
- **Notifications:** use `toast()` and `confirmDelete()` from `@/lib/notify` — never native `alert()`/`confirm()`
- **Images:** use `next/image` for local; `<img>` tags acceptable for admin-managed external URLs

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
| `REDIS_URL` | `.env.local` | Redis connection string (default: `redis://localhost:6379`) |

Both `.env` and `.env.local` are gitignored — never commit either.
Keep `DATABASE_URL` in sync across both files.

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
- Do not duplicate Redis client — import from `@/lib/redis` only
- Do not place new admin pages outside `app/admin/(shell)/` — they will miss the AdminShell wrapper
- Do not use `data-aos` or `data-reveal` attributes — use `data-arx` (both prior names targeted by browser extension)
- Do not use native `alert()` or `confirm()` — use `toast()`/`confirmDelete()` from `@/lib/notify`
- `db:seed` deletes all rows before inserting — never run on production
- Prisma CLI reads `.env`; Next.js runtime reads `.env.local` — keep both in sync
