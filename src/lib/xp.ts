import type { Character, Habit, StatKey } from '@/src/types';
import { todayString, yesterdayString } from './dates';

export const BASE_XP = 10;
export const STREAK_XP_PER_DAY = 2;
export const MAX_STREAK_BONUS = 20;
export const STAT_CAP = 99;

export function xpToNextLevel(level: number): number {
  return 100 * level;
}

export function calculateXpReward(streakAfterComplete: number): number {
  const streakBonus = Math.min(
    streakAfterComplete * STREAK_XP_PER_DAY,
    MAX_STREAK_BONUS
  );
  return BASE_XP + streakBonus;
}

export function applyXp(character: Character, xpGained: number): {
  character: Character;
  leveledUp: boolean;
} {
  let { level, xp, stats } = character;
  xp += xpGained;
  let leveledUp = false;

  while (xp >= xpToNextLevel(level)) {
    xp -= xpToNextLevel(level);
    level += 1;
    leveledUp = true;
  }

  return {
    character: { level, xp, stats },
    leveledUp,
  };
}

export function boostStat(character: Character, stat: StatKey): Character {
  const current = character.stats[stat];
  return {
    ...character,
    stats: {
      ...character.stats,
      [stat]: Math.min(current + 1, STAT_CAP),
    },
  };
}

export function updateStreak(habit: Habit, today: string): Habit {
  const yesterday = yesterdayString();

  if (habit.lastCompletedDate === today) {
    return habit;
  }

  let newStreak = 1;
  if (habit.lastCompletedDate === yesterday) {
    newStreak = habit.streak + 1;
  }

  return {
    ...habit,
    streak: newStreak,
    lastCompletedDate: today,
  };
}

export function isCompletedToday(habit: Habit, today: string): boolean {
  return habit.lastCompletedDate === today;
}

export function processStreakBreaks(habits: Habit[], today: string): Habit[] {
  const yesterday = yesterdayString();

  return habits.map((habit) => {
    if (!habit.lastCompletedDate) return habit;
    if (habit.lastCompletedDate === today) return habit;
    if (habit.lastCompletedDate === yesterday) return habit;
    return { ...habit, streak: 0 };
  });
}

export function getXpProgress(character: Character): {
  current: number;
  needed: number;
  percent: number;
} {
  const needed = xpToNextLevel(character.level);
  const percent = needed > 0 ? (character.xp / needed) * 100 : 0;
  return { current: character.xp, needed, percent };
}

export function createDefaultCharacter(): Character {
  return {
    level: 1,
    xp: 0,
    stats: { vitality: 0, strength: 0, mind: 0, spirit: 0 },
  };
}
