'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Player } from '@/components/Player';
import { Celebration } from '@/components/Celebration';
import { Luna } from '@/components/Luna';
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
        <Luna mood="piscando" size={120} />
        <h1 className="mt-3 text-2xl font-bold">Conteúdo ainda bloqueado</h1>
        <p className="mt-2 text-ink-soft">{session.subtitle.split('·')[0]}. Continue sua jornada para liberar!</p>
        <Link href="/evolucao/bau/" className="btn-primary mt-6 w-full">Ver meu Baú de Conquistas</Link>
      </main>
    );
  }

  if (done !== null) {
    return (
      <main className="min-h-dvh bg-brand-soft">
        <Celebration open mood="feliz" title="Sessão concluída! 💜" text={done ? `+${POINTS.session} Pontos de Evolução.` : 'Você já tinha feito esta sessão hoje. Que bom repetir!'} cta="Voltar" onClose={() => router.replace('/treinos/')} />
      </main>
    );
  }

  return (
    <Player
      title={session.title}
      subtitle={session.subtitle}
      luna="Sessão especial liberada para você. Aproveite cada respiração."
      steps={steps}
      onExit={() => router.push('/treinos/')}
      onFinish={() => {
        const first = !(s.sessions[toKey()] ?? []).includes(id);
        s.completeSession(id);
        setDone(first);
      }}
    />
  );
}
