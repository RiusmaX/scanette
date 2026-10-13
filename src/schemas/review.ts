import { z } from 'zod';

// Le schéma décrit les règles de validation UNE fois ;
// Zod en déduit aussi le type TypeScript du formulaire.
export const reviewSchema = z.object({
  author: z.string().trim().min(2, 'Ton prénom doit faire au moins 2 caractères'),
  rating: z.number().int().min(1, 'Choisis une note de 1 à 5').max(5),
  comment: z
    .string()
    .trim()
    .min(10, 'Ton avis doit faire au moins 10 caractères')
    .max(500, '500 caractères au maximum'),
  wouldBuyAgain: z.boolean(),
});

// z.infer fabrique le type à partir du schéma : { author: string; rating: number; ... }
export type ReviewFormValues = z.infer<typeof reviewSchema>;
