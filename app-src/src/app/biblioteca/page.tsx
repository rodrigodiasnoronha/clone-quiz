'use client';

import Link from 'next/link';
import { Page, TopBar } from '@/components/ui';
import { useStore } from '@/lib/store';
import { ARTICLES } from '@/content/library';
import { POINTS } from '@/lib/progress';

export default function Biblioteca() {
  const activities = useStore(s => s.activities);
  const read = ARTICLES.filter(a => activities[`read:${a.slug}`]).length;
  return (
    <Page>
      <TopBar back="/mais/" title="Biblioteca VIP" subtitle={`${read} de ${ARTICLES.length} lidos · +${POINTS.read} pts por leitura`} />
      <div className="grid grid-cols-2 gap-2">
        {ARTICLES.map(a => {
          const done = !!activities[`read:${a.slug}`];
          return (
            <Link key={a.slug} href={`/biblioteca/${a.slug}/`} className="card flex flex-col p-4">
              <span className="text-3xl">{a.emoji}</span>
              <span className="mt-2 font-bold leading-tight">{a.title}</span>
              <span className={`mt-auto pt-2 text-[11px] font-bold ${done ? 'text-emerald-600' : 'text-ink-soft'}`}>{done ? '✓ Lido' : `${a.minutes} min de leitura`}</span>
            </Link>
          );
        })}
      </div>
    </Page>
  );
}
