'use client';
import { Page, TopBar } from '@/components/ui';
import { DailyQuiz } from '@/components/Games';

export default function Quiz() {
  return (
    <Page>
      <TopBar back="/missoes/" title="Quiz do Corpo" />
      <p className="mb-5 text-sm text-ink-soft">Músculos, postura, respiração e Pilates. Cada acerto vale +5 pontos.</p>
      <DailyQuiz />
    </Page>
  );
}
