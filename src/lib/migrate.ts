import type { Habit } from '@/src/types';
import { DEFAULT_XP_REWARD, clampXpReward } from '@/src/lib/xp';

export function normalizeHabit(habit: Habit & { emoji?: string }): Habit {
  const { emoji: _emoji, ...rest } = habit;
  return {
    ...rest,
    goal: rest.goal ?? '',
    xpReward: clampXpReward(rest.xpReward ?? DEFAULT_XP_REWARD),
  };
}

export function normalizeHabits(habits: Habit[]): Habit[] {
  return habits.map(normalizeHabit);
}
