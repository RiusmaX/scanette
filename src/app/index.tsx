import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { ProductCard } from '@/components/ProductCard';
import { fetchCatalog } from '@/services/catalogService';
import { colors, fontSizes, spacing } from '@/theme/theme';
import type { Product } from '@/types/product';

const PAGE_SIZE = 5;

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // Changer cette valeur relance le chargement (bouton « Réessayer »).
  const [reloadKey, setReloadKey] = useState(0);
  // Bonus du TP 6 : la largeur de l'écran, mise à jour quand on tourne le téléphone.
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  // Effet de montage : il s'exécute après le premier affichage, puis à chaque changement de reloadKey.
  useEffect(() => {
    // Si l'écran disparaît avant la réponse, on ignore le résultat (nettoyage plus bas).
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

    // Fonction de nettoyage : appelée au démontage, ou avant de relancer l'effet.
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
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

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Scanette</Text>
      <LastUpdate />
      <Text style={styles.subtitle}>
        {visibleProducts.length} produits affichés sur {products.length}
      </Text>
      <View style={isWide ? styles.grid : undefined}>
        {visibleProducts.map((product) => (
          <View key={product.code} style={isWide ? styles.gridItem : undefined}>
            <ProductCard product={product} />
          </View>
        ))}
      </View>
      {visibleCount < products.length ? (
        <Button title="Voir plus" onPress={() => setVisibleCount(visibleCount + PAGE_SIZE)} />
      ) : null}
    </ScrollView>
  );
}

// Bonus du TP 5 : un minuteur démarré au montage et arrêté au démontage.
function LastUpdate() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Forme « fonction » du setter : on part toujours de la dernière valeur.
      setSeconds((previous) => previous + 1);
    }, 1000);
    // Sans ce nettoyage, le minuteur continuerait de tourner après la disparition du composant.
    return () => clearInterval(intervalId);
  }, []);

  return <Text style={styles.subtitle}>Mis à jour il y a {seconds} s</Text>;
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.sm,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  title: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subtitle: {
    color: colors.textMuted,
  },
  // Sur un écran large : deux colonnes. flexWrap fait passer les cartes à la ligne.
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '49%',
  },
});
