'use client';

import { motion } from 'framer-motion';
import type { JournalEntry } from '@/lib/types';
import { formatDate } from '@/lib/dates';

const SERIES = [
  { key: 'mood', label: 'Humor', color: '#EC4C93' },
  { key: 'energy', label: 'Energia', color: '#7C4DDB' },
  { key: 'sleep', label: 'Sono', color: '#A98BFA' },
] as const;

/** Linhas de humor, energia e sono (escala 1 a 5) */
export function HabitsChart({ entries }: { entries: JournalEntry[] }) {
  const data = entries.filter(e => e.mood).slice(-14);
  if (data.length < 2) {
    return <p className="rounded-2xl bg-lilac-50 p-4 text-center text-sm text-ink-soft">Faça pelo menos 2 registros no diário para ver seu gráfico de evolução.</p>;
  }
  const W = 320, H = 150, P = 18;
  const x = (i: number) => P + (i / (data.length - 1)) * (W - P * 2);
  const y = (v: number) => H - P - ((v - 1) / 4) * (H - P * 2);
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H + 18}`} className="w-full" role="img" aria-label="Gráfico de humor, energia e sono">
        {[1, 2, 3, 4, 5].map(v => <line key={v} x1={P} x2={W - P} y1={y(v)} y2={y(v)} stroke="#EFE8FF" strokeDasharray={v === 3 ? '0' : '3 4'} />)}
        {SERIES.map((s, si) => {
          const pts = data.map((e, i) => [x(i), y((e[s.key] as number) ?? 3)] as const);
          const d = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px},${py}`).join(' ');
          return (
            <g key={s.key}>
              <motion.path d={d} fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: si * .15 }} />
              {pts.map(([px, py], i) => <circle key={i} cx={px} cy={py} r="3.5" fill="#fff" stroke={s.color} strokeWidth="2" />)}
            </g>
          );
        })}
        <text x={P} y={H + 14} fontSize="10" fill="#A39BB3">{formatDate(data[0].date)}</text>
        <text x={W - P} y={H + 14} fontSize="10" fill="#A39BB3" textAnchor="end">{formatDate(data[data.length - 1].date)}</text>
      </svg>
      <div className="mt-1 flex justify-center gap-4 text-xs font-bold">
        {SERIES.map(s => <span key={s.key} className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />{s.label}</span>)}
      </div>
    </div>
  );
}

/** Mapa de consistência dos 21 dias */
export function ConsistencyGrid({ done }: { done: number[] }) {
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {Array.from({ length: 21 }, (_, i) => {
        const on = done.includes(i + 1);
        return (
          <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * .02 }}
            className={`grid aspect-square place-items-center rounded-xl text-[11px] font-extrabold ${on ? 'bg-brand text-white' : 'bg-lilac-50 text-ink-faint'}`}>
            {i + 1}
          </motion.div>
        );
      })}
    </div>
  );
}

/** Barras horizontais simples (ex.: pontos por categoria) */
export function Bars({ items }: { items: { label: string; value: number }[] }) {
  const max = Math.max(1, ...items.map(i => i.value));
  return (
    <div className="space-y-2">
      {items.filter(i => i.value > 0).map((it, k) => (
        <div key={it.label} className="flex items-center gap-2 text-xs font-bold">
          <span className="w-24 shrink-0 text-ink-soft">{it.label}</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-lilac-50">
            <motion.div className="h-full rounded-full bg-brand" initial={{ width: 0 }} animate={{ width: `${(it.value / max) * 100}%` }} transition={{ delay: k * .05, duration: .7 }} />
          </div>
          <span className="w-10 text-right text-grape-700">{it.value}</span>
        </div>
      ))}
    </div>
  );
}
