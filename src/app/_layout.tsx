import { Stack } from 'expo-router';

import { colors } from '@/theme/theme';

// Layout racine : une pile (Stack) qui contient les onglets, puis les écrans qui s'empilent dessus.
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.primary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      {/* Les onglets ont leur propre en-tête : on masque celui de la pile. */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="product/[code]" options={{ title: 'Produit' }} />
    </Stack>
  );
}
