'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BookOpen, Lock, Play } from 'lucide-react';
import { Page, SectionTitle } from '@/components/ui';
import { JourneyMap } from '@/components/JourneyMap';
import { Calendar } from '@/components/Calendar';
import { useStore } from '@/lib/store';
import { SESSIONS, REWARD_SESSIONS } from '@/content/program';
import { ARTICLES } from '@/content/library';
import { sessionUnlocked } from '@/lib/progress';

const TABS = [['mapa', 'Jornada'], ['calendario', 'Calendário'], ['bonus', 'Bônus'], ['biblioteca', 'Biblioteca']] as const;
type Tab = typeof TABS[number][0];

export default function Treinos() {
  const s = useStore();
  const [tab, setTab] = useState<Tab>('mapa');

  // lembra a aba escolhida (conveniência; não é dado importante)
  useEffect(() => {
    try { const t = localStorage.getItem('pnp21-tab-treinos') as Tab | null; if (t) setTab(t); } catch {}
  }, []);
  const choose = (t: Tab) => { setTab(t); try { localStorage.setItem('pnp21-tab-treinos', t); } catch {} };

  const bonus = [...REWARD_SESSIONS.map(r => ({ id: r.session, day: r.day })), ...['a', 'b', 'c'].map(x => ({ id: `manutencao-${x}`, day: 21 }))];

  return (
    <Page>
      <h1 className="text-2xl font-bold">Treinos</h1>
      <div className="mt-3 flex gap-1 rounded-2xl bg-white p-1 shadow-soft ring-1 ring-lilac-100" role="tablist">
        {TABS.map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => choose(k)} className="relative flex-1 rounded-xl py-2 text-sm font-bold">
            {tab === k && <motion.span layoutId="seg" className="absolute inset-0 rounded-xl bg-brand" />}
            <span className={`relative ${tab === k ? 'text-white' : 'text-ink-soft'}`}>{l}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === 'mapa' && <JourneyMap />}
        {tab === 'calendario' && <div className="card p-4"><Calendar /></div>}
        {tab === 'bonus' && (
          <div className="space-y-2">
            <p className="text-sm text-ink-soft">Aulas extras que você libera com a sua participação. Cada sessão vale +20 pontos por dia.</p>
            {bonus.map(b => {
              const ses = SESSIONS[b.id];
              const open = sessionUnlocked(s, b.id);
              return (
                <Link key={b.id} href={open ? `/sessao/${b.id}/` : '/evolucao/bau/'} className={`card flex items-center gap-3 p-4 ${open ? '' : 'opacity-70'}`}>
                  <div className={`grid h-12 w-12 place-items-center rounded-2xl ${open ? 'bg-brand text-white' : 'bg-lilac-50 text-ink-faint'}`}>{open ? <Play size={20} fill="white" /> : <Lock size={18} />}</div>
                  <div className="flex-1">
                    <p className="font-bold leading-tight">{ses.title}</p>
                    <p className="text-xs text-ink-soft">{open ? ses.subtitle : `Libera ao concluir o dia ${b.day}`}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {tab === 'biblioteca' && (
          <div>
            <div className="rounded-3xl bg-gradient-to-br from-grape-600 to-rose-400 p-5 text-white shadow-glow">
              <BookOpen />
              <p className="mt-2 font-display text-xl font-bold">Biblioteca VIP</p>
              <p className="text-sm text-white/90">Conteúdos para entender o seu corpo e praticar melhor. Cada leitura completa vale +10 pontos.</p>
            </div>
            <SectionTitle>Conteúdos</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
              {ARTICLES.map(a => {
                const read = !!s.activities[`read:${a.slug}`];
                return (
                  <Link key={a.slug} href={`/biblioteca/${a.slug}/`} className="card flex flex-col p-4">
                    <span className="text-3xl">{a.emoji}</span>
                    <span className="mt-2 font-bold leading-tight">{a.title}</span>
                    <span className="mt-auto pt-2 text-[11px] font-bold text-ink-soft">{read ? '✓ Lido' : `${a.minutes} min de leitura`}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
