import { Image, StyleSheet, Text, View } from 'react-native';

import type { Review } from '@/services/reviews';
import { colors, fontSizes, radius, spacing } from '@/theme/theme';

type ReviewListProps = {
  reviews: Review[];
};

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <Text style={styles.empty}>Pas encore d'avis sur ce produit.</Text>;
  }

  return (
    <View style={styles.list}>
      {reviews.map((review) => (
        <View key={review.createdAt} style={styles.card}>
          <Text style={styles.header}>
            {'★'.repeat(review.rating)}
            {'☆'.repeat(5 - review.rating)} · {review.author}
          </Text>
          <Text style={styles.comment}>{review.comment}</Text>
          {review.photoUri ? <Image source={{ uri: review.photoUri }} style={styles.photo} /> : null}
          <Text style={styles.meta}>
            {new Date(review.createdAt).toLocaleDateString('fr-FR')}
            {review.city ? ` · ${review.city}` : ''}
            {review.wouldBuyAgain ? ' · le rachèterait' : ''}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  header: {
    fontWeight: '600',
    color: colors.text,
  },
  comment: {
    color: colors.text,
  },
  photo: {
    width: '100%',
    height: 160,
    borderRadius: radius.sm,
  },
  meta: {
    color: colors.textMuted,
    fontSize: fontSizes.small,
  },
  empty: {
    color: colors.textMuted,
  },
});
