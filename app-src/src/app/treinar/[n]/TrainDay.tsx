'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Player } from '@/components/Player';
import { Celebration } from '@/components/Celebration';
import { Lili } from '@/components/Lili';
import { useStore } from '@/lib/store';
import { DAY } from '@/content/program';
import { buildSteps } from '@/lib/workout';
import { dayStatus, levelFor, pointsBreakdown, POINTS } from '@/lib/progress';

export function TrainDay({ n }: { n: number }) {
  const router = useRouter();
  const s = useStore();
  const day = DAY(n);
  const steps = useMemo(() => buildSteps(day, s.profile), [day, s.profile]);
  const [celebrate, setCelebrate] = useState<null | { first: boolean; before: number }>(null);
  const status = dayStatus(s, n);
  const alreadyDone = status === 'concluido';

  if (!celebrate && (status === 'bloqueado' || status === 'pendente')) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 text-center">
        <Lili mood="saudade" size={120} />
        <h1 className="mt-3 text-2xl font-bold">{status === 'bloqueado' ? 'This day isn’t unlocked yet' : 'One step at a time'}</h1>
        <p className="mt-2 text-ink-soft">{status === 'bloqueado' ? 'A new challenge day unlocks each day. Your body needs that break to recover!' : 'Days go in order. Complete the next available day to get here.'}</p>
        <Link href="/desafios/" className="btn-primary mt-6 w-full">See my calendar</Link>
      </main>
    );
  }

  const finish = (difficulty: number) => {
    const before = pointsBreakdown(s).total;
    s.completeDay(n, difficulty);
    setCelebrate({ first: !alreadyDone, before });
  };

  if (celebrate) {
    const st = useStore.getState();
    const after = pointsBreakdown(st).total;
    const lvlBefore = levelFor(celebrate.before);
    const lvlAfter = levelFor(after);
    const leveled = lvlAfter.n > lvlBefore.n;
    return (
      <main className="min-h-dvh bg-brand-soft">
        <Celebration
          open
          mood="orgulhosa"
          title={n === 21 ? 'You completed the challenge! 🏆' : `Day ${n} complete! 💜`}
          text={celebrate.first ? day.reward : 'Workout redone! This day’s points were already counted — but your body thanks you again.'}
          cta={n === 21 ? 'See my celebration' : 'Back to home'}
          onClose={() => router.replace(n === 21 ? '/conclusao/' : '/')}
        >
          {celebrate.first && (
            <div className="mt-4 rounded-2xl bg-lilac-50 p-3">
              <p className="font-display text-3xl font-bold text-grape-700">+{after - celebrate.before} pts</p>
              <p className="text-xs font-semibold text-ink-soft">Workout +{POINTS.workout}{after - celebrate.before > POINTS.workout ? ' · weekly challenge bonus' : ''}</p>
              {leveled && <p className="mt-2 rounded-xl bg-brand p-2 text-sm font-bold text-white">New level: {lvlAfter.emoji} {lvlAfter.name}!</p>}
            </div>
          )}
          <Link href="/evolucao/registro/" className="mt-3 block text-sm font-bold text-grape-500">Log how I’m feeling →</Link>
        </Celebration>
      </main>
    );
  }

  return (
    <Player
      title={day.name}
      subtitle={`Day ${n} of 21 · Phase ${day.phase}`}
      lili={day.lili}
      breathing={day.breathing}
      steps={steps}
      initialStep={alreadyDone ? 0 : s.days[n]?.step ?? 0}
      onProgress={i => { if (!alreadyDone) { s.startDay(n); s.saveStep(n, i); } }}
      onExit={() => router.push('/')}
      onFinish={finish}
    />
  );
}
