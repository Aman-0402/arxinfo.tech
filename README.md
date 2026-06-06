# ARX Infotech — Corporate Website

Official website for **ARX Infotech**, an IT services and tech solutions provider based in Kolkata, India.

🌐 **Live:** [arxinfo.tech](https://arxinfo.tech)

---

## Stack

| Layer | Tech |
|-------|------|
| Markup | HTML5 |
| Styling | Bootstrap 5.3, Tailwind CSS (CDN), Font Awesome 6, Bootstrap Icons |
| Scripting | Vanilla JS (`assets/js/main.js`) |
| Backend | PHP (contact form, verify portal) |
| Exam Module | PHP + MySQL |

---

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home — hero, services overview, testimonials, CTA |
| `about.html` | About ARX Infotech |
| `services.html` | Full services listing |
| `contact.html` | Contact form |
| `verify.php` | Certificate / document verification portal |
| `contact.php` | Form handler (POST endpoint) |

---

## Project Structure

```
arxinfo.tech/
├── index.html
├── about.html
├── services.html
├── contact.html
├── contact.php
├── verify.php
├── sitemap.xml
├── .htaccess
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── images/         # logo, favicons, og-banner
│   └── video/hero.mp4
└── exam/               # Online proctored exam module (PHP + MySQL)
    ├── index.php
    ├── database.sql
    ├── config.php
    ├── admin/
    └── candidate/
```

---

## Exam Module Setup

Located in `exam/`. Standalone PHP application for online proctored exams.

1. Import `exam/database.sql` into MySQL
2. Update `exam/config.php` with DB credentials
3. Run: `php -S localhost:8000 -t exam/`
4. Open `http://localhost:8000`

**Default admin login:** `admin` / `admin123` — change immediately in production.

**Voucher system:** Candidates need a valid voucher to start exams. Demo voucher: `DEMO-2026`.

---

## Local Development

Static site — open any HTML file directly in browser, or use a local server:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

PHP pages (`verify.php`, `contact.php`, `exam/`) require a PHP server.

---

## Contact

- **Email:** info@arxinfo.tech
- **Phone:** +91 8317818107
- **Address:** 1st Floor, 150, Panchita, Bongaon-Bagdh Rd. Street, Kolkata, India 743235
