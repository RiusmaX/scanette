import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { useFavorites } from '@/contexts/FavoritesContext';
import { colors } from '@/theme/theme';

// Le dossier (tabs) est un « groupe » : son nom n'apparaît pas dans l'URL.
// Chaque fichier du dossier devient un onglet.
export default function TabsLayout() {
  const { state } = useFavorites();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Catalogue',
          tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scanner',
          tabBarIcon: ({ color, size }) => <Ionicons name="barcode-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoris',
          // Pastille avec le nombre de favoris (rien quand la liste est vide).
          tabBarBadge: state.items.length > 0 ? state.items.length : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
