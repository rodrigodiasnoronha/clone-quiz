'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Confetti } from '@/components/Celebration';
import { Luna } from '@/components/Luna';
import { useStore } from '@/lib/store';
import { bestStreak, completedDays, earnedMedals, levelFor, pointsBreakdown } from '@/lib/progress';
import { FLEX } from '@/components/JournalForm';

export default function Conclusao() {
  const s = useStore();
  const done = completedDays(s);
  const finished = done.length === 21;
  const pts = pointsBreakdown(s).total;
  const lvl = levelFor(pts);
  const medals = earnedMedals(s);
  const withMood = s.journal.filter(j => j.mood);
  const first = withMood[0], last = withMood[withMood.length - 1];
  const flexFirst = s.journal.find(j => j.flex), flexLast = [...s.journal].reverse().find(j => j.flex);
  const holdFirst = s.journal.find(j => j.hold), holdLast = [...s.journal].reverse().find(j => j.hold);

  const stats = [
    ['🏋️‍♀️', done.length, 'treinos concluídos'],
    ['🎯', Object.keys(s.missions).length, 'missões realizadas'],
    ['🏅', medals.length, 'medalhas conquistadas'],
    ['🔥', bestStreak(s), 'melhor sequência'],
    ['📔', withMood.length, 'registros no diário'],
    ['💜', pts, 'Pontos de Evolução'],
  ] as const;

  return (
    <main className="mx-auto min-h-dvh w-full max-w-md px-5 pb-10 pt-6">
      {finished && <Confetti count={90} />}
      <div className="text-center">
        <motion.div initial={{ scale: .5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 12 }} className="mx-auto w-fit">
          <Luna mood={finished ? 'orgulhosa' : 'feliz'} size={150} />
        </motion.div>
        <h1 className="mt-3 text-3xl font-bold leading-tight">{finished ? `${s.profile!.name}, você conseguiu! 🏆` : 'Sua jornada até aqui'}</h1>
        <p className="mt-2 text-ink-soft">{finished ? '21 dias de cuidado, presença e força. Olha só tudo o que você construiu:' : `Faltam ${21 - done.length} dias para concluir o desafio.`}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {stats.map(([e, v, l], i) => (
          <motion.div key={l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 + i * .08 }} className="card p-4 text-center">
            <p className="text-2xl">{e}</p>
            <p className="font-display text-3xl font-bold text-grape-700">{v}</p>
            <p className="text-[11px] font-semibold text-ink-soft">{l}</p>
          </motion.div>
        ))}
      </div>

      <div className={`mt-3 rounded-3xl bg-gradient-to-r ${lvl.gradient} p-4 text-center shadow-soft`}>
        <p className="text-xs font-bold uppercase text-grape-900/70">Nível alcançado</p>
        <p className="font-display text-2xl font-bold text-grape-900">{lvl.emoji} {lvl.name}</p>
      </div>

      {(first && last && first !== last) || (flexFirst && flexLast) || (holdFirst && holdLast) ? (
        <div className="card mt-3 space-y-1.5 p-4 text-sm">
          <p className="font-bold">Sua evolução registrada</p>
          {first && last && first !== last && <p>Energia: {first.energy}/5 → <b>{last.energy}/5</b> · Humor: {first.mood}/5 → <b>{last.mood}/5</b></p>}
          {flexFirst && flexLast && flexFirst !== flexLast && <p>Rolamento: {FLEX[flexFirst.flex! - 1]} → <b>{FLEX[flexLast.flex! - 1]}</b></p>}
          {holdFirst && holdLast && holdFirst !== holdLast && <p>Agachamento na parede: {holdFirst.hold}s → <b>{holdLast.hold}s</b></p>}
        </div>
      ) : null}

      <div className="mt-4 rounded-3xl bg-white p-5 shadow-card">
        <div className="flex items-center gap-2"><Luna size={44} float={false} /><p className="font-bold">Mensagem da Luna</p></div>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {finished
            ? 'Foi uma honra caminhar ao seu lado. Você aprendeu a respirar, a se mover com controle e, principalmente, a aparecer para você mesma. Isso não tem prazo de validade: continue com a rotina de manutenção, no seu ritmo. Estarei aqui. 💜'
            : 'Cada dia que você completou já é uma vitória. Continue no seu ritmo, sem culpa e com carinho.'}
        </p>
      </div>

      {finished && <Link href="/certificado/final/" className="btn-primary shine mt-5 w-full text-lg">🎓 Ver meu certificado</Link>}
      {finished && (
        <div className="mt-3">
          <p className="mb-2 text-center text-sm font-bold">Continue treinando: rotina de manutenção</p>
          <div className="grid grid-cols-3 gap-2">
            {['a', 'b', 'c'].map(x => <Link key={x} href={`/sessao/manutencao-${x}/`} className="btn-soft">Treino {x.toUpperCase()}</Link>)}
          </div>
          <p className="mt-1 text-center text-[11px] text-ink-faint">Sugestão: 3 vezes por semana, alternando A, B e C.</p>
        </div>
      )}
      <Link href="/" className="btn-ghost mt-3 w-full">Voltar ao início</Link>
    </main>
  );
}
