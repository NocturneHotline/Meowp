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

function WindowControls() {
  return (
    <View style={wc.row}>
      <View style={wc.box} />
      <View style={wc.box} />
      <View style={wc.box} />
    </View>
  );
}

const wc = StyleSheet.create({
  row: { flexDirection: 'row', gap: 4 },
  box: {
    width:        14,
    height:       14,
    borderRadius: 3,
    borderWidth:  1,
    borderColor:  Colors.border,
  },
});

export default function LoginMethodsPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Stars */}
      <Text style={[styles.star, { top: 60, left: '48%', fontSize: 20, color: Colors.gray300 }]}>☆</Text>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.tagline}>·* let's return to your space *·</Text>
          <Text style={styles.title}>welcome back ✦</Text>
        </View>

        {/* Sign In card */}
        <View style={styles.card}>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTitleText}>★ *Sign In ✦</Text>
            <WindowControls />
          </View>
          <View style={styles.cardDivider} />

          <View style={styles.cardBody}>
            <AppInput
              label="·* user · handle"
              placeholder="@your_name"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
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

            <View style={styles.rememberRow}>
              <Pressable style={styles.checkRow} onPress={() => setRemember(!remember)}>
                <View style={[styles.checkbox, remember && styles.checkboxOn]}>
                  {remember && <Ionicons name="checkmark" size={10} color="#fff" />}
                </View>
                <Text style={styles.rememberText}>remember me ♡</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.forgotLink}>forgot?</Text>
              </Pressable>
            </View>

            <AppButton
              variant="primary"
              size="lg"
              label="★  Sign In"
              fullWidth
              onPress={() => router.replace('/(tabs)/home')}
            />

            <View style={styles.divider} />

            <View style={styles.socialRow}>
              <Pressable
                style={styles.socialBtn}
                onPress={() => router.push('/(auth)/onboarding')}
              >
                <Text style={styles.socialIcon}>♪</Text>
                <Text style={styles.socialText}>Google</Text>
              </Pressable>
              <Pressable
                style={styles.socialBtn}
                onPress={() => router.push('/(auth)/onboarding')}
              >
                <Text style={styles.socialIcon}>♡</Text>
                <Text style={styles.socialText}>Guest</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* New user banner */}
        <View style={styles.banner}>
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTag}>·* new here? *·</Text>
            <Text style={styles.bannerTitle}>personalize your map ♡</Text>
          </View>
          <Pressable
            style={styles.signUpBtn}
            onPress={() => router.replace('/(auth)/signup')}
          >
            <Text style={styles.signUpText}>Sign Up →</Text>
          </Pressable>
        </View>

        {/* Version pills */}
        <View style={styles.versionRow}>
          <View style={styles.versionPill}>
            <Text style={styles.versionText}>v2.0</Text>
          </View>
          <View style={[styles.versionPill, styles.versionPillActive]}>
            <Text style={[styles.versionText, styles.versionTextActive]}>v3.0</Text>
          </View>
          <Pressable>
            <Text style={styles.closeBeta}>close beta test</Text>
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
  star: {
    position: 'absolute',
    zIndex:   1,
  },
  scroll: {
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingTop:        Spacing.xl,
    paddingBottom:     Spacing.xxxl,
    gap:               Spacing.md,
  },

  /* Header */
  header: {
    alignItems:   'center',
    gap:          Spacing.xs,
    marginBottom: Spacing.sm,
    marginTop:    Spacing.xl,
  },
  tagline: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.textSecondary,
    letterSpacing: 2,
    textAlign:     'center',
  },
  title: {
    fontSize:      30,
    fontWeight:    '700',
    fontStyle:     'italic',
    color:         Colors.textPrimary,
    letterSpacing: 0.3,
    textAlign:     'center',
  },

  /* Card */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius:    Radius.lg,
    overflow:        'hidden',
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 2 },
    shadowOpacity:   0.06,
    shadowRadius:    10,
    elevation:       3,
  },
  cardTitle: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical:   Spacing.sm,
    backgroundColor:   Colors.primaryPale,
  },
  cardTitleText: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    fontWeight:    '600',
    color:         Colors.primaryDark,
    letterSpacing: 0.5,
  },
  cardDivider: {
    height:          1,
    backgroundColor: Colors.primaryLight,
  },
  cardBody: {
    padding: Spacing.base,
    gap:     Spacing.md,
  },
  field: {
    marginBottom: 0,
  },
  inputIcon: {
    fontSize: 13,
    color:    Colors.gray400,
  },

  /* Remember / forgot */
  rememberRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Spacing.xs,
  },
  checkbox: {
    width:           16,
    height:          16,
    borderRadius:    4,
    borderWidth:     1.5,
    borderColor:     Colors.primary,
    backgroundColor: '#fff',
    alignItems:      'center',
    justifyContent:  'center',
  },
  checkboxOn: {
    backgroundColor: Colors.primary,
    borderColor:     Colors.primary,
  },
  rememberText: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
  },
  forgotLink: {
    fontFamily:         MONO_FONT,
    fontSize:           11,
    color:              Colors.primaryDark,
    letterSpacing:      0.3,
    textDecorationLine: 'underline',
  },

  /* Divider */
  divider: {
    height:          1,
    backgroundColor: Colors.border,
    marginVertical:  Spacing.xs,
  },

  /* Social buttons */
  socialRow: {
    flexDirection: 'row',
    gap:           Spacing.sm,
  },
  socialBtn: {
    flex:            1,
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             Spacing.xs,
    paddingVertical: Spacing.sm,
    borderRadius:    Radius.md,
    borderWidth:     1.5,
    borderColor:     Colors.border,
    backgroundColor: '#fff',
  },
  socialIcon: {
    fontSize: 14,
    color:    Colors.textSecondary,
  },
  socialText: {
    fontFamily:    MONO_FONT,
    fontSize:      13,
    color:         Colors.textPrimary,
    fontWeight:    '500',
    letterSpacing: 0.3,
  },

  /* New user banner */
  banner: {
    flexDirection:     'row',
    alignItems:        'center',
    backgroundColor:   Colors.primaryPale,
    borderRadius:      Radius.lg,
    borderWidth:       1,
    borderColor:       Colors.primaryLight,
    padding:           Spacing.base,
    gap:               Spacing.md,
  },
  bannerLeft: {
    flex: 1,
    gap:  2,
  },
  bannerTag: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.primaryDark,
    letterSpacing: 1,
  },
  bannerTitle: {
    fontFamily:    MONO_FONT,
    fontSize:      13,
    fontWeight:    '600',
    color:         Colors.textPrimary,
    letterSpacing: 0.2,
  },
  signUpBtn: {
    paddingVertical:   8,
    paddingHorizontal: Spacing.md,
    borderRadius:      Radius.full,
    borderWidth:       1.5,
    borderColor:       Colors.textPrimary,
    backgroundColor:   '#fff',
  },
  signUpText: {
    fontFamily:    MONO_FONT,
    fontSize:      12,
    fontWeight:    '600',
    color:         Colors.textPrimary,
    letterSpacing: 0.3,
  },

  /* Version pills */
  versionRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            Spacing.sm,
    marginTop:      Spacing.xs,
  },
  versionPill: {
    paddingHorizontal: Spacing.sm,
    paddingVertical:   4,
    borderRadius:      Radius.full,
    borderWidth:       1,
    borderColor:       Colors.border,
  },
  versionPillActive: {
    backgroundColor: Colors.primary,
    borderColor:     Colors.primary,
  },
  versionText: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.textSecondary,
    letterSpacing: 0.5,
  },
  versionTextActive: {
    color:      Colors.textInverse,
    fontWeight: '600',
  },
  closeBeta: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
  },
});
