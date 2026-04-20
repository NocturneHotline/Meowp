import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '@/components/common/AppButton';
import { Colors } from '@/constants/colors';
import { Spacing, Radius, PAGE_HORIZONTAL } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';

const FEATURES = ['plan', 'walk', 'share'];

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Decoration stars */}
      <Text style={[styles.deco, { top: 60,  left: '20%', fontSize: 18, color: Colors.primary, opacity: 0.5 }]}>★</Text>
      <Text style={[styles.deco, { top: 80,  left: '50%', fontSize: 14, color: Colors.gray300 }]}>☆</Text>
      <Text style={[styles.deco, { top: 110, right: '18%', fontSize: 10, color: Colors.gray300 }]}>★</Text>
      {/* Pink dash accent */}
      <View style={[styles.dashAccent, { top: 120, left: '35%' }]} />
      <Text style={[styles.deco, { top: 128, left: '42%', fontSize: 14, color: Colors.gray300 }]}>☆</Text>

      {/* Cat card */}
      <View style={styles.catCard}>
        {/* Pink washi tape */}
        <View style={styles.tape} />
        {/* "hi" label */}
        <Text style={styles.hiLabel}>hi</Text>
        {/* Heart decoration */}
        <Text style={styles.heartDeco}>♀</Text>

        <Image
          source={require('../../assets/icons/appIcon.png')}
          style={styles.catImage}
          resizeMode="contain"
        />

        {/* Scattered stars inside card */}
        <Text style={[styles.deco, { bottom: 18, left: 18, fontSize: 12, color: Colors.gray200 }]}>+</Text>
        <Text style={[styles.deco, { bottom: 30, right: 24, fontSize: 10, color: Colors.gray200 }]}>☆</Text>
      </View>

      {/* Text block */}
      <View style={styles.textBlock}>
        <Text style={styles.title}>hi, i'm meowp ♡</Text>
        <Text style={styles.body}>
          I'll help you plan your day across many{'\n'}stops — no more guessing the order.
        </Text>

        {/* Feature pills */}
        <View style={styles.featureRow}>
          {FEATURES.map((f, i) => (
            <View key={f} style={[styles.featurePill, i === 0 && styles.featurePillActive]}>
              <Text style={[styles.featureText, i === 0 && styles.featureTextActive]}>{f}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <AppButton
          variant="primary"
          size="lg"
          label="★  nice to meet you ✦"
          fullWidth
          onPress={() => router.replace('/(tabs)/home')}
        />
        <Text
          style={styles.skip}
          onPress={() => router.replace('/(tabs)/home')}
        >
          ·* skip for now *·
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: Colors.background,
    alignItems:      'center',
    justifyContent:  'center',
    paddingHorizontal: PAGE_HORIZONTAL,
  },
  deco: {
    position: 'absolute',
  },
  dashAccent: {
    position:        'absolute',
    width:           28,
    height:          4,
    borderRadius:    2,
    backgroundColor: Colors.primary,
  },

  /* Cat card */
  catCard: {
    backgroundColor: '#FFFFFF',
    borderRadius:    Radius.xl,
    width:           '80%',
    aspectRatio:     0.88,
    alignItems:      'center',
    justifyContent:  'center',
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 2 },
    shadowOpacity:   0.06,
    shadowRadius:    12,
    elevation:       3,
    marginBottom:    Spacing.xl,
    overflow:        'visible',
    borderWidth:     1,
    borderColor:     Colors.border,
  },
  tape: {
    position:        'absolute',
    top:             -8,
    left:            '30%',
    width:           80,
    height:          16,
    backgroundColor: Colors.primaryLight,
    borderRadius:    3,
    opacity:         0.8,
    transform:       [{ rotate: '-2deg' }],
  },
  hiLabel: {
    position:      'absolute',
    top:           18,
    left:          22,
    fontFamily:    MONO_FONT,
    fontSize:      12,
    color:         Colors.textSecondary,
    letterSpacing: 1,
  },
  heartDeco: {
    position:  'absolute',
    top:       22,
    right:     22,
    fontSize:  18,
    color:     Colors.primary,
  },
  catImage: {
    width:  140,
    height: 140,
  },

  /* Text */
  textBlock: {
    alignItems:   'center',
    gap:          Spacing.md,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  title: {
    fontSize:      26,
    fontWeight:    '700',
    fontStyle:     'italic',
    color:         Colors.textPrimary,
    letterSpacing: 0.3,
    textAlign:     'center',
  },
  body: {
    fontFamily:    MONO_FONT,
    fontSize:      13,
    color:         Colors.textSecondary,
    letterSpacing: 0.2,
    textAlign:     'center',
    lineHeight:    20,
  },
  featureRow: {
    flexDirection: 'row',
    gap:           Spacing.sm,
  },
  featurePill: {
    paddingHorizontal: Spacing.md,
    paddingVertical:   6,
    borderRadius:      Radius.full,
    borderWidth:       1.5,
    borderColor:       Colors.border,
    backgroundColor:   '#fff',
  },
  featurePillActive: {
    backgroundColor: Colors.primary,
    borderColor:     Colors.primary,
  },
  featureText: {
    fontFamily:    MONO_FONT,
    fontSize:      12,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
  },
  featureTextActive: {
    color:      Colors.textInverse,
    fontWeight: '600',
  },

  /* Footer */
  footer: {
    width:   '100%',
    gap:     Spacing.md,
    alignItems: 'center',
  },
  skip: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.textSecondary,
    letterSpacing: 1.5,
    textAlign:     'center',
  },
});
