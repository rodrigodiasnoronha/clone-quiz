'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/** Endereço antigo do Baú de Conquistas */
export default function BauRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/conquistas/'); }, [router]);
  return null;
}
