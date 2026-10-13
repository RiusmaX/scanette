import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSizes, monospaceFont, radius, spacing } from '@/theme/theme';
import type { Product } from '@/types/product';

import { NutriScoreBadge } from './NutriScoreBadge';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    // Link + asChild : le Pressable devient le lien vers la fiche produit.
    <Link href={{ pathname: '/product/[code]', params: { code: product.code } }} asChild>
      {/* La carte est une ligne : image | informations | actions. */}
      <Pressable style={styles.card}>
        {product.imageUrl ? (
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]} />
        )}

        {/* flex: 1 : la colonne du milieu prend toute la place restante. */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.brand}>
            {product.brand}
            {product.quantity ? ` · ${product.quantity}` : ''}
          </Text>
          <Text style={styles.code}>{product.code}</Text>
        </View>

        <View style={styles.actions}>
          <NutriScoreBadge grade={product.nutriScore} />
          <Pressable onPress={() => setIsFavorite(!isFavorite)} hitSlop={8}>
            <Text style={[styles.favorite, isFavorite && styles.favoriteActive]}>
              {isFavorite ? '♥' : '♡'}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // en React Native, l'axe principal est vertical par défaut : on le passe en ligne
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    // boxShadow fonctionne sur iOS et Android avec la nouvelle architecture.
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: radius.sm,
    resizeMode: 'contain',
  },
  imagePlaceholder: {
    backgroundColor: colors.border,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    fontSize: fontSizes.title,
    fontWeight: '600',
    color: colors.text,
  },
  brand: {
    fontSize: fontSizes.body,
    color: colors.textMuted,
  },
  code: {
    fontSize: fontSizes.small,
    fontFamily: monospaceFont,
    color: colors.textMuted,
  },
  actions: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  favorite: {
    fontSize: 24,
    color: colors.textMuted,
  },
  favoriteActive: {
    color: colors.favorite,
  },
});
