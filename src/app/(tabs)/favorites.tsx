import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { ProductCard } from '@/components/ProductCard';
import { useFavorites } from '@/contexts/FavoritesContext';
import { colors, fontSizes, spacing } from '@/theme/theme';

export default function FavoritesScreen() {
  const { state, clearFavorites } = useFavorites();

  function confirmClear() {
    // Une action destructrice se confirme.
    Alert.alert('Tout effacer ?', 'Tes favoris seront supprimés de ce téléphone.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Effacer', style: 'destructive', onPress: clearFavorites },
    ]);
  }

  return (
    <FlatList
      data={state.items}
      keyExtractor={(item) => item.code}
      renderItem={({ item }) => <ProductCard product={item} />}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        state.items.length > 0 ? (
          <View style={styles.header}>
            <Text style={styles.count}>{state.items.length} favoris</Text>
            <Pressable onPress={confirmClear} hitSlop={8}>
              <Text style={styles.clear}>Tout effacer</Text>
            </Pressable>
          </View>
        ) : null
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyText}>
            {state.isHydrated
              ? 'Aucun favori pour l’instant. Touche le cœur d’un produit pour le garder ici.'
              : 'Chargement…'}
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.lg,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  count: {
    color: colors.textMuted,
  },
  clear: {
    color: colors.danger,
    fontWeight: '600',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  emptyIcon: {
    fontSize: 48,
    color: colors.border,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: fontSizes.body,
    maxWidth: 260,
  },
});
