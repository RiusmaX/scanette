# Scanette

Application fil rouge de la formation React Native : on scanne un produit alimentaire, on consulte sa fiche Open Food Facts, on le garde en favori et on donne son avis.

Stack : Expo SDK 57, React Native 0.86, Expo Router, TypeScript.

## Démarrer

```bash
git clone https://github.com/RiusmaX/scanette.git
cd scanette
npm install
npx expo start
```

Scanne le QR code affiché avec l'application **Expo Go** (Android) ou l'appareil photo (iOS). Le téléphone et l'ordinateur doivent être sur le même réseau ; sinon, `npx expo start --tunnel`.

## Les exercices du jour 1

Ils ne touchent pas à l'application, ils se lancent avec Node :

| TP | Dossier | Commande |
|---|---|---|
| 1 · Bases de JavaScript | `exercises/tp01-js-basics` | `npm run ex:tp1` |
| 2 · JavaScript moderne et asynchrone | `exercises/tp02-modern-js` | `npm run ex:tp2` |
| 3 · TypeScript | `exercises/tp03-typescript` | `npm run ex:tp3` |

## Les étapes de l'application

Chaque TP part d'un tag et sa correction est le tag suivant. En retard ou bloqué ? Repars de la correction :

```bash
git stash            # met ton travail de côté
git switch -c tp06 tp06-start
```

| Tag de départ | TP | Ce qu'on construit |
|---|---|---|
| `tp04-start` | 4 · Composants et props | `NutriScoreBadge`, `ProductCard`, favori local |
| `tp05-start` | 5 · Cycle de vie | Chargement du catalogue avec `useEffect` |
| `tp06-start` | 6 · Styles et Flexbox | Thème partagé, carte produit en ligne |
| `tp07-start` | 7 · Listes et saisie | `FlatList`, recherche, sections |
| `tp08-start` | 8 · Navigation | Onglets et fiche produit avec Expo Router |
| `tp09-start` | 9 · Animations | Bouton favori animé |
| `tp10-start` | 10 · Formulaires | Avis validé avec React Hook Form et Zod |
| `tp11-start` | 11 · Données | Client Open Food Facts, cache local |
| `tp12-start` | 12 · État global | Favoris partagés avec Context et `useReducer` |
| `tp13-start` | 13 · API natives | Scanner de codes-barres |
| `final` | | L'application complète |

## Commandes utiles

```bash
npm run typecheck   # vérifie les types
npm test            # lance les tests Jest
```

## Données

Les produits viennent d'[Open Food Facts](https://world.openfoodfacts.org), base libre sous licence ODbL. L'API limite la lecture à 15 requêtes par minute et par adresse IP : le catalogue local (`src/data/catalog.json`) permet de travailler sans réseau.
