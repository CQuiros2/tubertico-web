import { sanityClient } from './client'
import type { Publicacion } from '@/types/publicacion'

const FIELDS = `
  _id,
  tipoPublicacion,
  categoria,
  tituloEs,
  tituloEn,
  tituloFr,
  tituloNl,
  resumenEs,
  resumenEn,
  resumenFr,
  resumenNl,
  contenidoEs,
  contenidoEn,
  contenidoFr,
  contenidoNl,
  imagenPrincipal,
  galeria,
  fechaPublicacion,
  "slug": slug.current
`

export async function getTodasLasPublicaciones(): Promise<Publicacion[]> {
  return sanityClient.fetch(
    `*[_type == "publicacion"] | order(fechaPublicacion desc) { ${FIELDS} }`
  )
}

export async function getUltimaPublicacion(): Promise<Publicacion | null> {
  const result = await sanityClient.fetch(
    `*[_type == "publicacion"] | order(fechaPublicacion desc)[0] { ${FIELDS} }`
  )
  return result ?? null
}
