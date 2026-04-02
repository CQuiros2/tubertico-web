# Tubertico — Corporate Website

## Stack
- **Next.js 14** App Router
- **TypeScript**
- **Tailwind CSS** + `@tailwindcss/typography`
- **next-intl v4** — bilingual ES/EN, static export (no middleware)
- **framer-motion** — scroll animations, mobile drawer
- **lucide-react v1.x** — icons (brand icons removed in v1.x, use inline SVGs for LinkedIn/Instagram/Facebook/WhatsApp)
- **sharp** — image optimization (unoptimized: true for static export)
- **Deploy target**: DigitalOcean App Platform — Static Site

## Architecture Decisions

### Static Export + next-intl
- No `middleware.ts` — incompatible with `output: 'export'`
- `i18n/request.ts` loads locale from `requestLocale` param
- `generateStaticParams()` in `app/[locale]/layout.tsx` produces `/es` and `/en` routes
- `setRequestLocale(locale)` called in every layout and page
- Root `app/page.tsx` redirects to `/es`

### Brand Colors (Tailwind)
From the real tubertico.com site — do NOT revert to dark green:
- `brand-green` `#5f6c2c` — olive green (primary)
- `brand-green-dark` `#3d4620` — footer/hero dark
- `brand-green-mid` `#748535` — hover states
- `brand-orange` `#c75c19` — CTA accent (was amber in early scaffold)
- `brand-cream` `#fafaf5` — section backgrounds

### Fonts
- `font-sans`: Inter (body text, via `next/font/google`)
- `font-display`: Playfair Display (headings, via `next/font/google`)

## File Structure
```
app/
  layout.tsx                  ← Root layout (Inter + Playfair fonts)
  page.tsx                    ← Redirects to /es
  [locale]/
    layout.tsx                ← NextIntlClientProvider + Header + Footer
    page.tsx                  ← Landing (Hero + Products + Gallery + Contact CTA)
    productos/page.tsx
    galeria/page.tsx
    contacto/page.tsx
  sitemap.ts                  ← Auto-generates /es and /en routes
  robots.ts

components/
  layout/
    Header.tsx                ← Sticky glassmorphism, real logo, mobile drawer
    Footer.tsx                ← 4-col, real cert logos, FB/IG/LI/WA icons (inline SVG)
  sections/
    HeroVideo.tsx             ← Fullscreen video/poster hero, framer-motion CTAs
    ProductGrid.tsx           ← 14 real products, featured filter
    GalleryGrid.tsx           ← Tabbed (Todos/Productos/Compañía), real images
    ContactSection.tsx        ← Banner variant + full form+map variant
  ui/
    Button.tsx                ← Polymorphic (button + Link), 4 variants
    SectionWrapper.tsx        ← Padded section container
    LangSwitcher.tsx          ← Toggle pill ES/EN
    AnimatedSection.tsx       ← Framer motion scroll reveal (client component)

lib/
  products.ts                 ← 14 real products, getFeaturedProducts()
  siteConfig.ts               ← Real contact info, social links, stats, locales

messages/
  es.json                     ← All Spanish strings (real content)
  en.json                     ← All English strings (real content)

public/
  videos/                     ← hero.mp4 placeholder (no video on live site)
  images/
    logo-color.png            ← Real logo (color, for light backgrounds)
    logo-white.png            ← Real logo (white, for dark backgrounds)
    hero-poster.jpg           ← fotofinca.jpg from live site
    certs/
      logo-globalgap.png      ← GlobalGAP V6.0 GFSI
      logo-fsma.png           ← FSMA (FDA)
    products/                 ← 14 product images (all downloaded)
    gallery/                  ← 12 images downloaded (7 product + 5 company)
                                 Remaining need manual upload (server rate-limited)
```

## Real Content (from tubertico.com)
- **Company**: Costa Rican, 20+ years, Roxana, Pococí, Limón
- **Tagline**: "Calidad en la que pueda confiar" / "Quality You Can Trust"
- **Email**: info@tubertico.com / pablo@tubertico.com
- **Phone**: +506 8973-2830 / +506 8948-4292 / +506 8388-5918
- **WhatsApp**: https://wa.me/50689732830
- **Certifications**: GlobalGAP V6.0 GFSI, FSMA (FDA)
- **Social**: LinkedIn (cr.linkedin.com/company/tubertico), Instagram (@tubertico.cr), Facebook

## Gallery — Manual Asset Checklist

All gallery images must be placed in:
```
public/images/gallery/
```

No code changes are needed after adding files — the component reads the full 1–12
range for both types automatically. Just add the files and rebuild.

### Product images (`tab: Productos`)
| Filename | Status |
|---|---|
| `product-1.jpg` | ✅ present |
| `product-2.jpg` | ✅ present |
| `product-3.jpg` | ✅ present |
| `product-4.jpg` | ✅ present |
| `product-5.jpg` | ✅ present |
| `product-6.jpg` | ✅ present |
| `product-7.jpg` | ⬜ missing — add manually |
| `product-8.jpg` | ⬜ missing — add manually |
| `product-9.jpg` | ⬜ missing — add manually |
| `product-10.jpg` | ⬜ missing — add manually |
| `product-11.jpg` | ⬜ missing — add manually |
| `product-12.jpg` | ✅ present |

### Company images (`tab: Compañía`)
| Filename | Status |
|---|---|
| `company-1.jpg` | ✅ present |
| `company-2.jpg` | ✅ present |
| `company-3.jpg` | ✅ present |
| `company-4.jpg` | ✅ present |
| `company-5.jpg` | ⬜ missing — add manually |
| `company-6.jpg` | ⬜ missing — add manually |
| `company-7.jpg` | ⬜ missing — add manually |
| `company-8.jpg` | ⬜ missing — add manually |
| `company-9.jpg` | ⬜ missing — add manually |
| `company-10.jpg` | ⬜ missing — add manually |
| `company-11.jpg` | ⬜ missing — add manually |
| `company-12.jpg` | ✅ present |

Source filenames on the old site: `productos1.jpg`…`productos12.jpg` and `compania1.jpg`…`compania12.jpg`
(available at `https://tubertico.com/img/`)

After adding files: run `npm run build` — no component edits required.

## Milestone Status
- [x] Project initialized — Next.js 14 + TS + Tailwind + next-intl v4
- [x] Full component architecture scaffolded and building clean
- [x] 15 static pages generated (`/es`, `/en` × 4 routes + root + sitemap + robots)
- [x] ES/EN translations with real content
- [x] Brand palette updated to real site colors
- [x] Real logos, hero photo, cert logos downloaded
- [x] All 14 product images downloaded
- [x] 12 gallery images downloaded (server rate-limited remaining)
- [x] siteConfig.ts, products.ts populated with real data
- [x] Committed and pushed to `CQuiros2/tubertico-web` — `main`
- [ ] Upload remaining gallery images manually (product-7–11, company-5–11)
- [ ] Add hero video if one exists (currently using hero-poster.jpg)
- [ ] DigitalOcean App Platform setup (build: `npm run build`, output: `out`)
- [ ] Connect custom domain + DNS
- [ ] Add Google Analytics ID to env vars (`NEXT_PUBLIC_GA_ID`)
- [ ] Add Google Maps API key (`NEXT_PUBLIC_MAPS_API_KEY`)

## Deploy
```
Build command:  npm run build
Output dir:     out
Node version:   18.x or 20.x
```

## Environment Variables
```
NEXT_PUBLIC_SITE_URL=https://tubertico.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_MAPS_API_KEY=<key>
```
