'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { JournalEntry, Profile } from './types';
import { toKey } from './dates';

/**
 * Todo o estado do app fica no localStorage (chave "pnp21").
 * Os pontos NÃO são guardados como um número: eles são calculados a partir
 * dos fatos registrados (treinos concluídos, missões, diário…), cada um com
 * uma chave única. Recarregar a página nunca soma pontos de novo.
 */

export interface DayProgress {
  completedAt?: string; // data AAAA-MM-DD da primeira conclusão
  startedAt?: number;
  difficulty?: number;
  step?: number; // última etapa do player (treino em andamento)
}

export interface Settings {
  reminders: boolean;
  reminderTime: string; // HH:MM
  sound: boolean;
  vibration: boolean;
  demo: boolean; // libera todos os dias para teste
  theme: 'padrao' | 'lilas' | 'noite';
}

export interface State {
  profile?: Profile;
  days: Record<number, DayProgress>;
  /** missões concluídas: "e3", "s7"… → data */
  missions: Record<string, string>;
  journal: JournalEntry[];
  /** atividades únicas que dão pontos: "breath:2026-10-13", "read:postura"… → data */
  activities: Record<string, string>;
  /** quiz: data → respostas */
  quiz: Record<string, number[]>;
  /** roleta: data → índice sorteado */
  roulette: Record<string, number>;
  /** cartas: data → índice revelado */
  cards: Record<string, number>;
  /** sessões bônus/manutenção concluídas: data → ids */
  sessions: Record<string, string[]>;
  /** hidratação: data → copos */
  water: Record<string, number>;
  waterGoal: number;
  /** medalhas já celebradas (para mostrar a animação só uma vez) */
  seenMedals: string[];
  lastVisit?: string;
  previousVisit?: string;
  settings: Settings;

  setProfile: (p: Profile) => void;
  updateProfile: (p: Partial<Profile>) => void;
  startDay: (n: number) => void;
  saveStep: (n: number, step: number) => void;
  completeDay: (n: number, difficulty: number) => void;
  completeMission: (id: string) => void;
  addActivity: (key: string) => boolean;
  saveJournal: (e: JournalEntry) => void;
  answerQuiz: (date: string, answers: number[]) => void;
  spinRoulette: (date: string, idx: number) => void;
  revealCard: (date: string, idx: number) => void;
  completeSession: (id: string) => void;
  markMedalsSeen: (ids: string[]) => void;
  setWater: (date: string, cups: number) => void;
  setWaterGoal: (goal: number) => void;
  touchVisit: () => void;
  setSettings: (s: Partial<Settings>) => void;
  importData: (data: Partial<State>) => void;
  reset: () => void;
}

const initial = {
  profile: undefined,
  days: {},
  missions: {},
  journal: [],
  activities: {},
  quiz: {},
  roulette: {},
  cards: {},
  sessions: {},
  seenMedals: [],
  water: {},
  waterGoal: 8,
  lastVisit: undefined,
  previousVisit: undefined,
  settings: { reminders: false, reminderTime: '19:30', sound: true, vibration: true, demo: false, theme: 'padrao' as const },
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      ...initial,

      setProfile: profile => set({ profile }),
      updateProfile: p => set(s => ({ profile: s.profile && { ...s.profile, ...p } })),

      startDay: n => set(s => ({ days: { ...s.days, [n]: { ...s.days[n], startedAt: s.days[n]?.startedAt ?? Date.now() } } })),
      saveStep: (n, step) => set(s => ({ days: { ...s.days, [n]: { ...s.days[n], step } } })),
      completeDay: (n, difficulty) =>
        set(s => ({
          days: { ...s.days, [n]: { ...s.days[n], completedAt: s.days[n]?.completedAt ?? toKey(), difficulty, step: undefined } },
        })),

      completeMission: id => set(s => (s.missions[id] ? s : { missions: { ...s.missions, [id]: toKey() } })),

      addActivity: key => {
        if (get().activities[key]) return false;
        set(s => ({ activities: { ...s.activities, [key]: toKey() } }));
        return true;
      },

      saveJournal: e =>
        set(s => ({ journal: [...s.journal.filter(j => j.date !== e.date), e].sort((a, b) => a.date.localeCompare(b.date)) })),

      answerQuiz: (date, answers) => set(s => (s.quiz[date] ? s : { quiz: { ...s.quiz, [date]: answers } })),
      spinRoulette: (date, idx) => set(s => (date in s.roulette ? s : { roulette: { ...s.roulette, [date]: idx } })),
      revealCard: (date, idx) => set(s => (date in s.cards ? s : { cards: { ...s.cards, [date]: idx } })),

      completeSession: id =>
        set(s => {
          const d = toKey();
          const list = s.sessions[d] ?? [];
          return list.includes(id) ? s : { sessions: { ...s.sessions, [d]: [...list, id] } };
        }),

      setWater: (date, cups) => set(s => ({ water: { ...s.water, [date]: Math.max(0, Math.min(20, cups)) } })),
      setWaterGoal: goal => set({ waterGoal: Math.max(4, Math.min(16, goal)) }),

      markMedalsSeen: ids => set(s => ({ seenMedals: Array.from(new Set([...s.seenMedals, ...ids])) })),

      touchVisit: () =>
        set(s => {
          const today = toKey();
          if (s.lastVisit === today) return s;
          return { previousVisit: s.lastVisit, lastVisit: today };
        }),

      setSettings: p => set(s => ({ settings: { ...s.settings, ...p } })),
      importData: data => set(() => ({ ...initial, ...data })),
      reset: () => set(() => ({ ...initial })),
    }),
    {
      name: 'pnp21',
      version: 1,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<State>;
        return { ...current, ...p, settings: { ...current.settings, ...p.settings } };
      },
      storage: createJSONStorage(() => localStorage),
      partialize: s => {
        const { setProfile, updateProfile, startDay, saveStep, completeDay, completeMission, addActivity, saveJournal, answerQuiz, spinRoulette, revealCard, completeSession, markMedalsSeen, setWater, setWaterGoal, touchVisit, setSettings, importData, reset, ...data } = s;
        return data;
      },
    },
  ),
);

/** Fotos ficam em chaves separadas para não pesar no estado principal */
export const photos = {
  save(dataUrl: string) {
    const key = `pnp21-photo-${Date.now()}`;
    localStorage.setItem(key, dataUrl); // pode lançar QuotaExceededError
    return key;
  },
  get(key?: string) {
    if (!key) return null;
    try { return localStorage.getItem(key); } catch { return null; }
  },
  remove(key?: string) {
    if (!key) return;
    try { localStorage.removeItem(key); } catch {}
  },
};
