'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Lock, Play, FileBadge, Share2, Check } from 'lucide-react';
import { HeroHeader, Page, ProgressBar, SectionTitle, Sheet } from '@/components/ui';
import { Bars } from '@/components/Charts';
import { LiliPose } from '@/components/Lili';
import { useStore } from '@/lib/store';
import { earnedMedals, LEVELS, levelFor, MEDALS, pointsBreakdown, type Medal } from '@/lib/progress';
import { SESSIONS } from '@/content/program';

const FILTERS = [['todas', 'All'], ['progresso', 'In progress'], ['concluidas', 'Completed']] as const;

const HEX = 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)';

export default function Conquistas() {
  const s = useStore();
  const pts = pointsBreakdown(s);
  const lvl = levelFor(pts.total);
  const earned = earnedMedals(s);
  const [sel, setSel] = useState<Medal | null>(null);
  const [filter, setFilter] = useState<typeof FILTERS[number][0]>('todas');
  const shown = MEDALS.filter(m => {
    const [a, b] = m.progress(s);
    return filter === 'todas' || (filter === 'concluidas' ? a >= b : a < b);
  });
  const nextLevelTips = [
    lvl.next && `Earn ${lvl.toNext} more Evolution Points`,
    'Complete the day’s workout (+100)',
    'Do the extra and surprise missions (+30 each)',
  ].filter(Boolean) as string[];

  return (
    <Page>
      <HeroHeader art={<LiliPose pose="paz" className="mt-2 h-60 w-32" />}>
        <h1 className="mt-4 text-2xl font-bold">Achievements</h1>
        <div className="mt-3 max-w-[60%] rounded-3xl rounded-bl-md bg-white px-4 py-3 text-sm font-semibold leading-snug text-ink shadow-soft">
          {earned.length ? `We’ve got this! You already have ${earned.length} ${earned.length === 1 ? 'medal' : 'medals'}. 💖` : 'We’ve got this! Your first medal arrives on day 3. 💖'}
        </div>
        <div className="relative mt-5 rounded-3xl bg-plum-900/80 p-4 ring-1 ring-white/15 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className={`grid h-14 w-14 shrink-0 place-items-center bg-gradient-to-br from-yellow-300 to-amber-500 text-3xl shadow-glow`} style={{ clipPath: HEX }}>{lvl.emoji}</span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-white/70">Level {lvl.n} of 6</p>
              <p className="truncate font-display text-xl font-bold">{lvl.name}</p>
              <p className="text-xs font-semibold text-white/80">{pts.total}{lvl.next ? ` / ${lvl.next.min}` : ''} Evolution Points 💜</p>
            </div>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/15"><motion.div className="h-full rounded-full bg-brand" initial={{ width: 0 }} animate={{ width: `${(lvl.next ? Math.min(1, pts.total / lvl.next.min) : 1) * 100}%` }} /></div>
          {lvl.next && (
            <div className="mt-3 space-y-1.5 text-[13px] font-semibold text-white/90">
              <p className="text-xs font-bold uppercase tracking-wider text-white/60">To reach {lvl.next.name}</p>
              {nextLevelTips.map(t => <p key={t} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-rose-500"><Check size={12} strokeWidth={3} /></span>{t}</p>)}
            </div>
          )}
        </div>
      </HeroHeader>

      <Link href="/compartilhar/" className="btn-primary shine mt-4 w-full"><Share2 size={18} /> Share an achievement</Link>

      <SectionTitle>Medals ({earned.length}/{MEDALS.length})</SectionTitle>
      <div className="mb-3 flex gap-1.5" role="tablist" aria-label="Filter medals">
        {FILTERS.map(([k, l]) => (
          <button key={k} role="tab" aria-selected={filter === k} onClick={() => setFilter(k)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${filter === k ? 'bg-brand text-white shadow-glow' : 'bg-white text-ink-soft ring-1 ring-rose-100'}`}>{l}</button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="card p-5 text-center text-sm text-ink-soft">{filter === 'concluidas' ? 'No medals yet. The first one comes when you complete day 3!' : 'You’ve earned every medal! 🏆'}</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {shown.map((m, i) => {
            const ok = earned.includes(m);
            const [a, b] = m.progress(s);
            return (
              <motion.button key={m.id} onClick={() => setSel(m)} initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * .03 }}
                className={`flex flex-col items-center rounded-3xl p-3 text-center ${ok ? 'bg-white shadow-card ring-1 ring-rose-100' : 'bg-white/60 ring-1 ring-rose-100'}`}>
                <span className={`grid h-16 w-14 place-items-center text-3xl ${ok ? 'bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500 shadow-glow' : 'bg-lilac-100 grayscale opacity-60'}`} style={{ clipPath: HEX }}>{m.emoji}</span>
                <span className={`mt-1.5 text-[11px] font-bold leading-tight ${ok ? 'text-ink' : 'text-ink-soft'}`}>{m.name}</span>
                <span className={`mt-1 rounded-full px-2 text-[10px] font-extrabold ${ok ? 'bg-emerald-100 text-emerald-700' : b > 1 && a > 0 ? 'bg-sky-100 text-sky-700' : 'bg-lilac-100 text-ink-soft'}`}>
                  {ok ? 'Earned' : b > 1 && a > 0 ? `${a}/${b}` : 'Locked'}
                </span>
              </motion.button>
            );
          })}
        </div>
      )}

      <SectionTitle>Evolution levels</SectionTitle>
      <div className="space-y-2">
        {LEVELS.map(l => {
          const ok = pts.total >= l.min;
          return (
            <div key={l.n} className={`flex items-center gap-3 rounded-3xl p-3 ${ok ? `bg-gradient-to-r ${l.gradient} shadow-soft` : 'bg-white/60 ring-1 ring-lilac-100'}`}>
              <span className={`grid h-11 w-11 place-items-center rounded-2xl text-2xl ${ok ? 'bg-white/60' : 'bg-lilac-50 grayscale'}`}>{l.emoji}</span>
              <div className="flex-1">
                <p className={`font-bold ${ok ? 'text-grape-900' : 'text-ink-soft'}`}>{l.n}. {l.name}</p>
                <p className={`text-[11px] font-semibold ${ok ? 'text-grape-900/75' : 'text-ink-faint'}`}>🎁 {l.perk} · from {l.min} pts</p>
              </div>
              {!ok && <Lock size={16} className="text-ink-faint" />}
            </div>
          );
        })}
      </div>

      <SectionTitle>Unlocked content</SectionTitle>
      <div className="space-y-2">
        {MEDALS.filter(m => m.unlock).map(m => {
          const ok = earned.includes(m);
          const u = m.unlock!;
          const title = u.type === 'session' ? SESSIONS[u.id].title : u.id === 'final' ? 'Personalized final certificate' : 'First week certificate';
          const href = ok ? (u.type === 'session' ? `/sessao/${u.id}/` : `/certificado/${u.id}/`) : undefined;
          const Icon = u.type === 'session' ? Play : FileBadge;
          const inner = (
            <>
              <span className={`grid h-11 w-11 place-items-center rounded-2xl ${ok ? 'bg-brand text-white' : 'bg-lilac-50 text-ink-faint'}`}>{ok ? <Icon size={20} /> : <Lock size={18} />}</span>
              <div className="flex-1"><p className="font-bold leading-tight">{title}</p><p className="text-xs text-ink-soft">{ok ? 'Unlocked · tap to open' : m.desc}</p></div>
            </>
          );
          return href ? <Link key={m.id} href={href} className="card flex items-center gap-3 p-3">{inner}</Link> : <div key={m.id} className="card flex items-center gap-3 p-3 opacity-70">{inner}</div>;
        })}
      </div>

      <SectionTitle>Where your points come from</SectionTitle>
      <div className="card p-4">
        <Bars items={[
          { label: 'Workouts', value: pts.workouts }, { label: 'Missions', value: pts.missions }, { label: 'Journal', value: pts.journal },
          { label: 'Weekly challenges', value: pts.weekly }, { label: 'Bonus classes', value: pts.sessions }, { label: 'Breathing', value: pts.breath },
          { label: 'Reading', value: pts.read }, { label: 'Quiz', value: pts.quiz }, { label: 'Wheel', value: pts.roulette }, { label: 'Notes', value: pts.cards },
          { label: 'Hydration', value: pts.water }, { label: 'Relaxation', value: pts.relax },
        ]} />
        {pts.total === 0 && <p className="text-center text-sm text-ink-soft">Complete your first workout to start earning points!</p>}
        <p className="mt-3 text-[11px] text-ink-faint">Points are calculated from what you’ve actually done. Reloading the page or repeating a workout that already counted won’t add more.</p>
      </div>

      <Sheet open={!!sel} onClose={() => setSel(null)} title={sel?.name}>
        {sel && (() => {
          const [a, b] = sel.progress(s);
          const ok = a >= b;
          return (
            <div className="text-center">
              <div className={`mx-auto grid h-24 w-24 place-items-center rounded-full text-5xl ${ok ? 'bg-brand shadow-glow' : 'bg-lilac-50 grayscale'}`}>{sel.emoji}</div>
              <p className="mt-3 text-sm text-ink-soft">{sel.desc}</p>
              <ProgressBar className="mt-4" value={a / b} />
              <p className="mt-1 text-xs font-bold text-grape-600">{ok ? 'Earned! 🎉' : `${a} of ${b}`}</p>
            </div>
          );
        })()}
      </Sheet>
    </Page>
  );
}
