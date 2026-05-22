import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useGameStore } from '@/src/store/gameStore';
import { getXpProgress } from '@/src/lib/xp';
import { AnimatedBar } from '@/src/components/AnimatedBar';
import { colors, spacing, radius, typography } from '@/src/constants/theme';

export function CharacterCard() {
  const character = useGameStore((s) => s.character);
  const habits = useGameStore((s) => s.habits);
  const { current, needed, percent } = getXpProgress(character);
  const totalStreaks = habits.reduce((sum, h) => sum + h.streak, 0);

  return (
    <Animated.View entering={FadeIn.duration(400)} style={styles.card}>
      <Text style={styles.level}>Level {character.level}</Text>
      <View style={styles.xpRow}>
        <Text style={styles.xpLabel}>Experience</Text>
        <Text style={styles.xpValue}>
          {current} / {needed}
        </Text>
      </View>
      <AnimatedBar progress={percent} color={colors.accent} height={6} />
      {habits.length > 0 && (
        <Text style={styles.meta}>
          {totalStreaks} streak {totalStreaks === 1 ? 'day' : 'days'} total
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  level: {
    ...typography.largeTitle,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  xpLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  xpValue: {
    ...typography.caption,
    color: colors.textMuted,
  },
  meta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
});
