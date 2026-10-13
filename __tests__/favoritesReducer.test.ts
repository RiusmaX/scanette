import { actionTypes, favoritesReducer, initialState } from '@/contexts/FavoritesContext';
import { catalog } from '@/data/catalog';

// Un reducer est une fonction pure : facile à tester, sans écran ni téléphone.
const [prince, nutella] = catalog;

describe('favoritesReducer', () => {
  it('ajoute un produit en tête de liste', () => {
    const state = favoritesReducer(initialState, { type: actionTypes.ADD, data: { product: prince } });
    expect(state.items).toEqual([prince]);
  });

  it("n'ajoute pas deux fois le même produit", () => {
    const once = favoritesReducer(initialState, { type: actionTypes.ADD, data: { product: prince } });
    const twice = favoritesReducer(once, { type: actionTypes.ADD, data: { product: prince } });
    // Même référence : React ne redessinera rien.
    expect(twice).toBe(once);
  });

  it('retire un produit par son code', () => {
    const state = { items: [prince, nutella], isHydrated: true };
    const next = favoritesReducer(state, { type: actionTypes.REMOVE, data: { code: prince.code } });
    expect(next.items).toEqual([nutella]);
    // L'état d'origine n'a pas bougé.
    expect(state.items).toHaveLength(2);
  });

  it('marque la réhydratation', () => {
    const state = favoritesReducer(initialState, { type: actionTypes.HYDRATE, data: { items: [nutella] } });
    expect(state).toEqual({ items: [nutella], isHydrated: true });
  });
});
