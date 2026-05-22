import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { PRESET_QUESTS } from '@/src/lib/presets';
import { useGameStore } from '@/src/store/gameStore';
import { STAT_COLORS } from '@/src/types';
import { FadeInView } from '@/src/components/FadeInView';
import { colors, spacing, radius, typography } from '@/src/constants/theme';

export function PresetQuestPicker() {
  const hasPresetAdded = useGameStore((s) => s.hasPresetAdded);

  return (
    <FadeInView style={styles.section}>
      <Text style={styles.title}>Suggested quests</Text>
      <Text style={styles.subtitle}>
        Tap to customize the goal and reward before adding.
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {PRESET_QUESTS.map((preset, index) => {
          const added = hasPresetAdded(preset.id);
          return (
            <Pressable
              key={preset.id}
              style={[styles.card, added && styles.cardAdded]}
              onPress={() =>
                router.push({
                  pathname: '/habit-form',
                  params: { presetId: preset.id },
                })
              }
            >
              <View
                style={[
                  styles.dot,
                  { backgroundColor: STAT_COLORS[preset.category] },
                ]}
              />
              <Text style={styles.cardName} numberOfLines={1}>
                {preset.name}
              </Text>
              <Text style={styles.cardGoal} numberOfLines={2}>
                {preset.goal}
              </Text>
              <Text style={styles.cardXp}>{preset.defaultXpReward} XP</Text>
              {added && <Text style={styles.addedLabel}>Added</Text>}
            </Pressable>
          );
        })}
      </ScrollView>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: spacing.lg },
  title: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  scroll: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  card: {
    width: 156,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  cardAdded: {
    borderColor: colors.accent,
    opacity: 0.85,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  cardName: {
    ...typography.headline,
    color: colors.text,
    marginBottom: 4,
  },
  cardGoal: {
    ...typography.caption,
    color: colors.textMuted,
    minHeight: 32,
    marginBottom: spacing.sm,
  },
  cardXp: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  addedLabel: {
    ...typography.caption,
    color: colors.success,
    marginTop: spacing.xs,
  },
});
