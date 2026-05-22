import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { todayString } from '@/src/lib/dates';
import { normalizeHabits } from '@/src/lib/migrate';
import { STORAGE_KEY } from '@/src/lib/storage';
import {
  applyXp,
  boostStat,
  calculateXpReward,
  clampXpReward,
  createDefaultCharacter,
  isCompletedToday,
  processStreakBreaks,
  updateStreak,
} from '@/src/lib/xp';
import type {
  CompleteHabitResult,
  GameState,
  Habit,
  HabitInput,
  StatKey,
} from '@/src/types';

interface GameStore extends GameState {
  syncDailyState: () => void;
  addHabit: (input: HabitInput) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  completeHabit: (id: string) => CompleteHabitResult | null;
  getTodayQuests: () => Habit[];
  hasPresetAdded: (presetId: string) => boolean;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createHabitFromInput(input: HabitInput): Habit {
  return {
    id: generateId(),
    name: input.name.trim(),
    goal: input.goal.trim(),
    category: input.category,
    xpReward: clampXpReward(input.xpReward),
    presetId: input.presetId,
    streak: 0,
    lastCompletedDate: null,
  };
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      character: createDefaultCharacter(),
      habits: [],
      lastActiveDate: todayString(),

      syncDailyState: () => {
        const today = todayString();
        const { lastActiveDate, habits } = get();
        if (lastActiveDate === today) return;

        set({
          lastActiveDate: today,
          habits: processStreakBreaks(habits, today),
        });
      },

      addHabit: (input) => {
        const habit = createHabitFromInput(input);
        set((state) => ({ habits: [...state.habits, habit] }));
      },

      updateHabit: (id, updates) => {
        set((state) => ({
          habits: state.habits.map((h) => {
            if (h.id !== id) return h;
            const next = { ...h, ...updates };
            if (updates.xpReward !== undefined) {
              next.xpReward = clampXpReward(updates.xpReward);
            }
            if (updates.name !== undefined) next.name = updates.name.trim();
            if (updates.goal !== undefined) next.goal = updates.goal.trim();
            return next;
          }),
        }));
      },

      deleteHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
        }));
      },

      completeHabit: (id) => {
        const today = todayString();
        const { habits, character } = get();
        const habit = habits.find((h) => h.id === id);
        if (!habit || isCompletedToday(habit, today)) return null;

        const updatedHabit = updateStreak(habit, today);
        const xpGained = calculateXpReward(
          updatedHabit.streak,
          habit.xpReward
        );
        const { character: afterXp, leveledUp } = applyXp(character, xpGained);
        const finalCharacter = boostStat(afterXp, habit.category);

        set({
          character: finalCharacter,
          habits: habits.map((h) => (h.id === id ? updatedHabit : h)),
        });

        return {
          xpGained,
          leveledUp,
          newLevel: finalCharacter.level,
          statBoosted: habit.category as StatKey,
        };
      },

      getTodayQuests: () => {
        const today = todayString();
        return get().habits.filter((h) => !isCompletedToday(h, today));
      },

      hasPresetAdded: (presetId) => {
        return get().habits.some((h) => h.presetId === presetId);
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        character: state.character,
        habits: state.habits,
        lastActiveDate: state.lastActiveDate,
      }),
      migrate: (persisted) => {
        const state = persisted as Partial<GameState>;
        return {
          character: state.character ?? createDefaultCharacter(),
          habits: normalizeHabits((state.habits as Habit[]) ?? []),
          lastActiveDate: state.lastActiveDate ?? todayString(),
        };
      },
      version: 2,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.habits = normalizeHabits(state.habits);
        }
        state?.syncDailyState();
      },
    }
  )
);
