import { beforeEach, describe, expect, it } from 'vitest';
import { useStore } from '@/lib/store';

const s = () => useStore.getState();

describe('store', () => {
  beforeEach(() => s().reset());

  it('concluir o dia de novo não muda a data da primeira conclusão', () => {
    s().completeDay(1, 3);
    const first = s().days[1].completedAt;
    useStore.setState({ days: { 1: { ...s().days[1], completedAt: '2020-01-01' } } });
    s().completeDay(1, 5);
    expect(s().days[1].completedAt).toBe('2020-01-01');
    expect(first).toBeTruthy();
  });

  it('atividade só conta uma vez', () => {
    expect(s().addActivity('breath:2026-10-01')).toBe(true);
    expect(s().addActivity('breath:2026-10-01')).toBe(false);
  });

  it('quiz, roleta e carta não podem ser refeitos no mesmo dia', () => {
    s().answerQuiz('2026-10-01', [1, 0, 2]);
    s().answerQuiz('2026-10-01', [0, 0, 0]);
    s().spinRoulette('2026-10-01', 0);
    s().spinRoulette('2026-10-01', 5);
    expect(s().quiz['2026-10-01']).toEqual([1, 0, 2]);
    expect(s().roulette['2026-10-01']).toBe(0);
  });

  it('água e meta ficam dentro dos limites', () => {
    s().setWater('2026-10-01', 99);
    s().setWaterGoal(1);
    expect(s().water['2026-10-01']).toBe(20);
    expect(s().waterGoal).toBe(4);
  });

  it('salva no localStorage na chave pnp21', () => {
    s().completeMission('e1');
    expect(JSON.parse(localStorage.getItem('pnp21')!).state.missions.e1).toBeTruthy();
  });
});
