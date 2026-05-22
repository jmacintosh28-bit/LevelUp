import { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import type { Habit, HabitInput, HabitCategory, QuestPreset } from '@/src/types';
import { STAT_KEYS, STAT_LABELS, CATEGORY_FLAVOR, STAT_COLORS } from '@/src/types';
import { DEFAULT_XP_REWARD } from '@/src/lib/xp';
import { FadeInView } from '@/src/components/FadeInView';
import { RewardStepper } from '@/src/components/RewardStepper';
import { colors, spacing, radius, typography } from '@/src/constants/theme';

interface HabitFormProps {
  initial?: Habit;
  preset?: QuestPreset;
  onSave: (input: HabitInput) => void;
  onCancel: () => void;
}

export function HabitForm({ initial, preset, onSave, onCancel }: HabitFormProps) {
  const defaults = useMemo(
    () => ({
      name: initial?.name ?? preset?.name ?? '',
      goal: initial?.goal ?? preset?.goal ?? '',
      category: (initial?.category ?? preset?.category ?? 'strength') as HabitCategory,
      xpReward: initial?.xpReward ?? preset?.defaultXpReward ?? DEFAULT_XP_REWARD,
      presetId: initial?.presetId ?? preset?.id,
    }),
    [initial, preset]
  );

  const [name, setName] = useState(defaults.name);
  const [goal, setGoal] = useState(defaults.goal);
  const [category, setCategory] = useState<HabitCategory>(defaults.category);
  const [xpReward, setXpReward] = useState(defaults.xpReward);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      goal: goal.trim(),
      category,
      xpReward,
      presetId: defaults.presetId,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {preset && !initial && (
        <FadeInView>
          <Text style={styles.presetBadge}>From preset · adjust anything below</Text>
        </FadeInView>
      )}

      <FadeInView index={preset ? 1 : 0}>
        <Text style={styles.label}>Quest name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Morning walk"
          placeholderTextColor={colors.textMuted}
          autoFocus={!initial}
        />
      </FadeInView>

      <FadeInView index={1}>
        <Text style={[styles.label, styles.labelSpaced]}>Goal</Text>
        <TextInput
          style={[styles.input, styles.goalInput]}
          value={goal}
          onChangeText={setGoal}
          placeholder="What counts as done today?"
          placeholderTextColor={colors.textMuted}
          multiline
        />
      </FadeInView>

      <FadeInView index={2}>
        <Text style={[styles.label, styles.labelSpaced]}>Category</Text>
        {STAT_KEYS.map((stat) => {
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
                <Text
                  style={[styles.optionName, selected && styles.optionNameSelected]}
                >
                  {STAT_LABELS[stat]}
                </Text>
                <Text style={styles.optionFlavor}>{CATEGORY_FLAVOR[stat]}</Text>
              </View>
            </Pressable>
          );
        })}
      </FadeInView>

      <FadeInView index={3}>
        <Text style={[styles.label, styles.labelSpaced]}>Reward</Text>
        <RewardStepper value={xpReward} onChange={setXpReward} />
      </FadeInView>

      <FadeInView index={4} style={styles.actions}>
        <Pressable style={styles.cancelBtn} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.saveBtn, !name.trim() && styles.saveDisabled]}
          onPress={handleSave}
          disabled={!name.trim()}
        >
          <Text style={styles.saveText}>{initial ? 'Save' : 'Add quest'}</Text>
        </Pressable>
      </FadeInView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: spacing.xxl },
  presetBadge: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
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
  goalInput: { minHeight: 72, textAlignVertical: 'top' },
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
