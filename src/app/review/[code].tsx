import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import { FormField } from '@/components/FormField';
import { StarRating } from '@/components/StarRating';
import { catalog } from '@/data/catalog';
import { reviewSchema, type ReviewFormValues } from '@/schemas/review';
import { getCurrentCity } from '@/services/location';
import { saveReview } from '@/services/reviews';
import { colors, fontSizes, radius, spacing } from '@/theme/theme';

// Écran présenté en modale (voir le layout racine) : l'avis sur un produit.
export default function ReviewScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const product = catalog.find((item) => item.code === code);

  // useForm garde les valeurs et les erreurs ; zodResolver branche le schéma de validation.
  const [isLocating, setIsLocating] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { author: '', rating: 0, comment: '', wouldBuyAgain: false },
    mode: 'onBlur', // on valide un champ quand on le quitte, pas à chaque frappe
  });

  // watch lit la valeur courante d'un champ (et redessine quand elle change).
  const city = watch('city');
  const photoUri = watch('photoUri');

  // Bonus du TP 13 : la ville vient du GPS.
  async function fillCity() {
    setIsLocating(true);
    try {
      const found = await getCurrentCity();
      if (found) {
        setValue('city', found);
      } else {
        Alert.alert('Position indisponible', 'Autorise la localisation pour ajouter la ville.');
      }
    } finally {
      setIsLocating(false);
    }
  }

  // Bonus du TP 13 : une photo choisie dans la galerie.
  async function pickPhoto() {
    // La documentation d'Expo l'indique : ouvrir la galerie ne demande aucune permission,
    // le sélecteur du système ne donne accès qu'à la photo choisie.
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      setValue('photoUri', result.assets[0].uri);
    }
  }

  // handleSubmit n'appelle cette fonction que si TOUT le formulaire est valide.
  // Fonction asynchrone : isSubmitting reste vrai pendant l'enregistrement (bouton désactivé).
  async function onSubmit(values: ReviewFormValues) {
    await saveReview(code, values);
    Alert.alert('Merci !', `Avis de ${values.author} enregistré : ${values.rating}/5.`);
    router.back();
  }

  return (
    // Sur iOS, le clavier recouvre le bas de l'écran : on décale le contenu.
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{product ? product.name : 'Produit'}</Text>

        {/* Controller relie un composant React Native à React Hook Form. */}
        <Controller
          control={control}
          name="author"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormField label="Ton prénom" error={errors.author?.message}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Camille"
                autoCapitalize="words"
                style={[styles.input, errors.author && styles.inputError]}
              />
            </FormField>
          )}
        />

        <Controller
          control={control}
          name="rating"
          render={({ field: { value, onChange } }) => (
            <FormField label="Ta note" error={errors.rating?.message}>
              <StarRating value={value} onChange={onChange} />
            </FormField>
          )}
        />

        <Controller
          control={control}
          name="comment"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormField label="Ton avis" error={errors.comment?.message}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Goût, texture, rapport qualité-prix…"
                multiline
                numberOfLines={4}
                style={[styles.input, styles.multiline, errors.comment && styles.inputError]}
              />
              <Text style={styles.counter}>{value.length} / 500</Text>
            </FormField>
          )}
        />

        <Controller
          control={control}
          name="wouldBuyAgain"
          render={({ field: { value, onChange } }) => (
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Je le rachèterais</Text>
              <Switch value={value} onValueChange={onChange} />
            </View>
          )}
        />

        <View style={styles.extras}>
          <Pressable onPress={fillCity} style={styles.secondaryButton} disabled={isLocating}>
            {isLocating ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <Text style={styles.secondaryText}>{city ? `📍 ${city}` : 'Ajouter la ville'}</Text>
            )}
          </Pressable>
          <Pressable onPress={pickPhoto} style={styles.secondaryButton}>
            <Text style={styles.secondaryText}>{photoUri ? 'Changer la photo' : 'Ajouter une photo'}</Text>
          </Pressable>
        </View>
        {photoUri ? <Image source={{ uri: photoUri }} style={styles.photo} /> : null}

        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Publier mon avis</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  title: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    color: colors.text,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSizes.body,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.danger,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top', // Android place le texte au milieu par défaut
  },
  counter: {
    alignSelf: 'flex-end',
    color: colors.textMuted,
    fontSize: fontSizes.small,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: fontSizes.body,
    color: colors.text,
  },
  extras: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  secondaryText: {
    color: colors.primary,
    fontWeight: '600',
  },
  photo: {
    width: '100%',
    height: 180,
    borderRadius: radius.md,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: colors.surface,
    fontWeight: 'bold',
    fontSize: fontSizes.body,
  },
});
