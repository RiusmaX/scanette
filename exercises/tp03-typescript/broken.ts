// TP 3 · Étape 5 · CORRIGÉ
import { products } from './products.ts';
import type { Product } from './types.ts';
import { findByCode, formatName } from './functions.ts';

// Erreur 1 : la propriété s'appelle brand.
export const firstBrand = products[0].brand;

// Erreur 2 : on traite le cas undefined avant d'appeler formatName.
const nutella = findByCode(products, '3017620422003');
export const nutellaLabel = nutella ? formatName(nutella) : 'Produit introuvable';

// Erreur 3 : le code-barres passe entre guillemets.
export const prince = findByCode(products, '7622210449283');

// Erreur 4 : `?? 0` remplace null par 0 avant l'addition.
export const totalSugars = products.reduce((sum, product) => sum + (product.sugars ?? 0), 0);

// Erreur 5 : on choisit une valeur permise par le type.
export const unknownGrade: Product['nutriScore'] = 'e';
