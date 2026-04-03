# v1.0 — Tubertico Corporate Website

**Release type:** Production-ready  
**Date:** April 2026

---

## What this is

Version 1.0 of the Tubertico corporate website — a bilingual (Spanish / English) static site built for Tubérculos Ticos S.R.L. The site replaces the previous tubertico.com and is production-ready for deployment on DigitalOcean App Platform.

---

## What's included

### Site structure
- Homepage with hero video, about section, certifications bar, featured products, gallery preview, and contact CTA
- Full product catalog — 14 products with images, bilingual names and descriptions
- Photo gallery with tabbed filtering (All / Products / Company), fullscreen lightbox, and keyboard navigation
- Contact page with contact info, WhatsApp shortcut, and a contact form UI
- Full-width location map embedded on the homepage and contact page
- Privacy policy page in Spanish and English

### Technical
- Next.js 14 App Router with full static export (`output: 'export'`)
- Bilingual routing via next-intl v4 — `/es/` and `/en/` routes generated at build time
- Browser language detection on the root page for automatic locale selection
- Framer Motion scroll animations and mobile navigation drawer
- Responsive layout across all breakpoints
- Page titles follow the format `Page | Tubertico` for all routes in both languages
- Favicon and metadata configured for all pages

### Content
- Real company information: contact, address, certifications, social links
- GlobalGAP V6.0 GFSI and FSMA (FDA) certification logos
- 14 product images and 12 gallery images (remaining gallery slots ready for upload)
- Color palette, typography, and logo matching the live tubertico.com brand

---

## Known limitations for v1

- **Contact form:** The form UI is present but not wired to a backend. Submissions do nothing. This needs a form service (Formspree, Web3Forms, or similar) before going live.
- **Gallery images:** 7 product and 8 company gallery slots are pending manual upload. The gallery handles missing images gracefully — they are simply skipped.
- **Hero video:** The hero section uses a static poster image. A video file can be added to `public/videos/hero.mp4` to enable autoplay.
- **Google Analytics:** Not configured. Add `NEXT_PUBLIC_GA_ID` environment variable to enable.

---

## How to add gallery images after v1

Upload files to `public/images/gallery/` following the naming convention:

```
product-13.jpg, product-14.jpg, ...
company-13.jpg, company-14.jpg, ...
```

Then increment the count in `components/sections/GalleryGrid.tsx` and rebuild.

---

## Deploy

```
Build command:  npm run build
Output dir:     out
Node:           18.x or 20.x
```
