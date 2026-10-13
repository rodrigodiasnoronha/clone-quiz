'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, type ReactNode } from 'react';
import { Lili, type LiliMood } from './Lili';

const COLORS = ['#FF5FA2', '#E86AA8', '#C42A78', '#FFD166', '#FF9ECB', '#FFB3D3'];

export function Confetti({ count = 70 }: { count?: number }) {
  const pieces = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      i,
      x: Math.random() * 100,
      delay: Math.random() * 0.6,
      dur: 2.2 + Math.random() * 1.8,
      rot: Math.random() * 720 - 360,
      color: COLORS[i % COLORS.length],
      w: 6 + Math.random() * 6,
      round: Math.random() > 0.6,
    })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {pieces.map(p => (
        <motion.span
          key={p.i}
          className="absolute top-0 block"
          style={{ left: `${p.x}%`, width: p.w, height: p.round ? p.w : p.w * 1.8, background: p.color, borderRadius: p.round ? 99 : 2 }}
          initial={{ y: -30, rotate: 0, opacity: 1 }}
          animate={{ y: '105vh', rotate: p.rot, opacity: [1, 1, 0.8] }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  );
}

export function Celebration({ open, onClose, title, text, mood = 'animada', emoji, children, cta = 'Continuar' }: {
  open: boolean; onClose: () => void; title: string; text?: string; mood?: LiliMood; emoji?: string; children?: ReactNode; cta?: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <Confetti />
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-grape-900/50 p-5 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              role="dialog" aria-modal="true" aria-label={title}
              className="w-full max-w-sm rounded-4xl bg-white p-6 text-center shadow-card"
              initial={{ scale: .8, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .9, opacity: 0 }} transition={{ type: 'spring', damping: 18, stiffness: 260 }}
            >
              <div className="relative mx-auto mb-2 w-fit">
                {emoji ? (
                  <motion.div className="grid h-28 w-28 place-items-center rounded-full bg-brand text-6xl shadow-glow" initial={{ rotate: -20, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', delay: .15 }}>
                    {emoji}
                  </motion.div>
                ) : (
                  <Lili mood={mood} size={120} />
                )}
                {emoji && <div className="absolute -bottom-3 -right-6"><Lili mood={mood} size={60} /></div>}
              </div>
              <h2 className="mt-3 text-2xl font-bold text-ink">{title}</h2>
              {text && <p className="mt-2 text-sm text-ink-soft">{text}</p>}
              {children}
              <button className="btn-primary shine mt-5 w-full" onClick={onClose}>{cta}</button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
