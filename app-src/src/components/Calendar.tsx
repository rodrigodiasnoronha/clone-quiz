'use client';

import Link from 'next/link';
import { Check, Lock, Moon, Play } from 'lucide-react';
import { useStore } from '@/lib/store';
import { DAYS } from '@/content/program';
import { dayStatus, daysBehind, type DayStatus } from '@/lib/progress';
import { addDays, formatDate } from '@/lib/dates';

export const STATUS_STYLE: Record<DayStatus, { label: string; cls: string }> = {
  concluido: { label: 'Concluído', cls: 'bg-brand text-white' },
  andamento: { label: 'Em andamento', cls: 'bg-grape-600 text-white ring-4 ring-rose-200' },
  disponivel: { label: 'Disponível', cls: 'bg-white text-grape-700 ring-2 ring-grape-500' },
  pendente: { label: 'Pendente', cls: 'bg-rose-100 text-rose-600' },
  bloqueado: { label: 'Bloqueado', cls: 'bg-lilac-50 text-ink-faint' },
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
          Você tem {behind} {behind > 1 ? 'dias pendentes' : 'dia pendente'}. Recupere no seu ritmo, sem penalidade — dá até para fazer dois no mesmo dia.
        </div>
      )}
      <div className="grid grid-cols-7 gap-1.5">
        {DAYS.map(d => {
          const st = dayStatus(s, d.n);
          const recovery = d.type === 'recuperacao' || d.type === 'mobilidade';
          return (
            <Link key={d.n} href={`/treinos/dia/${d.n}/`} aria-label={`Dia ${d.n}, ${STATUS_STYLE[st].label}${recovery ? ', recuperação' : ''}`}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-2xl text-sm font-extrabold transition active:scale-95 ${STATUS_STYLE[st].cls}`}>
              {st === 'concluido' ? <Check size={18} strokeWidth={3} /> : st === 'andamento' || st === 'disponivel' ? <Play size={14} /> : st === 'bloqueado' ? <Lock size={13} /> : null}
              <span className={st === 'concluido' || st === 'bloqueado' || st === 'andamento' || st === 'disponivel' ? 'text-[10px]' : ''}>{d.n}</span>
              {recovery && <Moon size={10} className="absolute right-1 top-1 opacity-70" />}
            </Link>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] font-semibold text-ink-soft">
        {(Object.keys(STATUS_STYLE) as DayStatus[]).map(k => (
          <span key={k} className="flex items-center gap-1"><span className={`h-3 w-3 rounded ${STATUS_STYLE[k].cls.split(' ').slice(0, 1).join(' ')}`} />{STATUS_STYLE[k].label}</span>
        ))}
        <span className="flex items-center gap-1"><Moon size={11} /> Recuperação/mobilidade</span>
      </div>
      <p className="mt-2 text-[11px] text-ink-faint">Início em {formatDate(start, { day: '2-digit', month: 'long' })} · término previsto em {formatDate(addDays(start, 20), { day: '2-digit', month: 'long' })}</p>
    </div>
  );
}
