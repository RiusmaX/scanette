import type { ReviewFormValues } from '@/schemas/review';

import { getJSON, setJSON } from './storage';

// Un avis enregistré = les valeurs du formulaire + sa date.
export type Review = ReviewFormValues & {
  createdAt: string;
};

const keyFor = (code: string) => `reviews:${code}`;

export async function getReviews(code: string): Promise<Review[]> {
  return (await getJSON<Review[]>(keyFor(code))) ?? [];
}

export async function saveReview(code: string, values: ReviewFormValues): Promise<void> {
  const reviews = await getReviews(code);
  const review: Review = { ...values, createdAt: new Date().toISOString() };
  // Le plus récent en premier.
  await setJSON(keyFor(code), [review, ...reviews]);
}
