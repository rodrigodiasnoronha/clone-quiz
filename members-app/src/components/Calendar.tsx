'use client';

import Link from 'next/link';
import { Check, Lock, Moon } from 'lucide-react';
import { useStore } from '@/lib/store';
import { DAYS } from '@/content/program';
import { dayStatus, daysBehind, type DayStatus } from '@/lib/progress';
import { addDays, formatDate } from '@/lib/dates';

export const STATUS_STYLE: Record<DayStatus, { label: string; cls: string }> = {
  concluido: { label: 'Done', cls: 'bg-brand text-white shadow-glow' },
  andamento: { label: 'In progress', cls: 'bg-white text-rose-600 ring-[3px] ring-rose-500' },
  disponivel: { label: 'Available', cls: 'bg-white text-rose-600 ring-[3px] ring-rose-500' },
  pendente: { label: 'Pending', cls: 'bg-rose-100 text-rose-600' },
  bloqueado: { label: 'Locked', cls: 'bg-lilac-50 text-ink-faint' },
};

/** Calendário interativo dos 21 dias */
export function Calendar() {
  const s = useStore();
  const start = s.profile!.startDate;
  const behind = daysBehind(s);
  return (
    <div>
      {behind > 0 && (
        <div className="mb-3 rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-700 ring-1 ring-rose-100">
          You have {behind} {behind > 1 ? 'pending days' : 'pending day'}. Make them up at your own pace, with no penalty — you can even do two in one day.
        </div>
      )}
      <div className="grid grid-cols-7 gap-x-1.5 gap-y-3 pt-2">
        {DAYS.map(d => {
          const st = dayStatus(s, d.n);
          const recovery = d.type === 'recuperacao' || d.type === 'mobilidade';
          return (
            <Link key={d.n} href={`/treinos/dia/${d.n}/`} aria-label={`Day ${d.n}, ${STATUS_STYLE[st].label}${recovery ? ', recovery' : ''}`}
              className={`relative mx-auto flex aspect-square w-full max-w-[3rem] flex-col items-center justify-center rounded-full text-sm font-extrabold transition active:scale-95 ${STATUS_STYLE[st].cls}`}>
              {(st === 'andamento' || st === 'disponivel') && <span className="absolute -top-3 text-xs" aria-hidden>👑</span>}
              {st === 'concluido' && <Check size={11} strokeWidth={4} className="absolute -top-0.5 right-0 rounded-full bg-white p-0.5 text-rose-500 shadow" style={{ width: 16, height: 16 }} />}
              {st === 'bloqueado' ? <Lock size={13} /> : <span>{d.n}</span>}
              {recovery && <Moon size={10} className="absolute right-1 top-1 opacity-70" />}
            </Link>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] font-semibold text-ink-soft">
        {(Object.keys(STATUS_STYLE) as DayStatus[]).map(k => (
          <span key={k} className="flex items-center gap-1"><span className={`h-3 w-3 rounded-full ${STATUS_STYLE[k].cls.split(' ').slice(0, 3).join(' ')}`} />{STATUS_STYLE[k].label}</span>
        ))}
        <span className="flex items-center gap-1"><Moon size={11} /> Recovery/mobility</span>
      </div>
      <p className="mt-2 text-[11px] text-ink-faint">Started {formatDate(start, { day: '2-digit', month: 'long' })} · expected finish {formatDate(addDays(start, 20), { day: '2-digit', month: 'long' })}</p>
    </div>
  );
}
