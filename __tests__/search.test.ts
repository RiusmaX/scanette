import { catalog } from '@/data/catalog';
import { filterProducts, groupByCategory, normalize } from '@/utils/search';

describe('normalize', () => {
  it('retire les accents et les majuscules', () => {
    expect(normalize('Nestlé Côte')).toBe('nestle cote');
  });
});

describe('filterProducts', () => {
  it('renvoie tout le catalogue quand la recherche est vide', () => {
    expect(filterProducts(catalog, '   ')).toHaveLength(catalog.length);
  });

  it('cherche dans la marque, sans tenir compte des accents', () => {
    const results = filterProducts(catalog, 'nestle');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((product) => product.brand === 'Nestlé')).toBe(true);
  });
});

describe('groupByCategory', () => {
  it('crée une section par catégorie', () => {
    const sections = groupByCategory(catalog);
    expect(sections.map((section) => section.title)).toContain('Céréales');
    const total = sections.reduce((sum, section) => sum + section.data.length, 0);
    expect(total).toBe(catalog.length);
  });
});
