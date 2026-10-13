import { Stack } from 'expo-router';

import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { colors } from '@/theme/theme';

// Layout racine : une pile (Stack) qui contient les onglets, puis les écrans qui s'empilent dessus.
export default function RootLayout() {
  return (
    // Le Provider englobe toute l'application : tous les écrans voient les mêmes favoris.
    <FavoritesProvider>
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
        {/* L'avis s'ouvre en modale : il glisse depuis le bas de l'écran. */}
        <Stack.Screen name="review/[code]" options={{ title: 'Mon avis', presentation: 'modal' }} />
      </Stack>
    </FavoritesProvider>
  );
}
