'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Page, TopBar } from '@/components/ui';
import { JournalForm } from '@/components/JournalForm';
import { Celebration } from '@/components/Celebration';
import { POINTS } from '@/lib/progress';
import { formatDate, toKey } from '@/lib/dates';

export default function Registro() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  return (
    <Page>
      <TopBar back="/evolucao/" title="Registro do dia" />
      <p className="mb-4 text-sm text-ink-soft">{formatDate(toKey(), { weekday: 'long', day: '2-digit', month: 'long' })} · um registro por dia (+{POINTS.journal} pts)</p>
      <JournalForm onSaved={() => setSaved(true)} />
      <Celebration open={saved} mood="feliz" title="Registro salvo! 📔" text="Cada registro ajuda você a enxergar sua evolução de verdade." onClose={() => router.push('/evolucao/')} />
    </Page>
  );
}
