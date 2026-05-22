import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';
import { colors, spacing, radius, typography } from '@/src/constants/theme';

interface LevelUpModalProps {
  visible: boolean;
  leveledUp: boolean;
  level: number;
  xpGained: number;
  onClose: () => void;
}

export function LevelUpModal({
  visible,
  leveledUp,
  level,
  xpGained,
  onClose,
}: LevelUpModalProps) {
  if (!visible) return null;

  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose}>
      <Animated.View
        entering={FadeIn.duration(220)}
        exiting={FadeOut.duration(180)}
        style={styles.overlay}
      >
        <Animated.View
          entering={ZoomIn.springify().damping(18).stiffness(180)}
          style={styles.content}
        >
          <Text style={styles.title}>
            {leveledUp ? `Level ${level}` : 'Done'}
          </Text>
          <Text style={styles.subtitle}>
            {leveledUp
              ? 'You reached a new level.'
              : `+${xpGained} experience`}
          </Text>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 24, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  content: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 300,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  buttonPressed: { opacity: 0.88 },
  buttonText: {
    ...typography.headline,
    color: colors.surface,
  },
});
