'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Lock, Moon, Play, Search, X } from 'lucide-react';
import { HeroHeader, Page, SectionTitle, Sheet } from '@/components/ui';
import { ExerciseMedia, ExerciseThumb } from '@/components/ExerciseMedia';
import { useStore } from '@/lib/store';
import { CATEGORY_LABEL, EXERCISES, REGIONS, regionsOf, type Region } from '@/content/exercises';
import { REWARD_SESSIONS, SESSIONS } from '@/content/program';
import { sessionUnlocked } from '@/lib/progress';
import type { Exercise } from '@/lib/types';

type Filter = 'Todos' | Region | 'Mobilidade' | 'Alongamento' | 'Respiração';
const FILTERS: Filter[] = ['Todos', ...REGIONS, 'Mobilidade', 'Alongamento', 'Respiração'];
const KEY = 'pnp21-treinar-filtro';

const matches = (ex: Exercise, f: Filter) =>
  f === 'Todos' ||
  (f === 'Mobilidade' ? ex.category === 'mobilidade' : f === 'Alongamento' ? ex.category === 'alongamento' : f === 'Respiração' ? ex.category === 'respiracao' : regionsOf(ex).includes(f as Region));

const normalize = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Treinar() {
  const s = useStore();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<Filter>('Todos');
  const [sel, setSel] = useState<Exercise | null>(null);

  // preserva busca e filtro ao voltar para a tela
  useEffect(() => {
    try { const v = JSON.parse(sessionStorage.getItem(KEY) ?? 'null'); if (v) { setQ(v.q ?? ''); setFilter(v.filter ?? 'Todos'); } } catch {}
  }, []);
  useEffect(() => { try { sessionStorage.setItem(KEY, JSON.stringify({ q, filter })); } catch {} }, [q, filter]);

  const list = useMemo(() => {
    const term = normalize(q.trim());
    return EXERCISES.filter(ex => matches(ex, filter) && (!term || normalize(`${ex.name} ${ex.muscles.join(' ')}`).includes(term)));
  }, [q, filter]);

  const sessions = [
    { id: 'alongamento-rapido', label: 'Livre' },
    ...REWARD_SESSIONS.map(r => ({ id: r.session, label: `Libera no dia ${r.day}` })),
    ...['a', 'b', 'c'].map(x => ({ id: `manutencao-${x}`, label: 'Libera no dia 21' })),
  ];

  return (
    <Page>
      <HeroHeader className="pb-5">
        <h1 className="mt-4 text-center text-xl font-bold">Todos os Exercícios</h1>
        <label className="mt-4 flex h-12 items-center gap-2 rounded-2xl bg-white px-4 text-ink shadow-soft focus-within:ring-[3px] focus-within:ring-rose-400">
          <Search size={18} className="shrink-0 text-ink-faint" aria-hidden />
          <span className="sr-only">Buscar exercício</span>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar exercício ou músculo…" className="h-full min-w-0 flex-1 bg-transparent font-semibold outline-none placeholder:font-medium placeholder:text-ink-faint" />
          {q && <button onClick={() => setQ('')} aria-label="Limpar busca" className="grid h-7 w-7 place-items-center rounded-full bg-rose-50 text-rose-500"><X size={14} /></button>}
        </label>
      </HeroHeader>

      <div className="-mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4 pb-1" role="tablist" aria-label="Filtrar por região">
        {FILTERS.map(f => (
          <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${filter === f ? 'bg-brand text-white shadow-glow' : 'bg-white text-ink-soft ring-1 ring-rose-100'}`}>{f}</button>
        ))}
      </div>

      <p className="mt-3 text-xs font-bold text-ink-soft" aria-live="polite">{list.length} {list.length === 1 ? 'exercício' : 'exercícios'}</p>

      {list.length === 0 ? (
        <div className="card mt-2 p-6 text-center">
          <p className="text-3xl">🔍</p>
          <p className="mt-2 font-bold">Nenhum exercício encontrado</p>
          <p className="text-sm text-ink-soft">Tente outra palavra ou outro filtro.</p>
          <button className="btn-soft mt-4" onClick={() => { setQ(''); setFilter('Todos'); }}>Limpar busca e filtros</button>
        </div>
      ) : (
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          <AnimatePresence initial={false}>
            {list.map(ex => (
              <motion.button layout key={ex.id} onClick={() => setSel(ex)} initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .95 }}
                className="card flex flex-col p-2 text-left">
                <ExerciseThumb ex={ex} />
                <span className="mt-2 line-clamp-2 px-1 text-sm font-bold leading-tight">{ex.name}</span>
                <span className="mt-1.5 flex flex-wrap gap-1 px-1 pb-1">
                  {(regionsOf(ex).length ? regionsOf(ex).slice(0, 2) : [CATEGORY_LABEL[ex.category]]).map(t => (
                    <span key={t} className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">{t}</span>
                  ))}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}

      <SectionTitle action={{ href: '/relaxar/', label: 'Modo Relaxamento' }}>Aulas e sessões</SectionTitle>
      <div className="space-y-2">
        {sessions.map(({ id, label }) => {
          const ses = SESSIONS[id];
          const open = id === 'alongamento-rapido' || sessionUnlocked(s, id);
          const inner = (
            <>
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${open ? 'bg-brand text-white' : 'bg-lilac-50 text-ink-faint'}`}>{open ? <Play size={18} fill="white" /> : <Lock size={16} />}</span>
              <span className="min-w-0 flex-1"><span className="block font-bold leading-tight">{ses.title}</span><span className="block text-xs text-ink-soft">{open ? ses.subtitle : label}</span></span>
            </>
          );
          return open
            ? <Link key={id} href={`/sessao/${id}/`} className="card flex items-center gap-3 p-3">{inner}</Link>
            : <div key={id} className="card flex items-center gap-3 p-3 opacity-70" aria-disabled>{inner}</div>;
        })}
        <Link href="/relaxar/" className="flex items-center gap-3 rounded-3xl bg-night p-4 text-white shadow-card">
          <Moon size={22} className="text-rose-300" />
          <span className="flex-1"><span className="block font-bold">Modo Relaxamento</span><span className="block text-xs text-white/75">Respiração, alongamento, meditação e sono</span></span>
        </Link>
      </div>

      <Sheet open={!!sel} onClose={() => setSel(null)} title={sel?.name}>
        {sel && (
          <div className="space-y-3 text-sm">
            <ExerciseMedia ex={sel} />
            <p className="text-xs font-bold text-rose-600">{sel.muscles.join(' · ')}</p>
            <p className="text-ink-soft"><b className="text-ink">Posição: </b>{sel.position}</p>
            <ol className="list-decimal space-y-1 pl-5">{sel.steps.map(t => <li key={t}>{t}</li>)}</ol>
            <p><b>Respiração: </b>{sel.breathing}</p>
            <div><b className="text-rose-600">Erros comuns</b><ul className="list-disc pl-5 text-ink-soft">{sel.errors.map(t => <li key={t}>{t}</li>)}</ul></div>
            <p className="rounded-xl bg-rose-50 p-2"><b>Mais fácil: </b>{sel.easier}</p>
            <p className="rounded-xl bg-lilac-50 p-2 text-xs"><b>Segurança: </b>{sel.safety}</p>
            {s.profile?.limitations.some(l => sel.avoid?.includes(l)) && (
              <p className="rounded-xl bg-amber-50 p-2 text-xs font-semibold text-amber-800">⚠️ Você marcou uma limitação que pede cuidado com este exercício. Nos treinos do desafio ele é trocado automaticamente.</p>
            )}
            <Link href={`/praticar/${sel.id}/`} className="btn-primary shine w-full"><Play size={18} fill="white" /> Praticar este exercício</Link>
          </div>
        )}
      </Sheet>
    </Page>
  );
}
