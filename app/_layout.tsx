import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppState, View, StyleSheet } from 'react-native';
import { useGameStore } from '@/src/store/gameStore';
import { colors } from '@/src/constants/theme';

export default function RootLayout() {
  const syncDailyState = useGameStore((s) => s.syncDailyState);

  useEffect(() => {
    syncDailyState();
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') syncDailyState();
    });
    return () => sub.remove();
  }, [syncDailyState]);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="habit-form"
          options={{ presentation: 'modal', headerShown: true, title: 'Forge Quest', headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.gold }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
});
