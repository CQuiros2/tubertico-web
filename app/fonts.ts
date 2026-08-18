import { Inter, Playfair_Display } from 'next/font/google';

// Shared by every root layout so the font instances are declared once.
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});
