'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Lock, Play, FileBadge } from 'lucide-react';
import { Page, ProgressBar, SectionTitle, Sheet, TopBar } from '@/components/ui';
import { Bars } from '@/components/Charts';
import { Avatar } from '@/components/Avatar';
import { useStore } from '@/lib/store';
import { earnedMedals, LEVELS, levelFor, MEDALS, pointsBreakdown, type Medal } from '@/lib/progress';
import { SESSIONS } from '@/content/program';

export default function Bau() {
  const s = useStore();
  const pts = pointsBreakdown(s);
  const lvl = levelFor(pts.total);
  const earned = earnedMedals(s);
  const [sel, setSel] = useState<Medal | null>(null);

  return (
    <Page>
      <TopBar back="/evolucao/" title="Meu Baú de Conquistas 🎁" />

      <div className={`rounded-4xl bg-gradient-to-br ${lvl.gradient} p-5 text-center shadow-card`}>
        <div className="mx-auto w-fit"><Avatar level={lvl.n} /></div>
        <p className="mt-3 text-xs font-extrabold uppercase tracking-wider text-grape-900/70">Nível {lvl.n} de 6</p>
        <p className="font-display text-2xl font-bold text-grape-900">{lvl.emoji} {lvl.name}</p>
        <p className="font-display text-4xl font-bold text-grape-900">{pts.total} <span className="text-base">Pontos de Evolução 💜</span></p>
        <div className="mx-auto mt-3 h-3 max-w-xs overflow-hidden rounded-full bg-white/50"><motion.div className="h-full rounded-full bg-white" initial={{ width: 0 }} animate={{ width: `${lvl.pct * 100}%` }} /></div>
        <p className="mt-1 text-xs font-bold text-grape-900/80">{lvl.next ? `${lvl.toNext} pts para ${lvl.next.name}` : 'Nível máximo!'}</p>
      </div>

      <SectionTitle>Níveis de evolução</SectionTitle>
      <div className="space-y-2">
        {LEVELS.map(l => {
          const ok = pts.total >= l.min;
          return (
            <div key={l.n} className={`flex items-center gap-3 rounded-3xl p-3 ${ok ? `bg-gradient-to-r ${l.gradient} shadow-soft` : 'bg-white/60 ring-1 ring-lilac-100'}`}>
              <span className={`grid h-11 w-11 place-items-center rounded-2xl text-2xl ${ok ? 'bg-white/60' : 'bg-lilac-50 grayscale'}`}>{l.emoji}</span>
              <div className="flex-1">
                <p className={`font-bold ${ok ? 'text-grape-900' : 'text-ink-soft'}`}>{l.n}. {l.name}</p>
                <p className={`text-[11px] font-semibold ${ok ? 'text-grape-900/75' : 'text-ink-faint'}`}>🎁 {l.perk} · a partir de {l.min} pts</p>
              </div>
              {!ok && <Lock size={16} className="text-ink-faint" />}
            </div>
          );
        })}
      </div>

      <SectionTitle>Medalhas ({earned.length}/{MEDALS.length})</SectionTitle>
      <div className="grid grid-cols-3 gap-2">
        {MEDALS.map((m, i) => {
          const ok = earned.includes(m);
          const [a, b] = m.progress(s);
          return (
            <motion.button key={m.id} onClick={() => setSel(m)} initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * .03 }}
              className={`flex flex-col items-center rounded-3xl p-3 text-center ${ok ? 'bg-white shadow-card ring-2 ring-rose-200' : 'bg-white/50 ring-1 ring-lilac-100'}`}>
              <motion.span animate={ok ? { rotate: [0, -10, 10, 0] } : {}} transition={{ repeat: Infinity, repeatDelay: 3 + i * .3, duration: .6 }}
                className={`grid h-14 w-14 place-items-center rounded-full text-3xl ${ok ? 'bg-brand shadow-glow' : 'bg-lilac-50 grayscale opacity-50'}`}>{m.emoji}</motion.span>
              <span className={`mt-1.5 text-[11px] font-bold leading-tight ${ok ? 'text-ink' : 'text-ink-faint'}`}>{m.name}</span>
              {!ok && b > 1 && <span className="mt-1 text-[10px] font-bold text-grape-400">{a}/{b}</span>}
            </motion.button>
          );
        })}
      </div>

      <SectionTitle>Conteúdos desbloqueados</SectionTitle>
      <div className="space-y-2">
        {MEDALS.filter(m => m.unlock).map(m => {
          const ok = earned.includes(m);
          const u = m.unlock!;
          const title = u.type === 'session' ? SESSIONS[u.id].title : u.id === 'final' ? 'Certificado final personalizado' : 'Certificado da primeira semana';
          const href = ok ? (u.type === 'session' ? `/sessao/${u.id}/` : `/certificado/${u.id}/`) : undefined;
          const Icon = u.type === 'session' ? Play : FileBadge;
          const inner = (
            <>
              <span className={`grid h-11 w-11 place-items-center rounded-2xl ${ok ? 'bg-brand text-white' : 'bg-lilac-50 text-ink-faint'}`}>{ok ? <Icon size={20} /> : <Lock size={18} />}</span>
              <div className="flex-1"><p className="font-bold leading-tight">{title}</p><p className="text-xs text-ink-soft">{ok ? 'Liberado · toque para abrir' : m.desc}</p></div>
            </>
          );
          return href ? <Link key={m.id} href={href} className="card flex items-center gap-3 p-3">{inner}</Link> : <div key={m.id} className="card flex items-center gap-3 p-3 opacity-70">{inner}</div>;
        })}
      </div>

      <SectionTitle>De onde vêm seus pontos</SectionTitle>
      <div className="card p-4">
        <Bars items={[
          { label: 'Treinos', value: pts.workouts }, { label: 'Missões', value: pts.missions }, { label: 'Diário', value: pts.journal },
          { label: 'Desafios semanais', value: pts.weekly }, { label: 'Aulas bônus', value: pts.sessions }, { label: 'Respiração', value: pts.breath },
          { label: 'Leituras', value: pts.read }, { label: 'Quiz', value: pts.quiz }, { label: 'Roleta', value: pts.roulette }, { label: 'Cartas', value: pts.cards },
        ]} />
        {pts.total === 0 && <p className="text-center text-sm text-ink-soft">Conclua seu primeiro treino para começar a pontuar!</p>}
        <p className="mt-3 text-[11px] text-ink-faint">Os pontos são calculados a partir do que você realmente fez. Recarregar a página ou repetir um treino já contado não soma de novo.</p>
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
              <p className="mt-1 text-xs font-bold text-grape-600">{ok ? 'Conquistada! 🎉' : `${a} de ${b}`}</p>
            </div>
          );
        })()}
      </Sheet>
    </Page>
  );
}
