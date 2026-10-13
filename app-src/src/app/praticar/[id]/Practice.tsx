'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Player } from '@/components/Player';
import { Celebration } from '@/components/Celebration';
import { useStore } from '@/lib/store';
import { EX } from '@/content/exercises';
import { buildSteps } from '@/lib/workout';

/** Prática avulsa de um exercício da biblioteca (2 séries, sem pontos do desafio) */
export function Practice({ id }: { id: string }) {
  const router = useRouter();
  const profile = useStore(s => s.profile);
  const ex = EX[id];
  const [done, setDone] = useState(false);
  const base = ex.category === 'alongamento' || ex.category === 'respiracao' ? { secs: 40 } : ex.category === 'core' && !ex.perSide ? { secs: 30 } : { reps: 10 };
  // aqui o exercício escolhido é praticado como está; o aviso de limitação aparece na biblioteca
  const steps = useMemo(() => buildSteps({ warmup: [], main: [{ ex: id, ...base, sets: 2, rest: 20 }], cooldown: [] }, profile ? { ...profile, limitations: [] } : undefined, false), [id, profile]); // eslint-disable-line react-hooks/exhaustive-deps

  if (done) {
    return (
      <main className="min-h-dvh bg-brand-soft">
        <Celebration open mood="feliz" title="Prática concluída! 💪" text={`Você praticou ${ex.name}. Os treinos do desafio continuam valendo os seus pontos.`} cta="Voltar aos exercícios" onClose={() => router.replace('/treinar/')} />
      </main>
    );
  }

  return (
    <Player
      title={ex.name}
      subtitle="Prática livre · 2 séries"
      lili="Vamos praticar com calma. Use a versão mais fácil sempre que precisar."
      breathing={ex.breathing}
      steps={steps}
      onExit={() => router.push('/treinar/')}
      onFinish={() => setDone(true)}
    />
  );
}
