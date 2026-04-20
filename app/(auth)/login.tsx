import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Text, Animated } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Spacing, Radius, PAGE_HORIZONTAL } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';

const SEGMENTS = 14;

function ProgressBar() {
  return (
    <View style={pb.wrap}>
      <View style={pb.track}>
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <View key={i} style={pb.block} />
        ))}
      </View>
      <Text style={pb.label}>100%</Text>
    </View>
  );
}

const pb = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Spacing.sm,
    marginTop:     Spacing.md,
  },
  track: {
    flex:          1,
    flexDirection: 'row',
    gap:           3,
  },
  block: {
    flex:            1,
    height:          10,
    borderRadius:    2,
    backgroundColor: Colors.textPrimary,
  },
  label: {
    fontFamily:    MONO_FONT,
    fontSize:      12,
    fontWeight:    '600',
    color:         Colors.textPrimary,
    letterSpacing: 0.5,
  },
});

export default function LoginPage() {
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue:         1,
      duration:        600,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace('/(auth)/login-methods');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Scattered star decorations */}
      <Text style={[styles.star, { top: 80,  left: 30,  fontSize: 22, color: Colors.primary }]}>★</Text>
      <Text style={[styles.star, { top: 140, right: 40, fontSize: 16, color: Colors.primaryLight }]}>★</Text>
      <Text style={[styles.star, { top: 220, left: 55,  fontSize: 14, color: Colors.primaryLight }]}>☆</Text>
      <Text style={[styles.star, { bottom: 180, right: 30, fontSize: 18, color: Colors.primary, opacity: 0.5 }]}>★</Text>
      <Text style={[styles.star, { bottom: 100, left: 25,  fontSize: 12, color: Colors.primaryLight }]}>☆</Text>
      <Text style={[styles.star, { bottom: 260, right: 55, fontSize: 14, color: Colors.primaryLight }]}>★</Text>

      {/* Center content */}
      <Animated.View style={[styles.body, { opacity: fadeIn }]}>
        <Text style={styles.tagline}>·* loading my map *·</Text>

        {/* Cat card */}
        <View style={styles.card}>
          <Image
            source={require('../../assets/icons/appIcon.png')}
            style={styles.catImage}
            resizeMode="contain"
          />

          <ProgressBar />

          <Text style={styles.loadingText}>almost there ♪...</Text>
        </View>
      </Animated.View>

      {/* Bottom word pills */}
      <View style={styles.pillRow}>
        {(['nice', 'to', 'meowp', 'you'] as const).map((word) => (
          <View key={word} style={[styles.pill, word === 'meowp' && styles.pillActive]}>
            <Text style={[styles.pillText, word === 'meowp' && styles.pillTextActive]}>
              {word}
            </Text>
          </View>
        ))}
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
  },
  star: {
    position: 'absolute',
    fontWeight: '900',
  },
  body: {
    alignItems: 'center',
    width:      '100%',
    paddingHorizontal: PAGE_HORIZONTAL,
    gap: Spacing.lg,
  },
  tagline: {
    fontFamily:    MONO_FONT,
    fontSize:      13,
    color:         Colors.textSecondary,
    letterSpacing: 4,
    textAlign:     'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius:    Radius.xl,
    paddingVertical:   Spacing.xxl,
    paddingHorizontal: Spacing.xxl,
    alignItems:      'center',
    width:           '100%',
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 2 },
    shadowOpacity:   0.06,
    shadowRadius:    12,
    elevation:       3,
  },
  catImage: {
    width:  160,
    height: 160,
  },
  loadingText: {
    fontFamily:    MONO_FONT,
    fontSize:      13,
    color:         Colors.textSecondary,
    letterSpacing: 0.5,
    marginTop:     Spacing.sm,
  },
  pillRow: {
    flexDirection:   'row',
    gap:             Spacing.sm,
    position:        'absolute',
    bottom:          48,
  },
  pill: {
    paddingHorizontal: Spacing.base,
    paddingVertical:   6,
    borderRadius:      Radius.full,
    backgroundColor:   '#FFFFFF',
    borderWidth:       1,
    borderColor:       Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.primary,
    borderColor:     Colors.primary,
  },
  pillText: {
    fontFamily:    MONO_FONT,
    fontSize:      12,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
  },
  pillTextActive: {
    color:      Colors.textInverse,
    fontWeight: '600',
  },
});
