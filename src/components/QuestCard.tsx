import { Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import type { Habit } from '@/src/types';
import { STAT_LABELS, STAT_COLORS } from '@/src/types';
import { calculateXpReward } from '@/src/lib/xp';
import { FadeInView } from '@/src/components/FadeInView';
import { colors, spacing, radius, typography, animation } from '@/src/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface QuestCardProps {
  habit: Habit;
  onComplete: () => void;
  index?: number;
}

export function QuestCard({ habit, onComplete, index = 0 }: QuestCardProps) {
  const scale = useSharedValue(1);
  const statColor = STAT_COLORS[habit.category];
  const totalXp = calculateXpReward(habit.streak + 1, habit.xpReward);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <FadeInView index={index}>
      <AnimatedPressable
        style={[styles.card, animatedStyle]}
        onPress={onComplete}
        onPressIn={() => {
          scale.value = withSpring(0.98, animation.spring);
        }}
        onPressOut={() => {
          scale.value = withSpring(1, animation.spring);
        }}
      >
        <View style={[styles.check, { borderColor: statColor }]}>
          <View style={[styles.checkInner, { backgroundColor: statColor }]} />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{habit.name}</Text>
          {habit.goal ? (
            <Text style={styles.goal} numberOfLines={2}>
              {habit.goal}
            </Text>
          ) : null}
          <Text style={styles.meta}>
            {STAT_LABELS[habit.category]}
            {habit.streak > 0 ? ` · ${habit.streak}d streak` : ''}
          </Text>
        </View>
        <View style={styles.reward}>
          <Text style={styles.rewardValue}>+{totalXp}</Text>
          <Text style={styles.rewardUnit}>XP</Text>
        </View>
      </AnimatedPressable>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  checkInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0,
  },
  info: { flex: 1, marginRight: spacing.sm },
  name: {
    ...typography.headline,
    color: colors.text,
    marginBottom: 2,
  },
  goal: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  meta: {
    ...typography.caption,
    color: colors.textMuted,
  },
  reward: {
    alignItems: 'flex-end',
  },
  rewardValue: {
    ...typography.headline,
    color: colors.text,
  },
  rewardUnit: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
