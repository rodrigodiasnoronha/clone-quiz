'use client';
import { Page, TopBar } from '@/components/ui';
import { Roulette } from '@/components/Games';

export default function Roleta() {
  return (
    <Page>
      <TopBar back="/missoes/" title="Roleta do Bem-Estar" />
      <p className="mb-6 text-center text-sm text-ink-soft">Gire e ganhe um pequeno cuidado para o seu dia. Fez? Marque e ganhe +10 pontos.</p>
      <Roulette />
    </Page>
  );
}
