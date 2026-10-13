'use client';
import { Page, TopBar } from '@/components/ui';
import { CardReveal } from '@/components/Games';

export default function Cartas() {
  return (
    <Page>
      <TopBar back="/missoes/" title="Cartas de Motivação" />
      <p className="mb-6 text-center text-sm text-ink-soft">Uma mensagem positiva por dia, escrita pela Lili para você.</p>
      <CardReveal />
    </Page>
  );
}
