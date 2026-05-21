import { useLocalSearchParams, router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useGameStore } from '@/src/store/gameStore';
import { HabitForm } from '@/src/components/HabitForm';
import type { HabitCategory } from '@/src/types';
import { colors } from '@/src/constants/theme';

export default function HabitFormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const habits = useGameStore((s) => s.habits);
  const addHabit = useGameStore((s) => s.addHabit);
  const updateHabit = useGameStore((s) => s.updateHabit);
  const habit = id ? habits.find((h) => h.id === id) : undefined;

  const handleSave = (
    name: string,
    category: HabitCategory,
    emoji: string
  ) => {
    if (habit) {
      updateHabit(habit.id, { name, category, emoji });
    } else {
      addHabit(name, category, emoji);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <HabitForm
        initial={habit}
        onSave={handleSave}
        onCancel={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
});
