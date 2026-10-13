import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ProductCard } from '@/components/ProductCard';
import { fetchCatalog } from '@/services/catalogService';
import type { Product } from '@/types/product';

const PAGE_SIZE = 5;

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // Changer cette valeur relance le chargement (bouton « Réessayer »).
  const [reloadKey, setReloadKey] = useState(0);

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
      <Text>
        {visibleProducts.length} produits affichés sur {products.length}
      </Text>
      {visibleProducts.map((product) => (
        <ProductCard key={product.code} product={product} />
      ))}
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

  return <Text>Mis à jour il y a {seconds} s</Text>;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
