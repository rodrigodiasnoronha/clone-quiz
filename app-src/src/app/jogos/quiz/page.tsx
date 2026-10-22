'use client';
import { Page, TopBar } from '@/components/ui';
import { DailyQuiz } from '@/components/Games';

export default function Quiz() {
  return (
    <Page>
      <TopBar back="/missoes/" title="Body Quiz" />
      <p className="mb-5 text-sm text-ink-soft">Muscles, posture, breathing and Pilates. Each right answer is worth +5 points.</p>
      <DailyQuiz />
    </Page>
  );
}
