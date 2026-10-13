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

const TABS = [['respiracao', 'Respiração'], ['alongamento', 'Alongamento'], ['meditacao', 'Meditação'], ['sono', 'Sono']] as const;
type Tab = typeof TABS[number][0];

interface Practice { id: string; title: string; mins: number; desc: string; steps: string[] }

const MEDITATIONS: Practice[] = [
  { id: 'escaneamento', title: 'Escaneamento corporal', mins: 5, desc: 'Perceba e solte cada parte do corpo.', steps: ['Sente ou deite confortável e feche os olhos.', 'Leve a atenção aos pés e às pernas. Solte o peso.', 'Perceba o quadril e a barriga subindo e descendo.', 'Solte os ombros, os braços e as mãos.', 'Relaxe a mandíbula, os olhos e a testa.', 'Respire fundo três vezes e abra os olhos devagar.'] },
  { id: 'gratidao', title: 'Momento de gratidão', mins: 3, desc: 'Termine o dia lembrando do que foi bom.', steps: ['Feche os olhos e respire fundo.', 'Lembre de algo bom que aconteceu hoje.', 'Lembre de alguém por quem você é grata.', 'Agradeça a si mesma por algo que você fez.', 'Sorria e volte devagar.'] },
  { id: 'presente', title: 'Foco no presente', mins: 2, desc: 'Uma pausa rápida para acalmar a mente.', steps: ['Perceba 5 coisas que você consegue ver.', 'Perceba 4 coisas que consegue tocar.', 'Perceba 3 sons ao seu redor.', 'Respire fundo e volte ao seu dia.'] },
];

const SLEEP: Practice[] = [
  { id: 'ritual', title: 'Ritual para dormir', mins: 6, desc: 'Prepare corpo e mente para uma boa noite.', steps: ['Diminua as luzes e deixe o celular de lado.', 'Deite com as pernas apoiadas na parede.', 'Respire lento: inspire 4 tempos, expire 6.', 'Solte o peso do corpo no colchão ou tapete.', 'Abrace os joelhos e balance de leve de um lado para o outro.', 'Deite de lado, confortável, e deixe o sono chegar.'] },
  { id: 'soltar', title: 'Soltar o dia', mins: 4, desc: 'Libere a tensão acumulada nos ombros e pescoço.', steps: ['Suba os ombros até as orelhas e solte. Repita 5 vezes.', 'Incline a cabeça para cada lado devagar.', 'Massageie as têmporas com as pontas dos dedos.', 'Termine com 5 respirações longas.'] },
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

  const finishRelax = () => say(s.addActivity(`relax:${today}`) ? `+${POINTS.relax} pontos pelo seu momento de calma 💗` : 'Prática concluída! Os pontos de hoje já foram contados.');

  return (
    <Page>
      <TopBar back="/mais/" title="Modo Relaxamento" subtitle="Respire, desacelere e cuide da sua mente" />

      <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4" role="tablist" aria-label="Tipo de prática">
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
                {{ respiracao: 'Respiração guiada', alongamento: 'Alongar e soltar', meditacao: 'Mente tranquila', sono: 'Durma melhor' }[tab]}
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
                <Breathing key={`${pattern}-${mins}`} secs={mins * 60} pattern={pattern} onDone={() => say(s.addActivity(`breath:${today}`) ? `+${POINTS.breath} pontos pela respiração de hoje 💗` : 'Respiração concluída! Os pontos de hoje já foram contados.')} />
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
              <p className="pt-1 text-center text-[11px] text-ink-faint">As aulas bloqueadas são liberadas conforme você avança no desafio.</p>
            </div>
          )}

          {(tab === 'meditacao' || tab === 'sono') && (
            active ? (
              <div>
                <button onClick={() => setActive(null)} className="mb-3 flex items-center gap-1 text-sm font-bold text-rose-600"><ChevronLeft size={16} /> Outras práticas</button>
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
                    <span className="flex-1"><span className="block font-bold">Respiração 4-7-8</span><span className="block text-xs text-ink-soft">Abre a respiração guiada no ritmo do sono</span></span>
                  </button>
                )}
              </div>
            )
          )}
        </motion.div>
      </AnimatePresence>

      <SectionTitle>Dica</SectionTitle>
      <p className="card p-4 text-sm text-ink-soft">Práticas de relaxamento valem +{POINTS.relax} pontos uma vez por dia, e a respiração guiada vale +{POINTS.breath}. O mais importante é o seu bem-estar: faça quantas vezes quiser.</p>
      <Toast show={!!toast}>{toast}</Toast>
    </Page>
  );
}
