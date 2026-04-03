'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const lang = (navigator.language || navigator.languages?.[0] || '').toLowerCase();
    router.replace(lang.startsWith('en') ? '/en' : '/es');
  }, [router]);

  return null;
}
