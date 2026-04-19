import React, { useState } from 'react';
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
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [agreed, setAgreed]     = useState(false);

  const passwordMismatch = confirm.length > 0 && confirm !== password;
  const canSubmit = username && email && password && !passwordMismatch && agreed;

  const memberId = 'No.' + Math.floor(1000000 + Math.random() * 9000000);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={18} color={Colors.textSecondary} />
          <Text style={styles.backLabel}>back</Text>
        </Pressable>
        <Text style={styles.stepTag}>STEP 1 / 2 ·*</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Member ID Card header */}
        <View style={styles.memberCard}>
          <View style={styles.memberCardInner}>
            <Text style={styles.memberCardTitle}>★  Member ID Card  ★</Text>
            <View style={styles.memberBadge}>
              <Text style={styles.memberBadgeText}>{memberId}</Text>
            </View>
          </View>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
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

          <AppInput
            label="·* handle · 账号"
            placeholder="@old_orange"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            hint="at least 3 letters"
            containerStyle={styles.field}
            leftIcon={<Text style={styles.inputIcon}>☆</Text>}
          />

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
            error={passwordMismatch ? 'passwords do not match ·*' : undefined}
            containerStyle={styles.field}
            leftIcon={<Text style={styles.inputIcon}>♪</Text>}
          />

          <View style={styles.dividerDashed} />

          {/* Terms checkbox */}
          <Pressable style={styles.termsRow} onPress={() => setAgreed(!agreed)}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Ionicons name="checkmark" size={10} color={Colors.textInverse} />}
            </View>
            <Text style={styles.termsText}>
              I agree to the house rules ♡ &amp; stars policy *
            </Text>
          </Pressable>
        </View>

        <AppButton
          variant="primary"
          size="lg"
          label="✦ next · 下一步"
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
  stepTag: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.textSecondary,
    letterSpacing: 1.2,
  },
  scroll: {
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingTop:        Spacing.xl,
    paddingBottom:     Spacing.xxxl,
    gap:               Spacing.md,
  },
  memberCard: {
    backgroundColor: Colors.primary,
    borderRadius:    Radius.lg,
    padding:         2,
  },
  memberCardInner: {
    backgroundColor: Colors.primaryLight,
    borderRadius:    Radius.lg - 2,
    paddingVertical:   Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
  },
  memberCardTitle: {
    fontFamily:    MONO_FONT,
    fontSize:      12,
    fontWeight:    '600',
    color:         Colors.textPrimary,
    letterSpacing: 1.0,
  },
  memberBadge: {
    backgroundColor: Colors.primaryDark,
    paddingVertical:   4,
    paddingHorizontal: Spacing.sm,
    borderRadius:      Radius.full,
  },
  memberBadgeText: {
    fontFamily:    MONO_FONT,
    fontSize:      9,
    color:         Colors.textInverse,
    letterSpacing: 0.5,
    fontWeight:    '600',
  },
  formCard: {
    backgroundColor: Colors.card,
    borderRadius:    Radius.lg,
    borderWidth:     1,
    borderColor:     Colors.border,
    padding:         Spacing.lg,
    gap:             Spacing.md,
  },
  field: {
    marginBottom: 0,
  },
  inputIcon: {
    fontSize: 13,
    color:    Colors.gray400,
  },
  dividerDashed: {
    borderBottomWidth: 1,
    borderStyle:       'dashed',
    borderColor:       Colors.border,
    marginVertical:    Spacing.xs,
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
    borderWidth:     1,
    borderColor:     Colors.border,
    backgroundColor: Colors.gray100,
    alignItems:      'center',
    justifyContent:  'center',
    marginTop:       1,
    flexShrink:      0,
  },
  checkboxChecked: {
    backgroundColor: Colors.primaryDark,
    borderColor:     Colors.primaryDark,
  },
  termsText: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
    flex:          1,
    lineHeight:    16,
  },
  signinRow: {
    flexDirection:  'row',
    justifyContent: 'center',
    alignItems:     'center',
    marginTop:      Spacing.xs,
  },
  signinText: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
  },
  signinLink: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.primaryDark,
    letterSpacing: 0.3,
    textDecorationLine: 'underline',
  },
});
