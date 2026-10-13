import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useFavorites } from '@/contexts/FavoritesContext';
import { colors, fontSizes, monospaceFont, radius, spacing } from '@/theme/theme';
import type { Product } from '@/types/product';

import { FavoriteButton } from './FavoriteButton';
import { NutriScoreBadge } from './NutriScoreBadge';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  // L'état ne vit plus dans la carte : il vient du contexte partagé.
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    // La carte est une ligne : image | informations | actions.
    // On navigue avec router.push plutôt qu'avec <Link> : la carte contient un autre bouton (le cœur),
    // et un bouton à l'intérieur d'un lien déclencherait aussi la navigation sur le web.
    <Pressable
      style={styles.card}
      onPress={() => router.push({ pathname: '/product/[code]', params: { code: product.code } })}
    >
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
        <FavoriteButton isFavorite={isFavorite(product.code)} onToggle={() => toggleFavorite(product)} />
      </View>
    </Pressable>
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
});
