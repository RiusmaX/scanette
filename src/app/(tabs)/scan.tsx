import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import { router, useFocusEffect, useIsFocused } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fontSizes, radius, spacing } from '@/theme/theme';

// Les formats de codes-barres des produits de grande consommation.
const PRODUCT_BARCODES = ['ean13', 'ean8', 'upc_a', 'upc_e'] as const;

export default function ScanScreen() {
  // Le hook renvoie l'état de la permission et une fonction pour la demander.
  const [permission, requestPermission] = useCameraPermissions();
  // La caméra ne tourne que si l'onglet est affiché : on économise la batterie.
  const isFocused = useIsFocused();
  // Un ref plutôt qu'un état : on veut bloquer les scans en rafale sans provoquer de rendu.
  const isLocked = useRef(false);
  const [manualCode, setManualCode] = useState('');

  // Quand on revient sur l'onglet, on réautorise un scan.
  useFocusEffect(
    useCallback(() => {
      isLocked.current = false;
    }, []),
  );

  function openProduct(code: string) {
    router.push({ pathname: '/product/[code]', params: { code } });
  }

  function handleBarcodeScanned({ data }: BarcodeScanningResult) {
    // La caméra envoie le même code plusieurs fois par seconde : on ne traite que le premier.
    if (isLocked.current) {
      return;
    }
    isLocked.current = true;
    openProduct(data);
  }

  // Saisie manuelle : pour l'émulateur, le web, ou un code-barres abîmé.
  const manualInput = (
    <View style={styles.manual}>
      <TextInput
        value={manualCode}
        onChangeText={setManualCode}
        placeholder="Ou tape le code-barres"
        keyboardType="number-pad"
        maxLength={13}
        style={styles.input}
      />
      <Pressable
        onPress={() => openProduct(manualCode)}
        disabled={manualCode.length < 8}
        style={[styles.button, manualCode.length < 8 && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Voir</Text>
      </Pressable>
    </View>
  );

  // 1. Permission pas encore connue : on attend la réponse du système.
  if (!permission) {
    return <View style={styles.centered} />;
  }

  // 2. Permission refusée : on explique pourquoi on en a besoin, et on propose de la demander.
  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Scanette a besoin de l'appareil photo pour lire les codes-barres.</Text>
        {permission.canAskAgain ? (
          <Pressable onPress={requestPermission} style={styles.button}>
            <Text style={styles.buttonText}>Autoriser l'appareil photo</Text>
          </Pressable>
        ) : (
          // Refus définitif : seul l'utilisateur peut changer d'avis, dans les réglages du téléphone.
          <Pressable onPress={() => Linking.openSettings()} style={styles.button}>
            <Text style={styles.buttonText}>Ouvrir les réglages</Text>
          </Pressable>
        )}
        {manualInput}
      </View>
    );
  }

  // 3. Permission accordée : la caméra occupe l'écran, la saisie manuelle reste en bas.
  return (
    <View style={styles.screen}>
      {isFocused ? (
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: [...PRODUCT_BARCODES] }}
          onBarcodeScanned={handleBarcodeScanned}
        />
      ) : null}
      <View style={styles.overlay} pointerEvents="none">
        <View style={styles.frame} />
        <Text style={styles.hint}>Vise le code-barres du produit</Text>
      </View>
      <View style={styles.bottom}>{manualInput}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    // absoluteFill : la caméra remplit tout son parent.
    ...StyleSheet.absoluteFill,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  frame: {
    width: 260,
    height: 140,
    borderWidth: 3,
    borderColor: colors.surface,
    borderRadius: radius.md,
  },
  hint: {
    color: colors.surface,
    fontSize: fontSizes.body,
  },
  bottom: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
  },
  text: {
    textAlign: 'center',
    color: colors.text,
    fontSize: fontSizes.body,
  },
  manual: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignSelf: 'stretch',
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSizes.body,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: colors.surface,
    fontWeight: 'bold',
  },
});
