import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react';

import { getJSON, setJSON } from '@/services/storage';
import type { Product } from '@/types/product';

// Les favoris sont un état GLOBAL : la carte du catalogue, la fiche produit et l'onglet Favoris
// lisent et modifient la même liste. Context + useReducer, sans bibliothèque externe.

// 1. Les types d'actions en constantes : une faute de frappe devient une erreur de compilation.
export const actionTypes = {
  HYDRATE: 'HYDRATE',
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  CLEAR: 'CLEAR',
} as const;

// 2. La forme de l'état.
export type FavoritesState = {
  items: Product[];
  isHydrated: boolean; // passe à true une fois les favoris relus depuis le stockage
};

export const initialState: FavoritesState = {
  items: [],
  isHydrated: false,
};

// 3. Les actions possibles : une union « discriminée » par le champ type.
export type FavoritesAction =
  | { type: typeof actionTypes.HYDRATE; data: { items: Product[] } }
  | { type: typeof actionTypes.ADD; data: { product: Product } }
  | { type: typeof actionTypes.REMOVE; data: { code: string } }
  | { type: typeof actionTypes.CLEAR };

// 4. Le reducer : une fonction PURE (état, action) => nouvel état. Jamais de modification sur place.
export function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case actionTypes.HYDRATE:
      return { items: action.data.items, isHydrated: true };
    case actionTypes.ADD:
      // Déjà présent : on renvoie l'état tel quel (même référence = pas de nouveau rendu).
      if (state.items.some((item) => item.code === action.data.product.code)) {
        return state;
      }
      return { ...state, items: [action.data.product, ...state.items] };
    case actionTypes.REMOVE:
      return { ...state, items: state.items.filter((item) => item.code !== action.data.code) };
    case actionTypes.CLEAR:
      return { ...state, items: [] };
    default: {
      // Si on ajoute une action sans la traiter, TypeScript refuse de compiler ici.
      const unhandled: never = action;
      throw new Error(`Action non gérée : ${JSON.stringify(unhandled)}`);
    }
  }
}

// 5. La fabrique d'actions : des fonctions au nom métier, qui cachent dispatch aux composants.
const contextFactory = (dispatch: Dispatch<FavoritesAction>) => ({
  addFavorite: (product: Product) => dispatch({ type: actionTypes.ADD, data: { product } }),
  removeFavorite: (code: string) => dispatch({ type: actionTypes.REMOVE, data: { code } }),
  clearFavorites: () => dispatch({ type: actionTypes.CLEAR }),
});

type FavoritesContextValue = ReturnType<typeof contextFactory> & {
  state: FavoritesState;
  isFavorite: (code: string) => boolean;
  toggleFavorite: (product: Product) => void;
};

// null par défaut : on détecte l'oubli du Provider dans useFavorites.
const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const STORAGE_KEY = '@favorites';

// 6. Le Provider : il possède l'état et le rend accessible à tous ses descendants.
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Au montage : on relit les favoris enregistrés (réhydratation).
  useEffect(() => {
    let ignore = false;
    getJSON<Product[]>(STORAGE_KEY).then((items) => {
      if (!ignore) {
        dispatch({ type: actionTypes.HYDRATE, data: { items: items ?? [] } });
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  // À chaque changement : on enregistre. Pas avant la réhydratation,
  // sinon la liste vide du départ écraserait les favoris enregistrés.
  useEffect(() => {
    if (state.isHydrated) {
      setJSON(STORAGE_KEY, state.items);
    }
  }, [state]);

  const actions = contextFactory(dispatch);
  const isFavorite = (code: string) => state.items.some((item) => item.code === code);
  const toggleFavorite = (product: Product) =>
    isFavorite(product.code) ? actions.removeFavorite(product.code) : actions.addFavorite(product);

  return (
    <FavoritesContext.Provider value={{ state, ...actions, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 7. Le hook d'accès, avec garde : une erreur claire si on l'utilise hors du Provider.
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites doit être utilisé dans un FavoritesProvider');
  }
  return context;
}
