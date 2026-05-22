import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { todayString } from '@/src/lib/dates';
import { STORAGE_KEY } from '@/src/lib/storage';
import {
  applyXp,
  boostStat,
  calculateXpReward,
  createDefaultCharacter,
  isCompletedToday,
  processStreakBreaks,
  updateStreak,
} from '@/src/lib/xp';
import type {
  CompleteHabitResult,
  GameState,
  Habit,
  HabitCategory,
  StatKey,
} from '@/src/types';

interface GameStore extends GameState {
  syncDailyState: () => void;
  addHabit: (name: string, category: HabitCategory, emoji?: string) => void;
  updateHabit: (
    id: string,
    updates: Partial<Pick<Habit, 'name' | 'category' | 'emoji'>>
  ) => void;
  deleteHabit: (id: string) => void;
  completeHabit: (id: string) => CompleteHabitResult | null;
  getTodayQuests: () => Habit[];
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
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

      addHabit: (name, category, emoji) => {
        const habit: Habit = {
          id: generateId(),
          name: name.trim(),
          category,
          emoji: emoji || undefined,
          streak: 0,
          lastCompletedDate: null,
        };
        set((state) => ({ habits: [...state.habits, habit] }));
      },

      updateHabit: (id, updates) => {
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === id ? { ...h, ...updates } : h
          ),
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
        const xpGained = calculateXpReward(updatedHabit.streak);
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
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        character: state.character,
        habits: state.habits,
        lastActiveDate: state.lastActiveDate,
      }),
      onRehydrateStorage: () => (state) => {
        state?.syncDailyState();
      },
    }
  )
);
