import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MIN_XP_REWARD, MAX_XP_REWARD } from '@/src/lib/xp';
import { colors, spacing, radius, typography } from '@/src/constants/theme';

interface RewardStepperProps {
  value: number;
  onChange: (value: number) => void;
}

export function RewardStepper({ value, onChange }: RewardStepperProps) {
  const decrease = () => onChange(Math.max(MIN_XP_REWARD, value - 1));
  const increase = () => onChange(Math.min(MAX_XP_REWARD, value + 1));

  return (
    <View style={styles.wrap}>
      <Text style={styles.hint}>
        Reward when you complete this goal ({MIN_XP_REWARD}–{MAX_XP_REWARD} XP)
      </Text>
      <View style={styles.row}>
        <Pressable
          style={[styles.btn, value <= MIN_XP_REWARD && styles.btnDisabled]}
          onPress={decrease}
          disabled={value <= MIN_XP_REWARD}
        >
          <Text style={styles.btnText}>−</Text>
        </Pressable>
        <View style={styles.valueBox}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.unit}>XP</Text>
        </View>
        <Pressable
          style={[styles.btn, value >= MAX_XP_REWARD && styles.btnDisabled]}
          onPress={increase}
          disabled={value >= MAX_XP_REWARD}
        >
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: spacing.sm },
  hint: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  btn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: { opacity: 0.35 },
  btnText: {
    fontSize: 22,
    color: colors.text,
    fontWeight: '400',
  },
  valueBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceMuted,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  value: {
    ...typography.title,
    color: colors.text,
  },
  unit: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
