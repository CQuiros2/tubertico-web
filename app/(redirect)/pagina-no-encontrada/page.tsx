import '../../globals.css';
import { PaginaNoEncontrada } from '@/components/sections/PaginaNoEncontrada';

// Página 404 de todo el sitio. Next solo genera una 404 global con un layout raíz
// único, y este sitio tiene uno por idioma; por eso la 404 se arma como página
// normal y `scripts/copiar-404.mjs` (postbuild) la copia a out/404.html, que es
// lo que el hosting sirve para cualquier dirección que no existe. No va en el
// sitemap y hereda el noindex del layout de este grupo.
export default function PaginaNoEncontradaRoute() {
  return <PaginaNoEncontrada />;
}
