'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Player } from '@/components/Player';
import { Celebration } from '@/components/Celebration';
import { Luna } from '@/components/Luna';
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
        <Luna mood="saudade" size={120} />
        <h1 className="mt-3 text-2xl font-bold">{status === 'bloqueado' ? 'Esse dia ainda não liberou' : 'Um passo de cada vez'}</h1>
        <p className="mt-2 text-ink-soft">{status === 'bloqueado' ? 'Um novo dia do desafio libera a cada dia. Seu corpo precisa desse intervalo para se recuperar!' : 'Os dias seguem em ordem. Conclua o próximo dia disponível para chegar aqui.'}</p>
        <Link href="/treinos/" className="btn-primary mt-6 w-full">Ver meu calendário</Link>
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
          title={n === 21 ? 'Você concluiu o desafio! 🏆' : `Dia ${n} concluído! 💜`}
          text={celebrate.first ? day.reward : 'Treino refeito! Os pontos deste dia já tinham sido contados — mas seu corpo agradece de novo.'}
          cta={n === 21 ? 'Ver minha celebração' : 'Voltar ao início'}
          onClose={() => router.replace(n === 21 ? '/conclusao/' : '/')}
        >
          {celebrate.first && (
            <div className="mt-4 rounded-2xl bg-lilac-50 p-3">
              <p className="font-display text-3xl font-bold text-grape-700">+{after - celebrate.before} pts</p>
              <p className="text-xs font-semibold text-ink-soft">Treino +{POINTS.workout}{after - celebrate.before > POINTS.workout ? ' · bônus de desafio semanal' : ''}</p>
              {leveled && <p className="mt-2 rounded-xl bg-brand p-2 text-sm font-bold text-white">Novo nível: {lvlAfter.emoji} {lvlAfter.name}!</p>}
            </div>
          )}
          <Link href="/evolucao/registro/" className="mt-3 block text-sm font-bold text-grape-500">Registrar como estou me sentindo →</Link>
        </Celebration>
      </main>
    );
  }

  return (
    <Player
      title={day.name}
      subtitle={`Dia ${n} de 21 · Fase ${day.phase}`}
      luna={day.luna}
      breathing={day.breathing}
      steps={steps}
      initialStep={alreadyDone ? 0 : s.days[n]?.step ?? 0}
      onProgress={i => { if (!alreadyDone) { s.startDay(n); s.saveStep(n, i); } }}
      onExit={() => router.push('/')}
      onFinish={finish}
    />
  );
}
