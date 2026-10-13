'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Minus, Plus, Settings2, Sparkles, Zap, HeartPulse } from 'lucide-react';
import { Page, SectionTitle, Sheet, TopBar } from '@/components/ui';
import { Celebration } from '@/components/Celebration';
import { useStore } from '@/lib/store';
import { addDays, formatDate, toKey } from '@/lib/dates';
import { POINTS } from '@/lib/progress';
import { beep, vibrate } from '@/lib/device';

const BENEFITS = [
  { icon: Zap, t: 'Mais energia', d: 'A desidratação leve já pode causar cansaço.' },
  { icon: Sparkles, t: 'Pele e corpo', d: 'Água participa de quase todas as funções do corpo.' },
  { icon: HeartPulse, t: 'Recuperação', d: 'Ajuda a repor o que você perde treinando.' },
];

function message(cups: number, goal: number) {
  if (cups === 0) return { t: 'Que tal começar com um copo agora?', e: '💧' };
  if (cups >= goal) return { t: 'Meta do dia batida! Seu corpo agradece.', e: '🎉' };
  if (cups / goal >= 0.5) return { t: 'Muito bem! Já passou da metade.', e: '💪' };
  return { t: 'Bom começo! Continue ao longo do dia.', e: '🌱' };
}

export default function Hidratacao() {
  const s = useStore();
  const today = toKey();
  const cups = s.water?.[today] ?? 0;
  const goal = s.waterGoal ?? 8;
  const [party, setParty] = useState(false);
  const [editGoal, setEditGoal] = useState(false);
  const pct = Math.min(1, cups / goal);
  const msg = message(cups, goal);
  const R = 74, C = 2 * Math.PI * R;
  const week = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));

  const change = (n: number) => {
    const next = Math.max(0, Math.min(20, n));
    if (next === cups) return;
    s.setWater(today, next);
    vibrate(20);
    if (next > cups) beep(720, 80, 0.08);
    if (next >= goal && s.addActivity(`water:${today}`)) setParty(true);
  };

  return (
    <Page>
      <TopBar back="/mais/" title="Hidratação" right={<button onClick={() => setEditGoal(true)} aria-label="Ajustar meta diária" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/15"><Settings2 size={18} /></button>} />

      <div className="card p-5">
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => change(cups - 1)} disabled={cups === 0} aria-label="Remover um copo" className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-soft ring-1 ring-rose-100 disabled:opacity-40"><Minus /></button>
          <div className="relative grid h-44 w-44 place-items-center" role="img" aria-label={`${cups} de ${goal} copos hoje`}>
            <svg viewBox="0 0 170 170" className="absolute inset-0 -rotate-90">
              <circle cx="85" cy="85" r={R} stroke="#E0F2FE" strokeWidth="14" fill="none" />
              <motion.circle cx="85" cy="85" r={R} stroke="#38BDF8" strokeWidth="14" fill="none" strokeLinecap="round" strokeDasharray={C} animate={{ strokeDashoffset: C * (1 - pct) }} transition={{ type: 'spring', damping: 20 }} />
            </svg>
            <div className="text-center">
              <motion.p key={cups} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="font-display text-5xl font-bold text-ink">{cups}<span className="text-2xl text-ink-faint">/{goal}</span></motion.p>
              <p className="text-sm font-semibold text-ink-soft">copos hoje</p>
            </div>
          </div>
          <button onClick={() => change(cups + 1)} aria-label="Adicionar um copo" className="grid h-12 w-12 place-items-center rounded-full bg-sky-500 text-white shadow-soft"><Plus /></button>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-1.5" aria-label="Toque em um copo para marcar">
          {Array.from({ length: Math.max(goal, cups) }, (_, i) => (
            <button key={i} onClick={() => change(i + 1 === cups ? i : i + 1)} aria-label={`${i + 1} ${i ? 'copos' : 'copo'}`}
              className={`relative h-11 w-8 overflow-hidden rounded-b-xl rounded-t-md border-2 transition ${i < cups ? 'border-sky-400' : 'border-sky-200'}`}>
              <motion.span className="absolute inset-x-0 bottom-0 bg-sky-400" initial={false} animate={{ height: i < cups ? '85%' : '0%' }} transition={{ type: 'spring', damping: 18 }} />
            </button>
          ))}
        </div>

        <p className="mt-4 text-center font-bold text-ink">{msg.e} {msg.t}</p>
        <p className="text-center text-xs text-ink-soft">Bater a meta vale +{POINTS.water} pontos por dia. Um copo ≈ 250 ml.</p>
      </div>

      <SectionTitle>Últimos 7 dias</SectionTitle>
      <div className="card flex items-end justify-between gap-1.5 p-4" style={{ height: 150 }}>
        {week.map(d => {
          const c = s.water?.[d] ?? 0;
          const h = Math.min(1, c / goal);
          return (
            <div key={d} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] font-bold text-ink-soft">{c}</span>
              <div className="flex h-20 w-full items-end overflow-hidden rounded-lg bg-sky-50">
                <motion.div className={`w-full rounded-lg ${c >= goal ? 'bg-sky-500' : 'bg-sky-300'}`} initial={{ height: 0 }} animate={{ height: `${h * 100}%` }} />
              </div>
              <span className={`text-[10px] font-bold ${d === today ? 'text-rose-600' : 'text-ink-faint'}`}>{d === today ? 'Hoje' : formatDate(d, { weekday: 'short' }).replace('.', '')}</span>
            </div>
          );
        })}
      </div>

      <SectionTitle>Benefícios da hidratação</SectionTitle>
      <div className="grid grid-cols-3 gap-2">
        {BENEFITS.map(b => (
          <div key={b.t} className="card p-3 text-center">
            <b.icon className="mx-auto text-rose-500" size={22} />
            <p className="mt-1 text-xs font-bold">{b.t}</p>
            <p className="mt-0.5 text-[10px] leading-snug text-ink-soft">{b.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-ink-faint">A necessidade de água varia com o corpo, o clima e a atividade. Se você tem orientação médica de restrição de líquidos, siga a recomendação do seu médico.</p>

      <Sheet open={editGoal} onClose={() => setEditGoal(false)} title="Meta diária de copos">
        <div className="flex items-center justify-center gap-5">
          <button onClick={() => s.setWaterGoal(goal - 1)} disabled={goal <= 4} aria-label="Diminuir meta" className="grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-rose-600 disabled:opacity-40"><Minus /></button>
          <p className="w-24 text-center font-display text-5xl font-bold">{goal}</p>
          <button onClick={() => s.setWaterGoal(goal + 1)} disabled={goal >= 16} aria-label="Aumentar meta" className="grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-rose-600 disabled:opacity-40"><Plus /></button>
        </div>
        <p className="mt-3 text-center text-sm text-ink-soft">copos de ~250 ml por dia ({(goal * 0.25).toFixed(1).replace('.', ',')} L)</p>
        <button className="btn-primary mt-5 w-full" onClick={() => setEditGoal(false)}>Salvar meta</button>
      </Sheet>

      <Celebration open={party} mood="animada" emoji="💧" title="Meta de água batida!" text={`+${POINTS.water} Pontos de Evolução. Você cuidou do seu corpo hoje.`} onClose={() => setParty(false)} />
    </Page>
  );
}
