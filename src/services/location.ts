import * as Location from 'expo-location';

// Bonus du TP 13 : la ville où se trouve le téléphone, pour l'ajouter à un avis.
// Renvoie null si l'utilisateur refuse ou si la position est introuvable.
export async function getCurrentCity(): Promise<string | null> {
  // Toujours demander la permission juste avant d'en avoir besoin, pas au lancement de l'app.
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  // Une précision « équilibrée » suffit pour trouver une ville et économise la batterie.
  const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });

  // Géocodage inverse : coordonnées GPS vers adresse lisible.
  const [address] = await Location.reverseGeocodeAsync(position.coords);
  return address?.city ?? null;
}
