import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { useGameStore } from '@/src/store/gameStore';
import { Screen } from '@/src/components/Screen';
import { FadeInView } from '@/src/components/FadeInView';
import { PresetQuestPicker } from '@/src/components/PresetQuestPicker';
import type { Habit } from '@/src/types';
import { STAT_LABELS, STAT_COLORS } from '@/src/types';
import { colors, spacing, radius, typography, animation } from '@/src/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function HabitRow({
  item,
  index,
  onPress,
  onDelete,
}: {
  item: Habit;
  index: number;
  onPress: () => void;
  onDelete: () => void;
}) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInDown.delay(index * 50).springify()}>
      <AnimatedPressable
        style={[styles.card, animatedStyle]}
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.99, animation.spring);
        }}
        onPressOut={() => {
          scale.value = withSpring(1, animation.spring);
        }}
      >
        <View
          style={[styles.dot, { backgroundColor: STAT_COLORS[item.category] }]}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          {item.goal ? (
            <Text style={styles.goal} numberOfLines={1}>
              {item.goal}
            </Text>
          ) : null}
          <Text style={styles.meta}>
            {STAT_LABELS[item.category]} · {item.xpReward} XP
            {item.streak > 0 ? ` · ${item.streak}d streak` : ''}
          </Text>
        </View>
        <Pressable onPress={onDelete} hitSlop={12} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Remove</Text>
        </Pressable>
      </AnimatedPressable>
    </Animated.View>
  );
}

export default function HabitsScreen() {
  const habits = useGameStore((s) => s.habits);
  const deleteHabit = useGameStore((s) => s.deleteHabit);

  return (
    <View style={styles.container}>
      <Screen contentStyle={styles.list}>
        <PresetQuestPicker />
        {habits.length === 0 ? (
          <FadeInView style={styles.empty}>
            <Text style={styles.emptyTitle}>No quests yet</Text>
            <Text style={styles.emptyText}>
              Pick a suggested quest above or add your own.
            </Text>
          </FadeInView>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Your quests</Text>
            {habits.map((item, index) => (
              <HabitRow
                key={item.id}
                item={item}
                index={index}
                onPress={() =>
                  router.push({ pathname: '/habit-form', params: { id: item.id } })
                }
                onDelete={() => deleteHabit(item.id)}
              />
            ))}
          </>
        )}
      </Screen>
      <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.fabWrap}>
        <Pressable
          style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
          onPress={() => router.push('/habit-form')}
        >
          <Text style={styles.fabText}>Custom quest</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { paddingBottom: 100 },
  sectionTitle: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.md,
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
    marginBottom: 2,
  },
  meta: {
    ...typography.caption,
    color: colors.textMuted,
  },
  deleteBtn: { paddingVertical: spacing.xs },
  deleteText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  fabWrap: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
  },
  fab: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  fabPressed: { opacity: 0.9 },
  fabText: {
    ...typography.headline,
    color: colors.surface,
  },
  empty: {
    paddingTop: spacing.lg,
    alignItems: 'center',
  },
  emptyTitle: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
