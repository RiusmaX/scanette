import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Product } from '@/types/product';

// Bonus du TP 12 : les mêmes favoris avec Zustand, à comparer avec FavoritesContext.tsx.
// Pas de Provider, pas de reducer : un « store » avec son état et ses actions,
// et le middleware persist qui enregistre et réhydrate tout seul.
type FavoritesStore = {
  items: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (code: string) => void;
  clearFavorites: () => void;
  isFavorite: (code: string) => boolean;
  toggleFavorite: (product: Product) => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      addFavorite: (product) =>
        set((state) =>
          state.items.some((item) => item.code === product.code)
            ? state
            : { items: [product, ...state.items] },
        ),
      removeFavorite: (code) => set((state) => ({ items: state.items.filter((item) => item.code !== code) })),
      clearFavorites: () => set({ items: [] }),
      isFavorite: (code) => get().items.some((item) => item.code === code),
      toggleFavorite: (product) =>
        get().isFavorite(product.code) ? get().removeFavorite(product.code) : get().addFavorite(product),
    }),
    {
      name: '@favorites-zustand',
      storage: createJSONStorage(() => AsyncStorage),
      // On n'enregistre que les données, pas les fonctions.
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

// Utilisation dans un composant : on sélectionne seulement ce dont on a besoin,
// le composant ne se redessine que si cette partie change.
//   const isFavorite = useFavoritesStore((state) => state.isFavorite(product.code));
//   const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
