# AGENTS.md — ARX Infotech Website

Agent instructions for working in this repository.

---

## Project Overview

**ARX Infotech** — IT services & tech solutions company, Kolkata, India.
Live site: `https://arxinfo.tech`

Static HTML/CSS/JS corporate website with PHP backend for contact form and certificate verification. Contains a separate PHP+MySQL online exam module under `exam/`.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Markup | HTML5 (static pages) |
| Styling | Bootstrap 5.3.3 (CDN), Tailwind CSS (CDN), Font Awesome 6.5, Bootstrap Icons 1.11 |
| JS | Vanilla JS only — no framework |
| Backend | PHP 8.1 (`ea-php81` via cPanel) |
| Exam DB | MySQL via MySQLi (`utf8mb4`) |
| Server | Apache + `.htaccess` (cPanel shared hosting) |

---

## Project Structure

```
arxinfo.tech/
├── index.html          # Home page
├── about.html          # About page
├── services.html       # Services listing
├── contact.html        # Contact page (form submits to contact.php)
├── contact.php         # Sends dual HTML emails (admin + user confirmation)
├── verify.php          # Certificate / document verification portal
├── sitemap.xml         # SEO sitemap
├── .htaccess           # Apache rewrite rules + PHP handler config
├── assets/
│   ├── css/style.css   # All custom styles (global, navbar, hero, cards, footer)
│   ├── js/main.js      # Minimal JS (currentYear footer, scroll animations)
│   ├── images/         # logo.png, favicon-*.png, favicon.ico, apple-touch-icon.png, og-banner.png
│   └── video/hero.mp4  # Hero section background video
└── exam/               # Standalone online proctored exam system
    ├── config.php       # DB connection (DO NOT hardcode creds in other files)
    ├── index.php        # Candidate landing / voucher entry
    ├── database.sql     # Full schema — import to MySQL to set up
    ├── admin/
    │   ├── login.php
    │   └── dashboard.php
    ├── candidate/
    │   ├── register.php
    │   ├── exam.php
    │   ├── submit.php
    │   └── result.php
    └── assests/
        └── proctor.js  # Browser proctoring logic
```

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background dark | `#111827` | Navbar, footer, dark cards, emails |
| Accent yellow | `#facc15` | Brand color, CTAs, highlights |
| Text light | `#9ca3af` | Footer text |
| Border radius | `rounded-4` (Bootstrap) | Cards, sections |
| Shadow | `shadow` / `shadow-lg` | Cards, navbar |

**Navbar:** sticky-top, dark (`#111827`), logo left, links right. Active link = yellow (`#facc15`).
**Hero:** full-width video background (`hero.mp4`), overlay content left-aligned, two CTA buttons (warning + outline-light).
**Cards:** `service-card` class, white bg, `rounded-4 shadow`.
**Footer:** 3-column (brand+desc | quick links | contact), dark bg, copyright with dynamic year via JS.

---

## Key Conventions

### HTML Pages
- Copy exact `<head>` block from `index.html` for every new page — includes SEO meta, OG, Twitter, favicons, all CDN links
- Update `<title>`, `<meta name="description">`, `<link rel="canonical">` per page
- Active nav link gets `active` class (turns yellow)
- Every page ends with Bootstrap JS CDN + `assets/js/main.js`
- Scroll animations: add class `scroll-animate` to sections/elements

### CSS (`assets/css/style.css`)
- All custom styles go here — no inline `style=""` attributes
- Bootstrap utility classes preferred for spacing/layout
- Tailwind CDN loaded but Bootstrap takes precedence for components
- Do NOT introduce CSS frameworks beyond what's already loaded

### JS (`assets/js/main.js`)
- Vanilla JS only — no npm, no bundler, no framework
- Currently sets `#currentYear` in footer
- Add scroll animation observers here if expanding

### PHP
- `contact.php`: POST-only handler. Uses `htmlspecialchars()` on all inputs. Sends HTML email to admin + confirmation to user via `mail()`. Redirects to `contact.html` after.
- `verify.php`: Certificate verification portal
- `exam/config.php`: DB credentials live here only — never duplicate or hardcode elsewhere

### Exam Module (`exam/`)
- Standalone app — its own session, DB, auth
- Default admin: `admin` / `admin123` — must change in production
- Voucher system: candidates need valid voucher code to start exam
- Demo voucher: `DEMO-2026`
- Setup: import `database.sql` → update `config.php` → serve with PHP

---

## Server / Hosting

- **Host:** cPanel shared hosting
- **PHP version:** 8.1 (`ea-php81`, set in `.htaccess`)
- **Domain:** `arxinfo.tech` — www redirects to non-www (301 in `.htaccess`)
- **Email:** `info@arxinfo.tech` — contact form uses server `mail()` function
- **Assets served:** static from `assets/` directory

---

## Local Development

Static HTML pages — open directly in browser or use a local server:

```bash
# Python
python -m http.server 8080

# Node
npx serve .

# PHP (required for .php files and exam module)
php -S localhost:8080
```

For exam module:
```bash
php -S localhost:8000 -t exam/
```

---

## SEO Notes

- `sitemap.xml` exists — update when adding new pages
- Each page has full keyword meta, OG, Twitter card, Schema.org JSON-LD
- Canonical URL must be set per page
- `robots` meta: `index, follow`

---

## Contact Info (public)

- **Email:** info@arxinfo.tech
- **Phone:** +91 8317818107
- **WhatsApp:** wa.me/918317818107
- **Address:** 1st Floor, 150, Panchita, Bongaon-Bagdh Rd. Street, Kolkata, WB 743235, India

---

## What NOT To Do

- Do not add npm/Node.js build step — site is pure static + PHP, no bundler
- Do not add new CSS frameworks — Bootstrap + Tailwind CDN already loaded
- Do not add inline `style=""` — use `style.css` or Tailwind utility classes
- Do not hardcode DB credentials outside `exam/config.php`
- Do not generate migration files — schema lives in `exam/database.sql`
- Do not change PHP handler in `.htaccess` — cPanel-managed, breaks hosting
- Do not commit credentials or `.env` files
