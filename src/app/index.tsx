import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text } from 'react-native';

import { ProductCard } from '@/components/ProductCard';
import { catalog } from '@/data/catalog';

const PAGE_SIZE = 5;

// Écran d'accueil : la liste des produits du catalogue.
export default function HomeScreen() {
  // Bonus du TP 4 : le parent garde le nombre de cartes visibles dans son état.
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleProducts = catalog.slice(0, visibleCount);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Scanette</Text>
      <Text>
        {visibleProducts.length} produits affichés sur {catalog.length}
      </Text>
      {visibleProducts.map((product) => (
        // key aide React à reconnaître chaque élément d'une liste : on prend le code-barres, unique.
        <ProductCard key={product.code} product={product} />
      ))}
      {visibleCount < catalog.length ? (
        <Button title="Voir plus" onPress={() => setVisibleCount(visibleCount + PAGE_SIZE)} />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
