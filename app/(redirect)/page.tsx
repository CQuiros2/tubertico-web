'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const lang = (navigator.language || navigator.languages?.[0] || '').toLowerCase();
    const match = ['en', 'fr', 'nl'].find((l) => lang.startsWith(l));
    const target = `/${match ?? 'es'}`;
    router.replace(target);
  }, [router]);

  return null;
}
