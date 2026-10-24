'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Lock, Play, RotateCcw } from 'lucide-react';
import { HeroHeader, Page, ProgressBar, SectionTitle } from '@/components/ui';
import { LiliPose } from '@/components/Lili';
import { Calendar } from '@/components/Calendar';
import { JourneyMap } from '@/components/JourneyMap';
import { MissionCard } from '@/components/MissionCard';
import { useStore } from '@/lib/store';
import { DAY, PHASES } from '@/content/program';
import { completedDays, dayStatus, nextDay, POINTS, unlockedUntil, WEEKLY } from '@/lib/progress';
import { buildSteps, estimateMinutes } from '@/lib/workout';

const VIEWS = [['calendario', 'Calendar'], ['mapa', 'Journey map']] as const;
type View = typeof VIEWS[number][0];

export default function Desafios() {
  const s = useStore();
  const [view, setView] = useState<View>('calendario');
  useEffect(() => { try { const v = localStorage.getItem('pnp21-view-desafios') as View | null; if (v) setView(v); } catch {} }, []);
  const choose = (v: View) => { setView(v); try { localStorage.setItem('pnp21-view-desafios', v); } catch {} };

  const done = completedDays(s);
  const next = nextDay(s);
  const day = DAY(Math.min(next ?? 21, unlockedUntil(s)));
  const st = dayStatus(s, day.n);
  const minutes = estimateMinutes(buildSteps(day, s.profile));
  const phase = PHASES[day.phase - 1];

  return (
    <Page>
      <HeroHeader className="pb-24" art={<LiliPose pose="alonga" className="h-64 w-32" />}>
        <h1 className="mt-6 text-3xl font-bold leading-tight">21-Day<br />Challenge</h1>
        <p className="mt-1 max-w-[62%] text-sm text-white/80">Transform your body and your routine with Wall Pilates, one day at a time.</p>
        <p className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold ring-1 ring-white/15">{done.length} of 21 days · Phase {day.phase}: {phase.name}</p>
      </HeroHeader>

      {/* Calendário / mapa */}
      <div className="card relative -mt-20 p-4">
        <div className="mb-3 flex gap-1 rounded-2xl bg-rose-50 p-1" role="tablist" aria-label="Challenge view">
          {VIEWS.map(([k, l]) => (
            <button key={k} role="tab" aria-selected={view === k} onClick={() => choose(k)} className="relative flex-1 rounded-xl py-2 text-sm font-bold">
              {view === k && <motion.span layoutId="view" className="absolute inset-0 rounded-xl bg-white shadow-soft" />}
              <span className={`relative ${view === k ? 'text-rose-600' : 'text-ink-soft'}`}>{l}</span>
            </button>
          ))}
        </div>
        {view === 'calendario' ? <Calendar /> : <JourneyMap />}
      </div>

      {/* Dia atual */}
      <div className="card mt-4 overflow-hidden">
        <div className="flex gap-4 p-4">
          <div className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-rose-100 to-lilac-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/app/fotos/parede.webp" alt="" className="h-full w-full object-cover object-[45%_30%]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-2xl font-bold leading-none">Day {day.n}</p>
            <p className="mt-1 font-bold leading-tight">{day.name}</p>
            <p className="mt-1 line-clamp-3 text-sm text-ink-soft">{day.lili}</p>
          </div>
        </div>
        <div className="px-4 pb-4">
          {st === 'concluido' ? (
            <Link href={`/treinos/dia/${day.n}/`} className="btn-ghost w-full"><RotateCcw size={18} /> Workout complete · view or redo</Link>
          ) : st === 'bloqueado' ? (
            <p className="flex items-center gap-2 rounded-2xl bg-lilac-50 p-3 text-sm font-semibold text-grape-700"><Lock size={18} /> Unlocks tomorrow</p>
          ) : (
            <Link href={`/treinar/${day.n}/`} className="btn-primary shine w-full text-lg"><Play size={20} fill="white" /> {st === 'andamento' ? 'Continue workout' : 'Start workout'} · ~{minutes} min</Link>
          )}
          <Link href={`/treinos/dia/${day.n}/`} className="mt-2 block text-center text-sm font-bold text-rose-600">See the day’s exercises</Link>
        </div>
      </div>

      {/* Missões */}
      <SectionTitle action={{ href: '/missoes/', label: 'All missions' }}>Day {day.n} missions</SectionTitle>
      <div className="space-y-2">
        <MissionCard mission={day.extra} badge="Extra" />
        <MissionCard mission={day.surprise} badge="Surprise" surprise />
      </div>

      <SectionTitle>Weekly challenges</SectionTitle>
      <div className="space-y-2">
        {WEEKLY.map(w => {
          const v = Math.min(w.goal, w.check(s));
          return (
            <div key={w.id} className="card p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold">{v >= w.goal ? '✅ ' : ''}{w.title}</p>
                <span className="chip shrink-0 bg-rose-50 text-rose-600">+{POINTS.weekly}</span>
              </div>
              <p className="text-xs text-ink-soft">{w.desc}</p>
              <ProgressBar className="mt-2 h-2" value={v / w.goal} />
            </div>
          );
        })}
      </div>
    </Page>
  );
}
