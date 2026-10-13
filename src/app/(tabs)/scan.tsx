import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/theme/theme';

// Écran provisoire : le vrai scanner arrive au TP 13.
export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Le scanner arrive au TP 13.</Text>
      {/* Navigation « impérative » : on pousse un écran sur la pile depuis le code. */}
      <Button
        title="Simuler un scan (Nutella)"
        color={colors.primary}
        onPress={() => router.push({ pathname: '/product/[code]', params: { code: '3017620422003' } })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  text: {
    color: colors.textMuted,
  },
});
