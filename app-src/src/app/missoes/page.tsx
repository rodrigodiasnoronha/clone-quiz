'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Play } from 'lucide-react';
import { Page, ProgressBar, SectionTitle, TopBar } from '@/components/ui';
import { MissionCard } from '@/components/MissionCard';
import { LiliSays } from '@/components/Lili';
import { useStore } from '@/lib/store';
import { DAY, DAYS } from '@/content/program';
import { nextDay, unlockedUntil, WEEKLY, POINTS, dayStatus } from '@/lib/progress';
import { toKey } from '@/lib/dates';

const GAMES = [
  { href: '/jogos/respiracao/', emoji: '🌬️', title: 'Desafio de Respiração', desc: 'Respire com a animação', bg: 'from-lilac-200 to-lilac-300' },
  { href: '/jogos/roleta/', emoji: '🎡', title: 'Roleta do Bem-Estar', desc: '1 giro por dia', bg: 'from-rose-200 to-rose-300' },
  { href: '/jogos/quiz/', emoji: '🧠', title: 'Quiz do Corpo', desc: '3 perguntas por dia', bg: 'from-lilac-200 to-rose-200' },
  { href: '/jogos/cartas/', emoji: '💌', title: 'Cartas de Motivação', desc: '1 carta por dia', bg: 'from-rose-200 to-lilac-200' },
];

export default function Missoes() {
  const s = useStore();
  const today = toKey();
  const unlocked = unlockedUntil(s);
  const next = nextDay(s);
  const mday = DAY(Math.min(next ?? 21, unlocked));
  const mainDone = !!s.days[mday.n]?.completedAt;
  const doneCount = [mainDone, !!s.missions[mday.extra.id], !!s.missions[mday.surprise.id]].filter(Boolean).length;
  const pending = DAYS.filter(d => d.n < mday.n && d.n <= unlocked).flatMap(d => [d.extra, d.surprise].map(m => ({ m, d }))).filter(x => !s.missions[x.m.id]);
  const status = dayStatus(s, mday.n);

  return (
    <Page>
      <TopBar back="/desafios/" title="Missões e jogos" />
      <div><LiliSays mood={doneCount === 3 ? 'orgulhosa' : 'feliz'} text={doneCount === 3 ? 'Todas as missões do dia cumpridas! Você é demais. 💜' : `Hoje temos 3 missões no dia ${mday.n}. Você já fez ${doneCount}!`} size={60} /></div>

      <div className="card mt-4 p-4">
        <div className="flex items-center justify-between text-sm font-bold"><span>Missões do dia {mday.n}</span><span className="text-grape-600">{doneCount}/3</span></div>
        <ProgressBar className="mt-2" value={doneCount / 3} />
      </div>

      <SectionTitle>Missão principal</SectionTitle>
      <Link href={mainDone ? `/treinos/dia/${mday.n}/` : `/treinar/${mday.n}/`} className={`flex items-center gap-3 rounded-3xl p-4 shadow-card ${mainDone ? 'bg-lilac-50' : 'bg-brand text-white shadow-glow'}`}>
        <div className={`grid h-12 w-12 place-items-center rounded-2xl ${mainDone ? 'bg-brand text-white' : 'bg-white/20'}`}>{mainDone ? <Check /> : <Play fill="white" />}</div>
        <div className="flex-1">
          <p className={`text-[11px] font-extrabold uppercase tracking-wider ${mainDone ? 'text-grape-500' : 'text-white/80'}`}>Treino do dia {mday.n}</p>
          <p className={`font-bold ${mainDone ? 'text-ink-soft line-through' : ''}`}>{mday.name}</p>
        </div>
        <span className="text-xs font-extrabold">{mainDone ? 'Feito' : status === 'pendente' ? 'Recuperar' : `+${POINTS.workout}`}</span>
      </Link>

      <SectionTitle>Missão extra</SectionTitle>
      <MissionCard mission={mday.extra} />
      <SectionTitle>Missão surpresa</SectionTitle>
      <MissionCard mission={mday.surprise} surprise />

      <SectionTitle>Desafios semanais</SectionTitle>
      <div className="space-y-2">
        {WEEKLY.map(w => {
          const v = Math.min(w.goal, w.check(s));
          const ok = v >= w.goal;
          return (
            <div key={w.id} className="card p-4">
              <div className="flex items-center justify-between">
                <p className="font-bold">{ok ? '✅ ' : ''}{w.title}</p>
                <span className="chip bg-lilac-100 text-grape-700">+{POINTS.weekly}</span>
              </div>
              <p className="text-xs text-ink-soft">{w.desc}</p>
              <ProgressBar className="mt-2 h-2" value={v / w.goal} />
              <p className="mt-1 text-right text-[11px] font-bold text-ink-soft">{v}/{w.goal}</p>
            </div>
          );
        })}
      </div>

      <SectionTitle>Experiências</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {GAMES.map((g, i) => (
          <motion.div key={g.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .05 }}>
            <Link href={g.href} className={`flex h-full flex-col rounded-3xl bg-gradient-to-br ${g.bg} p-4 shadow-soft`}>
              <span className="text-3xl">{g.emoji}</span>
              <span className="mt-2 font-bold leading-tight text-grape-900">{g.title}</span>
              <span className="text-[11px] font-semibold text-grape-900/70">{g.desc}</span>
              {((g.href.includes('roleta') && s.activities[`roulette:${today}`]) || (g.href.includes('quiz') && s.quiz[today]) || (g.href.includes('cartas') && today in s.cards) || (g.href.includes('respiracao') && s.activities[`breath:${today}`])) && (
                <span className="mt-2 w-fit rounded-full bg-white/70 px-2 text-[10px] font-extrabold text-grape-700">✓ feito hoje</span>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {pending.length > 0 && (
        <>
          <SectionTitle>Missões de dias anteriores</SectionTitle>
          <p className="-mt-1 mb-2 text-xs text-ink-soft">Ainda dá tempo! Elas continuam valendo pontos.</p>
          <div className="space-y-2">{pending.map(({ m, d }) => <MissionCard key={m.id} mission={m} badge={`do dia ${d.n}`} />)}</div>
        </>
      )}
    </Page>
  );
}
