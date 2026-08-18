# Tubertico — guía del proyecto

Web corporativa de Tubérculos Ticos S.R.L. (exportación de raíces, tubérculos y
hortalizas desde Costa Rica). Next.js 14 App Router + Tailwind + next-intl,
exportada como sitio estático.

---

## Arquitectura

- **`output: 'export'`** con `trailingSlash: true`. No hay servidor: todo se
  genera en `out/` en tiempo de compilación. Cualquier dato de Sanity queda
  **congelado en el build** — un cambio de contenido no se ve hasta que se
  reconstruye.
- **Despliegue**: push a `main` → DigitalOcean App Platform reconstruye.
  Publicar en Sanity dispara `.github/workflows/redeploy-from-sanity.yml`.
- **Idiomas**: `es` (original), `en`, `fr`. Rutas bajo `app/[locale]/`.
- **Layouts raíz múltiples**: no existe `app/layout.tsx`. `app/[locale]/layout.tsx`
  renderiza su propio `<html lang={locale}>` — así cada idioma emite el `lang`
  correcto. El redirect de `/` vive en `app/(redirect)/` con su propio layout.
  **No recrees `app/layout.tsx`**: volvería a fijar un solo `lang` para todo.
  Efecto conocido: el `404.html` generado no lleva `lang` (Next exige
  `app/layout.tsx` para personalizarlo).

---

## Reglas de contenido e idiomas

- **El español es el original.** Traduce siempre desde `messages/es.json`, no
  desde el inglés.
- **Sanity solo almacena ES/EN** (`tituloEs`/`tituloEn`, `resumenEs`/`resumenEn`,
  `contenidoEs`/`contenidoEn`). Los componentes usan `locale !== 'es'` para
  servir la copia inglesa con reserva al español. Si algún día se añaden campos
  `*Fr`, la cascada debe ser FR → EN → ES.
- **En la versión francesa se reutiliza el inglés** para: artículos de Sanity,
  el catálogo PDF (`public/images/catalog/en/`) y los **nombres de producto**.
  Las **descripciones** de producto sí van en francés.
- **Todo texto visible vive en `messages/*.json`.** No escribas cadenas en los
  componentes. Si añades una clave, añádela a los **tres** archivos.
- Cuando un contenido esté en un idioma distinto al de la página (p. ej. el
  vídeo de PROCOMER, en español), indícalo en la copia de EN/FR.

---

## Convenciones de código

- **Lista de idiomas**: `siteConfig.locales`. No escribas `['es','en']` a mano.
- **Rutas que cambian por idioma**: pasan por `lib/localeRoutes.ts`
  (`getNewsPath`, `getLocalizedHref`). Hoy solo Noticias
  (`/noticias`, `/news`, `/actualites`); el resto comparte segmento en español.
- **Página nueva** → añade `alternates: localeAlternates(locale, '<ruta>')` en su
  `generateMetadata` y mete la ruta en `app/sitemap.ts`. Los canonical llevan
  barra final; el sitemap debe coincidir exactamente.
- **`SectionWrapper`**: para fondo oscuro usa la prop **`dark`**, nunca
  `className="bg-brand-green-dark"`. Las clases pasadas por `className` se
  concatenan **después** de `bg-white`, pero quién gana lo decide el orden del
  CSS: el resultado fue texto blanco sobre blanco.
- **`AnimatedSection`** envuelve los bloques con animación de entrada.
  `direction="left"/"right"` desplaza 40 px en horizontal; genera desbordamiento
  lateral **transitorio** durante la animación (no es un fallo de maquetación).
- **Paleta**: `brand-green` (`.dark` `.mid` `.light`), `brand-orange` (`.light`),
  `brand-cream`. Utilidad `.eyebrow` para los antetítulos.

### Fuentes — no tocar sin leer esto

`app/globals.css` define `--font-inter` y `--font-playfair` en `:root`, y eso es
**la única fuente de verdad**. El sitio renderiza con `system-ui` en el cuerpo y
**Georgia** en los titulares, y así debe seguir.

**No añadas `next/font`.** Sus clases de variable y el bloque `:root` fijan las
mismas custom properties con idéntica especificidad, así que gana la que quede
más abajo en el CSS compilado. Cualquier cambio estructural de layouts invierte
ese orden y **cambia la tipografía de toda la web sin previo aviso**. Ya pasó una
vez.

---

## Diseño responsivo

- Breakpoints reales a comprobar: **320, 390, 768, 1440**.
- La barra de navegación de escritorio aparece en **`lg:` (1024px)**, no en `md:`.
  Por debajo va el menú lateral. Motivo: con tres idiomas y las etiquetas
  francesas (`Actualités`, `Nous contacter`) el header necesita ~925 px, así que
  entre 768 y 1024 se salía de pantalla. **Si añades un idioma o alargas una
  etiqueta del menú, vuelve a medirlo.**
- Nada debe desbordar en horizontal: `document.documentElement.scrollWidth`
  no puede superar `clientWidth` (mide con las animaciones ya terminadas).
- El hero usa `min-h-dvh`: las capturas de página completa con ventanas muy
  altas lo deforman. Usa un viewport realista.

---

## Rendimiento

- Los **embeds de terceros van con patrón fachada**: imagen local + botón, y el
  `<iframe>` solo se inyecta al hacer clic (ver `VideoFeature.tsx`). Un iframe de
  YouTube directo mete ~1 MB de JS de terceros y cookies antes de que nadie lo
  pida. Reproducción vía `youtube-nocookie.com`.
- Las miniaturas y pósters se descargan a `public/images/`, no se enlazan desde
  dominios externos.

---

## Verificación antes de subir

`npm run build` en verde **no basta**. Comprobar que una cadena existe en el HTML
tampoco: han pasado a producción una tipografía cambiada y un título blanco sobre
fondo blanco, y en ambos casos el HTML era correcto.

1. `npm run build`
2. Servir `out/` y **mirar las páginas renderizadas** a 390 px y 1440 px.
3. Si el cambio toca layouts, CSS global o fuentes: **compara contra el build
   anterior** (`git worktree add` del commit previo) antes de dar nada por bueno.
4. Comprobar los tres idiomas, no solo español.

Regla de fondo: **la web ya se ve bien**. Cualquier cambio nuevo se añade sin
alterar lo que ya funcionaba; ante la duda, comparar con el estado anterior.

---

## Datos del sitio

- Sanity: proyecto `b1gnq59g`, dataset `production`, tipo `publicacion`.
  El Studio está en `~/sanity-studio`.
- `lib/siteConfig.ts` centraliza contacto, redes, certificaciones y locales.
- Galería: `public/images/gallery/product-N.jpg` y `company-N.jpg`; los totales
  se declaran en las constantes de `GalleryGrid.tsx`.
- Formulario de contacto: Formspree (`NEXT_PUBLIC_FORMSPREE_ID` en `.env.local`).
