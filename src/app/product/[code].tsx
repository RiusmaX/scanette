import { Link, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ElasticImage } from '@/components/ElasticImage';
import { FavoriteButton } from '@/components/FavoriteButton';
import { NutriScoreBadge } from '@/components/NutriScoreBadge';
import { NutrimentsTable } from '@/components/NutrimentsTable';
import { ReviewList } from '@/components/ReviewList';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useProduct } from '@/hooks/useProduct';
import { getReviews, type Review } from '@/services/reviews';
import { colors, fontSizes, monospaceFont, radius, spacing } from '@/theme/theme';

const SOURCE_LABELS = {
  catalog: 'Données du catalogue local',
  cache: 'Données Open Food Facts (cache)',
  api: 'Données Open Food Facts à jour',
} as const;

export default function ProductScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const { product, source, isLoading, error } = useProduct(code);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { isFavorite, toggleFavorite } = useFavorites();

  // useFocusEffect : se relance chaque fois que l'écran revient au premier plan,
  // par exemple quand on ferme la modale d'avis.
  useFocusEffect(
    useCallback(() => {
      getReviews(code).then(setReviews);
    }, [code]),
  );

  if (!product) {
    return (
      <View style={styles.centered}>
        <Stack.Screen options={{ title: isLoading ? 'Chargement…' : 'Introuvable' }} />
        {isLoading ? <ActivityIndicator size="large" color={colors.primary} /> : <Text>{error}</Text>}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: product.name }} />

      {product.imageUrl ? <ElasticImage uri={product.imageUrl} /> : null}

      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.brand}>
            {product.brand}
            {product.quantity ? ` · ${product.quantity}` : ''}
          </Text>
          <Text style={styles.code}>{product.code}</Text>
        </View>
        <View style={styles.headerActions}>
          <NutriScoreBadge grade={product.nutriScore} />
          <FavoriteButton isFavorite={isFavorite(product.code)} onToggle={() => toggleFavorite(product)} />
        </View>
      </View>

      <View style={styles.sourceRow}>
        {isLoading ? <ActivityIndicator size="small" color={colors.primary} /> : null}
        {source ? <Text style={styles.source}>{SOURCE_LABELS[source]}</Text> : null}
      </View>

      {product.novaGroup ? <Text style={styles.nova}>Groupe NOVA {product.novaGroup} sur 4</Text> : null}

      <Link href={{ pathname: '/review/[code]', params: { code: product.code } }} asChild>
        <Pressable style={styles.reviewButton}>
          <Text style={styles.reviewButtonText}>Donner mon avis</Text>
        </Pressable>
      </Link>

      <NutrimentsTable nutriments={product.nutriments} />

      {product.ingredients ? (
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Ingrédients</Text>
          <Text style={styles.blockText}>{product.ingredients}</Text>
        </View>
      ) : null}

      {product.allergens.length > 0 ? (
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Allergènes</Text>
          <Text style={styles.blockText}>{product.allergens.join(', ')}</Text>
        </View>
      ) : null}

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Avis</Text>
        <ReviewList reviews={reviews} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  headerActions: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerText: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: colors.text,
  },
  brand: {
    fontSize: fontSizes.body,
    color: colors.textMuted,
  },
  code: {
    fontFamily: monospaceFont,
    color: colors.textMuted,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  source: {
    color: colors.textMuted,
    fontSize: fontSizes.small,
  },
  nova: {
    color: colors.text,
  },
  reviewButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  block: {
    gap: spacing.xs,
  },
  blockTitle: {
    fontSize: fontSizes.title,
    fontWeight: '600',
    color: colors.text,
  },
  blockText: {
    color: colors.text,
    lineHeight: 21,
  },
});
