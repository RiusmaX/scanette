import type { NovaGroup, NutriScore, Product } from '@/types/product';

// Client de l'API Open Food Facts (lecture seule, sans authentification).
// Documentation : https://openfoodfacts.github.io/openfoodfacts-server/api/
const BASE_URL = 'https://world.openfoodfacts.org/api/v2';

// Open Food Facts demande d'identifier son application dans l'en-tête User-Agent.
const USER_AGENT = 'Scanette/1.0 (formation React Native; github.com/RiusmaX/scanette)';

// On ne demande que les champs utiles : la réponse passe de 100 Ko à 3 Ko.
const FIELDS = [
  'code',
  'product_name',
  'product_name_fr',
  'brands',
  'quantity',
  'categories',
  'nutriscore_grade',
  'nova_group',
  'image_front_small_url',
  'ingredients_text_fr',
  'allergens_tags',
  'nutriments',
].join(',');

// Forme (partielle) des données renvoyées par l'API : tout peut manquer.
type OffNutriments = Partial<Record<string, number>>;

type OffProduct = {
  code?: string;
  product_name?: string;
  product_name_fr?: string;
  brands?: string;
  quantity?: string;
  categories?: string;
  nutriscore_grade?: string;
  nova_group?: number;
  image_front_small_url?: string;
  ingredients_text_fr?: string;
  allergens_tags?: string[];
  nutriments?: OffNutriments;
};

type OffProductResponse = {
  status: 0 | 1;
  status_verbose: string;
  product?: OffProduct;
};

// Une erreur à part pour distinguer « produit inconnu » de « réseau en panne ».
export class ProductNotFoundError extends Error {
  constructor(code: string) {
    super(`Aucun produit avec le code ${code} sur Open Food Facts`);
    this.name = 'ProductNotFoundError';
  }
}

const ALLERGEN_LABELS: Record<string, string> = {
  'en:milk': 'lait',
  'en:gluten': 'gluten',
  'en:nuts': 'fruits à coque',
  'en:peanuts': 'arachides',
  'en:eggs': 'œufs',
  'en:soybeans': 'soja',
  'en:sesame-seeds': 'sésame',
  'en:fish': 'poisson',
  'en:crustaceans': 'crustacés',
  'en:celery': 'céleri',
  'en:mustard': 'moutarde',
  'en:sulphur-dioxide-and-sulphites': 'sulfites',
};

const NUTRI_SCORES: string[] = ['a', 'b', 'c', 'd', 'e'];

// Type guard : si la fonction renvoie true, TypeScript sait que value est un NutriScore.
function isNutriScore(value: string | undefined): value is NutriScore {
  return value !== undefined && NUTRI_SCORES.includes(value);
}

function isNovaGroup(value: number | undefined): value is NovaGroup {
  return value === 1 || value === 2 || value === 3 || value === 4;
}

function readNumber(nutriments: OffNutriments | undefined, key: string): number | null {
  const value = nutriments?.[key];
  return typeof value === 'number' ? Math.round(value * 100) / 100 : null;
}

// Transforme un produit « brut » de l'API en Product propre pour l'application.
export function mapProduct(raw: OffProduct, code: string): Product {
  return {
    code,
    name: raw.product_name_fr || raw.product_name || 'Produit sans nom',
    brand: raw.brands?.split(',')[0]?.trim() || 'Marque inconnue',
    quantity: raw.quantity?.replace(/\s*(℮|e)$/, '') || null,
    category: raw.categories?.split(',')[0]?.trim() || 'Autres',
    nutriScore: isNutriScore(raw.nutriscore_grade) ? raw.nutriscore_grade : null,
    novaGroup: isNovaGroup(raw.nova_group) ? raw.nova_group : null,
    imageUrl: raw.image_front_small_url ?? null,
    ingredients: raw.ingredients_text_fr || null,
    allergens: (raw.allergens_tags ?? []).map((tag) => ALLERGEN_LABELS[tag] ?? tag.replace(/^\w+:/, '')),
    nutriments: {
      energyKcal: readNumber(raw.nutriments, 'energy-kcal_100g'),
      fat: readNumber(raw.nutriments, 'fat_100g'),
      saturatedFat: readNumber(raw.nutriments, 'saturated-fat_100g'),
      sugars: readNumber(raw.nutriments, 'sugars_100g'),
      salt: readNumber(raw.nutriments, 'salt_100g'),
      proteins: readNumber(raw.nutriments, 'proteins_100g'),
    },
  };
}

// À écrire ensemble en TD : récupère un produit par son code-barres.
// - appel GET sur `${BASE_URL}/product/${code}?fields=${FIELDS}` avec l'en-tête User-Agent ;
// - réponse non OK (hors 404) : on lève une Error avec le statut HTTP ;
// - status différent de 1 ou product absent : on lève une ProductNotFoundError ;
// - sinon : on renvoie mapProduct(json.product, code).
export async function getProduct(code: string): Promise<Product> {
  throw new Error(
    `getProduct(${code}) n'est pas encore écrit (FIELDS : ${FIELDS}, ${BASE_URL}, ${USER_AGENT})`,
  );
}
