import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '@/components/common/AppButton';
import { Colors } from '@/constants/colors';
import { Spacing, Radius, PAGE_HORIZONTAL } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';

export default function LoginPage() {
  return (
    <SafeAreaView style={styles.container}>

      {/* ── Brand block ── */}
      <View style={styles.brand}>
        <View style={styles.iconWrap}>
          <Image
            source={require('../../assets/icons/appIcon.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.appName}>Meowp</Text>
        <Text style={styles.appSub}>route planner · 路线规划</Text>

        {/* Thin dashed accent line */}
        <View style={styles.accentLine} />

        <Text style={styles.appTagline}>·* plan smarter · travel better ·*</Text>
      </View>

      {/* ── Progress strip (Y2K personality, readable) ── */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.progressLabel}>100 %  ♪</Text>
      </View>

      {/* ── Actions ── */}
      <View style={styles.actions}>
        <AppButton
          variant="primary"
          size="lg"
          label="★  sign in · 登录"
          fullWidth
          onPress={() => router.push('/(auth)/login-methods')}
        />
        <AppButton
          variant="secondary"
          size="lg"
          label="✦  create your space"
          fullWidth
          onPress={() => router.push('/(auth)/signup')}
        />

        <Text style={styles.footer}>© @meowp · made w/ ♡</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: Colors.background,
    justifyContent:  'space-between',
  },

  /* Brand */
  brand: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    gap:            Spacing.md,
    paddingHorizontal: PAGE_HORIZONTAL,
  },
  iconWrap: {
    width:           96,
    height:          96,
    borderRadius:    Radius.xl,
    backgroundColor: Colors.primaryPale,
    borderWidth:     1,
    borderColor:     Colors.primaryLight,
    alignItems:      'center',
    justifyContent:  'center',
    marginBottom:    Spacing.sm,
  },
  icon: {
    width:  64,
    height: 64,
  },
  appName: {
    fontSize:      32,
    fontWeight:    '700',
    color:         Colors.textPrimary,
    letterSpacing: 1.0,
  },
  appSub: {
    fontFamily:    MONO_FONT,
    fontSize:      13,           // ≥13 px — legible mono
    fontWeight:    '400',
    color:         Colors.gray500,  // #888 — passes WCAG AA on white
    letterSpacing: 0.4,
  },
  accentLine: {
    width:             64,
    borderBottomWidth: 1,
    borderStyle:       'dashed',
    borderColor:       Colors.primaryLight,
    marginVertical:    Spacing.xs,
  },
  appTagline: {
    fontFamily:    MONO_FONT,
    fontSize:      12,           // 12 px mono — readable with low spacing
    fontWeight:    '500',
    color:         Colors.gray500,
    letterSpacing: 0.6,
  },

  /* Progress strip */
  progressWrap: {
    flexDirection:     'row',
    alignItems:        'center',
    gap:               Spacing.md,
    paddingHorizontal: PAGE_HORIZONTAL + 8,
    marginBottom:      Spacing.xxl,
  },
  progressTrack: {
    flex:            1,
    height:          6,
    backgroundColor: Colors.gray100,
    borderRadius:    Radius.full,
    borderWidth:     1,
    borderColor:     Colors.border,
    overflow:        'hidden',
  },
  progressFill: {
    width:           '100%',
    height:          '100%',
    backgroundColor: Colors.primary,
    borderRadius:    Radius.full,
  },
  progressLabel: {
    fontFamily:    MONO_FONT,
    fontSize:      13,           // same baseline as appSub
    fontWeight:    '600',
    color:         Colors.primaryDark,
    letterSpacing: 0.2,
  },

  /* Actions */
  actions: {
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingBottom:     Spacing.xxl,
    gap:               Spacing.sm,
  },
  footer: {
    fontFamily:    MONO_FONT,
    fontSize:      12,           // 12 px — minimum readable
    fontWeight:    '400',
    color:         Colors.gray500,
    letterSpacing: 0.3,
    textAlign:     'center',
    marginTop:     Spacing.xs,
  },
});
