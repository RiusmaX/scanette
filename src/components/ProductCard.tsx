import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Product } from '@/types/product';

import { NutriScoreBadge } from './NutriScoreBadge';

type ProductCardProps = {
  product: Product;
};

// Une carte affiche un produit : image, nom, marque, Nutri-Score et bouton favori.
export function ProductCard({ product }: ProductCardProps) {
  // État local : chaque carte se souvient si elle est en favori.
  // (Au TP 12, cet état deviendra global pour être partagé entre les écrans.)
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <View style={styles.card}>
      {product.imageUrl ? <Image source={{ uri: product.imageUrl }} style={styles.image} /> : null}
      <Text style={styles.name}>{product.name}</Text>
      <Text>{product.brand}</Text>
      <NutriScoreBadge grade={product.nutriScore} />
      <Pressable onPress={() => setIsFavorite(!isFavorite)}>
        <Text style={styles.favorite}>{isFavorite ? '♥ En favori' : '♡ Ajouter aux favoris'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    gap: 6,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  favorite: {
    color: '#C2185B',
  },
});
