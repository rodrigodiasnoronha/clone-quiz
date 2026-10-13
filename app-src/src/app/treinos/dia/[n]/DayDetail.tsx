'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ChevronDown, Lock, Play, RotateCcw, Wand2 } from 'lucide-react';
import { Page, TopBar } from '@/components/ui';
import { ExerciseMedia } from '@/components/ExerciseMedia';
import { LiliSays } from '@/components/Lili';
import { MissionCard } from '@/components/MissionCard';
import { STATUS_STYLE } from '@/components/Calendar';
import { useStore } from '@/lib/store';
import { DAY, PHASES } from '@/content/program';
import { buildSteps, estimateMinutes, STAGE_LABEL, type ExerciseStep } from '@/lib/workout';
import { dayStatus } from '@/lib/progress';
import { formatDate } from '@/lib/dates';

const TYPE_LABEL = { treino: 'Treino', mobilidade: 'Mobilidade', recuperacao: 'Recuperação ativa', celebracao: 'Celebração' };

export function DayDetail({ n }: { n: number }) {
  const s = useStore();
  const day = DAY(n);
  const steps = useMemo(() => buildSteps(day, s.profile), [day, s.profile]);
  const ex = useMemo(() => {
    const m = new Map<string, ExerciseStep>();
    steps.forEach(st => st.kind === 'exercise' && !m.has(st.ex.id + st.stage) && m.set(st.ex.id + st.stage, st));
    return [...m.values()];
  }, [steps]);
  const st = dayStatus(s, n);
  const unlocked = st !== 'bloqueado';
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Page>
      <TopBar back="/desafios/" title={`Dia ${n}`} right={<span className={`chip ${STATUS_STYLE[st].cls}`}>{STATUS_STYLE[st].label}</span>} />
      <p className="label">Fase {day.phase} · {PHASES[day.phase - 1].name} · {TYPE_LABEL[day.type]}</p>
      <h1 className="text-3xl font-bold leading-tight">{day.name}</h1>
      <p className="mt-1 text-ink-soft">{day.goal}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
        <span className="chip bg-white text-grape-700 shadow-soft">⏱️ ~{estimateMinutes(steps)} min</span>
        <span className="chip bg-white text-grape-700 shadow-soft">🧩 {ex.length} exercícios</span>
        {s.days[n]?.completedAt && <span className="chip bg-brand text-white">✓ Feito em {formatDate(s.days[n].completedAt!)}</span>}
      </div>

      {!unlocked ? (
        <div className="card mt-5 flex items-center gap-3 p-4 text-sm font-semibold text-grape-700"><Lock size={20} /> Este dia libera conforme você avança no calendário. Dá para espiar o que vem por aí!</div>
      ) : (
        <div className="mt-4"><LiliSays text={day.lili} /></div>
      )}

      {(['aquecimento', 'principal', 'bonus', 'alongamento'] as const).map(stage => {
        const items = ex.filter(e => e.stage === stage);
        if (!items.length) return null;
        return (
          <section key={stage} className="mt-5">
            <h2 className="label mb-2">{STAGE_LABEL[stage]}</h2>
            <div className="space-y-2">
              {items.map(e => {
                const key = e.ex.id + stage;
                const isOpen = open === key;
                return (
                  <div key={key} className="card overflow-hidden">
                    <button onClick={() => setOpen(isOpen ? null : key)} className="flex w-full items-center gap-3 p-4 text-left" aria-expanded={isOpen}>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold">{e.ex.name}</p>
                        <p className="text-xs text-ink-soft">
                          {e.secs ? `${e.secs}s` : `${e.reps} rep.`}{e.ex.perSide ? ' cada lado' : ''}{e.sets > 1 ? ` · ${e.sets} séries` : ''}
                          {e.adapted && <span className="ml-1 inline-flex items-center gap-0.5 font-bold text-rose-500"><Wand2 size={11} /> adaptado</span>}
                        </p>
                      </div>
                      <ChevronDown size={18} className={`text-grape-500 transition ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="space-y-3 px-4 pb-4 text-sm">
                        <ExerciseMedia ex={e.ex} />
                        <p className="text-xs font-semibold text-grape-600">{e.ex.muscles.join(' · ')}</p>
                        <ol className="list-decimal space-y-1 pl-5">{e.ex.steps.map(t => <li key={t}>{t}</li>)}</ol>
                        <p><b>Respiração: </b>{e.ex.breathing}</p>
                        <div><b className="text-rose-600">Erros comuns</b><ul className="list-disc pl-5 text-ink-soft">{e.ex.errors.map(t => <li key={t}>{t}</li>)}</ul></div>
                        <p className="rounded-xl bg-rose-50 p-2"><b>Mais fácil: </b>{e.ex.easier}</p>
                        <p className="rounded-xl bg-lilac-50 p-2 text-xs"><b>Segurança: </b>{e.ex.safety}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="mt-5">
        <h2 className="label mb-2">Respiração do dia</h2>
        <p className="card p-4 text-sm">{day.breathing}</p>
      </section>

      <section className="mt-5">
        <h2 className="label mb-2">Missões do dia</h2>
        <div className="space-y-2">
          <MissionCard mission={day.extra} badge="Extra" locked={!unlocked} />
          <MissionCard mission={day.surprise} badge="Surpresa" surprise locked={!unlocked} />
        </div>
      </section>

      <p className="mt-5 rounded-2xl bg-white/70 p-3 text-center text-sm font-semibold text-grape-700">🎁 Ao concluir: {day.reward}</p>

      {(st === 'disponivel' || st === 'andamento') && (
        <Link href={`/treinar/${n}/`} className="btn-primary shine mt-5 w-full text-lg"><Play size={20} fill="white" /> {st === 'andamento' ? 'CONTINUAR MEU TREINO' : 'COMEÇAR MEU TREINO'}</Link>
      )}
      {st === 'concluido' && <Link href={`/treinar/${n}/`} className="btn-ghost mt-5 w-full"><RotateCcw size={18} /> Refazer este treino</Link>}
      {st === 'pendente' && <p className="mt-5 text-center text-sm font-semibold text-rose-600">Conclua os dias anteriores para chegar aqui.</p>}
    </Page>
  );
}
