import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Pressable, ScrollView, Text } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '@/components/common/AppButton';
import AppInput from '@/components/common/AppInput';
import { Colors } from '@/constants/colors';
import { Spacing, Radius, PAGE_HORIZONTAL } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';

export default function CreateAccountPage() {
  const [email, setEmail]       = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [agreed, setAgreed]     = useState(false);

  const passwordMismatch = confirm.length > 0 && confirm !== password;
  const canSubmit = email && username && password && !passwordMismatch && agreed;

  const memberId = useMemo(
    () => 'No.' + String(Math.floor(1000000 + Math.random() * 9000000)).slice(0, 7),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={16} color={Colors.textSecondary} />
          <Text style={styles.backLabel}>back</Text>
        </Pressable>
        <Text style={styles.stepLabel}>STEP 1 / 2 ·*</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Member ID Card */}
        <View style={styles.idCard}>
          <Text style={styles.idCardTitle}>★ Member ID Card ★</Text>
          <View style={styles.idBadge}>
            <Text style={styles.idBadgeText}>{memberId}</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <AppInput
            label="·* email"
            placeholder="your@mail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.field}
            leftIcon={<Text style={styles.inputIcon}>✉</Text>}
          />

          <View>
            <AppInput
              label="·* account"
              placeholder="@old_orange"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              containerStyle={styles.field}
              leftIcon={<Text style={styles.inputIcon}>☆</Text>}
            />
            <Text style={styles.hint}>at least 3 letters</Text>
          </View>

          <AppInput
            label="·* password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            containerStyle={styles.field}
            leftIcon={<Text style={styles.inputIcon}>♪</Text>}
          />

          <AppInput
            label="·* confirm"
            placeholder="••••••••"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            error={passwordMismatch ? 'passwords do not match' : undefined}
            containerStyle={styles.field}
            leftIcon={<Text style={styles.inputIcon}>♪</Text>}
          />

          <View style={styles.divider} />

          <Pressable style={styles.termsRow} onPress={() => setAgreed(!agreed)}>
            <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
              {agreed && <Ionicons name="checkmark" size={10} color="#fff" />}
            </View>
            <Text style={styles.termsText}>
              I agree to the house rules ♡ & stars policy *
            </Text>
          </Pressable>
        </View>

        <AppButton
          variant="primary"
          size="lg"
          label="✦  next"
          fullWidth
          disabled={!canSubmit}
          onPress={() => router.push('/(auth)/onboarding')}
        />

        <View style={styles.signinRow}>
          <Text style={styles.signinText}>already have a space? </Text>
          <Pressable onPress={() => router.replace('/(auth)/login-methods')}>
            <Text style={styles.signinLink}>sign in →</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: Colors.background,
  },
  headerRow: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingTop:        Spacing.md,
    paddingBottom:     Spacing.sm,
  },
  back: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Spacing.xs,
  },
  backLabel: {
    fontFamily:    MONO_FONT,
    fontSize:      12,
    color:         Colors.textSecondary,
    letterSpacing: 0.5,
  },
  stepLabel: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.textSecondary,
    letterSpacing: 1.2,
  },

  scroll: {
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingTop:        Spacing.md,
    paddingBottom:     Spacing.xxxl,
    gap:               Spacing.md,
  },

  /* Member ID card */
  idCard: {
    backgroundColor:   Colors.primary,
    borderRadius:      Radius.lg,
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingVertical:   Spacing.base,
    paddingHorizontal: Spacing.lg,
  },
  idCardTitle: {
    fontFamily:    MONO_FONT,
    fontSize:      13,
    fontWeight:    '700',
    color:         '#fff',
    letterSpacing: 0.5,
  },
  idBadge: {
    backgroundColor:   Colors.textPrimary,
    paddingHorizontal: Spacing.sm,
    paddingVertical:   4,
    borderRadius:      Radius.full,
  },
  idBadgeText: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    fontWeight:    '700',
    color:         '#fff',
    letterSpacing: 0.5,
  },

  /* Form */
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius:    Radius.lg,
    padding:         Spacing.base,
    gap:             Spacing.md,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 2 },
    shadowOpacity:   0.05,
    shadowRadius:    8,
    elevation:       2,
  },
  field: {
    marginBottom: 0,
  },
  inputIcon: {
    fontSize: 13,
    color:    Colors.gray400,
  },
  hint: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
    marginTop:     4,
    marginLeft:    2,
  },
  divider: {
    borderBottomWidth: 1,
    borderStyle:       'dashed',
    borderColor:       Colors.border,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    gap:           Spacing.sm,
  },
  checkbox: {
    width:           18,
    height:          18,
    borderRadius:    4,
    borderWidth:     1.5,
    borderColor:     Colors.border,
    backgroundColor: Colors.gray100,
    alignItems:      'center',
    justifyContent:  'center',
    flexShrink:      0,
    marginTop:       1,
  },
  checkboxOn: {
    backgroundColor: Colors.primary,
    borderColor:     Colors.primary,
  },
  termsText: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
    flex:          1,
    lineHeight:    17,
  },

  /* Bottom */
  signinRow: {
    flexDirection:  'row',
    justifyContent: 'center',
    alignItems:     'center',
  },
  signinText: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
  },
  signinLink: {
    fontFamily:         MONO_FONT,
    fontSize:           11,
    color:              Colors.primaryDark,
    letterSpacing:      0.3,
    textDecorationLine: 'underline',
  },
});
