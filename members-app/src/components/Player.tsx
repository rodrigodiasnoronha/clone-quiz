'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Pause, Play, Plus, SkipForward, Sparkles, X, Wand2, Wind } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ExerciseMedia } from './ExerciseMedia';
import { Lili, LiliSays } from './Lili';
import { Sheet } from './ui';
import { beep, chime, keepAwake, vibrate } from '@/lib/device';
import { estimateMinutes, STAGE_LABEL, type ExerciseStep, type Step } from '@/lib/workout';

interface Props {
  title: string;
  subtitle: string;
  lili: string;
  breathing?: string;
  steps: Step[];
  initialStep?: number;
  onProgress?: (idx: number) => void;
  onExit: () => void;
  onFinish: (difficulty: number) => void;
}

const SECONDS_PER_REP = 4;

export function Player({ title, subtitle, lili, breathing, steps, initialStep = 0, onProgress, onExit, onFinish }: Props) {
  const [phase, setPhase] = useState<'intro' | 'countdown' | 'run' | 'finish'>('intro');
  const [idx, setIdx] = useState(Math.min(initialStep, steps.length - 1));
  const [left, setLeft] = useState(0);
  const [paused, setPaused] = useState(false);
  const [count, setCount] = useState(3);
  const [confirmExit, setConfirmExit] = useState(false);
  const [easier, setEasier] = useState(false);
  const [howTo, setHowTo] = useState(false);
  const [difficulty, setDifficulty] = useState<number>();
  const release = useRef<() => void>();

  const step = steps[idx];
  const exerciseSteps = useMemo(() => steps.filter(s => s.kind === 'exercise') as ExerciseStep[], [steps]);
  const nextEx = useMemo(() => steps.slice(idx + 1).find(s => s.kind === 'exercise') as ExerciseStep | undefined, [steps, idx]);
  const minutes = estimateMinutes(steps);
  const adaptations = useMemo(() => Array.from(new Map(exerciseSteps.filter(s => s.adapted).map(s => [s.ex.id, s])).values()), [exerciseSteps]);
  const duration = step?.kind === 'rest' ? step.secs : step?.secs;

  const totalFor = useCallback((i: number) => {
    const s = steps[i];
    return s.kind === 'rest' ? s.secs : s.secs ?? (s.reps ?? 8) * SECONDS_PER_REP;
  }, [steps]);

  const go = useCallback((to: number) => {
    if (to >= steps.length) { setPhase('finish'); chime(); vibrate([80, 60, 80, 60, 200]); return; }
    const target = Math.max(0, to);
    setIdx(target);
    setLeft(totalFor(target)); // junto com a troca de etapa, para não disparar o avanço duas vezes
    setEasier(false);
    setHowTo(false);
    setPaused(false);
    onProgress?.(target);
  }, [steps.length, onProgress, totalFor]);

  // Relógio
  useEffect(() => {
    if (phase !== 'run' || paused) return;
    const t = setInterval(() => setLeft(x => x - 1), 1000);
    return () => clearInterval(t);
  }, [phase, paused, idx]);

  // Fim do tempo: avança sozinho (exercícios por tempo e descansos)
  useEffect(() => {
    if (phase !== 'run' || !step || paused) return;
    const timed = step.kind === 'rest' || step.secs;
    if (timed && left > 0 && left <= 3) beep(left === 1 ? 990 : 660, 110);
    if (timed && left === 0) { vibrate(120); go(idx + 1); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  // Contagem 3-2-1
  useEffect(() => {
    if (phase !== 'countdown') return;
    if (count === 0) { setLeft(totalFor(idx)); setPhase('run'); beep(1175, 200); return; }
    beep(660, 100);
    const t = setTimeout(() => setCount(c => c - 1), 900);
    return () => clearTimeout(t);
  }, [phase, count, idx, totalFor]);

  // Tela ligada durante o treino
  useEffect(() => {
    if (phase === 'run' || phase === 'countdown') { keepAwake().then(r => (release.current = r)); }
    return () => release.current?.();
  }, [phase]);

  const start = () => { setCount(3); setPhase('countdown'); };

  // ───────── INTRO ─────────
  if (phase === 'intro') {
    const groups = (['aquecimento', 'principal', 'bonus', 'alongamento'] as const).map(stage => ({
      stage, items: Array.from(new Map(exerciseSteps.filter(s => s.stage === stage).map(s => [s.ex.id, s])).values()),
    })).filter(g => g.items.length);
    return (
      <main className="mx-auto min-h-dvh w-full max-w-md px-4 pb-32 pt-4">
        <div className="flex items-center justify-between">
          <button aria-label="Close" onClick={onExit} className="grid h-10 w-10 place-items-center rounded-full bg-white text-grape-700 shadow-soft"><X size={20} /></button>
          <span className="chip bg-white text-grape-700 shadow-soft">~{minutes} min · {exerciseSteps.length} steps</span>
        </div>
        <p className="label mt-5">{subtitle}</p>
        <h1 className="text-3xl font-bold leading-tight">{title}</h1>
        <div className="mt-4"><LiliSays text={lili} mood="animada" size={64} /></div>
        {breathing && (
          <div className="card mt-4 flex gap-3 p-4">
            <Wind className="mt-0.5 shrink-0 text-lilac-500" size={20} />
            <p className="text-sm"><span className="font-bold">Today’s breathing: </span>{breathing}</p>
          </div>
        )}
        {adaptations.length > 0 && (
          <div className="mt-3 rounded-3xl bg-rose-50 p-4 text-sm ring-1 ring-rose-100">
            <p className="flex items-center gap-1.5 font-bold text-rose-600"><Wand2 size={16} /> Adapted for you</p>
            {adaptations.map(a => <p key={a.ex.id} className="mt-1 text-ink-soft">{a.adapted} → <b className="text-ink">{a.ex.name}</b></p>)}
          </div>
        )}
        {initialStep > 0 && <p className="mt-3 rounded-2xl bg-lilac-50 p-3 text-sm font-semibold text-grape-700">You stopped at step {initialStep + 1}. Let’s pick up where you left off!</p>}
        {groups.map(g => (
          <section key={g.stage} className="mt-5">
            <h2 className="label mb-2">{STAGE_LABEL[g.stage]}</h2>
            <div className="space-y-2">
              {g.items.map(s => (
                <div key={s.ex.id} className="card flex items-center gap-3 p-3">
                  <div className="h-12 w-16 shrink-0"><MiniThumb cat={s.ex.category} /></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">{s.ex.name}</p>
                    <p className="text-xs text-ink-soft">{s.secs ? `${s.secs}s` : `${s.reps} reps`}{s.ex.perSide ? ' per side' : ''}{s.sets > 1 ? ` · ${s.sets} sets` : ''}{s.optional ? ' · optional' : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
        <p className="mt-5 text-center text-xs text-ink-faint">You’ll need: a clear wall and a mat or towel.</p>
        <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md bg-gradient-to-t from-rose-50 via-rose-50/95 to-transparent px-4 pb-6 pt-8" style={{ paddingBottom: 'calc(24px + var(--safe-bottom))' }}>
          <button onClick={start} className="btn-primary shine w-full text-lg"><Play size={20} fill="white" /> {initialStep > 0 ? 'Continue workout' : 'Start'}</button>
        </div>
      </main>
    );
  }

  // ───────── CONTAGEM ─────────
  if (phase === 'countdown') {
    return (
      <main className="grid min-h-dvh place-items-center bg-brand text-white">
        <div className="text-center">
          <AnimatePresence mode="popLayout">
            <motion.p key={count} initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .5, opacity: 0 }} className="font-display text-[9rem] font-bold leading-none">
              {count || 'Go!'}
            </motion.p>
          </AnimatePresence>
          <p className="mt-4 font-bold text-white/85">Get in position near the wall</p>
        </div>
      </main>
    );
  }

  // ───────── FIM ─────────
  if (phase === 'finish') {
    const opts = [[2, '😌', 'Easy'], [3, '🙂', 'Just right'], [4, '😤', 'Challenging']] as const;
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-5 text-center">
        <Lili mood="orgulhosa" size={140} />
        <h1 className="mt-3 text-3xl font-bold">Workout complete!</h1>
        <p className="mt-1 text-ink-soft">How did it feel today?</p>
        <div className="mt-5 grid w-full grid-cols-3 gap-2">
          {opts.map(([v, e, l]) => (
            <button key={v} onClick={() => setDifficulty(v)} className={`flex flex-col items-center gap-1 rounded-3xl py-4 font-bold transition ${difficulty === v ? 'bg-brand text-white shadow-glow' : 'bg-white shadow-soft'}`}>
              <span className="text-3xl">{e}</span><span className="text-sm">{l}</span>
            </button>
          ))}
        </div>
        <button className="btn-primary shine mt-6 w-full" disabled={!difficulty} onClick={() => onFinish(difficulty!)}>Log it and celebrate 🎉</button>
      </main>
    );
  }

  // ───────── EXECUÇÃO ─────────
  const progress = (idx + 1) / steps.length;
  const ex = step.kind === 'exercise' ? step : null;
  const total = step.kind === 'rest' ? step.secs : ex?.secs ?? (ex?.reps ?? 8) * SECONDS_PER_REP;
  const repsDone = ex?.reps && !ex.secs ? Math.min(ex.reps, Math.floor((total - left) / SECONDS_PER_REP)) : 0;

  return (
    <main className={`mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pb-6 pt-3 ${step.kind === 'rest' ? 'bg-gradient-to-b from-lilac-100 to-rose-50' : ''}`}>
      <div className="flex items-center gap-3">
        <button aria-label="Exit workout" onClick={() => { setPaused(true); setConfirmExit(true); }} className="grid h-10 w-10 place-items-center rounded-full bg-white text-grape-700 shadow-soft"><X size={20} /></button>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-lilac-100"><motion.div className="h-full rounded-full bg-brand" animate={{ width: `${progress * 100}%` }} /></div>
        <span className="text-xs font-bold text-ink-soft">{idx + 1}/{steps.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: .22 }} className="flex flex-1 flex-col">
          {step.kind === 'rest' ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <Lili mood="calma" size={110} />
              <p className="label mt-3">Rest</p>
              <p className="font-display text-7xl font-bold text-grape-700" aria-live="polite">{Math.max(0, left)}s</p>
              <p className="mt-1 text-sm text-ink-soft">Take a deep breath and relax your shoulders.</p>
              <div className="mt-5 flex gap-2">
                <button className="btn-ghost" onClick={() => setLeft(x => x + 10)}><Plus size={18} /> 10s</button>
                <button className="btn-soft" onClick={() => go(idx + 1)}><SkipForward size={18} /> Skip</button>
              </div>
              {nextEx && (
                <div className="card mt-6 w-full p-4 text-left">
                  <p className="label">Up next</p>
                  <p className="font-bold">{nextEx.ex.name}{nextEx.side ? ` · ${nextEx.side} side` : ''}</p>
                  <p className="mt-1 text-xs text-ink-soft">{nextEx.ex.position}</p>
                </div>
              )}
            </div>
          ) : ex && (
            <>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="chip bg-lilac-100 text-grape-700">{STAGE_LABEL[ex.stage]}</span>
                {ex.sets > 1 && <span className="chip bg-rose-100 text-rose-600">Set {ex.set} of {ex.sets}</span>}
                {ex.side && <span className="chip bg-grape-500 text-white">{ex.side} side</span>}
                {ex.adapted && <span className="chip bg-rose-50 text-rose-500"><Wand2 size={12} /> adapted</span>}
              </div>
              <h1 className="mt-2 text-2xl font-bold leading-tight">{ex.ex.name}</h1>
              <p className="text-xs font-semibold text-ink-soft">{ex.ex.muscles.join(' · ')}</p>

              <div className="mt-3"><ExerciseMedia ex={ex.ex} compact /></div>

              {/* Temporizador */}
              <div className="mt-4 flex items-center gap-4">
                <TimerRing total={total} left={Math.max(0, left)} label={ex.secs ? `${Math.max(0, left)}s` : `${repsDone}/${ex.reps}`} sub={ex.secs ? 'seconds' : 'reps'} />
                <div className="flex-1 text-sm">
                  {ex.secs ? (
                    <p className="font-semibold text-ink">Hold with steady breathing. The app moves on automatically.</p>
                  ) : (
                    <p className="font-semibold text-ink">Follow the pace: <b>~{SECONDS_PER_REP}s per rep</b>. Tap “Done” when you finish.</p>
                  )}
                  <p className="mt-1 text-xs text-ink-soft">{ex.ex.breathing}</p>
                </div>
              </div>

              {/* Mais fácil / como fazer */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button onClick={() => setEasier(e => !e)} className={`flex items-center justify-center gap-1.5 rounded-2xl py-2.5 text-sm font-bold ${easier ? 'bg-rose-400 text-white' : 'bg-rose-50 text-rose-600'}`}><Sparkles size={16} /> Easier version</button>
                <button onClick={() => setHowTo(h => !h)} className="flex items-center justify-center gap-1.5 rounded-2xl bg-lilac-50 py-2.5 text-sm font-bold text-grape-700">How to <ChevronDown size={16} className={howTo ? 'rotate-180' : ''} /></button>
              </div>
              <AnimatePresence>
                {easier && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-2 overflow-hidden rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">{ex.ex.easier}</motion.p>
                )}
                {howTo && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-2 overflow-hidden">
                    <div className="card space-y-3 p-4 text-sm">
                      <p className="text-ink-soft"><b className="text-ink">Position: </b>{ex.ex.position}</p>
                      <ol className="list-decimal space-y-1 pl-5">{ex.ex.steps.map(t => <li key={t}>{t}</li>)}</ol>
                      <div><p className="font-bold text-rose-600">Common mistakes</p><ul className="list-disc pl-5 text-ink-soft">{ex.ex.errors.map(t => <li key={t}>{t}</li>)}</ul></div>
                      <p className="rounded-xl bg-lilac-50 p-2 text-xs text-grape-800"><b>Safety: </b>{ex.ex.safety}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex-1" />
              {nextEx && <p className="mt-3 text-center text-xs font-semibold text-ink-soft">Up next: <b className="text-ink">{nextEx.ex.name}</b></p>}

              {/* Controles */}
              <div className="mt-3 flex items-center gap-2">
                <button aria-label="Previous step" disabled={idx === 0} onClick={() => go(idx - 1)} className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-grape-700 shadow-soft disabled:opacity-40"><ChevronLeft /></button>
                {ex.secs ? (
                  <button onClick={() => setPaused(p => !p)} className="btn-primary flex-1 text-lg">
                    {paused ? <><Play size={20} fill="white" /> Resume</> : <><Pause size={20} fill="white" /> Pause</>}
                  </button>
                ) : (
                  <button onClick={() => go(idx + 1)} className={`btn-primary flex-1 text-lg ${repsDone >= (ex.reps ?? 0) ? 'animate-pulse' : ''}`}>Done ✓</button>
                )}
                <button aria-label={ex.optional ? 'Skip bonus' : 'Next step'} onClick={() => go(idx + 1)} className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-grape-700 shadow-soft"><ChevronRight /></button>
              </div>
              {!ex.secs && (
                <button onClick={() => setPaused(p => !p)} className="mt-2 text-center text-xs font-bold text-grape-500">{paused ? '▶ Resume the pace' : '⏸ Pause the pace'}</button>
              )}
              {ex.optional && <p className="mt-2 text-center text-xs text-ink-soft">This is a bonus for your goal: you can skip it.</p>}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <Sheet open={confirmExit} onClose={() => { setConfirmExit(false); setPaused(false); }} title="Exit workout?">
        <p className="text-sm text-ink-soft">Your progress is saved. When you come back, you’ll continue from step {idx + 1}.</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="btn-ghost" onClick={() => { setConfirmExit(false); setPaused(false); }}>Keep going</button>
          <button className="btn-soft" onClick={onExit}>Exit</button>
        </div>
      </Sheet>
    </main>
  );
}

function TimerRing({ total, left, label, sub }: { total: number; left: number; label: string; sub: string }) {
  const size = 112, stroke = 10, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const pct = total ? left / total : 0;
  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }} aria-live="polite">
      <svg width={size} height={size} className="-rotate-90">
        <defs><linearGradient id="tr" x1="0" x2="1"><stop offset="0" stopColor="#FF5FA2" /><stop offset="1" stopColor="#C42A78" /></linearGradient></defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#EFE8FF" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke="url(#tr)" strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} style={{ transition: 'stroke-dashoffset 1s linear' }} />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-3xl font-bold text-grape-700">{label}</p>
        <p className="text-[10px] font-bold uppercase text-ink-soft">{sub}</p>
      </div>
    </div>
  );
}

function MiniThumb({ cat }: { cat: ExerciseStep['ex']['category'] }) {
  const e = { respiracao: '🌬️', mobilidade: '🔄', forca: '💪', core: '🎯', equilibrio: '⚖️', alongamento: '🧘‍♀️' }[cat];
  return <div className="grid h-full w-full place-items-center rounded-xl bg-gradient-to-br from-lilac-100 to-rose-100 text-2xl">{e}</div>;
}
