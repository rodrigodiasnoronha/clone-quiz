import { EX } from '@/content/exercises';
import type { Block, Exercise, Goal, Profile } from './types';

export type Stage = 'aquecimento' | 'principal' | 'bonus' | 'alongamento';

export interface ExerciseStep {
  kind: 'exercise';
  ex: Exercise;
  stage: Stage;
  secs?: number;
  reps?: number;
  set: number;
  sets: number;
  side?: 'Right' | 'Left';
  adapted?: string; // nome do exercício original, quando trocado por limitação
  optional?: boolean;
}

export interface RestStep {
  kind: 'rest';
  secs: number;
}

export type Step = ExerciseStep | RestStep;

const SECONDS_PER_REP = 4;

/** Finalizador opcional conforme o objetivo escolhido no onboarding */
const GOAL_FINISHER: Record<Goal, Block> = {
  abdomen: { ex: 'dead-bug-parede', reps: 8 },
  postura: { ex: 'anjos-parede', reps: 10 },
  pernas: { ex: 'ponte-parede', reps: 12 },
  flexibilidade: { ex: 'borboleta-parede', secs: 45 },
  rotina: { ex: 'respiracao-lateral', secs: 60 },
};

export const GOAL_LABEL: Record<Goal, string> = {
  abdomen: 'Strengthen my core',
  postura: 'Improve my posture',
  pernas: 'Tone my legs and glutes',
  flexibilidade: 'Gain flexibility',
  rotina: 'Build a healthy routine',
};

/** Troca exercícios que não combinam com as limitações informadas */
export function resolveExercise(id: string, profile?: Profile): { ex: Exercise; adapted?: string } {
  let ex = EX[id];
  const original = ex;
  const lim = profile?.limitations ?? [];
  let guard = 0;
  while (ex.avoid?.some(l => lim.includes(l)) && ex.alt && guard++ < 4) ex = EX[ex.alt];
  return { ex, adapted: ex.id !== original.id ? original.name : undefined };
}

function scale(b: Block, profile?: Profile) {
  const f = profile?.level === 'iniciante' ? 0.8 : profile?.level === 'avancada' ? 1.25 : 1;
  const restAdj = profile?.level === 'iniciante' ? 10 : profile?.level === 'avancada' ? -5 : 0;
  return {
    reps: b.reps ? Math.max(4, Math.round(b.reps * f)) : undefined,
    secs: b.secs ? Math.max(15, Math.round((b.secs * f) / 5) * 5) : undefined,
    rest: b.rest != null ? Math.max(10, b.rest + restAdj) : 15,
  };
}

function setsFor(base: number, profile?: Profile) {
  switch (profile?.minutes) {
    case 10: return 1;
    case 15: return Math.min(base, 2);
    case 30: return Math.min(base + 1, 3);
    default: return base;
  }
}

function expand(blocks: Block[], stage: Stage, profile: Profile | undefined, out: Step[], optional = false) {
  blocks.forEach((b, bi) => {
    const { ex, adapted } = resolveExercise(b.ex, profile);
    const { reps, secs, rest } = scale(b, profile);
    const sets = stage === 'principal' ? setsFor(b.sets ?? 1, profile) : 1;
    for (let set = 1; set <= sets; set++) {
      const sides: (ExerciseStep['side'] | undefined)[] = ex.perSide ? ['Right', 'Left'] : [undefined];
      sides.forEach(side => out.push({ kind: 'exercise', ex, stage, reps, secs, set, sets, side, adapted, optional }));
      const last = bi === blocks.length - 1 && set === sets;
      if (stage === 'principal' && !last) out.push({ kind: 'rest', secs: rest });
    }
  });
}

export function buildSteps(src: { warmup: Block[]; main: Block[]; cooldown: Block[] }, profile?: Profile, withFinisher = true): Step[] {
  const steps: Step[] = [];
  expand(src.warmup, 'aquecimento', profile, steps);
  expand(src.main, 'principal', profile, steps);
  if (withFinisher && profile) {
    steps.push({ kind: 'rest', secs: 15 });
    expand([GOAL_FINISHER[profile.goal]], 'bonus', profile, steps, true);
  }
  expand(src.cooldown, 'alongamento', profile, steps);
  return steps;
}

export function stepSeconds(s: Step) {
  if (s.kind === 'rest') return s.secs;
  return (s.secs ?? (s.reps ?? 8) * SECONDS_PER_REP) + 8; // + transição
}

export const estimateMinutes = (steps: Step[]) => Math.max(5, Math.round(steps.reduce((n, s) => n + stepSeconds(s), 0) / 60));

export const STAGE_LABEL: Record<Stage, string> = {
  aquecimento: 'Warm-up',
  principal: 'Main workout',
  bonus: 'Bonus for your goal',
  alongamento: 'Final stretch',
};
