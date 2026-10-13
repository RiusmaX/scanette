import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage ne stocke que des chaînes : ces deux fonctions font la conversion JSON
// et absorbent les erreurs (un stockage plein ou corrompu ne doit pas faire planter l'app).

export async function getJSON<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch (error) {
    console.warn(`Lecture impossible de ${key}`, error);
    return null;
  }
}

export async function setJSON(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Écriture impossible de ${key}`, error);
  }
}
