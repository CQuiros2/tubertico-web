# Tubertico — Sitio Web Corporativo / Corporate Website

Sitio web corporativo bilingüe (español e inglés) para Tubertico — Tubérculos Ticos S.R.L., empresa costarricense exportadora de hortalizas, raíces y tubérculos frescos.

Bilingual corporate website (Spanish and English) for Tubertico — Tubérculos Ticos S.R.L., a Costa Rican exporter of fresh vegetables, roots and tubers.

---

## Español

### Tecnología

- **Next.js 14** con App Router y exportación estática (`output: 'export'`)
- **TypeScript**
- **Tailwind CSS**
- **next-intl v4** — rutas `/es` y `/en` generadas estáticamente
- **Framer Motion** — animaciones de scroll y menú móvil
- **DigitalOcean App Platform** — destino de despliegue (sitio estático)

### Estructura principal

```
app/
  layout.tsx              Fuentes (Inter + Playfair Display), metadata global
  page.tsx                Redirección automática según idioma del navegador
  [locale]/
    layout.tsx            Proveedor next-intl, Header, Footer
    page.tsx              Inicio
    productos/page.tsx    Catálogo de productos
    galeria/page.tsx      Galería fotográfica
    contacto/page.tsx     Contacto
    privacidad/page.tsx   Política de privacidad

components/
  layout/   Header, Footer
  sections/ HeroVideo, AboutSection, CertificationsBar, ProductGrid,
            GalleryGrid, ContactSection, LocationMap
  ui/       Button, SectionWrapper, LangSwitcher, AnimatedSection

lib/
  products.ts    14 productos con slugs e imágenes
  siteConfig.ts  Contacto, redes sociales, estadísticas

messages/
  es.json   Textos en español
  en.json   Textos en inglés

public/
  favicon.png          Ícono del sitio
  images/
    logo-color.png     Logotipo (fondos claros)
    logo-white.png     Logotipo (fondos oscuros)
    certs/             Logos GlobalGAP y FSMA
    products/          14 imágenes de productos
    gallery/           Imágenes de galería (product-N.jpg, company-N.jpg)
```

### Localización

El sitio genera dos versiones estáticas: `/es/` y `/en/`. Los textos viven en `messages/es.json` y `messages/en.json`. Para añadir o cambiar un texto, edite la clave correspondiente en ambos archivos. La detección automática de idioma se hace en el cliente al cargar la raíz (`app/page.tsx`).

### Imágenes de galería

Las imágenes siguen la convención:

```
public/images/gallery/product-1.jpg  ... product-N.jpg
public/images/gallery/company-1.jpg  ... company-N.jpg
```

Para añadir nuevas imágenes:

1. Suba el archivo a `public/images/gallery/` con el nombre siguiente en la secuencia.
2. Incremente la constante correspondiente en `components/sections/GalleryGrid.tsx`:
   ```ts
   const PRODUCT_COUNT = 12;   // aumentar si agrega product-N.jpg
   const COMPANY_COUNT = 12;   // aumentar si agrega company-N.jpg
   ```
3. Ejecute `npm run build`. No se requiere ningún otro cambio.

Los archivos faltantes dentro del rango se omiten automáticamente.

### Ejecutar localmente

```bash
npm install
npm run dev       # http://localhost:3000
```

### Construir para producción

```bash
npm run build     # genera la carpeta /out
```

### Despliegue en DigitalOcean App Platform

| Parámetro       | Valor            |
|-----------------|------------------|
| Build command   | `npm run build`  |
| Output dir      | `out`            |
| Node version    | 18.x o 20.x      |

Variables de entorno opcionales:

```
NEXT_PUBLIC_SITE_URL=https://tubertico.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## English

### Stack

- **Next.js 14** App Router with static export (`output: 'export'`)
- **TypeScript**
- **Tailwind CSS**
- **next-intl v4** — `/es` and `/en` routes generated statically
- **Framer Motion** — scroll animations and mobile drawer
- **DigitalOcean App Platform** — deploy target (static site)

### Project structure

```
app/
  layout.tsx              Fonts (Inter + Playfair Display), global metadata
  page.tsx                Browser-language redirect to /es or /en
  [locale]/
    layout.tsx            next-intl provider, Header, Footer
    page.tsx              Homepage
    productos/page.tsx    Product catalog
    galeria/page.tsx      Photo gallery
    contacto/page.tsx     Contact
    privacidad/page.tsx   Privacy policy

components/
  layout/   Header, Footer
  sections/ HeroVideo, AboutSection, CertificationsBar, ProductGrid,
            GalleryGrid, ContactSection, LocationMap
  ui/       Button, SectionWrapper, LangSwitcher, AnimatedSection

lib/
  products.ts    14 products with slugs and images
  siteConfig.ts  Contact info, social links, stats

messages/
  es.json   Spanish strings
  en.json   English strings

public/
  favicon.png          Site icon
  images/
    logo-color.png     Logo (light backgrounds)
    logo-white.png     Logo (dark backgrounds)
    certs/             GlobalGAP and FSMA logos
    products/          14 product images
    gallery/           Gallery images (product-N.jpg, company-N.jpg)
```

### Localization

The site statically generates two versions: `/es/` and `/en/`. All copy lives in `messages/es.json` and `messages/en.json`. To change a string, edit the corresponding key in both files. Automatic language detection runs client-side on the root page (`app/page.tsx`).

### Gallery images

Images follow this convention:

```
public/images/gallery/product-1.jpg  ... product-N.jpg
public/images/gallery/company-1.jpg  ... company-N.jpg
```

To add new images:

1. Upload the file to `public/images/gallery/` using the next number in sequence.
2. Increment the relevant constant in `components/sections/GalleryGrid.tsx`:
   ```ts
   const PRODUCT_COUNT = 12;   // increment when adding product-N.jpg
   const COMPANY_COUNT = 12;   // increment when adding company-N.jpg
   ```
3. Run `npm run build`. No other code changes needed.

Files missing within the declared range are skipped automatically.

### Run locally

```bash
npm install
npm run dev       # http://localhost:3000
```

### Build for production

```bash
npm run build     # outputs to /out
```

### Deploy on DigitalOcean App Platform

| Setting         | Value            |
|-----------------|------------------|
| Build command   | `npm run build`  |
| Output dir      | `out`            |
| Node version    | 18.x or 20.x     |

Optional environment variables:

```
NEXT_PUBLIC_SITE_URL=https://tubertico.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
