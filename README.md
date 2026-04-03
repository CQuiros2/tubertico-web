<!-- EN / ES toggle -->
<div align="center">

[🇺🇸 English](#english) &nbsp;|&nbsp; [🇨🇷 Español](#español)

</div>

---

<div align="center">

# Tubertico

**Corporate Website · Sitio Web Corporativo**  
Static bilingual website for Tubertico — Tubérculos Ticos S.R.L.  
Sitio web corporativo bilingüe para Tubertico — Tubérculos Ticos S.R.L.

[![Website](https://img.shields.io/badge/Website-tubertico.com-6B7A1F?style=flat&logo=googlechrome&logoColor=white)](https://tubertico.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat&logo=nextdotjs&logoColor=white)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)]()
[![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)]()
[![Formspree](https://img.shields.io/badge/Form-Formspree-E5122E?style=flat&logo=gmail&logoColor=white)]()

</div>

---

<a name="english"></a>

## English

### Overview

Tubertico is a bilingual corporate website built for **Tubérculos Ticos S.R.L.**, a Costa Rican company focused on the production and export of vegetables, roots, and tubers. The site is designed as a static, production-ready marketing website with a premium visual direction, responsive layout, and clear export-oriented messaging.

This repository contains the public-facing website only. It does not include the company’s ERP or internal operational systems.

---

### What is included in v1

- Bilingual public website in **Spanish and English**
- Responsive layout for **mobile, tablet, laptop, and desktop**
- Homepage with:
  - hero video and fallback poster
  - company overview
  - certifications section
  - featured products
  - gallery preview
  - contact CTA
  - location map
- Full products page with:
  - product card catalog
  - bilingual visual catalog carousel
- Full gallery with:
  - category tabs
  - fullscreen lightbox
  - keyboard navigation
- Functional contact form integrated with **Formspree**
- Privacy policy page
- Per-page metadata, favicon, sitemap, and robots.txt
- Mobile drawer navigation and responsive UX refinements

---

### Tech stack

**Framework**
- Next.js 14
- App Router
- Static export (`output: 'export'`)

**Language**
- TypeScript

**Styling**
- Tailwind CSS
- `@tailwindcss/typography`

**Localization**
- `next-intl` v4

**Animation / UI**
- Framer Motion
- Lucide React

**Forms**
- Formspree

**Deployment target**
- DigitalOcean App Platform

---

### Site structure

- `/es` — Spanish homepage
- `/en` — English homepage
- `/es/productos` and `/en/productos` — product catalog + visual catalog carousel
- `/es/galeria` and `/en/galeria` — gallery with lightbox
- `/es/contacto` and `/en/contacto` — contact page with Formspree form
- `/es/privacidad` and `/en/privacidad` — privacy policy

The root `/` detects browser language and redirects to `/es` or `/en`.

---

### Project structure

```bash
app/
  layout.tsx
  page.tsx
  [locale]/
    layout.tsx
    page.tsx
    productos/page.tsx
    galeria/page.tsx
    contacto/page.tsx
    privacidad/page.tsx
  sitemap.ts
  robots.ts

components/
  layout/
    Header.tsx
    Footer.tsx
  sections/
    HeroVideo.tsx
    AboutSection.tsx
    CertificationsBar.tsx
    ProductGrid.tsx
    GalleryGrid.tsx
    CatalogCarousel.tsx
    ContactSection.tsx
    LocationMap.tsx
  ui/
    Button.tsx
    SectionWrapper.tsx
    LangSwitcher.tsx
    AnimatedSection.tsx

lib/
  products.ts
  siteConfig.ts

messages/
  es.json
  en.json

public/
  favicon.png
  images/
    logo-color.png
    logo-white.png
    hero-poster.jpg
    certs/
    products/
    gallery/
    catalog/
      es/
      en/
```

---

### Localization

All visible text is maintained in:

- `messages/es.json`
- `messages/en.json`

If you update content, always update both files to keep the site aligned in both languages.

---

### Hero video behavior

The homepage hero supports video plus poster fallback.

Current behavior:
- the hero attempts to load the active video source
- if the video does not load, the poster image still provides a complete visual fallback
- the experience should remain visually polished with or without the video

If you ever want to replace the hero media:
- update the video source used in `HeroVideo.tsx`
- keep a valid fallback poster in `public/images/hero-poster.jpg`

---

### Product catalog maintenance

Structured product data lives in:

- `lib/products.ts`
- `messages/es.json`
- `messages/en.json`

To add or update a product:
1. edit the product array in `lib/products.ts`
2. upload the product image to `public/images/products/`
3. update the name and description keys in both translation files

---

### Gallery maintenance workflow

Gallery images follow this naming convention:

```bash
public/images/gallery/product-1.jpg
public/images/gallery/product-2.jpg
...
public/images/gallery/company-1.jpg
public/images/gallery/company-2.jpg
...
```

The gallery is controlled by counters in `components/sections/GalleryGrid.tsx`.

To add more images:
1. upload the next file in sequence
2. increment the relevant counter
3. rebuild and redeploy

This keeps the maintenance workflow simple for non-technical content updates.

---

### Visual catalog carousel

The products page includes a bilingual visual catalog / brochure section.

Structure:
- `public/images/catalog/es/`
- `public/images/catalog/en/`

Behavior:
- Spanish pages load the Spanish slides
- English pages load the English slides
- slides can be browsed as a carousel
- slides can be opened larger in a fullscreen viewer

This section complements the product cards. It is not intended to imply that the site shows every product the company exports.

---

### Contact form

The contact form is connected to **Formspree**.

Required environment variable:

```bash
NEXT_PUBLIC_FORMSPREE_ID=your_form_id
```

Notes:
- this value is embedded at build time
- if the Formspree ID changes, the site must be rebuilt and redeployed
- the receiving email is configured in Formspree, not in the codebase

---

### Environment variables

```bash
NEXT_PUBLIC_SITE_URL=https://tubertico.com
NEXT_PUBLIC_FORMSPREE_ID=your_form_id
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Required for production:
- `NEXT_PUBLIC_FORMSPREE_ID`

Recommended:
- `NEXT_PUBLIC_SITE_URL`

Optional:
- `NEXT_PUBLIC_GA_ID`

---

### Local development

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

---

### Production build

```bash
npm run build
```

This generates the static output in:

```bash
out/
```

---

### DigitalOcean deployment notes

Recommended App Platform configuration:

- **Type:** Static Site
- **Build command:** `npm run build`
- **Output directory:** `out`
- **Node version:** 18.x or 20.x

Before the first production build, define:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_FORMSPREE_ID`
- `NEXT_PUBLIC_GA_ID` if analytics is used

---

### Known limitations / optional future improvements

These are not blockers for v1, but may be improved later:

- optional hero media refinement if a new approved video version is preferred
- Google Analytics integration if tracking is required
- additional gallery and catalog content as new marketing material becomes available
- richer contact form validation or a custom backend form handler if needed in the future

---

### Version 1 summary

**Release:** `v1.0.0`

Version 1 is the first production-ready release of the Tubertico corporate website. It includes the full bilingual public experience, responsive layout, completed gallery, functional contact form, and the visual catalog enhancement on the products page.

---

<a name="español"></a>

## Español

### Descripción general

Tubertico es un sitio web corporativo bilingüe construido para **Tubérculos Ticos S.R.L.**, empresa costarricense enfocada en la producción y exportación de hortalizas, raíces y tubérculos. El sitio fue diseñado como una web estática, profesional y lista para producción, con una dirección visual premium, diseño responsivo y comunicación orientada al mercado exportador.

Este repositorio contiene únicamente el sitio web público. No incluye el ERP ni los sistemas internos de operación de la empresa.

---

### Qué incluye la versión 1

- Sitio público bilingüe en **español e inglés**
- Diseño responsivo para **móvil, tablet, laptop y escritorio**
- Inicio con:
  - hero con video y poster de respaldo
  - sección institucional
  - bloque de certificaciones
  - productos destacados
  - vista previa de galería
  - CTA de contacto
  - mapa de ubicación
- Página completa de productos con:
  - catálogo en tarjetas
  - carrusel visual bilingüe tipo brochure
- Galería completa con:
  - pestañas por categoría
  - lightbox a pantalla completa
  - navegación por teclado
- Formulario de contacto funcional integrado con **Formspree**
- Página de política de privacidad
- Metadata por página, favicon, sitemap y robots.txt
- Menú móvil tipo drawer y ajustes finales de experiencia responsiva

---

### Stack tecnológico

**Framework**
- Next.js 14
- App Router
- Exportación estática (`output: 'export'`)

**Lenguaje**
- TypeScript

**Estilos**
- Tailwind CSS
- `@tailwindcss/typography`

**Localización**
- `next-intl` v4

**Animación / UI**
- Framer Motion
- Lucide React

**Formularios**
- Formspree

**Destino de despliegue**
- DigitalOcean App Platform

---

### Estructura del sitio

- `/es` — inicio en español
- `/en` — inicio en inglés
- `/es/productos` y `/en/productos` — catálogo de productos + catálogo visual
- `/es/galeria` y `/en/galeria` — galería con lightbox
- `/es/contacto` y `/en/contacto` — página de contacto con Formspree
- `/es/privacidad` y `/en/privacidad` — política de privacidad

La raíz `/` detecta el idioma del navegador y redirige automáticamente a `/es` o `/en`.

---

### Estructura del proyecto

```bash
app/
  layout.tsx
  page.tsx
  [locale]/
    layout.tsx
    page.tsx
    productos/page.tsx
    galeria/page.tsx
    contacto/page.tsx
    privacidad/page.tsx
  sitemap.ts
  robots.ts

components/
  layout/
    Header.tsx
    Footer.tsx
  sections/
    HeroVideo.tsx
    AboutSection.tsx
    CertificationsBar.tsx
    ProductGrid.tsx
    GalleryGrid.tsx
    CatalogCarousel.tsx
    ContactSection.tsx
    LocationMap.tsx
  ui/
    Button.tsx
    SectionWrapper.tsx
    LangSwitcher.tsx
    AnimatedSection.tsx

lib/
  products.ts
  siteConfig.ts

messages/
  es.json
  en.json

public/
  favicon.png
  images/
    logo-color.png
    logo-white.png
    hero-poster.jpg
    certs/
    products/
    gallery/
    catalog/
      es/
      en/
```

---

### Localización

Todos los textos visibles del sitio se mantienen en:

- `messages/es.json`
- `messages/en.json`

Si se actualiza contenido, deben editarse ambos archivos para mantener consistencia en los dos idiomas.

---

### Comportamiento del hero en video

El hero de la página principal soporta video con poster de respaldo.

Comportamiento actual:
- el hero intenta cargar la fuente de video activa
- si el video no carga, la imagen poster mantiene una presentación visual completa
- la experiencia debe verse bien tanto con video como sin video

Si en el futuro quieres reemplazar el media del hero:
- actualiza la fuente de video en `HeroVideo.tsx`
- conserva una imagen de respaldo válida en `public/images/hero-poster.jpg`

---

### Mantenimiento del catálogo de productos

La estructura del catálogo vive en:

- `lib/products.ts`
- `messages/es.json`
- `messages/en.json`

Para agregar o editar un producto:
1. modifica el arreglo en `lib/products.ts`
2. sube la imagen correspondiente a `public/images/products/`
3. actualiza nombre y descripción en ambos archivos de traducción

---

### Flujo de mantenimiento de la galería

Las imágenes de galería usan esta convención:

```bash
public/images/gallery/product-1.jpg
public/images/gallery/product-2.jpg
...
public/images/gallery/company-1.jpg
public/images/gallery/company-2.jpg
...
```

La galería se controla con contadores dentro de `components/sections/GalleryGrid.tsx`.

Para agregar más imágenes:
1. sube el siguiente archivo en secuencia
2. incrementa el contador correspondiente
3. reconstruye y redespliega

Esto permite mantener la galería de forma simple cuando la empresa recibe nuevas fotos.

---

### Carrusel de catálogo visual

La página de productos incluye una sección adicional de catálogo visual bilingüe.

Estructura:
- `public/images/catalog/es/`
- `public/images/catalog/en/`

Comportamiento:
- las páginas en español cargan las láminas en español
- las páginas en inglés cargan las láminas en inglés
- las láminas se pueden recorrer en carrusel
- también se pueden abrir en un visualizador a pantalla completa

Esta sección complementa las tarjetas de productos. No pretende comunicar que el sitio muestra la totalidad de productos exportados por la empresa.

---

### Formulario de contacto

El formulario de contacto está conectado a **Formspree**.

Variable requerida:

```bash
NEXT_PUBLIC_FORMSPREE_ID=your_form_id
```

Notas:
- este valor queda incrustado durante el build
- si cambia el ID de Formspree, hay que reconstruir y redesplegar
- el correo que recibe los envíos se configura desde Formspree, no desde el código

---

### Variables de entorno

```bash
NEXT_PUBLIC_SITE_URL=https://tubertico.com
NEXT_PUBLIC_FORMSPREE_ID=your_form_id
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Requerida para producción:
- `NEXT_PUBLIC_FORMSPREE_ID`

Recomendada:
- `NEXT_PUBLIC_SITE_URL`

Opcional:
- `NEXT_PUBLIC_GA_ID`

---

### Desarrollo local

```bash
npm install
npm run dev
```

Luego abre:

```bash
http://localhost:3000
```

---

### Build de producción

```bash
npm run build
```

Esto genera la salida estática en:

```bash
out/
```

---

### Notas de despliegue en DigitalOcean

Configuración recomendada en App Platform:

- **Tipo:** Static Site
- **Build command:** `npm run build`
- **Output directory:** `out`
- **Node version:** 18.x o 20.x

Antes del primer build en producción, define:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_FORMSPREE_ID`
- `NEXT_PUBLIC_GA_ID` si vas a usar analítica

---

### Limitaciones conocidas / mejoras opcionales

No son bloqueantes para v1, pero pueden mejorarse después:

- refinamiento opcional del hero si se decide cambiar el video aprobado
- integración de Google Analytics si la empresa requiere medición
- más contenido visual en galería y catálogo conforme aparezca nuevo material comercial
- validación más avanzada del formulario o backend propio si en el futuro se necesita

---

### Resumen de versión 1

**Release:** `v1.0.0`

La versión 1 es el primer lanzamiento público listo para producción del sitio web corporativo de Tubertico. Incluye la experiencia bilingüe completa, diseño responsivo, galería terminada, formulario funcional y el nuevo catálogo visual dentro de la página de productos.

---

<div align="center">
<sub>Built for production use and ongoing content maintenance.</sub>
</div>
