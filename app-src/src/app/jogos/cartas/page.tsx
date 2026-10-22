'use client';
import { Page, TopBar } from '@/components/ui';
import { CardReveal } from '@/components/Games';

export default function Cartas() {
  return (
    <Page>
      <TopBar back="/missoes/" title="Motivation Notes" />
      <p className="mb-6 text-center text-sm text-ink-soft">One positive message a day, written by Lili just for you.</p>
      <CardReveal />
    </Page>
  );
}
