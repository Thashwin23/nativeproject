import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

// 1. Form validation
const passwordSchema = Yup.object({
  length: Yup.number()
    .transform((value, originalValue) =>
      originalValue.trim() === '' ? undefined : value,
    )
    .typeError('Please enter a valid number.')
    .required('Password length is required.')
    .integer('Length must be a whole number.')
    .min(8, 'Minimum length is 8 characters.')
    .max(32, 'Maximum length is 32 characters.'),

  uppercase: Yup.boolean(),
  lowercase: Yup.boolean(),
  numbers: Yup.boolean(),
  symbols: Yup.boolean(),
}).test(
  'character-types',
  'Select at least one character type.',
  function (values) {
    const hasSelection = [
      values?.uppercase,
      values?.lowercase,
      values?.numbers,
      values?.symbols,
    ].some(Boolean);

    return hasSelection
      ? true
      : this.createError({
          path: 'characterTypes',
          message: 'Select at least one character type.',
        });
  },
);

// 2. Character groups
const characterOptions = [
  {
    key: 'uppercase',
    title: 'Uppercase letters',
    description: 'A B C ... Z',
  },
  {
    key: 'lowercase',
    title: 'Lowercase letters',
    description: 'a b c ... z',
  },
  {
    key: 'numbers',
    title: 'Numbers',
    description: '0 1 2 ... 9',
  },
  {
    key: 'symbols',
    title: 'Special characters',
    description: '! @ # $ % & *',
  },
];

// 3. Secure random index
function secureRandomIndex(max) {
  const range = 0x100000000;
  const limit = Math.floor(range / max) * max;

  while (true) {
    const bytes = new Uint32Array(1);
    globalThis.crypto.getRandomValues(bytes);

    if (bytes[0] < limit) {
      return bytes[0] % max;
    }
  }
}

// 4. Password generation
function generatePassword(length, values) {
  const groups = [];

  if (values.uppercase) groups.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  if (values.lowercase) groups.push('abcdefghijklmnopqrstuvwxyz');
  if (values.numbers) groups.push('0123456789');
  if (values.symbols) groups.push('!@#$%^&*()_+-=[]{}?');

  if (!groups.length) {
    throw new Error('Select at least one character type.');
  }

  const allCharacters = groups.join('');
  const passwordCharacters = [];

  // Include at least one character from each selected group.
  groups.forEach(group => {
    passwordCharacters.push(group[secureRandomIndex(group.length)]);
  });

  // Fill the remaining positions.
  while (passwordCharacters.length < length) {
    passwordCharacters.push(
      allCharacters[secureRandomIndex(allCharacters.length)],
    );
  }

  // Shuffle the characters.
  for (let i = passwordCharacters.length - 1; i > 0; i--) {
    const j = secureRandomIndex(i + 1);

    [passwordCharacters[i], passwordCharacters[j]] = [
      passwordCharacters[j],
      passwordCharacters[i],
    ];
  }

  return passwordCharacters.join('');
}

export default function PasswordGenerator() {
  return (
    <Formik
      initialValues={{
        length: '16',
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false,
      }}
      validationSchema={passwordSchema}
      onSubmit={(values, { setFieldError, setStatus }) => {
        try {
          const generated = generatePassword(Number(values.length), values);

          setStatus({ password: generated });
        } catch (error) {
          setFieldError('characterTypes', error.message);
        }
      }}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        setStatus,
        status,
      }) => (
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Text style={styles.icon}>🔐</Text>
            </View>

            <Text style={styles.title}>Password Generator</Text>

            <Text style={styles.subtitle}>
              Customize your password and generate it instantly.
            </Text>
          </View>

          {/* Question 1: Manual length input */}
          <View style={styles.card}>
            <Text style={styles.question}>1. Enter password length</Text>

            <TextInput
              style={[
                styles.input,
                errors.length && touched.length ? styles.inputError : null,
              ]}
              value={values.length}
              onChangeText={value => {
                handleChange('length')(value);
                setStatus(undefined);
              }}
              onBlur={handleBlur('length')}
              keyboardType="number-pad"
              placeholder="Enter length (8–32)"
              placeholderTextColor="#94A3B8"
              maxLength={3}
              accessibilityLabel="Password length"
            />

            {errors.length && touched.length ? (
              <Text style={styles.errorText}>{errors.length}</Text>
            ) : (
              <Text style={styles.helperText}>
                Enter a whole number from 8 to 32.
              </Text>
            )}
          </View>

          {/* Question 2: Multiple-choice options */}
          <View style={styles.card}>
            <Text style={styles.question}>2. Choose character types</Text>

            <Text style={styles.helperText}>Select one or more options.</Text>

            {characterOptions.map(({ key, title, description }) => (
              <View key={key} style={styles.optionRow}>
                <View style={styles.optionText}>
                  <Text style={styles.optionTitle}>{title}</Text>

                  <Text style={styles.optionDescription}>{description}</Text>
                </View>

                <BouncyCheckbox
                  size={27}
                  isChecked={values[key]}
                  useBuiltInState={false}
                  fillColor="#198754"
                  unFillColor="#FFFFFF"
                  iconStyle={styles.checkboxIcon}
                  innerIconStyle={styles.checkboxInner}
                  onPress={isChecked => {
                    setFieldValue(key, isChecked);
                    setFieldTouched('characterTypes', true, false);
                    setStatus(undefined);
                  }}
                  accessibilityLabel={title}
                />
              </View>
            ))}

            {errors.characterTypes ? (
              <Text style={styles.errorText}>{errors.characterTypes}</Text>
            ) : null}
          </View>

          {/* Generate button */}
          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.generateButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.generateText}>Generate Password →</Text>
          </Pressable>

          {/* Generated password shown in the UI */}
          {status?.password ? (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Your Generated Password</Text>

              <Text selectable style={styles.password}>
                {status.password}
              </Text>

              <Text style={styles.helperText}>
                Press and hold the password to select and copy it.
              </Text>

              <Pressable onPress={handleSubmit} style={styles.regenerateButton}>
                <Text style={styles.regenerateText}>↻ Generate Another</Text>
              </Pressable>
            </View>
          ) : null}
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F6F4',
  },
  container: {
    padding: 20,
    paddingTop: 32,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 26,
  },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#DDF5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  icon: {
    fontSize: 29,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#173B2D',
    textAlign: 'center',
  },
  subtitle: {
    color: '#718078',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E1E9E3',
    elevation: 1,
  },
  question: {
    fontSize: 16,
    fontWeight: '700',
    color: '#20372A',
    marginBottom: 14,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CBD5CE',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#173B2D',
  },
  inputError: {
    borderColor: '#DC2626',
  },
  helperText: {
    color: '#7A887F',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E9E4',
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  optionText: {
    flex: 1,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#263B2E',
  },
  optionDescription: {
    color: '#829087',
    fontSize: 12,
    marginTop: 5,
  },
  checkboxIcon: {
    borderRadius: 7,
  },
  checkboxInner: {
    borderRadius: 7,
  },
  generateButton: {
    backgroundColor: '#198754',
    borderRadius: 12,
    paddingVertical: 17,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  generateText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C8E7D1',
    padding: 18,
    marginTop: 20,
    elevation: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#173B2D',
    marginBottom: 12,
  },
  password: {
    fontSize: 18,
    fontWeight: '700',
    color: '#198754',
    lineHeight: 28,
  },
  regenerateButton: {
    alignSelf: 'flex-start',
    marginTop: 14,
    paddingVertical: 8,
  },
  regenerateText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#198754',
  },
});
