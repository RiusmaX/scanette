// Catalogue local : 42 produits réels récupérés sur Open Food Facts le 13/10/2026.
// Il permet de travailler sans réseau et sans dépasser les limites de l'API
// (15 lectures par minute et par adresse IP).
import type { Product } from '@/types/product';

import rawCatalog from './catalog.json';

// Le JSON est typé « en gros » par TypeScript (des string partout).
// On affirme ici qu'il respecte le type Product : c'est à nous de le garantir.
export const catalog = rawCatalog as Product[];
