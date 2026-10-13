import { render, screen } from '@testing-library/react-native';

import { NutriScoreBadge } from '@/components/NutriScoreBadge';

// Testing Library affiche le composant en mémoire et cherche ce que l'utilisateur verrait.
// Depuis la version 14, render est asynchrone : on l'attend avec await.
describe('<NutriScoreBadge />', () => {
  it('affiche la note en majuscule', async () => {
    await render(<NutriScoreBadge grade="e" />);
    expect(screen.getByText('E')).toBeOnTheScreen();
  });

  it('affiche un point d’interrogation sans note', async () => {
    await render(<NutriScoreBadge grade={null} />);
    expect(screen.getByText('?')).toBeOnTheScreen();
  });
});
