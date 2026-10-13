'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, RotateCcw, Check } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { beep, chime, vibrate } from '@/lib/device';
import { useStore } from '@/lib/store';
import { toKey, dayIndex } from '@/lib/dates';
import { quizFor } from '@/lib/progress';
import { CARDS, ROULETTE } from '@/content/extras';
import { Lili } from './Lili';

// ───────────────────────── RESPIRAÇÃO ─────────────────────────
export const BREATH_PATTERNS = {
  calma: { name: 'Calma 4-6', desc: 'Inspire 4s, expire 6s. Desacelera o corpo.', phases: [['Inspire', 4], ['Expire', 6]] as [string, number][] },
  caixa: { name: 'Caixa 4-4-4-4', desc: 'Inspire, segure, expire, segure. Ajuda no foco.', phases: [['Inspire', 4], ['Segure', 4], ['Expire', 4], ['Segure', 4]] as [string, number][] },
  sono: { name: 'Sono 4-7-8', desc: 'Inspire 4s, segure 7s, expire 8s. Para desacelerar antes de dormir.', phases: [['Inspire', 4], ['Segure', 7], ['Expire', 8]] as [string, number][] },
};

export function Breathing({ secs = 120, pattern = 'calma', onDone }: { secs?: number; pattern?: keyof typeof BREATH_PATTERNS; onDone?: () => void }) {
  const P = BREATH_PATTERNS[pattern].phases;
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const cycle = P.reduce((n, [, s]) => n + s, 0);
  const t = elapsed % cycle;
  let acc = 0, phaseIdx = 0;
  for (let i = 0; i < P.length; i++) { if (t < acc + P[i][1]) { phaseIdx = i; break; } acc += P[i][1]; }
  const [label, dur] = P[phaseIdx];
  const inPhase = t - acc;
  const scale = label === 'Inspire' ? 0.6 + 0.4 * ((inPhase + 1) / dur) : label === 'Expire' ? 1 - 0.4 * ((inPhase + 1) / dur) : phaseIdx === 1 ? 1 : 0.6;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    if (inPhase === 0) { beep(label === 'Inspire' ? 523 : 392, 90, 0.08); vibrate(30); }
    if (elapsed >= secs) { setRunning(false); setFinished(true); chime(); onDone?.(); }
  }, [elapsed]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative grid h-64 w-64 place-items-center">
        <motion.div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-200 via-lilac-200 to-lilac-300 opacity-60 blur-xl" animate={{ scale: running ? scale * 1.05 : 0.7 }} transition={{ duration: 1, ease: 'linear' }} />
        <motion.div className="absolute inset-6 rounded-full bg-brand shadow-glow" animate={{ scale: running ? scale : 0.7 }} transition={{ duration: 1, ease: 'linear' }} />
        <div className="relative text-white">
          {finished ? <Check size={56} /> : (
            <>
              <p className="font-display text-3xl font-bold">{running ? label : 'Pronta?'}</p>
              {running && <p className="text-sm font-bold text-white/85">{dur - inPhase}</p>}
            </>
          )}
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-ink-soft">{finished ? 'Respiração concluída. Perceba como você está agora.' : `${Math.max(0, secs - elapsed)}s restantes · ${BREATH_PATTERNS[pattern].desc}`}</p>
      {!finished && (
        <button onClick={() => setRunning(r => !r)} className="btn-primary mt-4 w-48">
          {running ? <><Pause size={18} fill="white" /> Pausar</> : <><Play size={18} fill="white" /> {elapsed ? 'Continuar' : 'Começar'}</>}
        </button>
      )}
    </div>
  );
}

// ───────────────────────── TIMER GUIADO ─────────────────────────
export function GuidedTimer({ secs, steps = [], onDone }: { secs: number; steps?: string[]; onDone?: () => void }) {
  const [left, setLeft] = useState(secs);
  const [running, setRunning] = useState(false);
  const done = left <= 0;
  const stepIdx = steps.length ? Math.min(steps.length - 1, Math.floor(((secs - left) / secs) * steps.length)) : 0;

  useEffect(() => {
    if (!running || done) return;
    const id = setInterval(() => setLeft(l => l - 1), 1000);
    return () => clearInterval(id);
  }, [running, done]);
  useEffect(() => { if (done && running) { setRunning(false); chime(); vibrate([80, 50, 120]); onDone?.(); } }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  const m = Math.floor(Math.max(0, left) / 60), s = Math.max(0, left) % 60;
  return (
    <div className="text-center">
      <p className="font-display text-6xl font-bold text-grape-700">{m}:{String(s).padStart(2, '0')}</p>
      <div className="mx-auto mt-3 h-2 w-full max-w-xs overflow-hidden rounded-full bg-lilac-100"><div className="h-full rounded-full bg-brand transition-all duration-1000" style={{ width: `${((secs - left) / secs) * 100}%` }} /></div>
      {steps.length > 0 && (
        <ol className="mt-5 space-y-2 text-left">
          {steps.map((t, i) => (
            <li key={t} className={`flex gap-3 rounded-2xl p-3 text-sm font-semibold transition ${done || i < stepIdx ? 'bg-lilac-50 text-ink-faint line-through' : i === stepIdx && running ? 'bg-brand text-white shadow-glow' : 'bg-white text-ink shadow-soft'}`}>
              <span className="font-extrabold">{i + 1}.</span>{t}
            </li>
          ))}
        </ol>
      )}
      {done ? <p className="mt-4 font-bold text-grape-600">Concluído! 💜</p> : (
        <button onClick={() => setRunning(r => !r)} className="btn-primary mt-5 w-48">{running ? <><Pause size={18} fill="white" /> Pausar</> : <><Play size={18} fill="white" /> {left < secs ? 'Continuar' : 'Começar'}</>}</button>
      )}
    </div>
  );
}

// ───────────────────────── QUIZ DO CORPO ─────────────────────────
export function DailyQuiz({ onDone }: { onDone?: () => void }) {
  const date = toKey();
  const saved = useStore(s => s.quiz[date]);
  const answerQuiz = useStore(s => s.answerQuiz);
  const qs = useMemo(() => quizFor(date), [date]);
  const [answers, setAnswers] = useState<number[]>(saved ?? []);
  const i = Math.min(answers.length, qs.length - 1);
  const finished = answers.length >= qs.length;
  const [picked, setPicked] = useState<number | null>(null);

  const choose = (o: number) => {
    if (picked != null || finished) return;
    setPicked(o);
    o === qs[i].answer ? beep(880, 120) : beep(300, 160);
    vibrate(o === qs[i].answer ? 40 : [40, 40, 40]);
  };
  const next = () => {
    const a = [...answers, picked!];
    setAnswers(a); setPicked(null);
    if (a.length === qs.length) { answerQuiz(date, a); onDone?.(); }
  };

  if (finished) {
    const correct = answers.filter((a, k) => a === qs[k].answer).length;
    return (
      <div className="text-center">
        <Lili mood={correct === 3 ? 'animada' : 'feliz'} size={110} />
        <p className="mt-2 font-display text-2xl font-bold">{correct} de 3 acertos!</p>
        <p className="text-sm text-ink-soft">+{correct * 5} pontos · Volte amanhã para novas perguntas.</p>
        <div className="mt-4 space-y-2 text-left">
          {qs.map((q, k) => (
            <div key={q.q} className="card p-3 text-sm">
              <p className="font-bold">{answers[k] === q.answer ? '✅' : '💡'} {q.q}</p>
              <p className="mt-1 text-ink-soft">{q.why}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const q = qs[i];
  return (
    <div>
      <div className="mb-3 flex gap-1.5">{qs.map((_, k) => <div key={k} className={`h-2 flex-1 rounded-full ${k < answers.length ? 'bg-brand' : k === i ? 'bg-lilac-300' : 'bg-lilac-100'}`} />)}</div>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <p className="label">Pergunta {i + 1} de 3</p>
          <h2 className="mt-1 text-xl font-bold leading-snug">{q.q}</h2>
          <div className="mt-4 space-y-2">
            {q.options.map((o, k) => {
              const state = picked == null ? '' : k === q.answer ? 'bg-emerald-500 text-white' : k === picked ? 'bg-rose-400 text-white' : 'opacity-50';
              return <button key={o} onClick={() => choose(k)} className={`w-full rounded-2xl bg-white p-4 text-left font-bold shadow-soft ring-1 ring-lilac-100 transition ${state}`}>{o}</button>;
            })}
          </div>
          {picked != null && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl bg-lilac-50 p-4 text-sm">
              <p className="font-bold">{picked === q.answer ? 'Isso mesmo! 🎉' : 'Quase! 💜'}</p>
              <p className="mt-1 text-ink-soft">{q.why}</p>
              <button onClick={next} className="btn-primary mt-3 w-full">{i === qs.length - 1 ? 'Ver resultado' : 'Próxima'}</button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ───────────────────────── CARTAS DE MOTIVAÇÃO ─────────────────────────
export function CardReveal({ dayNumber, onDone }: { dayNumber?: number; onDone?: () => void }) {
  const date = toKey();
  const idx = useStore(s => s.cards[date]);
  const reveal = useStore(s => s.revealCard);
  const chosen = idx ?? (dayNumber ? dayNumber - 1 : dayIndex(date, CARDS.length));
  const flipped = idx != null;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-80 w-60" style={{ perspective: 1000 }}>
        <motion.button
          onClick={() => { if (!flipped) { reveal(date, chosen); chime(); vibrate(60); onDone?.(); } }}
          className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: .7, type: 'spring', damping: 16 }}
          aria-label={flipped ? 'Carta revelada' : 'Revelar carta'}
        >
          <div className="absolute inset-0 grid place-items-center rounded-4xl bg-gradient-to-br from-grape-600 via-lilac-500 to-rose-400 p-6 text-white shadow-glow" style={{ backfaceVisibility: 'hidden' }}>
            <div className="text-center">
              <motion.p animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} className="text-6xl">💌</motion.p>
              <p className="mt-3 font-display text-xl font-bold">Toque para revelar</p>
              <p className="text-xs text-white/80">uma carta por dia</p>
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-4xl bg-white p-6 text-center shadow-card ring-2 ring-lilac-200" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <Lili mood="feliz" size={64} float={false} />
            <p className="mt-3 font-display text-xl font-semibold leading-snug text-grape-800">{CARDS[chosen]}</p>
          </div>
        </motion.button>
      </div>
      {flipped && <p className="mt-4 text-sm font-semibold text-ink-soft">Nova carta amanhã 💜</p>}
    </div>
  );
}

// ───────────────────────── ROLETA DO BEM-ESTAR ─────────────────────────
export function Roulette({ onDone }: { onDone?: () => void }) {
  const date = toKey();
  const result = useStore(s => s.roulette[date]);
  const did = useStore(s => !!s.activities[`roulette:${date}`]);
  const spin = useStore(s => s.spinRoulette);
  const addActivity = useStore(s => s.addActivity);
  const [rot, setRot] = useState(result != null ? 360 * 5 - result * (360 / ROULETTE.length) : 0);
  const [spinning, setSpinning] = useState(false);
  const n = ROULETTE.length, slice = 360 / n;
  const ref = useRef<number>();

  const go = () => {
    if (result != null || spinning) return;
    const pick = Math.floor(Math.random() * n);
    setSpinning(true);
    setRot(360 * 6 - pick * slice);
    ref.current = window.setTimeout(() => { spin(date, pick); setSpinning(false); chime(); vibrate([40, 30, 80]); }, 3200);
  };
  useEffect(() => () => clearTimeout(ref.current), []);

  const gradient = `conic-gradient(${ROULETTE.map((r, i) => `${r.color} ${i * slice - slice / 2}deg ${(i + 1) * slice - slice / 2}deg`).join(',')})`;
  const r = result != null ? ROULETTE[result] : null;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-72 w-72">
        <div className="absolute left-1/2 top-[-6px] z-10 h-0 w-0 -translate-x-1/2 border-x-[12px] border-t-[22px] border-x-transparent border-t-grape-800" />
        <motion.div className="relative h-full w-full rounded-full shadow-card ring-8 ring-white" style={{ background: gradient }} animate={{ rotate: rot }} transition={{ duration: spinning ? 3.1 : 0, ease: [0.15, 0.85, 0.25, 1] }}>
          {ROULETTE.map((it, i) => (
            <span key={i} className="absolute left-1/2 top-1/2 text-2xl" style={{ transform: `rotate(${i * slice}deg) translateY(-108px) translateX(-50%)`, transformOrigin: '0 0' }}>{it.emoji}</span>
          ))}
        </motion.div>
        <button onClick={go} disabled={result != null || spinning} className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white font-display text-lg font-bold text-grape-700 shadow-card active:scale-95 disabled:opacity-100">
          {spinning ? '…' : result != null ? '✓' : 'Girar'}
        </button>
      </div>
      <AnimatePresence>
        {r && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card mt-6 w-full p-5 text-center">
            <p className="text-4xl">{r.emoji}</p>
            <p className="mt-1 font-display text-xl font-bold">{r.title}</p>
            <p className="mt-1 text-sm text-ink-soft">{r.desc}</p>
            {did ? <p className="mt-3 font-bold text-grape-600">Feito! +10 pontos 💜</p> : (
              <button className="btn-primary mt-4 w-full" onClick={() => { addActivity(`roulette:${date}`); onDone?.(); }}>Fiz! ✓</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {result == null && <p className="mt-4 text-sm text-ink-soft">Um giro por dia. O que a roleta reserva para você?</p>}
    </div>
  );
}

export function ResetButton({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick} className="btn-ghost"><RotateCcw size={16} /> Recomeçar</button>;
}
