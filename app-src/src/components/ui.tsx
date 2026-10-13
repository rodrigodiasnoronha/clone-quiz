'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';

export function Page({ children, className = '', nav = true }: { children: ReactNode; className?: string; nav?: boolean }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .3, ease: 'easeOut' }}
      className={`mx-auto w-full max-w-md px-4 pt-4 ${nav ? 'pb-nav' : 'pb-8'} ${className}`}
    >
      {children}
    </motion.main>
  );
}

export function TopBar({ title, back, right }: { title?: string; back?: string | true; right?: ReactNode }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-20 -mx-4 mb-3 flex h-14 items-center gap-2 bg-gradient-to-b from-rose-50/95 to-rose-50/0 px-4 backdrop-blur-[2px]">
      {back && (
        <button
          aria-label="Voltar"
          onClick={() => (back === true ? router.back() : router.push(back))}
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-grape-700 shadow-soft active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>
      )}
      {title && <h1 className="flex-1 truncate text-lg font-bold text-ink">{title}</h1>}
      {right}
    </header>
  );
}

export function ProgressBar({ value, className = '', color = 'bg-brand' }: { value: number; className?: string; color?: string }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div className={`h-3 w-full overflow-hidden rounded-full bg-lilac-100 ${className}`} role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <motion.div className={`h-full rounded-full ${color}`} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: .8, ease: 'easeOut' }} />
    </div>
  );
}

export function Ring({ value, size = 72, stroke = 8, children }: { value: number; size?: number; stroke?: number; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ring" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#F873AE" />
            <stop offset="1" stopColor="#7C4DDB" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#EFE8FF" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} stroke="url(#ring)" strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - Math.min(1, value)) }} transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

export function Sheet({ open, onClose, children, title }: { open: boolean; onClose: () => void; children: ReactNode; title?: string }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-grape-900/40 backdrop-blur-sm sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            role="dialog" aria-modal="true" aria-label={title}
            className="max-h-[88dvh] w-full max-w-md overflow-y-auto rounded-t-4xl bg-white p-5 pb-8 shadow-card sm:rounded-4xl"
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">{title}</h2>
              <button aria-label="Fechar" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-lilac-50 text-grape-700"><X size={18} /></button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: { href: string; label: string } }) {
  return (
    <div className="mb-2 mt-6 flex items-center justify-between">
      <h2 className="text-base font-bold text-ink">{children}</h2>
      {action && <Link href={action.href} className="text-sm font-bold text-grape-500">{action.label}</Link>}
    </div>
  );
}

export function Stat({ icon, value, label }: { icon: ReactNode; value: ReactNode; label: string }) {
  return (
    <div className="card flex flex-1 flex-col items-center gap-0.5 px-2 py-3 text-center">
      <div className="text-xl">{icon}</div>
      <div className="font-display text-xl font-bold text-ink">{value}</div>
      <div className="text-[11px] font-semibold text-ink-soft">{label}</div>
    </div>
  );
}

export function Toast({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} className="fixed inset-x-4 bottom-28 z-50 mx-auto max-w-sm rounded-2xl bg-grape-800 px-4 py-3 text-center text-sm font-semibold text-white shadow-card" role="status">
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Seletor de 1 a 5 com emojis (humor, energia, sono…) */
export function Scale({ value, onChange, emojis, labels }: { value?: number; onChange: (v: number) => void; emojis: string[]; labels: string[] }) {
  return (
    <div className="flex justify-between gap-1.5" role="radiogroup">
      {emojis.map((e, i) => {
        const v = i + 1;
        const on = value === v;
        return (
          <button
            key={v} role="radio" aria-checked={on} aria-label={labels[i]} onClick={() => onChange(v)}
            className={`flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-2xl transition ${on ? 'bg-brand text-white shadow-glow scale-105' : 'bg-lilac-50'}`}
          >
            <span>{e}</span>
            <span className={`text-[10px] font-bold ${on ? 'text-white' : 'text-ink-soft'}`}>{labels[i]}</span>
          </button>
        );
      })}
    </div>
  );
}
