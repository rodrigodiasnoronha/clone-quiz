'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/** Endereço antigo da aba Treinos: o conteúdo agora está em Desafios e Treinar */
export default function TreinosRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/desafios/'); }, [router]);
  return null;
}
