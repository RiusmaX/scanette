// Dans Jest, il n'y a pas de téléphone : on remplace AsyncStorage par sa version en mémoire.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
