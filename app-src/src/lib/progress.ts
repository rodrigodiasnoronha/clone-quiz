import { DAYS, REWARD_SESSIONS } from '@/content/program';
import { QUIZ } from '@/content/extras';
import { addDays, daysBetween, toKey } from './dates';
import type { State } from './store';

/** findLastIndex sem depender de navegadores recentes */
const lastIndex = <T,>(arr: T[], fn: (x: T) => boolean) => { for (let i = arr.length - 1; i >= 0; i--) if (fn(arr[i])) return i; return -1; };

export const POINTS = {
  workout: 100,
  mission: 30,
  journal: 20,
  win: 10,
  breath: 15,
  read: 10,
  quizCorrect: 5,
  roulette: 10,
  card: 5,
  session: 20,
  weekly: 50,
};

export type DayStatus = 'concluido' | 'andamento' | 'disponivel' | 'pendente' | 'bloqueado';

type Data = Pick<State, 'profile' | 'days' | 'missions' | 'journal' | 'activities' | 'quiz' | 'roulette' | 'cards' | 'sessions' | 'settings'>;

export function completedDays(s: Data) {
  return DAYS.filter(d => s.days[d.n]?.completedAt).map(d => d.n);
}

/** Até que dia o calendário já liberou (1 novo dia por dia corrido) */
export function unlockedUntil(s: Data, today = toKey()) {
  if (!s.profile) return 1;
  if (s.settings.demo) return 21;
  return Math.max(1, Math.min(21, daysBetween(s.profile.startDate, today) + 1));
}

/** Próximo dia a fazer (os dias seguem em ordem) */
export function nextDay(s: Data) {
  return DAYS.find(d => !s.days[d.n]?.completedAt)?.n ?? null;
}

export function dayStatus(s: Data, n: number, today = toKey()): DayStatus {
  if (s.days[n]?.completedAt) return 'concluido';
  const unlocked = unlockedUntil(s, today);
  const next = nextDay(s);
  if (n > unlocked) return 'bloqueado';
  if (n === next) return s.days[n]?.step != null ? 'andamento' : 'disponivel';
  return 'pendente';
}

/** Dias liberados pelo calendário que ainda não foram feitos */
export function daysBehind(s: Data, today = toKey()) {
  const next = nextDay(s);
  if (!next) return 0;
  return Math.max(0, unlockedUntil(s, today) - next);
}

/** Datas em que houve treino (dia do desafio ou sessão bônus) */
export function activeDates(s: Data) {
  const set = new Set<string>();
  Object.values(s.days).forEach(d => d.completedAt && set.add(d.completedAt));
  Object.entries(s.sessions).forEach(([date, ids]) => ids.length && set.add(date));
  return set;
}

/** Sequência de dias seguidos com treino, contando até hoje (ou ontem) */
export function streak(s: Data, today = toKey()) {
  const dates = activeDates(s);
  let cursor = dates.has(today) ? today : addDays(today, -1);
  let count = 0;
  while (dates.has(cursor)) {
    count++;
    cursor = addDays(cursor, -1);
  }
  return count;
}

export function bestStreak(s: Data) {
  const dates = [...activeDates(s)].sort();
  let best = 0, cur = 0, prev: string | null = null;
  for (const d of dates) {
    cur = prev && daysBetween(prev, d) === 1 ? cur + 1 : 1;
    best = Math.max(best, cur);
    prev = d;
  }
  return best;
}

export function quizScore(s: Data) {
  let correct = 0, total = 0;
  for (const [date, answers] of Object.entries(s.quiz)) {
    const qs = quizFor(date);
    answers.forEach((a, i) => { total++; if (qs[i] && qs[i].answer === a) correct++; });
  }
  return { correct, total };
}

/** 3 perguntas do dia, sempre as mesmas para a mesma data */
export function quizFor(date: string) {
  const base = Math.abs(Math.floor(new Date(date + 'T12:00:00').getTime() / 86_400_000)) * 3;
  return [0, 1, 2].map(i => QUIZ[(base + i) % QUIZ.length]);
}

export const WEEKLY = [
  { id: 'w1', title: 'Semana 1: 5 treinos', desc: 'Conclua 5 treinos entre os dias 1 e 7.', check: (s: Data) => completedDays(s).filter(n => n <= 7).length, goal: 5 },
  { id: 'w2', title: 'Semana 2: diário em dia', desc: 'Registre o diário 4 vezes durante a Fase 2.', check: (s: Data) => s.journal.filter(j => j.mood && j.day >= 8 && j.day <= 14).length, goal: 4 },
  { id: 'w3', title: 'Semana 3: 8 missões', desc: 'Conclua 8 missões extras ou surpresa dos dias 15 a 21.', check: (s: Data) => DAYS.filter(d => d.n >= 15).flatMap(d => [d.extra.id, d.surprise.id]).filter(id => s.missions[id]).length, goal: 8 },
];

export function pointsBreakdown(s: Data) {
  const workouts = completedDays(s).length * POINTS.workout;
  const missions = Object.keys(s.missions).length * POINTS.mission;
  const journal = s.journal.filter(j => j.mood).length * POINTS.journal + s.journal.filter(j => j.win?.trim()).length * POINTS.win;
  const keys = Object.keys(s.activities);
  const breath = keys.filter(k => k.startsWith('breath:')).length * POINTS.breath;
  const read = keys.filter(k => k.startsWith('read:')).length * POINTS.read;
  const roulette = keys.filter(k => k.startsWith('roulette:')).length * POINTS.roulette;
  const cards = Object.keys(s.cards).length * POINTS.card;
  const quiz = quizScore(s).correct * POINTS.quizCorrect;
  const sessions = Object.values(s.sessions).reduce((n, ids) => n + ids.length, 0) * POINTS.session;
  const weekly = WEEKLY.filter(w => w.check(s) >= w.goal).length * POINTS.weekly;
  const total = workouts + missions + journal + breath + read + roulette + cards + quiz + sessions + weekly;
  return { workouts, missions, journal, breath, read, roulette, cards, quiz, sessions, weekly, total };
}

export const LEVELS = [
  { n: 1, name: 'Primeiro Passo', min: 0, emoji: '🌱', gradient: 'from-rose-200 to-rose-300', perk: 'Acesso à jornada completa' },
  { n: 2, name: 'Mulher Determinada', min: 250, emoji: '🌷', gradient: 'from-rose-300 to-lilac-300', perk: 'Nova moldura de avatar' },
  { n: 3, name: 'Energia em Alta', min: 700, emoji: '⚡', gradient: 'from-lilac-300 to-lilac-500', perk: 'Tema Lilás no app' },
  { n: 4, name: 'Rainha da Constância', min: 1300, emoji: '👑', gradient: 'from-lilac-400 to-grape-500', perk: 'Coroa no seu avatar' },
  { n: 5, name: 'Poder Feminino', min: 2000, emoji: '🔥', gradient: 'from-rose-400 to-grape-600', perk: 'Tema Noite Roxa no app' },
  { n: 6, name: 'Minha Melhor Versão', min: 2800, emoji: '💎', gradient: 'from-grape-500 to-grape-800', perk: 'Certificado com selo diamante' },
];

export function levelFor(points: number) {
  const idx = lastIndex(LEVELS, l => points >= l.min);
  const cur = LEVELS[idx];
  const next = LEVELS[idx + 1];
  const pct = next ? (points - cur.min) / (next.min - cur.min) : 1;
  return { ...cur, next, pct, toNext: next ? next.min - points : 0 };
}

export interface Medal {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  kind: 'marco' | 'participacao';
  /** sessão ou certificado liberado junto */
  unlock?: { type: 'session'; id: string } | { type: 'certificate'; id: 'semana1' | 'final' };
  progress: (s: Data) => [number, number];
}

const done = (n: number) => (s: Data) => [s.days[n]?.completedAt ? 1 : 0, 1] as [number, number];

export const MEDALS: Medal[] = [
  { id: 'm3', name: 'Primeiros Passos', emoji: '👣', desc: 'Concluir o dia 3', kind: 'marco', progress: done(3) },
  { id: 'm5', name: 'Mobilidade Bônus', emoji: '🔄', desc: 'Concluir o dia 5 e liberar a aula bônus de mobilidade', kind: 'marco', unlock: { type: 'session', id: 'bonus-mobilidade' }, progress: done(5) },
  { id: 'm7', name: 'Primeira Semana', emoji: '🎓', desc: 'Concluir o dia 7 e ganhar o certificado da semana 1', kind: 'marco', unlock: { type: 'certificate', id: 'semana1' }, progress: done(7) },
  { id: 'm10', name: 'Relaxamento Especial', emoji: '🌙', desc: 'Concluir o dia 10 e liberar a sessão de relaxamento', kind: 'marco', unlock: { type: 'session', id: 'relaxamento' }, progress: done(10) },
  { id: 'm14', name: 'Determinação', emoji: '🏅', desc: 'Concluir o dia 14', kind: 'marco', progress: done(14) },
  { id: 'm17', name: 'Alongamento Bônus', emoji: '🤸‍♀️', desc: 'Concluir o dia 17 e liberar a aula bônus de alongamento', kind: 'marco', unlock: { type: 'session', id: 'bonus-alongamento' }, progress: done(17) },
  { id: 'm21', name: 'Desafio Concluído', emoji: '🏆', desc: 'Concluir os 21 dias e ganhar o certificado final', kind: 'marco', unlock: { type: 'certificate', id: 'final' }, progress: done(21) },
  { id: 'p-streak3', name: 'Em Ritmo', emoji: '🔥', desc: '3 dias seguidos de treino', kind: 'participacao', progress: s => [Math.min(3, bestStreak(s)), 3] },
  { id: 'p-streak7', name: 'Imparável', emoji: '💫', desc: '7 dias seguidos de treino', kind: 'participacao', progress: s => [Math.min(7, bestStreak(s)), 7] },
  { id: 'p-diario', name: 'Diário Vivo', emoji: '📔', desc: '5 registros no diário', kind: 'participacao', progress: s => [Math.min(5, s.journal.filter(j => j.mood).length), 5] },
  { id: 'p-respira', name: 'Respira Fundo', emoji: '🌬️', desc: '5 sessões de respiração', kind: 'participacao', progress: s => [Math.min(5, Object.keys(s.activities).filter(k => k.startsWith('breath:')).length), 5] },
  { id: 'p-leitora', name: 'Curiosa', emoji: '📚', desc: 'Ler 5 conteúdos da biblioteca', kind: 'participacao', progress: s => [Math.min(5, Object.keys(s.activities).filter(k => k.startsWith('read:')).length), 5] },
  { id: 'p-quiz', name: 'Sabe Tudo', emoji: '🧠', desc: 'Acertar 15 perguntas do Quiz do Corpo', kind: 'participacao', progress: s => [Math.min(15, quizScore(s).correct), 15] },
  { id: 'p-missoes', name: 'Missão Cumprida', emoji: '🎯', desc: 'Concluir 15 missões', kind: 'participacao', progress: s => [Math.min(15, Object.keys(s.missions).length), 15] },
  { id: 'p-bonus', name: 'Exploradora', emoji: '🧭', desc: 'Fazer as 3 aulas bônus', kind: 'participacao', progress: s => {
    const ids = new Set(Object.values(s.sessions).flat());
    return [REWARD_SESSIONS.filter(r => ids.has(r.session)).length, 3];
  } },
];

export const earnedMedals = (s: Data) => MEDALS.filter(m => { const [a, b] = m.progress(s); return a >= b; });

export function sessionUnlocked(s: Data, id: string) {
  if (id.startsWith('manutencao')) return !!s.days[21]?.completedAt || s.settings.demo;
  const r = REWARD_SESSIONS.find(r => r.session === id);
  return !!r && (!!s.days[r.day]?.completedAt || s.settings.demo);
}

/** Jardim da Evolução: 0 a 6 estágios conforme as atividades */
export function gardenStage(s: Data) {
  const acts = completedDays(s).length * 2 + Object.keys(s.missions).length + s.journal.filter(j => j.mood).length;
  const stages = [0, 2, 6, 14, 24, 36, 50];
  return { stage: lastIndex(stages, t => acts >= t), acts, next: stages.find(t => t > acts) };
}
