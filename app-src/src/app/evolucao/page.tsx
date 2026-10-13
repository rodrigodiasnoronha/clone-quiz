'use client';

import Link from 'next/link';
import { Award, NotebookPen, Plus } from 'lucide-react';
import { Page, SectionTitle, TopBar } from '@/components/ui';
import { Garden } from '@/components/Garden';
import { ConsistencyGrid, HabitsChart } from '@/components/Charts';
import { FLEX, MOOD, ENERGY, SLEEP } from '@/components/JournalForm';
import { photos, useStore } from '@/lib/store';
import { bestStreak, completedDays, gardenStage, streak } from '@/lib/progress';
import { formatDate, toKey } from '@/lib/dates';
import type { JournalEntry } from '@/lib/types';

export default function Evolucao() {
  const s = useStore();
  const done = completedDays(s);
  const g = gardenStage(s);
  const entries = s.journal;
  const withMood = entries.filter(e => e.mood);
  const first = withMood[0];
  const last = withMood.length > 1 ? withMood[withMood.length - 1] : undefined;
  const todayEntry = entries.find(e => e.date === toKey());

  return (
    <Page>
      <TopBar back="/mais/" title="Minha Jornada" subtitle="Diário de evolução: hábitos, sensações e conquistas" />

      <Link href="/evolucao/registro/" className="btn-primary shine w-full">
        {todayEntry?.mood ? <><NotebookPen size={18} /> Editar registro de hoje</> : <><Plus size={18} /> Registrar meu dia</>}
      </Link>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="card py-3"><p className="font-display text-2xl font-bold">{done.length}</p><p className="text-[11px] font-semibold text-ink-soft">treinos</p></div>
        <div className="card py-3"><p className="font-display text-2xl font-bold">{streak(s)}</p><p className="text-[11px] font-semibold text-ink-soft">sequência atual</p></div>
        <div className="card py-3"><p className="font-display text-2xl font-bold">{bestStreak(s)}</p><p className="text-[11px] font-semibold text-ink-soft">melhor sequência</p></div>
      </div>

      <SectionTitle>Jardim da Evolução</SectionTitle>
      <Garden {...g} />
      <p className="mt-1 text-center text-[11px] text-ink-faint">Cresce com treinos (2 pontos de crescimento), missões e registros no diário.</p>

      <SectionTitle>Consistência dos 21 dias</SectionTitle>
      <div className="card p-4"><ConsistencyGrid done={done} /></div>

      <SectionTitle>Humor, energia e sono</SectionTitle>
      <div className="card p-4"><HabitsChart entries={entries} /></div>

      <SectionTitle>Primeiro × último registro</SectionTitle>
      {first && last ? (
        <div className="grid grid-cols-2 gap-2">
          <Compare title={`Dia ${first.day}`} e={first} />
          <Compare title={`Dia ${last.day}`} e={last} highlight />
        </div>
      ) : (
        <p className="card p-4 text-center text-sm text-ink-soft">Com dois registros você poderá comparar o começo e o agora. Os testes de flexibilidade e resistência ficam ainda mais legais!</p>
      )}

      <Link href="/conquistas/" className="mt-6 flex items-center gap-3 rounded-3xl bg-gradient-to-r from-grape-600 to-rose-400 p-4 text-white shadow-glow">
        <Award size={28} />
        <div className="flex-1"><p className="font-bold">Minhas Conquistas 🏆</p><p className="text-xs text-white/85">Medalhas, níveis, certificados e aulas desbloqueadas</p></div>
      </Link>

      <SectionTitle>Registros</SectionTitle>
      {entries.length === 0 ? <p className="text-sm text-ink-soft">Nenhum registro ainda.</p> : (
        <div className="space-y-2">
          {[...entries].reverse().map(e => (
            <div key={e.date} className="card p-4">
              <div className="flex items-center justify-between">
                <p className="font-bold">{formatDate(e.date, { weekday: 'short', day: '2-digit', month: 'short' })}</p>
                <span className="chip bg-lilac-100 text-grape-700">Dia {e.day}</span>
              </div>
              {e.mood && <p className="mt-1 text-2xl">{MOOD.e[e.mood - 1]} {e.energy && ENERGY.e[e.energy - 1]} {e.sleep && SLEEP.e[e.sleep - 1]}</p>}
              {e.win && <p className="mt-1 text-sm"><b>🏆 </b>{e.win}</p>}
              {e.notes && <p className="mt-1 text-sm text-ink-soft">{e.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </Page>
  );
}

function Compare({ title, e, highlight = false }: { title: string; e: JournalEntry; highlight?: boolean }) {
  const photo = photos.get(e.photo);
  return (
    <div className={`card overflow-hidden ${highlight ? 'ring-2 ring-rose-300' : ''}`}>
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt={`Foto do ${title}`} className="aspect-[3/4] w-full object-cover" />
      ) : <div className="grid aspect-[3/4] place-items-center bg-lilac-50 text-xs font-semibold text-ink-faint">sem foto</div>}
      <div className="space-y-0.5 p-3 text-xs">
        <p className="font-bold text-ink">{title} · {formatDate(e.date)}</p>
        <p>Humor: {e.mood ? MOOD.l[e.mood - 1] : '—'}</p>
        <p>Energia: {e.energy ? ENERGY.l[e.energy - 1] : '—'}</p>
        <p>Sono: {e.sleep ? SLEEP.l[e.sleep - 1] : '—'}</p>
        <p>Rolamento: {e.flex ? FLEX[e.flex - 1] : '—'}</p>
        <p>Agachamento: {e.hold ? `${e.hold}s` : '—'}</p>
      </div>
    </div>
  );
}
