import { describe, expect, it } from 'vitest';
import { buildSteps, estimateMinutes, resolveExercise } from '@/lib/workout';
import { DAY } from '@/content/program';
import { EXERCISES } from '@/content/exercises';
import type { Profile } from '@/lib/types';

const profile = (over: Partial<Profile> = {}): Profile => ({ name: 'Ana', goal: 'abdomen', level: 'intermediaria', minutes: 20, period: 'manha', obstacle: 'tempo', limitations: [], startDate: '2026-10-01', createdAt: 0, ...over });

describe('treino', () => {
  it('troca exercício que não combina com a limitação', () => {
    const risky = EXERCISES.find(e => e.avoid?.length && e.alt)!;
    const { ex, adapted } = resolveExercise(risky.id, profile({ limitations: risky.avoid! }));
    expect(ex.id).not.toBe(risky.id);
    expect(ex.avoid?.some(l => risky.avoid!.includes(l)) ?? false).toBe(false);
    expect(adapted).toBe(risky.name);
  });

  it('sem limitação mantém o exercício', () => {
    const risky = EXERCISES.find(e => e.avoid?.length && e.alt)!;
    expect(resolveExercise(risky.id, profile()).ex.id).toBe(risky.id);
  });

  it('10 minutos = 1 série; não termina o principal com descanso', () => {
    const steps = buildSteps(DAY(1), profile({ minutes: 10 }), false);
    const main = steps.filter(s => s.kind === 'exercise' && s.stage === 'principal');
    expect(main.every(s => s.kind === 'exercise' && s.sets === 1)).toBe(true);
    const lastMain = steps.lastIndexOf(main.at(-1)!);
    expect(steps[lastMain + 1]?.kind).not.toBe('rest');
  });

  it('exercício de um lado vira direito + esquerdo', () => {
    const steps = buildSteps({ warmup: [], main: [], cooldown: [{ ex: EXERCISES.find(e => e.perSide)!.id, secs: 30 }] }, profile(), false);
    expect(steps.map(s => s.kind === 'exercise' && s.side)).toEqual(['Right', 'Left']);
  });

  it('mais minutos = treino mais longo; finalizador do objetivo entra como opcional', () => {
    const short = buildSteps(DAY(8), profile({ minutes: 10 }));
    const long = buildSteps(DAY(8), profile({ minutes: 30 }));
    expect(estimateMinutes(long)).toBeGreaterThan(estimateMinutes(short));
    expect(long.some(s => s.kind === 'exercise' && s.stage === 'bonus' && s.optional)).toBe(true);
  });
});
