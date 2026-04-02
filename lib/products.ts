export interface Product {
  id: string;
  slug: string;
  image: string;
  featured: boolean;
}

export const products: Product[] = [
  { id: 'ayote',          slug: 'ayote',          image: '/images/products/ayote.jpg',          featured: true  },
  { id: 'chayote_blanco', slug: 'chayote-blanco', image: '/images/products/chayote-blanco.jpg', featured: true  },
  { id: 'coco_seco',      slug: 'coco-seco',      image: '/images/products/coco-seco.jpg',      featured: false },
  { id: 'jengibre',       slug: 'jengibre',        image: '/images/products/jengibre.jpg',       featured: true  },
  { id: 'malanga_blanca', slug: 'malanga-blanca', image: '/images/products/malanga-blanca.jpg', featured: true  },
  { id: 'malanga_lila',   slug: 'malanga-lila',   image: '/images/products/malanga-lila.jpg',   featured: false },
  { id: 'name_amarillo',  slug: 'name-amarillo',  image: '/images/products/name-amarillo.jpg',  featured: false },
  { id: 'name',           slug: 'name',           image: '/images/products/name.jpg',           featured: false },
  { id: 'yautia_blanco',  slug: 'yautia-blanco',  image: '/images/products/yautia-blanco.jpg',  featured: false },
  { id: 'yautia_lila',    slug: 'yautia-lila',    image: '/images/products/yautia-lila.jpg',    featured: false },
  { id: 'yuca',           slug: 'yuca',           image: '/images/products/yuca.jpg',           featured: true  },
  { id: 'zanahoria',      slug: 'zanahoria',      image: '/images/products/zanahoria.jpg',      featured: false },
  { id: 'camote',         slug: 'camote',         image: '/images/products/camote.jpg',         featured: true  },
  { id: 'yampi',          slug: 'yampi',          image: '/images/products/yampi.jpg',          featured: false },
];

export const getFeaturedProducts = () => products.filter((p) => p.featured);
