export type StatKey = 'vitality' | 'strength' | 'mind' | 'spirit';
export type HabitCategory = StatKey;

export interface Character {
  level: number;
  xp: number;
  stats: Record<StatKey, number>;
}

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  emoji?: string;
  streak: number;
  lastCompletedDate: string | null;
}

export interface GameState {
  character: Character;
  habits: Habit[];
  lastActiveDate: string;
}

export interface CompleteHabitResult {
  xpGained: number;
  leveledUp: boolean;
  newLevel: number;
  statBoosted: StatKey;
}

export const STAT_KEYS: StatKey[] = ['vitality', 'strength', 'mind', 'spirit'];

export const STAT_LABELS: Record<StatKey, string> = {
  vitality: 'Vitality',
  strength: 'Strength',
  mind: 'Mind',
  spirit: 'Spirit',
};

import { statColors } from '@/src/constants/theme';

export const STAT_COLORS: Record<StatKey, string> = statColors;

export const CATEGORY_FLAVOR: Record<StatKey, string> = {
  vitality: 'Health, sleep, nutrition',
  strength: 'Exercise and movement',
  mind: 'Reading, learning, focus',
  spirit: 'Mindfulness and gratitude',
};
