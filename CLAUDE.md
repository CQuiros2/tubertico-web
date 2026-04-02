# Tubertico — Corporate Website

## Stack
- **Next.js 14** App Router
- **TypeScript**
- **Tailwind CSS** + `@tailwindcss/typography`
- **next-intl v4** — bilingual ES/EN, static export (no middleware)
- **framer-motion** — scroll animations, mobile drawer
- **lucide-react** — icons (brand icons removed in v1.x, use inline SVGs)
- **sharp** — image optimization (unoptimized: true for static export)
- **Deploy**: DigitalOcean App Platform — Static Site

## Architecture Decisions

### Static Export + next-intl
- No `middleware.ts` — incompatible with `output: 'export'`
- `i18n/request.ts` loads locale from `requestLocale` param
- `generateStaticParams()` in `app/[locale]/layout.tsx` produces `/es` and `/en` routes
- `setRequestLocale(locale)` called in every layout and page
- Root `app/page.tsx` redirects to `/es`

### Brand Colors (Tailwind)
- `brand-green` (#1B4D2E) — primary dark green
- `brand-green-dark` (#122E1C) — footer/header dark
- `brand-green-mid` (#2D7A3A) — hover states
- `brand-amber` (#D97706) — CTA accent
- `brand-cream` (#F5F7F0) — section backgrounds

### Fonts
- `font-sans`: Inter (body text)
- `font-display`: Playfair Display (headings)

## File Structure
```
app/
  layout.tsx            ← Root layout (Inter + Playfair fonts)
  page.tsx              ← Redirects to /es
  [locale]/
    layout.tsx          ← NextIntlClientProvider + Header + Footer
    page.tsx            ← Landing (Hero + Products + Gallery + Contact CTA)
    productos/page.tsx
    galeria/page.tsx
    contacto/page.tsx
  sitemap.ts
  robots.ts

components/
  layout/Header.tsx     ← Sticky glassmorphism, mobile drawer (framer-motion)
  layout/Footer.tsx     ← 4-column, brand info, inline SVG social icons
  sections/
    HeroVideo.tsx       ← Fullscreen video hero, animated CTAs
    ProductGrid.tsx     ← 4-col product cards with certifications
    GalleryGrid.tsx     ← 2-3 col image grid
    ContactSection.tsx  ← Banner variant + full form+map variant
  ui/
    Button.tsx          ← Polymorphic (button + Link), 4 variants
    SectionWrapper.tsx  ← Padded section container
    LangSwitcher.tsx    ← Toggle pill ES/EN
    AnimatedSection.tsx ← Framer motion scroll reveal

lib/
  products.ts           ← Product data array + getFeaturedProducts()
  siteConfig.ts         ← Contact info, social links, stats, locales

messages/
  es.json               ← All Spanish strings
  en.json               ← All English strings

public/
  videos/hero.mp4       ← Hero background video (to be migrated)
  images/
    products/           ← Product images (to be migrated)
    gallery/            ← Gallery images (to be migrated)
    hero-poster.jpg     ← Video poster frame (to be migrated)
```

## Current Progress
- [x] Project initialized (Next.js 14 + TS + Tailwind + next-intl)
- [x] Build passes, all 15 static pages generated
- [x] Complete component architecture scaffolded
- [x] ES/EN translations complete
- [x] Brand colors, fonts, Tailwind config
- [ ] Asset migration from tubertico.com (next milestone)
- [ ] Replace placeholder contact info with real data
- [ ] Add real product images and gallery photos
- [ ] Git init and GitHub push
- [ ] DigitalOcean App Platform deploy

## Deploy
```
Build command: npm run build
Output dir:    out
```

## Environment Variables
```
NEXT_PUBLIC_SITE_URL=https://tubertico.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_MAPS_API_KEY=<key>
```
