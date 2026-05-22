import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import type { Habit, HabitCategory } from '@/src/types';
import { STAT_KEYS, STAT_LABELS, CATEGORY_FLAVOR, STAT_COLORS } from '@/src/types';
import { FadeInView } from '@/src/components/FadeInView';
import { colors, spacing, radius, typography } from '@/src/constants/theme';

interface HabitFormProps {
  initial?: Habit;
  onSave: (name: string, category: HabitCategory, emoji: string) => void;
  onCancel: () => void;
}

export function HabitForm({ initial, onSave, onCancel }: HabitFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [category, setCategory] = useState<HabitCategory>(
    initial?.category ?? 'strength'
  );

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), category, '');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <FadeInView>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Morning run"
          placeholderTextColor={colors.textMuted}
          autoFocus
        />
      </FadeInView>

      <FadeInView index={1}>
        <Text style={[styles.label, styles.labelSpaced]}>Category</Text>
        {STAT_KEYS.map((stat, i) => {
          const selected = category === stat;
          return (
            <Pressable
              key={stat}
              style={[styles.option, selected && styles.optionSelected]}
              onPress={() => setCategory(stat)}
            >
              <View
                style={[
                  styles.optionDot,
                  { backgroundColor: STAT_COLORS[stat] },
                  selected && styles.optionDotSelected,
                ]}
              />
              <View style={styles.optionText}>
                <Text style={[styles.optionName, selected && styles.optionNameSelected]}>
                  {STAT_LABELS[stat]}
                </Text>
                <Text style={styles.optionFlavor}>{CATEGORY_FLAVOR[stat]}</Text>
              </View>
            </Pressable>
          );
        })}
      </FadeInView>

      <FadeInView index={2} style={styles.actions}>
        <Pressable style={styles.cancelBtn} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.saveBtn, !name.trim() && styles.saveDisabled]}
          onPress={handleSave}
          disabled={!name.trim()}
        >
          <Text style={styles.saveText}>{initial ? 'Save' : 'Add habit'}</Text>
        </Pressable>
      </FadeInView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: spacing.xxl },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  labelSpaced: { marginTop: spacing.lg },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.text,
    fontSize: 17,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  optionSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.surfaceMuted,
  },
  optionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.md,
    opacity: 0.5,
  },
  optionDotSelected: { opacity: 1 },
  optionText: { flex: 1 },
  optionName: {
    ...typography.headline,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  optionNameSelected: { color: colors.text },
  optionFlavor: {
    ...typography.caption,
    color: colors.textMuted,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  cancelBtn: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
  },
  cancelText: {
    ...typography.headline,
    color: colors.textSecondary,
  },
  saveBtn: {
    flex: 2,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
  },
  saveDisabled: { opacity: 0.4 },
  saveText: {
    ...typography.headline,
    color: colors.surface,
  },
});
