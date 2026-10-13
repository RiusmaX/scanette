// TP 3 · Étape 5 · Cinq erreurs à corriger.
// Lance  npx tsc -p exercises/tp03-typescript  et lis chaque message d'erreur :
// il dit quel fichier, quelle ligne, et ce que TypeScript attendait.
// Corrige le code (pas les types !) jusqu'à ce que tsc ne dise plus rien.
import { products } from './products.ts';
import type { Product } from './types.ts';
import { findByCode, formatName } from './functions.ts';

// Erreur 1 : une faute de frappe dans un nom de propriété.
export const firstBrand = products[0].brnad;

// Erreur 2 : le produit peut ne pas exister.
const nutella = findByCode(products, '3017620422003');
export const nutellaLabel = formatName(nutella);

// Erreur 3 : un code-barres est une chaîne, pas un nombre.
export const prince = findByCode(products, 7622210449283);

// Erreur 4 : les sucres peuvent valoir null.
export const totalSugars = products.reduce((sum, product) => sum + product.sugars, 0);

// Erreur 5 : 'f' n'est pas un Nutri-Score.
export const unknownGrade: Product['nutriScore'] = 'f';
