import 'react-native-reanimated';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppState, View, StyleSheet } from 'react-native';
import { useGameStore } from '@/src/store/gameStore';
import { colors, typography } from '@/src/constants/theme';

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
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="habit-form"
          options={{
            presentation: 'modal',
            headerShown: true,
            title: 'Quest',
            headerStyle: { backgroundColor: colors.background },
            headerShadowVisible: false,
            headerTintColor: colors.text,
            headerTitleStyle: typography.title,
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
});
