'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Page, TopBar } from '@/components/ui';
import { Celebration } from '@/components/Celebration';
import { Breathing, CardReveal, DailyQuiz, GuidedTimer, Roulette } from '@/components/Games';
import { ArticleView } from '@/components/ArticleView';
import { JournalForm } from '@/components/JournalForm';
import { MISSION_ICON } from '@/components/MissionCard';
import { useStore } from '@/lib/store';
import { DAYS } from '@/content/program';
import { ARTICLE } from '@/content/library';
import { POINTS, unlockedUntil } from '@/lib/progress';
import { toKey } from '@/lib/dates';
import { currentChallengeDay } from '@/components/JournalForm';

export function MissionRunner({ id }: { id: string }) {
  const router = useRouter();
  const s = useStore();
  const day = DAYS.find(d => d.extra.id === id || d.surprise.id === id)!;
  const m = day.extra.id === id ? day.extra : day.surprise;
  const done = !!s.missions[id];
  const [party, setParty] = useState(false);
  const today = toKey();
  const winEntry = s.journal.find(j => j.date === today);
  const [win, setWin] = useState(winEntry?.win ?? '');

  const complete = () => {
    if (!s.missions[id]) { s.completeMission(id); setParty(true); }
  };

  if (day.n > unlockedUntil(s)) {
    return (
      <Page>
        <TopBar back="/missoes/" />
        <div className="card mt-10 flex flex-col items-center p-8 text-center">
          <Lock className="text-grape-500" size={32} />
          <p className="mt-3 font-bold">Missão do dia {day.n}</p>
          <p className="text-sm text-ink-soft">Ela libera junto com o dia {day.n} do desafio.</p>
        </div>
      </Page>
    );
  }

  // Se a atividade já foi feita hoje fora da missão (ex.: girou a roleta pela aba de jogos)
  const alreadyMet =
    (m.kind === 'quiz' && !!s.quiz[today]) ||
    (m.kind === 'card' && today in s.cards) ||
    (m.kind === 'roulette' && !!s.activities[`roulette:${today}`]) ||
    (m.kind === 'read' && !!s.activities[`read:${m.article}`]) ||
    (m.kind === 'journal' && s.journal.some(j => j.date === today && j.mood));

  return (
    <Page>
      <TopBar back="/missoes/" title={day.extra.id === id ? 'Missão extra' : 'Missão surpresa'} />
      <div className="text-center">
        <p className="text-4xl">{MISSION_ICON[m.kind]}</p>
        <h1 className="mt-2 text-2xl font-bold">{m.title}</h1>
        <p className="mt-1 text-sm text-ink-soft">{m.desc}</p>
        <p className="mt-2 inline-block chip bg-lilac-100 text-grape-700">Dia {day.n} · {done ? '✓ concluída' : `+${POINTS.mission} pts`}</p>
      </div>

      <div className="mt-6">
        {m.kind === 'breath' && <Breathing secs={m.secs} onDone={() => { s.addActivity(`breath:${today}`); complete(); }} />}
        {m.kind === 'timer' && <div className="card p-5"><GuidedTimer secs={m.secs!} steps={m.steps} onDone={complete} /></div>}
        {m.kind === 'quiz' && <DailyQuiz onDone={complete} />}
        {m.kind === 'card' && <CardReveal dayNumber={day.n} onDone={complete} />}
        {m.kind === 'roulette' && <Roulette onDone={complete} />}
        {m.kind === 'read' && <ArticleView article={ARTICLE(m.article!)!} onRead={complete} />}
        {m.kind === 'journal' && <JournalForm compact onSaved={complete} />}
        {m.kind === 'win' && (
          <div className="card p-5">
            <textarea value={win} onChange={e => setWin(e.target.value)} maxLength={280} rows={5} placeholder="Escreva aqui com carinho…" className="w-full rounded-2xl border-2 border-lilac-100 bg-white p-4 font-medium outline-none focus:border-grape-500" />
            <button disabled={!win.trim()} className="btn-primary mt-3 w-full" onClick={() => {
              s.saveJournal({ ...(winEntry ?? { date: today, day: currentChallengeDay() }), win: win.trim() });
              complete();
            }}>Guardar minha conquista</button>
          </div>
        )}
      </div>

      {alreadyMet && !done && (
        <div className="card mt-5 p-4 text-center">
          <p className="text-sm font-semibold">Você já fez esta atividade hoje! 🎉</p>
          <button className="btn-primary mt-3 w-full" onClick={complete}>Concluir missão</button>
        </div>
      )}
      {done && <Link href="/missoes/" className="btn-ghost mt-6 w-full">Ver outras missões</Link>}

      <Celebration open={party} title="Missão cumprida! 🎯" text={`+${POINTS.mission} Pontos de Evolução. A Lili está orgulhosa de você!`} onClose={() => { setParty(false); router.push('/missoes/'); }} />
    </Page>
  );
}
