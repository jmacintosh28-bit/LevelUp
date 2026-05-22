import { useLocalSearchParams, router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useGameStore } from '@/src/store/gameStore';
import { HabitForm } from '@/src/components/HabitForm';
import { getPresetById } from '@/src/lib/presets';
import type { HabitInput } from '@/src/types';
import { colors, spacing } from '@/src/constants/theme';

export default function HabitFormScreen() {
  const { id, presetId } = useLocalSearchParams<{
    id?: string;
    presetId?: string;
  }>();
  const habits = useGameStore((s) => s.habits);
  const addHabit = useGameStore((s) => s.addHabit);
  const updateHabit = useGameStore((s) => s.updateHabit);
  const habit = id ? habits.find((h) => h.id === id) : undefined;
  const preset = presetId ? getPresetById(presetId) : undefined;

  const handleSave = (input: HabitInput) => {
    if (habit) {
      updateHabit(habit.id, input);
    } else {
      addHabit(input);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <HabitForm
        initial={habit}
        preset={preset}
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
    padding: spacing.lg,
  },
});
