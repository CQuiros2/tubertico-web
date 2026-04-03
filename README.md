# Tubertico — Sitio Web Corporativo / Corporate Website

Sitio web corporativo estático, bilingüe (ES/EN), para Tubertico — Tubérculos Ticos S.R.L., empresa costarricense especializada en la producción y exportación de hortalizas, raíces y tubérculos frescos con certificaciones GlobalGAP y FSMA.

Static bilingual (ES/EN) corporate website for Tubertico — Tubérculos Ticos S.R.L., a Costa Rican company specializing in the production and export of fresh vegetables, roots and tubers with GlobalGAP and FSMA certifications.

---

## Español

### Qué incluye el sitio

- **Inicio** — Hero con video (Cloudinary), sección Sobre Nosotros, barra de certificaciones, productos destacados, vista previa de galería, CTA de contacto, mapa de ubicación
- **Productos** — Catálogo completo de 14 productos con imágenes y descripciones
- **Galería** — Vista con pestañas (Todos / Productos / Compañía), visualizador a pantalla completa con navegación por teclado
- **Contacto** — Información de contacto, acceso directo a WhatsApp, formulario funcional integrado con Formspree
- **Política de privacidad** — Página legal en español e inglés
- Todas las páginas son bilingües (ES/EN) con detección automática del idioma del navegador y títulos de pestaña correctos por página

### Tecnología

- **Next.js 14** App Router, exportación estática (`output: 'export'`)
- **TypeScript**
- **Tailwind CSS** + `@tailwindcss/typography`
- **next-intl v4** — rutas `/es/` y `/en/` generadas estáticamente, sin middleware
- **Framer Motion** — animaciones de scroll y menú móvil
- **Lucide React** — iconografía (iconos de marca como WhatsApp son SVG en línea)
- **Sharp** — optimización de imágenes (deshabilitada para exportación estática)
- **Destino de despliegue** — DigitalOcean App Platform (sitio estático)

### Estructura del proyecto

```
app/
  layout.tsx                 Fuentes (Inter + Playfair Display), metadata global, favicon
  page.tsx                   Redirección al idioma del navegador (/es o /en)
  [locale]/
    layout.tsx               Proveedor next-intl, Header, Footer
    page.tsx                 Inicio
    productos/page.tsx       Catálogo de productos
    galeria/page.tsx         Galería fotográfica
    contacto/page.tsx        Formulario de contacto
    privacidad/page.tsx      Política de privacidad
  sitemap.ts                 Sitemap automático (/es y /en, todas las rutas)
  robots.ts                  robots.txt

components/
  layout/
    Header.tsx               Barra de navegación fija con menú móvil
    Footer.tsx               Pie de página con redes, contacto y certificaciones
  sections/
    HeroVideo.tsx            Hero con video/poster y animaciones de entrada
    AboutSection.tsx         Sección Sobre Nosotros con pilares de marca
    CertificationsBar.tsx    Logos GlobalGAP y FSMA
    ProductGrid.tsx          Rejilla de productos (modo destacados u catálogo completo)
    GalleryGrid.tsx          Galería con pestañas y visualizador lightbox
    ContactSection.tsx       Variante banner (inicio) y variante completa (página contacto)
    LocationMap.tsx          Mapa embed de Google Maps
  ui/
    Button.tsx               Botón polimórfico (button + Link), 4 variantes
    SectionWrapper.tsx       Contenedor de sección con espaciado consistente
    LangSwitcher.tsx         Selector de idioma ES/EN
    AnimatedSection.tsx      Wrapper de animación Framer Motion en scroll

lib/
  products.ts                14 productos: id, slug, imagen, flag featured
  siteConfig.ts              Contacto, redes sociales, estadísticas de la empresa

messages/
  es.json                    Todos los textos en español
  en.json                    Todos los textos en inglés

public/
  favicon.png                Favicon del sitio
  images/
    logo-color.png           Logotipo (fondos claros)
    logo-white.png           Logotipo (fondos oscuros)
    hero-poster.jpg          Imagen estática del hero (fallback del video)
    certs/                   Logos GlobalGAP y FSMA
    products/                14 imágenes de productos (nombre = slug del producto)
    gallery/                 Imágenes de galería (product-N.jpg, company-N.jpg)
```

### Localización y rutas

El sitio genera dos árboles de páginas estáticas: `/es/` y `/en/`. No hay middleware — la localización se gestiona mediante `next-intl v4` con `generateStaticParams()`.

Todos los textos visibles del sitio viven en `messages/es.json` y `messages/en.json`. Las claves están organizadas por sección (`hero`, `products`, `gallery`, `contact`, `footer`, `pages`). Para cambiar un texto, edite la clave correspondiente en ambos archivos.

La raíz `/` ejecuta una detección de idioma en el cliente (`navigator.language`) y redirige a `/es` o `/en`. Los usuarios siempre pueden cambiar de idioma con el selector ES/EN en la barra de navegación.

### Metadata, títulos y favicon

Los títulos de pestaña siguen el formato `Página | Tubertico` en todas las rutas de ambos idiomas. Esto se gestiona con una plantilla en `app/layout.tsx`:

```ts
title: { template: '%s | Tubertico', default: 'Tubertico' }
```

Cada página exporta `generateMetadata` con su propio título y descripción. La página de inicio incluye su metadata en `app/[locale]/page.tsx`.

El favicon se sirve desde `public/favicon.png` y está declarado en la metadata del layout raíz:

```ts
icons: { icon: '/favicon.png', apple: '/favicon.png' }
```

Para reemplazar el favicon, sustituya el archivo `public/favicon.png` y reconstruya el sitio.

### Imágenes de galería

Las imágenes siguen esta convención de nombres:

```
public/images/gallery/product-1.jpg
public/images/gallery/product-2.jpg
...
public/images/gallery/product-N.jpg

public/images/gallery/company-1.jpg
public/images/gallery/company-2.jpg
...
public/images/gallery/company-N.jpg
```

El componente genera los índices de imagen a partir de contadores declarados en `components/sections/GalleryGrid.tsx`:

```ts
const PRODUCT_COUNT = 12;
const COMPANY_COUNT = 12;
```

Para añadir nuevas imágenes:

1. Suba el archivo a `public/images/gallery/` con el nombre siguiente en la secuencia (por ejemplo, `product-13.jpg`).
2. Incremente el contador correspondiente en `GalleryGrid.tsx`.
3. Reconstruya y redespliegue el sitio.

Los archivos faltantes dentro del rango declarado se omiten automáticamente — no producen errores ni espacios vacíos.

Las imágenes no necesitan ser añadidas de forma consecutiva. Si tiene `product-1.jpg` hasta `product-6.jpg` y `product-12.jpg`, puede definir `PRODUCT_COUNT = 12` y solo aparecerán los archivos presentes.

### Formulario de contacto (Formspree)

El formulario de la página de contacto envía los datos a Formspree. Requiere una variable de entorno con el ID del formulario:

```
NEXT_PUBLIC_FORMSPREE_ID=xxxxxxxx
```

**Importante:** Esta variable se incrusta en el código estático durante el proceso de build. Debe estar definida antes de ejecutar `npm run build`. Si cambia el ID del formulario, debe reconstruir y redesplegar el sitio.

**Para configurar Formspree:**

1. Cree una cuenta en [formspree.io](https://formspree.io).
2. Cree un nuevo formulario y copie el ID (último segmento de la URL del endpoint).
3. Configure el correo de destino en el panel de Formspree (Configuración → Notificaciones).
4. Defina `NEXT_PUBLIC_FORMSPREE_ID=<id>` en el entorno (`.env.local` para desarrollo local; variables de entorno en DigitalOcean para producción).

**Mantenimiento posterior:**

- Para cambiar el correo donde llegan los envíos: panel de Formspree → configuración del formulario.
- Para añadir o renombrar campos: actualice el atributo `name` en los inputs de `components/sections/ContactSection.tsx`. Formspree captura todos los campos enviados automáticamente.

Los estados del formulario (cargando, éxito, error) están traducidos en `messages/es.json` y `messages/en.json` bajo la clave `contact.form`.

### Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | URL canónica del sitio (usada en sitemap) |
| `NEXT_PUBLIC_FORMSPREE_ID` | Sí | ID del formulario en Formspree |
| `NEXT_PUBLIC_GA_ID` | No | ID de Google Analytics (G-XXXXXXXXXX) |

Para desarrollo local, cree un archivo `.env.local` en la raíz del proyecto. Este archivo está en `.gitignore` y no se sube al repositorio.

### Ejecutar localmente

Requiere Node.js 18.x o 20.x.

```bash
npm install
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:3000`. La raíz redirige automáticamente a `/es` o `/en` según el idioma del navegador.

### Construir para producción

```bash
npm run build
```

Genera la carpeta `/out` con el sitio estático completo. Verifique que no haya errores de TypeScript ni de build antes de desplegar.

### Despliegue en DigitalOcean App Platform

El sitio está diseñado para desplegarse como sitio estático en DigitalOcean App Platform.

| Parámetro | Valor |
|---|---|
| Build command | `npm run build` |
| Output directory | `out` |
| Node version | 18.x o 20.x |

Variables de entorno a definir en App Platform antes del primer build:

```
NEXT_PUBLIC_SITE_URL=https://tubertico.com
NEXT_PUBLIC_FORMSPREE_ID=<id del formulario>
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  (opcional)
```

Tras cada cambio en el código o en las variables de entorno, trigger un nuevo build desde el panel de DigitalOcean o mediante push a la rama `main`.

### Mantenimiento de contenido

La mayor parte del contenido del sitio se puede actualizar sin cambiar código:

**Información de contacto y redes sociales** — `lib/siteConfig.ts`
Teléfono, correo, dirección, URLs de LinkedIn, Instagram, Facebook y WhatsApp.

**Catálogo de productos** — `lib/products.ts` y `messages/es.json` / `messages/en.json`
Para añadir o quitar un producto: edite el array en `products.ts`, agregue la imagen en `public/images/products/`, y añada las claves de nombre y descripción en ambos archivos de traducción.

**Textos del sitio** — `messages/es.json` y `messages/en.json`
Todos los textos visibles del sitio están en estos dos archivos. Edite ambos en paralelo para mantener la consistencia bilingüe.

**Imágenes de galería** — ver sección "Imágenes de galería" más arriba.

### Limitaciones operativas conocidas

- **Atributo `lang` en HTML** — El layout raíz declara `lang="es"` para todas las páginas. Esto es una limitación de la exportación estática sin middleware: Next.js requiere que el tag `<html>` esté en el layout raíz, que no tiene acceso al parámetro de locale. En la práctica no afecta el funcionamiento del sitio.
- **Video del hero** — El hero usa actualmente la imagen estática `hero-poster.jpg`. Para activar el video, suba el archivo a `public/videos/hero.mp4`.
- **Google Analytics** — No está configurado por defecto. Defina `NEXT_PUBLIC_GA_ID` en las variables de entorno para habilitarlo.
- **Imágenes de galería pendientes** — Las imágenes `product-7.jpg` a `product-11.jpg` y `company-5.jpg` a `company-11.jpg` aún no han sido subidas. El sitio las omite automáticamente hasta que estén disponibles.

### Versión 1 — Resumen de lanzamiento

**Fecha de lanzamiento:** Abril 2026

Versión 1 es el primer lanzamiento de producción del sitio corporativo de Tubertico. Incluye todas las secciones principales, soporte bilingüe completo, formulario de contacto funcional y diseño responsivo verificado en dispositivos móviles, tablet y escritorio.

**Incluido en v1:**
- Sitio estático bilingüe completamente funcional (ES/EN)
- 14 productos con imágenes y descripciones
- Galería con lightbox y navegación por teclado
- Formulario de contacto conectado a Formspree
- Navegación móvil con drawer, bloqueo de scroll y soporte para iOS Safari
- Títulos de pestaña por página, favicon y metadata SEO básico
- Mapa de ubicación, política de privacidad, sitemap y robots.txt
- Crédito de desarrollo en el pie de página

**Pendiente para versiones futuras:**
- Video del hero (`public/videos/hero.mp4`)
- Imágenes de galería restantes
- Google Analytics
- Posible integración de formulario con validación avanzada o backend propio

---

## English

### What the site includes

- **Homepage** — Video hero (Cloudinary), About section, certifications bar, featured products, gallery preview, contact CTA, location map
- **Products** — Full catalog of 14 products with images and bilingual descriptions
- **Gallery** — Tabbed view (All / Products / Company), fullscreen lightbox with keyboard navigation
- **Contact** — Contact details, WhatsApp shortcut, functional form integrated with Formspree
- **Privacy policy** — Legal page in Spanish and English
- All pages are bilingual (ES/EN) with automatic browser language detection and correct per-page tab titles

### Stack

- **Next.js 14** App Router with static export (`output: 'export'`)
- **TypeScript**
- **Tailwind CSS** + `@tailwindcss/typography`
- **next-intl v4** — `/es/` and `/en/` routes generated statically, no middleware
- **Framer Motion** — scroll animations and mobile drawer
- **Lucide React** — icons (brand icons such as WhatsApp are inline SVG)
- **Sharp** — image optimization (disabled for static export)
- **Deploy target** — DigitalOcean App Platform (static site)

### Project structure

```
app/
  layout.tsx                 Fonts (Inter + Playfair Display), global metadata, favicon
  page.tsx                   Browser-language redirect to /es or /en
  [locale]/
    layout.tsx               next-intl provider, Header, Footer
    page.tsx                 Homepage
    productos/page.tsx       Product catalog
    galeria/page.tsx         Photo gallery
    contacto/page.tsx        Contact form
    privacidad/page.tsx      Privacy policy
  sitemap.ts                 Auto-generated sitemap (/es and /en, all routes)
  robots.ts                  robots.txt

components/
  layout/
    Header.tsx               Fixed navigation bar with mobile drawer
    Footer.tsx               Footer with social links, contact info, certifications
  sections/
    HeroVideo.tsx            Video/poster hero with entrance animations
    AboutSection.tsx         About section with brand pillars
    CertificationsBar.tsx    GlobalGAP and FSMA logos
    ProductGrid.tsx          Product grid (featured mode or full catalog)
    GalleryGrid.tsx          Tabbed gallery with fullscreen lightbox
    ContactSection.tsx       Banner variant (homepage) and full variant (contact page)
    LocationMap.tsx          Google Maps embed
  ui/
    Button.tsx               Polymorphic button (button + Link), 4 variants
    SectionWrapper.tsx       Section container with consistent spacing
    LangSwitcher.tsx         ES/EN language toggle
    AnimatedSection.tsx      Framer Motion scroll-reveal wrapper

lib/
  products.ts                14 products: id, slug, image path, featured flag
  siteConfig.ts              Contact info, social links, company stats

messages/
  es.json                    All Spanish strings
  en.json                    All English strings

public/
  favicon.png                Site favicon
  images/
    logo-color.png           Logo (light backgrounds)
    logo-white.png           Logo (dark backgrounds)
    hero-poster.jpg          Static hero image (video fallback)
    certs/                   GlobalGAP and FSMA logos
    products/                14 product images (filename matches product slug)
    gallery/                 Gallery images (product-N.jpg, company-N.jpg)
```

### Routing and localization

The site generates two static page trees: `/es/` and `/en/`. There is no middleware — localization is handled by next-intl v4 with `generateStaticParams()`.

All visible text lives in `messages/es.json` and `messages/en.json`. Keys are organized by section (`hero`, `products`, `gallery`, `contact`, `footer`, `pages`). To change a string, edit the corresponding key in both files.

The root `/` runs a client-side language detection (`navigator.language`) and redirects to `/es` or `/en`. Users can switch languages at any time using the ES/EN toggle in the navigation bar.

### Metadata, titles and favicon

Page titles follow the format `Page | Tubertico` across all routes in both languages. This is handled with a template in `app/layout.tsx`:

```ts
title: { template: '%s | Tubertico', default: 'Tubertico' }
```

Each page exports `generateMetadata` with its own title and description. The homepage metadata is in `app/[locale]/page.tsx`.

The favicon is served from `public/favicon.png` and declared in the root layout metadata:

```ts
icons: { icon: '/favicon.png', apple: '/favicon.png' }
```

To replace the favicon, substitute `public/favicon.png` and rebuild the site.

### Gallery images

Images follow this naming convention:

```
public/images/gallery/product-1.jpg
public/images/gallery/product-2.jpg
...
public/images/gallery/product-N.jpg

public/images/gallery/company-1.jpg
public/images/gallery/company-2.jpg
...
public/images/gallery/company-N.jpg
```

The gallery component generates image indices from counters declared at the top of `components/sections/GalleryGrid.tsx`:

```ts
const PRODUCT_COUNT = 12;
const COMPANY_COUNT = 12;
```

To add new images:

1. Upload the file to `public/images/gallery/` using the next number in the sequence (for example, `product-13.jpg`).
2. Increment the relevant counter in `GalleryGrid.tsx`.
3. Rebuild and redeploy the site.

Files missing within the declared range are skipped automatically — they produce no errors and leave no gaps in the grid.

Images do not need to be sequential. If you have `product-1.jpg` through `product-6.jpg` and `product-12.jpg`, you can set `PRODUCT_COUNT = 12` and only the files that exist will appear.

### Contact form (Formspree)

The contact page form submits data to Formspree. It requires one environment variable:

```
NEXT_PUBLIC_FORMSPREE_ID=xxxxxxxx
```

**Important:** This variable is embedded into the static output at build time. It must be defined before running `npm run build`. If you change the form ID, you must rebuild and redeploy the site.

**To configure Formspree:**

1. Create an account at [formspree.io](https://formspree.io).
2. Create a new form and copy the form ID (the last segment of the endpoint URL shown).
3. Set the destination email in the Formspree dashboard (Settings → Notifications).
4. Set `NEXT_PUBLIC_FORMSPREE_ID=<id>` in your environment (`.env.local` for local development; environment variables in DigitalOcean for production).

**Ongoing maintenance:**

- To change which email receives submissions: Formspree dashboard → form settings.
- To add or rename form fields: update the `name` attribute on the relevant input in `components/sections/ContactSection.tsx`. Formspree captures all submitted fields automatically — no dashboard changes required.

Form status strings (loading, success, error) are in `messages/es.json` and `messages/en.json` under the `contact.form` key.

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL (used in sitemap) |
| `NEXT_PUBLIC_FORMSPREE_ID` | Yes | Formspree form ID |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics ID (G-XXXXXXXXXX) |

For local development, create a `.env.local` file in the project root. This file is in `.gitignore` and will not be committed to the repository.

### Local development

Requires Node.js 18.x or 20.x.

```bash
npm install
npm run dev
```

The development server will be available at `http://localhost:3000`. The root path redirects automatically to `/es` or `/en` based on browser language.

### Build and deploy

**Build:**

```bash
npm run build
```

This outputs the complete static site to the `/out` directory. Confirm there are no TypeScript errors before deploying.

**Deploy on DigitalOcean App Platform:**

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `out` |
| Node version | 18.x or 20.x |

Set the following environment variables in App Platform before the first build:

```
NEXT_PUBLIC_SITE_URL=https://tubertico.com
NEXT_PUBLIC_FORMSPREE_ID=<your form id>
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  (optional)
```

After any code change or environment variable update, trigger a new build from the DigitalOcean dashboard or by pushing to the `main` branch.

### Content maintenance

Most site content can be updated without changing code:

**Contact info and social links** — `lib/siteConfig.ts`
Phone, email, address, and URLs for LinkedIn, Instagram, Facebook, and WhatsApp.

**Product catalog** — `lib/products.ts` and `messages/es.json` / `messages/en.json`
To add or remove a product: edit the array in `products.ts`, add the image to `public/images/products/`, and add the name and description keys to both translation files.

**Site copy** — `messages/es.json` and `messages/en.json`
All visible text is in these two files. Edit both in parallel to keep the bilingual content consistent.

**Gallery images** — see the gallery section above.

### Known limitations

- **HTML `lang` attribute** — The root layout declares `lang="es"` for all pages. This is a static export limitation: Next.js requires the `<html>` tag to be in the root layout, which does not have access to the locale parameter. It does not affect site functionality.
- **Hero video** — The hero currently uses the static image `hero-poster.jpg`. To activate the video, upload the file to `public/videos/hero.mp4`.
- **Google Analytics** — Not configured by default. Set `NEXT_PUBLIC_GA_ID` in environment variables to enable it.
- **Pending gallery images** — `product-7.jpg` through `product-11.jpg` and `company-5.jpg` through `company-11.jpg` have not been uploaded yet. The site skips them automatically until they are available.

### Version 1 release

**Release date:** April 2026

Version 1 is the first production release of the Tubertico corporate website. It includes all main sections, full bilingual support, a functional contact form, and a responsive layout verified on mobile, tablet, and desktop.

**Included in v1:**
- Fully functional static bilingual site (ES/EN)
- 14 products with images and descriptions
- Gallery with lightbox and keyboard navigation
- Contact form connected to Formspree
- Mobile navigation with drawer, scroll lock, and iOS Safari support
- Per-page tab titles, favicon, and basic SEO metadata
- Location map, privacy policy, sitemap, and robots.txt
- Developer credit in the footer

**Pending for future releases:**
- Hero video (`public/videos/hero.mp4`)
- Remaining gallery images
- Google Analytics
- Possible contact form upgrade with advanced validation or a custom backend
