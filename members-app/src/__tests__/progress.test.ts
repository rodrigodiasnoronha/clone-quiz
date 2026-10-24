import { describe, expect, it } from 'vitest';
import { bestStreak, dayStatus, daysBehind, levelFor, nextDay, pointsBreakdown, quizFor, streak, unlockedUntil, POINTS } from '@/lib/progress';
import type { Profile } from '@/lib/types';

const profile: Profile = { name: 'Ana', goal: 'abdomen', level: 'intermediaria', minutes: 20, period: 'manha', obstacle: 'tempo', limitations: [], startDate: '2026-10-01', createdAt: 0 };

const state = (over = {}) => ({
  profile, days: {}, missions: {}, journal: [], activities: {}, quiz: {}, roulette: {}, cards: {}, sessions: {},
  settings: { reminders: false, reminderTime: '19:30', sound: true, vibration: true, demo: false, theme: 'padrao' as const },
  ...over,
});

describe('liberação dos dias', () => {
  it('libera 1 dia novo por dia corrido, entre 1 e 21', () => {
    expect(unlockedUntil(state(), '2026-10-01')).toBe(1);
    expect(unlockedUntil(state(), '2026-10-05')).toBe(5);
    expect(unlockedUntil(state(), '2027-01-01')).toBe(21);
    expect(unlockedUntil(state(), '2026-09-01')).toBe(1);
  });

  it('modo demo libera tudo', () => {
    expect(unlockedUntil(state({ settings: { ...state().settings, demo: true } }), '2026-10-01')).toBe(21);
  });

  it('status de cada dia', () => {
    const s = state({ days: { 1: { completedAt: '2026-10-01' }, 2: { step: 3 } } });
    const today = '2026-10-03';
    expect(dayStatus(s, 1, today)).toBe('concluido');
    expect(dayStatus(s, 2, today)).toBe('andamento');
    expect(dayStatus(s, 3, today)).toBe('pendente');
    expect(dayStatus(s, 4, today)).toBe('bloqueado');
    expect(nextDay(s)).toBe(2);
    expect(daysBehind(s, today)).toBe(1);
  });
});

describe('sequência', () => {
  const s = state({ days: { 1: { completedAt: '2026-10-01' }, 2: { completedAt: '2026-10-02' }, 3: { completedAt: '2026-10-04' } }, sessions: { '2026-10-05': ['alongamento-rapido'] } });

  it('conta dias seguidos até hoje ou ontem', () => {
    expect(streak(s, '2026-10-05')).toBe(2);
    expect(streak(s, '2026-10-06')).toBe(2);
    expect(streak(s, '2026-10-07')).toBe(0);
  });

  it('melhor sequência', () => expect(bestStreak(s)).toBe(2));
});

describe('pontos e níveis', () => {
  it('soma cada fato uma vez só', () => {
    const s = state({ days: { 1: { completedAt: '2026-10-01' } }, missions: { e1: '2026-10-01' }, activities: { 'breath:2026-10-01': '2026-10-01' } });
    const p = pointsBreakdown(s);
    expect(p.total).toBe(POINTS.workout + POINTS.mission + POINTS.breath);
  });

  it('nível e quanto falta pro próximo', () => {
    expect(levelFor(0)).toMatchObject({ n: 1, toNext: 250 });
    expect(levelFor(250)).toMatchObject({ n: 2, toNext: 450 });
    expect(levelFor(99999)).toMatchObject({ n: 6, toNext: 0, pct: 1 });
  });

  it('quiz do dia é sempre o mesmo para a mesma data', () => {
    expect(quizFor('2026-10-10')).toEqual(quizFor('2026-10-10'));
    expect(quizFor('2026-10-10')).toHaveLength(3);
  });
});
