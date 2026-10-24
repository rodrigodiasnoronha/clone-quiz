export type Goal = 'abdomen' | 'postura' | 'pernas' | 'flexibilidade' | 'rotina';
export type Level = 'iniciante' | 'intermediaria' | 'avancada';
export type Period = 'manha' | 'tarde' | 'noite';
export type Obstacle = 'tempo' | 'motivacao' | 'esquecimento' | 'cansaco' | 'dores';
export type Limitation = 'joelhos' | 'lombar' | 'punhos' | 'ombros' | 'pescoco';

export interface Profile {
  name: string;
  goal: Goal;
  level: Level;
  minutes: 10 | 15 | 20 | 30;
  period: Period;
  obstacle: Obstacle;
  limitations: Limitation[];
  startDate: string; // AAAA-MM-DD
  createdAt: number;
}

export type ExerciseCategory = 'respiracao' | 'mobilidade' | 'forca' | 'core' | 'equilibrio' | 'alongamento';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  muscles: string[];
  position: string;
  steps: string[];
  breathing: string;
  errors: string[];
  easier: string;
  safety: string;
  /** Exercícios que não devem ser feitos com estas limitações */
  avoid?: Limitation[];
  /** Exercício que substitui este quando há limitação */
  alt?: string;
  /** Lado a lado: o tempo/repetições valem para cada lado */
  perSide?: boolean;
  /** Caminho do vídeo real em /public/media (opcional) */
  video?: string;
}

/** Item de uma sessão: tempo (s) ou repetições */
export interface Block {
  ex: string;
  secs?: number;
  reps?: number;
  sets?: number;
  rest?: number;
  note?: string;
}

export type MissionKind = 'breath' | 'journal' | 'read' | 'timer' | 'quiz' | 'card' | 'roulette' | 'win';

export interface Mission {
  id: string;
  kind: MissionKind;
  title: string;
  desc: string;
  /** breath/timer: duração em segundos */
  secs?: number;
  /** read: slug do artigo */
  article?: string;
  /** timer: passos guiados */
  steps?: string[];
}

export type DayType = 'treino' | 'mobilidade' | 'recuperacao' | 'celebracao';

export interface Day {
  n: number;
  phase: 1 | 2 | 3;
  type: DayType;
  name: string;
  goal: string;
  lili: string;
  breathing: string;
  warmup: Block[];
  main: Block[];
  cooldown: Block[];
  extra: Mission;
  surprise: Mission;
  reward: string;
}

export interface Session {
  id: string;
  title: string;
  subtitle: string;
  warmup: Block[];
  main: Block[];
  cooldown: Block[];
}

export interface JournalEntry {
  date: string;
  day: number;
  mood?: number; // 1-5
  energy?: number; // 1-5
  sleep?: number; // 1-5
  difficulty?: number; // 1-5
  win?: string;
  notes?: string;
  photo?: string; // chave da foto no localStorage
  flex?: number; // 1-4: até onde alcança no rolamento
  hold?: number; // segundos de agachamento isométrico
}
