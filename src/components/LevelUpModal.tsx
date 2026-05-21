import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '@/src/constants/theme';

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
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.content}>
          {leveledUp ? (
            <>
              <Text style={styles.emoji}>⭐</Text>
              <Text style={styles.title}>Level Up!</Text>
              <Text style={styles.subtitle}>
                You reached Level {level}! New power awaits.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.emoji}>✨</Text>
              <Text style={styles.title}>Quest Complete!</Text>
              <Text style={styles.subtitle}>+{xpGained} XP earned</Text>
            </>
          )}
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  emoji: { fontSize: 56, marginBottom: 16 },
  title: {
    color: colors.gold,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.gold,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '800',
  },
});
