import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
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
import { colors, fontSizes, radius, spacing } from '@/theme/theme';

// Écran présenté en modale (voir le layout racine) : l'avis sur un produit.
export default function ReviewScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const product = catalog.find((item) => item.code === code);

  // useForm garde les valeurs et les erreurs ; zodResolver branche le schéma de validation.
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { author: '', rating: 0, comment: '', wouldBuyAgain: false },
    mode: 'onBlur', // on valide un champ quand on le quitte, pas à chaque frappe
  });

  // handleSubmit n'appelle cette fonction que si TOUT le formulaire est valide.
  function onSubmit(values: ReviewFormValues) {
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
