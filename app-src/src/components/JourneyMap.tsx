'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Gift, Lock, Play } from 'lucide-react';
import { useStore } from '@/lib/store';
import { DAYS, PHASES } from '@/content/program';
import { dayStatus, MEDALS } from '@/lib/progress';
import { Luna } from './Luna';

const REWARD_DAYS = new Set(MEDALS.filter(m => m.kind === 'marco').map(m => Number(m.id.slice(1))));
const X = [50, 68, 72, 58, 38, 28, 40]; // zigue-zague da trilha (em %), longe das bordas

/** Mapa da Jornada: trilha visual dos 21 dias */
export function JourneyMap() {
  const s = useStore();
  return (
    <div className="space-y-6">
      {PHASES.map(ph => {
        const days = DAYS.filter(d => d.phase === ph.n);
        return (
          <section key={ph.n}>
            <div className={`rounded-3xl bg-gradient-to-r ${ph.color} p-4 text-white shadow-soft`}>
              <p className="text-xs font-extrabold uppercase tracking-wider text-white/80">Fase {ph.n} · dias {ph.days[0]}–{ph.days[1]}</p>
              <p className="font-display text-xl font-bold">{ph.name}</p>
              <p className="text-xs text-white/90">{ph.desc}</p>
            </div>
            <div className="relative mt-2" style={{ height: days.length * 92 }}>
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox={`0 0 100 ${days.length * 92}`} aria-hidden>
                <path
                  d={days.map((_, i) => `${i ? 'L' : 'M'} ${X[i]} ${i * 92 + 46}`).join(' ')}
                  fill="none" stroke="#DDD0FF" strokeWidth="1.6" strokeDasharray="3 3" vectorEffect="non-scaling-stroke"
                  style={{ strokeWidth: 6 }}
                />
              </svg>
              {days.map((d, i) => {
                const st = dayStatus(s, d.n);
                const current = st === 'disponivel' || st === 'andamento';
                const href = st === 'bloqueado' || st === 'pendente' ? `/treinos/dia/${d.n}/` : current ? `/treinar/${d.n}/` : `/treinos/dia/${d.n}/`;
                return (
                  <motion.div key={d.n} className="absolute" style={{ left: `${X[i]}%`, top: i * 92 + 10, x: '-50%' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * .04, type: 'spring' }}>
                    <Link href={href} className="relative flex flex-col items-center" aria-label={`Dia ${d.n}: ${d.name}`}>
                      {current && <div className="absolute -top-3 right-full mr-1"><Luna mood="animada" size={52} /></div>}
                      <span className={`relative grid h-16 w-16 place-items-center rounded-full border-4 text-lg font-extrabold shadow-card transition
                        ${st === 'concluido' ? 'border-white bg-brand text-white' : current ? 'animate-pulse border-white bg-grape-600 text-white ring-4 ring-rose-200' : st === 'pendente' ? 'border-white bg-rose-100 text-rose-500' : 'border-white bg-lilac-100 text-ink-faint'}`}>
                        {st === 'concluido' ? <Check size={26} strokeWidth={3} /> : current ? <Play size={22} fill="white" /> : st === 'bloqueado' ? <Lock size={20} /> : d.n}
                        {REWARD_DAYS.has(d.n) && (
                          <span className={`absolute -right-3 -top-2 grid h-7 w-7 place-items-center rounded-full shadow-soft ${st === 'concluido' ? 'bg-yellow-300' : 'bg-white'}`} aria-label="Recompensa neste dia">
                            <Gift size={15} className={st === 'concluido' ? 'text-grape-800' : 'text-grape-400'} />
                          </span>
                        )}
                      </span>
                      <span className="mt-1 max-w-[9rem] truncate rounded-full bg-white/90 px-2 text-[11px] font-bold text-ink shadow-sm">Dia {d.n} · {d.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
