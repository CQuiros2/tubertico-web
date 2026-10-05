// postbuild: la página propia de "no encontrada" pasa a ser out/404.html.
import { copyFileSync, existsSync } from 'node:fs';

const origen = 'out/pagina-no-encontrada/index.html';
if (!existsSync(origen)) {
  console.error(`copiar-404: no existe ${origen}`);
  process.exit(1);
}
copyFileSync(origen, 'out/404.html');
console.log('copiar-404: out/404.html actualizado');
