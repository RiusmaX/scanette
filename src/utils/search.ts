import type { Product } from '@/types/product';

// Met une chaîne en minuscules et retire les accents : « Nestlé » devient « nestle ».
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

// Garde les produits dont le nom ou la marque contient la recherche.
export function filterProducts(products: Product[], query: string): Product[] {
  const search = normalize(query.trim());
  if (search === '') {
    return products;
  }
  return products.filter(
    (product) => normalize(product.name).includes(search) || normalize(product.brand).includes(search),
  );
}

// Regroupe les produits par catégorie pour une SectionList : [{ title, data }, ...].
export function groupByCategory(products: Product[]): { title: string; data: Product[] }[] {
  const groups = new Map<string, Product[]>();
  for (const product of products) {
    const group = groups.get(product.category) ?? [];
    group.push(product);
    groups.set(product.category, group);
  }
  return Array.from(groups, ([title, data]) => ({ title, data }));
}
