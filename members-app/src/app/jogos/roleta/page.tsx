'use client';
import { Page, TopBar } from '@/components/ui';
import { Roulette } from '@/components/Games';

export default function Roleta() {
  return (
    <Page>
      <TopBar back="/missoes/" title="Wellness Wheel" />
      <p className="mb-6 text-center text-sm text-ink-soft">Spin and get a small act of self-care for your day. Did it? Check it off and earn +10 points.</p>
      <Roulette />
    </Page>
  );
}
