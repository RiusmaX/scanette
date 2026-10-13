import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { fetchCatalog } from '@/services/catalogService';
import { colors, fontSizes, spacing } from '@/theme/theme';
import type { Product } from '@/types/product';
import { filterProducts, groupByCategory } from '@/utils/search';

export default function CatalogScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [query, setQuery] = useState('');
  // Bonus du TP 7 : affichage groupé par catégorie.
  const [isGrouped, setIsGrouped] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCatalog(800, 0.2);
        if (!ignore) {
          setProducts(data);
        }
      } catch (e) {
        if (!ignore) {
          setError(e instanceof Error ? e.message : 'Erreur inconnue');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>Chargement du catalogue…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Oups : {error}</Text>
        <Button title="Réessayer" onPress={() => setReloadKey(reloadKey + 1)} />
      </View>
    );
  }

  // Valeur dérivée : on ne la stocke pas dans un état, on la recalcule à chaque rendu.
  const filteredProducts = filterProducts(products, query);

  return (
    <View style={styles.screen}>
      {/* Titre de l'écran dans l'en-tête de la pile */}
      <Stack.Screen options={{ title: 'Catalogue' }} />

      <SearchBar value={query} onChangeText={setQuery} />

      <View style={styles.toolbar}>
        <Text style={styles.count}>{filteredProducts.length} produits</Text>
        <View style={styles.switchRow}>
          <Text style={styles.count}>Par catégorie</Text>
          <Switch value={isGrouped} onValueChange={setIsGrouped} />
        </View>
      </View>

      {isGrouped ? (
        <SectionList
          sections={groupByCategory(filteredProducts)}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => <ProductCard product={item} />}
          renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          contentContainerStyle={styles.list}
          stickySectionHeadersEnabled
        />
      ) : (
        // FlatList ne crée que les cartes visibles à l'écran (virtualisation), contrairement à ScrollView + map.
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={<Text style={styles.empty}>Aucun produit ne correspond à « {query} ».</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  count: {
    color: colors.textMuted,
  },
  list: {
    padding: spacing.lg,
  },
  sectionHeader: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    color: colors.primary,
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
  },
  empty: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: spacing.xl,
  },
});
