'use client';

import { useState } from 'react';
import { Page, TopBar, Toast } from '@/components/ui';
import { Breathing, BREATH_PATTERNS } from '@/components/Games';
import { useStore } from '@/lib/store';
import { toKey } from '@/lib/dates';
import { POINTS } from '@/lib/progress';

export default function Respiracao() {
  const addActivity = useStore(s => s.addActivity);
  const [pattern, setPattern] = useState<keyof typeof BREATH_PATTERNS>('calma');
  const [mins, setMins] = useState(2);
  const [key, setKey] = useState(0);
  const [toast, setToast] = useState('');
  return (
    <Page>
      <TopBar back="/missoes/" title="Breathing Challenge" />
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(BREATH_PATTERNS) as (keyof typeof BREATH_PATTERNS)[]).map(k => (
          <button key={k} onClick={() => { setPattern(k); setKey(x => x + 1); }} className={`rounded-2xl p-3 text-left ${pattern === k ? 'bg-brand text-white shadow-glow' : 'bg-white shadow-soft'}`}>
            <p className="font-bold">{BREATH_PATTERNS[k].name}</p>
            <p className={`text-[11px] ${pattern === k ? 'text-white/85' : 'text-ink-soft'}`}>{BREATH_PATTERNS[k].desc}</p>
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        {[1, 2, 3, 5].map(m => (
          <button key={m} onClick={() => { setMins(m); setKey(x => x + 1); }} className={`flex-1 rounded-xl py-2 text-sm font-bold ${mins === m ? 'bg-grape-600 text-white' : 'bg-lilac-50 text-grape-700'}`}>{m} min</button>
        ))}
      </div>
      <div className="mt-8">
        <Breathing key={`${key}-${pattern}-${mins}`} secs={mins * 60} pattern={pattern} onDone={() => {
          const first = addActivity(`breath:${toKey()}`);
          setToast(first ? `+${POINTS.breath} points for today’s breathing 💜` : 'Breathing complete! Today’s points were already counted.');
          setTimeout(() => setToast(''), 3000);
        }} />
      </div>
      <Toast show={!!toast}>{toast}</Toast>
    </Page>
  );
}
