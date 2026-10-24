import { describe, expect, it } from 'vitest';
import { addDays, daysBetween, fromKey, toKey } from '@/lib/dates';

describe('dates', () => {
  it('toKey/fromKey ida e volta', () => {
    expect(toKey(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(toKey(fromKey('2026-12-31'))).toBe('2026-12-31');
  });

  it('addDays vira mês e ano', () => {
    expect(addDays('2026-01-31', 1)).toBe('2026-02-01');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
  });

  it('daysBetween', () => {
    expect(daysBetween('2026-10-01', '2026-10-21')).toBe(20);
    expect(daysBetween('2026-10-21', '2026-10-01')).toBe(-20);
  });
});
