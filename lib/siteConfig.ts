export const siteConfig = {
  name: 'Tubertico',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tubertico.com',
  defaultLocale: 'es',
  locales: ['es', 'en'] as const,

  contact: {
    email: 'info@tubertico.com',
    emailSales: 'pablo@tubertico.com',
    phone: '+506 8973-2830',
    phoneSales: '+506 8948-4292',
    phoneAlt: '+506 8388-5918',
    whatsapp: '+50689732830',
    address: 'Roxana, Pococí, Limón, Costa Rica',
    addressDetail: '70m norte de la Escuela Líder Roxana',
    mapsQuery: 'Roxana,Pococí,Limón,Costa Rica',
  },

  social: {
    linkedin: 'https://cr.linkedin.com/company/tubertico',
    instagram: 'https://www.instagram.com/tubertico.cr',
    facebook: 'https://www.facebook.com/profile.php?id=61575158159946',
    whatsapp: 'https://wa.me/50689732830',
  },

  stats: {
    years: 20,
    hectares2024: 1015,
    hectares2025: 1117,
    products: 14,
  },

  certifications: ['GlobalGAP V6.0 GFSI', 'FSMA (FDA)'],
} as const;

export type SiteConfig = typeof siteConfig;
