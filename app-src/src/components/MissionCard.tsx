'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronRight, HelpCircle } from 'lucide-react';
import { useStore } from '@/lib/store';
import type { Mission } from '@/lib/types';
import { POINTS } from '@/lib/progress';

export const MISSION_ICON: Record<Mission['kind'], string> = {
  breath: '🌬️', journal: '📔', read: '📖', timer: '⏱️', quiz: '🧠', card: '💌', roulette: '🎡', win: '🏆',
};

export function MissionCard({ mission, badge, surprise = false, locked = false }: { mission: Mission; badge?: string; surprise?: boolean; locked?: boolean }) {
  const done = useStore(s => !!s.missions[mission.id]);
  const revealed = useStore(s => !!s.activities[`reveal:${mission.id}`]);
  const addActivity = useStore(s => s.addActivity);
  const hidden = surprise && !revealed && !done;

  if (locked) {
    return (
      <div className="card flex items-center gap-3 p-4 opacity-60">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-lilac-50 text-2xl">🔒</div>
        <div className="flex-1"><p className="font-bold">{badge && `Missão ${badge.toLowerCase()}`}</p><p className="text-xs text-ink-soft">Libera junto com o dia do desafio</p></div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {hidden ? (
        <motion.button
          key="hidden" onClick={() => addActivity(`reveal:${mission.id}`)} exit={{ rotateY: 90, opacity: 0 }} transition={{ duration: .2 }}
          className="relative flex w-full items-center gap-3 overflow-hidden rounded-3xl bg-gradient-to-r from-grape-600 to-rose-400 p-4 text-left text-white shadow-glow"
        >
          <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20">
            <HelpCircle size={26} />
          </motion.div>
          <div className="flex-1">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-white/80">Missão surpresa</p>
            <p className="font-bold">Toque para revelar ✨</p>
          </div>
          <span className="chip bg-white/20">+{POINTS.mission}</span>
        </motion.button>
      ) : (
        <motion.div key="shown" initial={{ rotateY: surprise ? -90 : 0, opacity: surprise ? 0 : 1 }} animate={{ rotateY: 0, opacity: 1 }}>
          <Link href={`/missoes/${mission.id}/`} className={`card flex items-center gap-3 p-4 ${done ? 'bg-lilac-50/80' : ''}`}>
            <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ${done ? 'bg-brand' : 'bg-gradient-to-br from-rose-100 to-lilac-100'}`}>
              {done ? <Check className="text-white" /> : MISSION_ICON[mission.kind]}
            </div>
            <div className="min-w-0 flex-1">
              {badge && <p className="label">Missão {badge}</p>}
              <p className={`font-bold leading-tight ${done ? 'text-ink-soft line-through' : ''}`}>{mission.title}</p>
              <p className="line-clamp-2 text-xs text-ink-soft">{mission.desc}</p>
            </div>
            {done ? <span className="chip bg-white text-grape-600">Feita</span> : <span className="flex items-center text-xs font-extrabold text-grape-500">+{POINTS.mission}<ChevronRight size={16} /></span>}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
