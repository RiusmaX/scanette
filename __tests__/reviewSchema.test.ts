import { reviewSchema } from '@/schemas/review';

describe('reviewSchema', () => {
  const valid = { author: 'Camille', rating: 4, comment: 'Bon, mais trop sucré.', wouldBuyAgain: true };

  it('accepte un avis complet', () => {
    expect(reviewSchema.safeParse(valid).success).toBe(true);
  });

  it('refuse une note à 0', () => {
    const result = reviewSchema.safeParse({ ...valid, rating: 0 });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Choisis une note de 1 à 5');
  });

  it('compte les caractères après avoir retiré les espaces', () => {
    expect(reviewSchema.safeParse({ ...valid, comment: '   court   ' }).success).toBe(false);
  });
});
