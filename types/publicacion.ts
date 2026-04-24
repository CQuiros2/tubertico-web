export interface SanityImageAsset {
  _ref: string
  _type: 'reference'
}

export interface SanityImage {
  _type: 'image'
  asset: SanityImageAsset
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
}

export interface Publicacion {
  _id: string
  tipoPublicacion: 'noticia' | 'blog'
  categoria: string
  tituloEs: string
  tituloEn?: string
  resumenEs?: string
  resumenEn?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contenidoEs?: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contenidoEn?: any[]
  imagenPrincipal?: SanityImage
  galeria?: SanityImage[]
  fechaPublicacion: string
  slug: string
}
