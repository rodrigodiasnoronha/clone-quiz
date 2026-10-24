import { describe, expect, it } from 'vitest';
import { DAYS, SESSIONS, REWARD_SESSIONS } from '@/content/program';
import { EX, EXERCISES } from '@/content/exercises';
import { QUIZ } from '@/content/extras';
import { ARTICLES } from '@/content/library';

// Protege o conteúdo: quem editar program.ts / exercises.ts descobre aqui se quebrou algo.
const blocks = (s: { warmup: { ex: string }[]; main: { ex: string }[]; cooldown: { ex: string }[] }) => [...s.warmup, ...s.main, ...s.cooldown];

describe('conteúdo do desafio', () => {
  it('tem os 21 dias em ordem', () => {
    expect(DAYS.map(d => d.n)).toEqual(Array.from({ length: 21 }, (_, i) => i + 1));
  });

  it('todo exercício usado em dias e sessões existe', () => {
    const used = [...DAYS, ...Object.values(SESSIONS)].flatMap(blocks).map(b => b.ex);
    expect(used.filter(id => !EX[id])).toEqual([]);
  });

  it('todo exercício substituto (alt) existe e ids são únicos', () => {
    expect(EXERCISES.filter(e => e.alt && !EX[e.alt]).map(e => e.id)).toEqual([]);
    expect(new Set(EXERCISES.map(e => e.id)).size).toBe(EXERCISES.length);
  });

  it('ids de missões são únicos', () => {
    const ids = DAYS.flatMap(d => [d.extra.id, d.surprise.id]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('missões de leitura apontam para artigos que existem', () => {
    const slugs = new Set(ARTICLES.map(a => a.slug));
    const missing = DAYS.flatMap(d => [d.extra, d.surprise]).filter(m => m.article && !slugs.has(m.article));
    expect(missing).toEqual([]);
  });

  it('sessões de recompensa existem', () => {
    expect(REWARD_SESSIONS.filter(r => !SESSIONS[r.session])).toEqual([]);
  });

  it('a resposta certa de cada pergunta do quiz é uma das opções', () => {
    expect(QUIZ.filter(q => q.answer < 0 || q.answer >= q.options.length).map(q => q.q)).toEqual([]);
  });
});
