import { Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import type { Habit } from '@/src/types';
import { STAT_LABELS, STAT_COLORS } from '@/src/types';
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
          <Text style={styles.category}>{STAT_LABELS[habit.category]}</Text>
        </View>
        {habit.streak > 0 && (
          <Text style={styles.streak}>{habit.streak}d</Text>
        )}
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
  info: { flex: 1 },
  name: {
    ...typography.headline,
    color: colors.text,
    marginBottom: 2,
  },
  category: {
    ...typography.caption,
    color: colors.textMuted,
  },
  streak: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
});
