import { View, Text, StyleSheet } from 'react-native';
import type { StatKey } from '@/src/types';
import { STAT_LABELS, STAT_COLORS } from '@/src/types';
import { STAT_CAP } from '@/src/lib/xp';
import { AnimatedBar } from '@/src/components/AnimatedBar';
import { FadeInView } from '@/src/components/FadeInView';
import { colors, spacing, typography } from '@/src/constants/theme';

interface StatBarProps {
  stat: StatKey;
  value: number;
  index?: number;
}

export function StatBar({ stat, value, index = 0 }: StatBarProps) {
  const percent = (value / STAT_CAP) * 100;
  const statColor = STAT_COLORS[stat];

  return (
    <FadeInView index={index} style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: statColor }]} />
        <Text style={styles.label}>{STAT_LABELS[stat]}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <AnimatedBar progress={percent} color={statColor} />
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  label: {
    ...typography.headline,
    flex: 1,
    color: colors.text,
  },
  value: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
