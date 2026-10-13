import { useEffect, useState } from 'react';

import { catalog } from '@/data/catalog';
import { getProduct, ProductNotFoundError } from '@/services/openFoodFacts';
import { getJSON, setJSON } from '@/services/storage';
import type { Product } from '@/types/product';

// D'où viennent les données affichées : utile pour prévenir l'utilisateur.
export type ProductSource = 'catalog' | 'cache' | 'api';

type CachedProduct = {
  savedAt: number;
  product: Product;
};

// Un produit en cache reste valable 24 heures.
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000;

// Hook personnalisé : toute la logique de chargement d'un produit, réutilisable dans n'importe quel écran.
// Stratégie : catalogue local tout de suite, puis cache, puis API.
export function useProduct(code: string) {
  const localProduct = catalog.find((item) => item.code === code) ?? null;

  const [product, setProduct] = useState<Product | null>(localProduct);
  const [source, setSource] = useState<ProductSource | null>(localProduct ? 'catalog' : null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const cacheKey = `product:${code}`;

    async function load() {
      setIsLoading(true);
      setError(null);

      // 1. Le cache, s'il est encore frais : pas de requête réseau.
      const cached = await getJSON<CachedProduct>(cacheKey);
      if (cached && Date.now() - cached.savedAt < CACHE_DURATION_MS) {
        if (!ignore) {
          setProduct(cached.product);
          setSource('cache');
          setIsLoading(false);
        }
        return;
      }

      // 2. L'API, puis on met le résultat en cache pour la prochaine fois.
      try {
        const fresh = await getProduct(code);
        // On garde la catégorie du catalogue local quand on l'a (l'API la renvoie en anglais).
        const merged = localProduct ? { ...fresh, category: localProduct.category } : fresh;
        await setJSON(cacheKey, { savedAt: Date.now(), product: merged });
        if (!ignore) {
          setProduct(merged);
          setSource('api');
        }
      } catch (e) {
        if (!ignore) {
          if (e instanceof ProductNotFoundError) {
            setError(e.message);
          } else if (!localProduct) {
            // Réseau en panne et rien en local : on ne peut rien montrer.
            setError('Impossible de joindre Open Food Facts. Vérifie ta connexion.');
          }
          // Sinon : on garde silencieusement le produit du catalogue.
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();
    return () => {
      ignore = true;
    };
    // localProduct se déduit de code : code suffit comme dépendance.
  }, [code]);

  return { product, source, isLoading, error };
}
