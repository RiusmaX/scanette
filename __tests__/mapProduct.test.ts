import { mapProduct } from '@/services/openFoodFacts';

describe('mapProduct', () => {
  it("transforme une réponse brute de l'API en Product", () => {
    const product = mapProduct(
      {
        product_name: 'Nutella',
        brands: 'Nutella, Ferrero',
        quantity: '400 g e',
        nutriscore_grade: 'e',
        nova_group: 4,
        allergens_tags: ['en:milk', 'en:nuts'],
        nutriments: { sugars_100g: 56.3, 'energy-kcal_100g': 539 },
      },
      '3017620422003',
    );

    expect(product.name).toBe('Nutella');
    expect(product.brand).toBe('Nutella');
    expect(product.quantity).toBe('400 g');
    expect(product.nutriScore).toBe('e');
    expect(product.allergens).toEqual(['lait', 'fruits à coque']);
    expect(product.nutriments.sugars).toBe(56.3);
    expect(product.nutriments.salt).toBeNull();
  });

  it('remplace un Nutri-Score inconnu par null', () => {
    expect(mapProduct({ nutriscore_grade: 'not-applicable' }, '123').nutriScore).toBeNull();
  });
});
