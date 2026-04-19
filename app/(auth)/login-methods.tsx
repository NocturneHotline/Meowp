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

type LoginMethod = 'select' | 'username';

export default function LoginMethodsPage() {
  const [method, setMethod]     = useState<LoginMethod>('select');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  if (method === 'username') {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable style={styles.back} onPress={() => setMethod('select')}>
          <Ionicons name="arrow-back" size={18} color={Colors.textSecondary} />
          <Text style={styles.backLabel}>back</Text>
        </Pressable>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.tagline}>·* 欢迎回来 · おかえり ·*</Text>
          <Text style={styles.welcomeTitle}>welcome back ♡</Text>

          <View style={styles.signInCard}>
            <Text style={styles.cardHeader}>·* Sign In ✦</Text>
            <View style={styles.dividerDashed} />

            <AppInput
              label="·* user · handle"
              placeholder="@your_name"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={styles.field}
              leftIcon={<Text style={styles.inputIcon}>☆</Text>}
            />

            <AppInput
              label="·* password · パスワード"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              containerStyle={styles.field}
              leftIcon={<Text style={styles.inputIcon}>♪</Text>}
            />

            <View style={styles.rememberRow}>
              <View style={styles.checkboxRow}>
                <View style={styles.checkbox}>
                  <Ionicons name="checkmark" size={10} color={Colors.primaryDark} />
                </View>
                <Text style={styles.rememberText}>remember me ♡</Text>
              </View>
              <Pressable onPress={() => {}}>
                <Text style={styles.forgotLink}>forgot?</Text>
              </Pressable>
            </View>

            <AppButton
              variant="primary"
              size="lg"
              label="★ Sign In · 登录"
              fullWidth
              style={styles.submitBtn}
              onPress={() => router.replace('/(tabs)/home')}
            />
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>· or ·</Text>
            <View style={styles.dividerLine} />
          </View>

          <AppButton
            variant="secondary"
            size="md"
            label="♪  Google"
            fullWidth
            style={styles.socialBtn}
            onPress={() => router.push('/(auth)/onboarding')}
          />
          <AppButton
            variant="secondary"
            size="md"
            label="  Apple"
            fullWidth
            style={styles.socialBtn}
            onPress={() => router.push('/(auth)/onboarding')}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>© @meowp · privacy · terms</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={18} color={Colors.textSecondary} />
        <Text style={styles.backLabel}>back</Text>
      </Pressable>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.tagline}>·* 欢迎回来 · おかえり ·*</Text>
        <Text style={styles.welcomeTitle}>welcome back ♡</Text>

        <View style={styles.signInCard}>
          <Text style={styles.cardHeader}>·* Sign In ✦</Text>
          <View style={styles.dividerDashed} />

          <Pressable
            style={({ pressed }) => [styles.methodRow, pressed && styles.pressed]}
            onPress={() => router.push('/(auth)/onboarding')}
          >
            <View style={[styles.methodIcon, { backgroundColor: '#FDE8E8' }]}>
              <Ionicons name="logo-google" size={20} color="#EA4335" />
            </View>
            <View style={styles.methodText}>
              <Text style={styles.methodTitle}>♪  Google</Text>
              <Text style={styles.methodSub}>continue with Google account</Text>
            </View>
            <Ionicons name="chevron-forward" size={14} color={Colors.gray300} />
          </Pressable>

          <View style={styles.dividerThin} />

          <Pressable
            style={({ pressed }) => [styles.methodRow, pressed && styles.pressed]}
            onPress={() => setMethod('username')}
          >
            <View style={[styles.methodIcon, { backgroundColor: Colors.primaryPale }]}>
              <Ionicons name="person-outline" size={20} color={Colors.primaryDark} />
            </View>
            <View style={styles.methodText}>
              <Text style={styles.methodTitle}>☆  username</Text>
              <Text style={styles.methodSub}>use email & password</Text>
            </View>
            <Ionicons name="chevron-forward" size={14} color={Colors.gray300} />
          </Pressable>
        </View>

        {/* New user banner */}
        <View style={styles.newUserBanner}>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTag}>·* new here? はじめて? ·*</Text>
            <Text style={styles.bannerTitle}>create your space ♡</Text>
          </View>
          <Pressable
            style={styles.signUpBtn}
            onPress={() => router.replace('/(auth)/signup')}
          >
            <Text style={styles.signUpBtnText}>Sign Up →</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerMeta}>v1.0  ·  since '25  ·  made w/ ♡</Text>
          <Text style={styles.footerText}>© @meowp · privacy · terms</Text>
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
  back: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingTop:        Spacing.md,
    gap:               Spacing.xs,
  },
  backLabel: {
    fontFamily:    MONO_FONT,
    fontSize:      12,
    color:         Colors.textSecondary,
    letterSpacing: 0.5,
  },
  scroll: {
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingTop:        Spacing.xl,
    paddingBottom:     Spacing.xxxl,
    gap:               Spacing.md,
  },
  tagline: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    letterSpacing: 1.5,
    color:         Colors.textSecondary,
    textAlign:     'center',
  },
  welcomeTitle: {
    fontSize:      26,
    fontWeight:    '700',
    color:         Colors.textPrimary,
    letterSpacing: 0.3,
    textAlign:     'center',
    marginBottom:  Spacing.sm,
  },
  signInCard: {
    backgroundColor: Colors.card,
    borderRadius:    Radius.lg,
    borderWidth:     1,
    borderColor:     Colors.border,
    padding:         Spacing.lg,
    gap:             Spacing.md,
  },
  cardHeader: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    letterSpacing: 1.0,
    color:         Colors.textSecondary,
  },
  dividerDashed: {
    borderBottomWidth: 1,
    borderStyle:       'dashed',
    borderColor:       Colors.border,
  },
  dividerThin: {
    height:          1,
    backgroundColor: Colors.divider,
  },
  field: {
    marginBottom: 0,
  },
  rememberRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Spacing.xs,
  },
  checkbox: {
    width:           16,
    height:          16,
    borderRadius:    4,
    borderWidth:     1,
    borderColor:     Colors.primaryDark,
    backgroundColor: Colors.primaryPale,
    alignItems:      'center',
    justifyContent:  'center',
  },
  rememberText: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.textSecondary,
    letterSpacing: 0.5,
  },
  forgotLink: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.primaryDark,
    letterSpacing: 0.5,
    textDecorationLine: 'underline',
  },
  submitBtn: {
    marginTop: Spacing.xs,
  },
  dividerRow: {
    flexDirection:  'row',
    alignItems:     'center',
    gap:            Spacing.sm,
    marginVertical: Spacing.xs,
  },
  dividerLine: {
    flex:            1,
    height:          1,
    backgroundColor: Colors.border,
  },
  dividerLabel: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.gray400,
    letterSpacing: 1,
  },
  socialBtn: {
    marginBottom: Spacing.xs,
  },
  methodRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Spacing.md,
    paddingVertical: Spacing.xs,
  },
  pressed: {
    opacity: 0.72,
  },
  methodIcon: {
    width:          44,
    height:         44,
    borderRadius:   Radius.md,
    alignItems:     'center',
    justifyContent: 'center',
  },
  methodText: {
    flex: 1,
    gap:  2,
  },
  methodTitle: {
    fontFamily:    MONO_FONT,
    fontSize:      13,
    fontWeight:    '500',
    color:         Colors.textPrimary,
    letterSpacing: 0.3,
  },
  methodSub: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
  },
  newUserBanner: {
    backgroundColor: Colors.primaryPale,
    borderRadius:    Radius.lg,
    borderWidth:     1,
    borderColor:     Colors.primaryLight,
    padding:         Spacing.base,
    flexDirection:   'row',
    alignItems:      'center',
    gap:             Spacing.md,
  },
  bannerText: {
    flex: 1,
    gap:  2,
  },
  bannerTag: {
    fontFamily:    MONO_FONT,
    fontSize:      9,
    color:         Colors.primaryDark,
    letterSpacing: 1,
  },
  bannerTitle: {
    fontFamily:    MONO_FONT,
    fontSize:      12,
    fontWeight:    '600',
    color:         Colors.textPrimary,
    letterSpacing: 0.3,
  },
  signUpBtn: {
    paddingVertical:   8,
    paddingHorizontal: Spacing.md,
    borderRadius:      Radius.full,
    borderWidth:       1,
    borderColor:       Colors.primaryDark,
    backgroundColor:   Colors.card,
  },
  signUpBtnText: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.primaryDark,
    letterSpacing: 0.5,
  },
  footer: {
    alignItems:  'center',
    gap:         Spacing.xs,
    marginTop:   Spacing.sm,
  },
  footerMeta: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.gray400,
    letterSpacing: 0.5,
  },
  footerText: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.gray400,
    letterSpacing: 0.3,
  },
  inputIcon: {
    fontSize: 13,
    color:    Colors.gray400,
  },
});
