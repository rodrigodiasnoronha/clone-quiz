'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Player } from '@/components/Player';
import { Celebration } from '@/components/Celebration';
import { Lili } from '@/components/Lili';
import { useStore } from '@/lib/store';
import { SESSIONS } from '@/content/program';
import { buildSteps } from '@/lib/workout';
import { POINTS, sessionUnlocked } from '@/lib/progress';
import { toKey } from '@/lib/dates';

export function TrainSession({ id }: { id: string }) {
  const router = useRouter();
  const s = useStore();
  const session = SESSIONS[id];
  const steps = useMemo(() => buildSteps(session, s.profile, false), [session, s.profile]);
  const [done, setDone] = useState<null | boolean>(null);

  if (done === null && !sessionUnlocked(s, id)) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 text-center">
        <Lili mood="piscando" size={120} />
        <h1 className="mt-3 text-2xl font-bold">Content still locked</h1>
        <p className="mt-2 text-ink-soft">{session.subtitle.split('·')[0]}. Keep going on your journey to unlock it!</p>
        <Link href="/conquistas/" className="btn-primary mt-6 w-full">See my Achievement Chest</Link>
      </main>
    );
  }

  if (done !== null) {
    return (
      <main className="min-h-dvh bg-brand-soft">
        <Celebration open mood="feliz" title="Session complete! 💜" text={done ? `+${POINTS.session} Evolution Points.` : 'You already did this session today. Great to repeat it!'} cta="Back" onClose={() => router.replace('/desafios/')} />
      </main>
    );
  }

  return (
    <Player
      title={session.title}
      subtitle={session.subtitle}
      lili="A special session unlocked just for you. Enjoy every breath."
      steps={steps}
      onExit={() => router.push('/desafios/')}
      onFinish={() => {
        const first = !(s.sessions[toKey()] ?? []).includes(id);
        s.completeSession(id);
        setDone(first);
      }}
    />
  );
}
