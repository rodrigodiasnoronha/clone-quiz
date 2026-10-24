'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import { Lili, LiliSays } from '@/components/Lili';
import { Confetti } from '@/components/Celebration';
import { useStore } from '@/lib/store';
import { toKey } from '@/lib/dates';
import { GOAL_LABEL } from '@/lib/workout';
import type { Goal, Level, Limitation, Obstacle, Period, Profile } from '@/lib/types';

const GOALS: { v: Goal; e: string }[] = [
  { v: 'abdomen', e: '🔥' }, { v: 'postura', e: '🧍‍♀️' }, { v: 'pernas', e: '🍑' }, { v: 'flexibilidade', e: '🤸‍♀️' }, { v: 'rotina', e: '🌱' },
];
const LEVELS: { v: Level; t: string; d: string; e: string }[] = [
  { v: 'iniciante', t: 'Beginner', d: 'I’ve never done Pilates or haven’t worked out in a while', e: '🌱' },
  { v: 'intermediaria', t: 'Intermediate', d: 'I exercise every now and then', e: '🌷' },
  { v: 'avancada', t: 'Advanced', d: 'I work out often and want a challenge', e: '🔥' },
];
const MINUTES: { v: Profile['minutes']; d: string }[] = [
  { v: 10, d: 'Express, for busy days' }, { v: 15, d: 'The sweet spot' }, { v: 20, d: 'Full workout' }, { v: 30, d: 'I want to go further' },
];
const PERIODS: { v: Period; t: string; e: string }[] = [
  { v: 'manha', t: 'In the morning', e: '🌅' }, { v: 'tarde', t: 'In the afternoon', e: '☀️' }, { v: 'noite', t: 'In the evening', e: '🌙' },
];
const OBSTACLES: { v: Obstacle; t: string; e: string }[] = [
  { v: 'tempo', t: 'Lack of time', e: '⏰' }, { v: 'motivacao', t: 'Lack of motivation', e: '😮‍💨' }, { v: 'esquecimento', t: 'I forget', e: '🤔' },
  { v: 'cansaco', t: 'Fatigue', e: '😴' }, { v: 'dores', t: 'Aches or discomfort', e: '🩹' },
];
const LIMITS: { v: Limitation; t: string }[] = [
  { v: 'joelhos', t: 'Knees' }, { v: 'lombar', t: 'Lower back' }, { v: 'punhos', t: 'Wrists' }, { v: 'ombros', t: 'Shoulders' }, { v: 'pescoco', t: 'Neck' },
];
const REMINDER_TIME: Record<Period, string> = { manha: '07:30', tarde: '13:00', noite: '19:30' };

type Draft = Partial<Profile> & { limitations: Limitation[] };

export default function Onboarding() {
  const router = useRouter();
  const setProfile = useStore(s => s.setProfile);
  const setSettings = useStore(s => s.setSettings);
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Draft>({ limitations: [] });
  const [agreed, setAgreed] = useState(false);
  const [noLimits, setNoLimits] = useState(false);

  const total = 8;
  const next = () => setStep(s => s + 1);
  const pick = <K extends keyof Draft>(k: K, v: Draft[K]) => { setD(x => ({ ...x, [k]: v })); setTimeout(next, 220); };

  function finish() {
    const p: Profile = {
      name: d.name!.trim(), goal: d.goal!, level: d.level!, minutes: d.minutes!, period: d.period!, obstacle: d.obstacle!,
      limitations: d.limitations, startDate: toKey(), createdAt: Date.now(),
    };
    setProfile(p);
    setSettings({ reminderTime: REMINDER_TIME[p.period] });
    router.replace('/');
  }

  const screens = [
    // 0 — boas-vindas + nome
    <div key="0" className="flex flex-col items-center text-center">
      <Lili mood="animada" size={140} />
      <h1 className="mt-4 text-3xl font-bold leading-tight">Hi! I’m <span className="bg-brand bg-clip-text text-transparent">Lili</span> 💜</h1>
      <p className="mt-2 text-ink-soft">I’ll be your companion for the next 21 days. Before we start, I’d love to get to know you a little.</p>
      <label className="mt-6 w-full text-left">
        <span className="label">What would you like me to call you?</span>
        <input
          autoFocus value={d.name ?? ''} maxLength={24} onChange={e => setD(x => ({ ...x, name: e.target.value }))}
          onKeyDown={e => e.key === 'Enter' && d.name?.trim() && next()}
          placeholder="Your name or nickname" className="mt-2 h-14 w-full rounded-2xl border-2 border-lilac-200 bg-white px-4 text-lg font-semibold outline-none focus:border-grape-500"
        />
      </label>
      <button className="btn-primary shine mt-4 w-full" disabled={!d.name?.trim()} onClick={next}>Let’s get started</button>
    </div>,

    // 1 — objetivo
    <Q key="1" title={`${d.name?.trim()}, what’s your main goal?`} lili="I’ll give it special focus in every workout.">
      {GOALS.map(g => <Opt key={g.v} on={d.goal === g.v} onClick={() => pick('goal', g.v)} emoji={g.e} title={GOAL_LABEL[g.v]} />)}
    </Q>,

    // 2 — nível
    <Q key="2" title="What’s your experience level?" lili="No pressure! Everything has an easier version.">
      {LEVELS.map(l => <Opt key={l.v} on={d.level === l.v} onClick={() => pick('level', l.v)} emoji={l.e} title={l.t} desc={l.d} />)}
    </Q>,

    // 3 — tempo
    <Q key="3" title="How much time do you have each day?" lili="I’ll adjust the sets to fit your day.">
      {MINUTES.map(m => <Opt key={m.v} on={d.minutes === m.v} onClick={() => pick('minutes', m.v)} emoji="⏱️" title={`${m.v} minutes`} desc={m.d} />)}
    </Q>,

    // 4 — período
    <Q key="4" title="When do you prefer to work out?" lili="That way I can remind you at the right time (if you want).">
      {PERIODS.map(p => <Opt key={p.v} on={d.period === p.v} onClick={() => pick('period', p.v)} emoji={p.e} title={p.t} />)}
    </Q>,

    // 5 — obstáculo
    <Q key="5" title="What makes it hardest to stay consistent?" lili="Everyone has a challenge. Let’s work through yours together.">
      {OBSTACLES.map(o => <Opt key={o.v} on={d.obstacle === o.v} onClick={() => pick('obstacle', o.v)} emoji={o.e} title={o.t} />)}
    </Q>,

    // 6 — limitações
    <Q key="6" title="Do you have any movement limitations?" lili="Select all that apply. I’ll swap out exercises that might bother you.">
      <div className="grid grid-cols-2 gap-2">
        {LIMITS.map(l => {
          const on = d.limitations.includes(l.v);
          return (
            <button key={l.v} onClick={() => { setNoLimits(false); setD(x => ({ ...x, limitations: on ? x.limitations.filter(v => v !== l.v) : [...x.limitations, l.v] })); }}
              className={`flex h-14 items-center justify-between rounded-2xl px-4 font-bold transition ${on ? 'bg-brand text-white shadow-glow' : 'bg-white ring-1 ring-lilac-200'}`}>
              {l.t} {on && <Check size={18} />}
            </button>
          );
        })}
        <button onClick={() => { setNoLimits(true); setD(x => ({ ...x, limitations: [] })); }}
          className={`flex h-14 items-center justify-between rounded-2xl px-4 font-bold transition ${noLimits ? 'bg-brand text-white shadow-glow' : 'bg-white ring-1 ring-lilac-200'}`}>
          None {noLimits && <Check size={18} />}
        </button>
      </div>
      <button className="btn-primary mt-4 w-full" disabled={!noLimits && d.limitations.length === 0} onClick={next}>Continue</button>
    </Q>,

    // 7 — cuidados
    <Q key="7" title="An important agreement" lili="I want you to progress safely.">
      <div className="card space-y-2 p-4 text-sm text-ink-soft">
        <p>• This challenge is wellness content and does not replace guidance from a doctor or a certified fitness professional.</p>
        <p>• If you’re pregnant, recently gave birth, or have heart disease, uncontrolled high blood pressure, a hernia or recent surgery, talk to a professional first.</p>
        <p>• Stop any exercise if you feel sharp pain, dizziness or shortness of breath.</p>
      </div>
      <button onClick={() => setAgreed(a => !a)} className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left text-sm font-semibold ring-1 ring-lilac-200">
        <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg ${agreed ? 'bg-brand text-white' : 'ring-2 ring-lilac-300'}`}>{agreed && <Check size={16} />}</span>
        I’ve read this and will respect my body’s limits
      </button>
      <button className="btn-primary mt-4 w-full" disabled={!agreed} onClick={next}>Create my challenge</button>
    </Q>,

    // 8 — pronto
    <Ready key="8" d={d} onStart={finish} />,
  ];

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-8 pt-4">
      {step > 0 && step < total && (
        <div className="mb-6 flex items-center gap-3">
          <button aria-label="Back" onClick={() => setStep(s => s - 1)} className="grid h-10 w-10 place-items-center rounded-full bg-white text-grape-700 shadow-soft"><ChevronLeft size={22} /></button>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-lilac-100">
            <motion.div className="h-full rounded-full bg-brand" animate={{ width: `${(step / total) * 100}%` }} />
          </div>
          <span className="text-xs font-bold text-ink-soft">{step}/{total - 1}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: .25 }}>
            {screens[step]}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

function Q({ title, lili, children }: { title: string; lili: string; children: React.ReactNode }) {
  return (
    <div>
      <LiliSays text={lili} size={60} />
      <h1 className="mb-4 mt-5 text-2xl font-bold leading-tight">{title}</h1>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Opt({ on, onClick, emoji, title, desc }: { on: boolean; onClick: () => void; emoji: string; title: string; desc?: string }) {
  return (
    <motion.button whileTap={{ scale: .97 }} onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left transition ${on ? 'bg-brand text-white shadow-glow' : 'bg-white shadow-soft ring-1 ring-lilac-100'}`}>
      <span className="text-2xl">{emoji}</span>
      <span className="flex-1">
        <span className="block font-bold">{title}</span>
        {desc && <span className={`block text-xs ${on ? 'text-white/85' : 'text-ink-soft'}`}>{desc}</span>}
      </span>
      {on && <Check size={20} />}
    </motion.button>
  );
}

function Ready({ d, onStart }: { d: Draft; onStart: () => void }) {
  const rows = [
    ['🎯', 'Goal', d.goal && GOAL_LABEL[d.goal]],
    ['📈', 'Level', LEVELS.find(l => l.v === d.level)?.t],
    ['⏱️', 'Workouts of', `${d.minutes} minutes`],
    ['🕒', 'Time of day', PERIODS.find(p => p.v === d.period)?.t],
    ['🩹', 'Adaptations', d.limitations.length ? d.limitations.map(l => LIMITS.find(x => x.v === l)?.t).join(', ') : 'None'],
  ];
  return (
    <div className="text-center">
      <Confetti count={50} />
      <motion.div initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 14 }} className="mx-auto w-fit">
        <Lili mood="orgulhosa" size={140} />
      </motion.div>
      <h1 className="mt-3 text-3xl font-bold leading-tight">Your personalized challenge is ready! 💜</h1>
      <p className="mt-2 text-ink-soft">Welcome, {d.name?.trim()}! That’s 21 days, 3 phases and a new workout every day, made for you.</p>
      <div className="card mt-5 divide-y divide-lilac-100 p-2 text-left">
        {rows.map(([e, k, v], i) => (
          <motion.div key={k} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .3 + i * .1 }} className="flex items-center gap-3 px-3 py-2.5">
            <span className="text-xl">{e}</span>
            <span className="text-sm text-ink-soft">{k}</span>
            <span className="ml-auto text-right text-sm font-bold">{v}</span>
          </motion.div>
        ))}
      </div>
      <button className="btn-primary shine mt-6 w-full text-lg" onClick={onStart}>Start my journey</button>
    </div>
  );
}
