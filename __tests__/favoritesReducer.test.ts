import { actionTypes, favoritesReducer, initialState } from '@/contexts/FavoritesContext';
import { catalog } from '@/data/catalog';

// Un reducer est une fonction pure : facile à tester, sans écran ni téléphone.
const [cruesli, chocolateCrisp] = catalog;

describe('favoritesReducer', () => {
  it('ajoute un produit en tête de liste', () => {
    const state = favoritesReducer(initialState, { type: actionTypes.ADD, data: { product: cruesli } });
    expect(state.items).toEqual([cruesli]);
  });

  it("n'ajoute pas deux fois le même produit", () => {
    const once = favoritesReducer(initialState, { type: actionTypes.ADD, data: { product: cruesli } });
    const twice = favoritesReducer(once, { type: actionTypes.ADD, data: { product: cruesli } });
    // Même référence : React ne redessinera rien.
    expect(twice).toBe(once);
  });

  it('retire un produit par son code', () => {
    const state = { items: [cruesli, chocolateCrisp], isHydrated: true };
    const next = favoritesReducer(state, { type: actionTypes.REMOVE, data: { code: cruesli.code } });
    expect(next.items).toEqual([chocolateCrisp]);
    // L'état d'origine n'a pas bougé.
    expect(state.items).toHaveLength(2);
  });

  it('marque la réhydratation', () => {
    const state = favoritesReducer(initialState, { type: actionTypes.HYDRATE, data: { items: [chocolateCrisp] } });
    expect(state).toEqual({ items: [chocolateCrisp], isHydrated: true });
  });
});
