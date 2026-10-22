'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft, Lock, Play } from 'lucide-react';
import { Page, SectionTitle, TopBar, Toast } from '@/components/ui';
import { Breathing, BREATH_PATTERNS, GuidedTimer } from '@/components/Games';
import { useStore } from '@/lib/store';
import { SESSIONS } from '@/content/program';
import { POINTS, sessionUnlocked } from '@/lib/progress';
import { toKey } from '@/lib/dates';

const TABS = [['respiracao', 'Breathing'], ['alongamento', 'Stretching'], ['meditacao', 'Meditation'], ['sono', 'Sleep']] as const;
type Tab = typeof TABS[number][0];

interface Practice { id: string; title: string; mins: number; desc: string; steps: string[] }

const MEDITATIONS: Practice[] = [
  { id: 'escaneamento', title: 'Body scan', mins: 5, desc: 'Notice and release each part of your body.', steps: ['Sit or lie down comfortably and close your eyes.', 'Bring your attention to your feet and legs. Let the weight go.', 'Notice your hips and belly rising and falling.', 'Relax your shoulders, arms and hands.', 'Relax your jaw, eyes and forehead.', 'Take three deep breaths and slowly open your eyes.'] },
  { id: 'gratidao', title: 'Gratitude moment', mins: 3, desc: 'End the day remembering what was good.', steps: ['Close your eyes and take a deep breath.', 'Remember something good that happened today.', 'Think of someone you’re grateful for.', 'Thank yourself for something you did.', 'Smile and slowly come back.'] },
  { id: 'presente', title: 'Present moment', mins: 2, desc: 'A quick pause to calm your mind.', steps: ['Notice 5 things you can see.', 'Notice 4 things you can touch.', 'Notice 3 sounds around you.', 'Take a deep breath and return to your day.'] },
];

const SLEEP: Practice[] = [
  { id: 'ritual', title: 'Bedtime ritual', mins: 6, desc: 'Get your body and mind ready for a good night.', steps: ['Dim the lights and put your phone away.', 'Lie down with your legs up the wall.', 'Breathe slowly: inhale for 4 counts, exhale for 6.', 'Let your body sink into the mattress or mat.', 'Hug your knees and gently rock from side to side.', 'Lie on your side, get comfortable and let sleep come.'] },
  { id: 'soltar', title: 'Let go of the day', mins: 4, desc: 'Release the tension built up in your shoulders and neck.', steps: ['Lift your shoulders to your ears and drop them. Repeat 5 times.', 'Slowly tilt your head to each side.', 'Massage your temples with your fingertips.', 'Finish with 5 long breaths.'] },
];

const PHOTO: Record<Tab, string> = { respiracao: 'energia', alongamento: 'alongamento', meditacao: 'fase2', sono: 'sono' };

export default function Relaxar() {
  const s = useStore();
  const [tab, setTab] = useState<Tab>('respiracao');
  const [pattern, setPattern] = useState<keyof typeof BREATH_PATTERNS>('calma');
  const [mins, setMins] = useState(3);
  const [active, setActive] = useState<Practice | null>(null);
  const [toast, setToast] = useState('');
  const today = toKey();

  useEffect(() => { try { const t = localStorage.getItem('pnp21-tab-relaxar') as Tab | null; if (t) setTab(t); } catch {} }, []);
  const choose = (t: Tab) => { setTab(t); setActive(null); try { localStorage.setItem('pnp21-tab-relaxar', t); } catch {} };
  const say = (t: string) => { setToast(t); setTimeout(() => setToast(''), 3000); };

  const finishRelax = () => say(s.addActivity(`relax:${today}`) ? `+${POINTS.relax} points for your calm moment 💗` : 'Practice complete! Today’s points were already counted.');

  return (
    <Page>
      <TopBar back="/mais/" title="Relax Mode" subtitle="Breathe, slow down and take care of your mind" />

      <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4" role="tablist" aria-label="Practice type">
        {TABS.map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => choose(k)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${tab === k ? 'bg-brand text-white shadow-glow' : 'bg-white text-ink-soft ring-1 ring-rose-100'}`}>{l}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab + (active?.id ?? '')} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4">
          {!active && (
            <div className="relative mb-4 h-36 overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 via-rose-50 to-lilac-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/app/fotos/${PHOTO[tab]}.webp`} alt="" className="absolute -bottom-4 right-0 h-44 object-contain" />
              <p className="absolute bottom-4 left-4 max-w-[55%] font-display text-xl font-bold leading-tight text-grape-800">
                {{ respiracao: 'Guided breathing', alongamento: 'Stretch and release', meditacao: 'Calm mind', sono: 'Sleep better' }[tab]}
              </p>
            </div>
          )}

          {tab === 'respiracao' && (
            <div>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(BREATH_PATTERNS) as (keyof typeof BREATH_PATTERNS)[]).map(k => (
                  <button key={k} onClick={() => setPattern(k)} className={`rounded-2xl p-3 text-left ${pattern === k ? 'bg-brand text-white shadow-glow' : 'bg-white shadow-soft'}`}>
                    <p className="text-sm font-bold leading-tight">{BREATH_PATTERNS[k].name}</p>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-ink-soft">{BREATH_PATTERNS[pattern].desc}</p>
              <div className="mt-2 flex gap-2">
                {[1, 3, 5].map(m => <button key={m} onClick={() => setMins(m)} className={`flex-1 rounded-xl py-2 text-sm font-bold ${mins === m ? 'bg-grape-600 text-white' : 'bg-rose-50 text-grape-700'}`}>{m} min</button>)}
              </div>
              <div className="mt-6">
                <Breathing key={`${pattern}-${mins}`} secs={mins * 60} pattern={pattern} onDone={() => say(s.addActivity(`breath:${today}`) ? `+${POINTS.breath} points for today’s breathing 💗` : 'Breathing complete! Today’s points were already counted.')} />
              </div>
            </div>
          )}

          {tab === 'alongamento' && (
            <div className="space-y-2">
              {['alongamento-rapido', 'relaxamento', 'bonus-alongamento', 'bonus-mobilidade'].map(id => {
                const ses = SESSIONS[id];
                const open = sessionUnlocked(s, id);
                const inner = (
                  <>
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${open ? 'bg-brand text-white' : 'bg-lilac-50 text-ink-faint'}`}>{open ? <Play size={18} fill="white" /> : <Lock size={16} />}</span>
                    <span className="min-w-0 flex-1"><span className="block font-bold leading-tight">{ses.title}</span><span className="block text-xs text-ink-soft">{ses.subtitle}</span></span>
                  </>
                );
                return open ? <Link key={id} href={`/sessao/${id}/`} className="card flex items-center gap-3 p-3">{inner}</Link> : <div key={id} className="card flex items-center gap-3 p-3 opacity-70">{inner}</div>;
              })}
              <p className="pt-1 text-center text-[11px] text-ink-faint">Locked classes unlock as you progress through the challenge.</p>
            </div>
          )}

          {(tab === 'meditacao' || tab === 'sono') && (
            active ? (
              <div>
                <button onClick={() => setActive(null)} className="mb-3 flex items-center gap-1 text-sm font-bold text-rose-600"><ChevronLeft size={16} /> Other practices</button>
                <h2 className="text-xl font-bold">{active.title}</h2>
                <p className="mb-4 text-sm text-ink-soft">{active.desc}</p>
                <div className="card p-5"><GuidedTimer secs={active.mins * 60} steps={active.steps} onDone={finishRelax} /></div>
              </div>
            ) : (
              <div className="space-y-2">
                {(tab === 'meditacao' ? MEDITATIONS : SLEEP).map(p => (
                  <button key={p.id} onClick={() => setActive(p)} className="card flex w-full items-center gap-3 p-3 text-left">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-white"><Play size={18} fill="white" /></span>
                    <span className="min-w-0 flex-1"><span className="block font-bold">{p.title}</span><span className="block text-xs text-ink-soft">{p.mins} min · {p.desc}</span></span>
                  </button>
                ))}
                {tab === 'sono' && (
                  <button onClick={() => { choose('respiracao'); setPattern('sono'); }} className="card flex w-full items-center gap-3 p-3 text-left">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-night text-xl">🌙</span>
                    <span className="flex-1"><span className="block font-bold">4-7-8 breathing</span><span className="block text-xs text-ink-soft">Opens guided breathing at a sleep rhythm</span></span>
                  </button>
                )}
              </div>
            )
          )}
        </motion.div>
      </AnimatePresence>

      <SectionTitle>Tip</SectionTitle>
      <p className="card p-4 text-sm text-ink-soft">Relaxation practices are worth +{POINTS.relax} points once a day, and guided breathing is worth +{POINTS.breath}. What matters most is your well-being: do them as often as you like.</p>
      <Toast show={!!toast}>{toast}</Toast>
    </Page>
  );
}
