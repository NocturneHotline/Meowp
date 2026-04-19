import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Animated, Text } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '@/components/common/AppButton';
import { Colors } from '@/constants/colors';
import { Spacing, Radius, PAGE_HORIZONTAL } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id:        '1',
    icon:      'map-outline' as const,
    tag:       '01 · route',
    title:     'Plan Multi-Stop Routes',
    body:      'Add multiple destinations and Meowp finds the smartest path for your journey.',
    bg:        Colors.primaryPale,
    iconColor: Colors.primaryDark,
  },
  {
    id:        '2',
    icon:      'leaf-outline' as const,
    tag:       '02 · eco',
    title:     'Travel Green ✦',
    body:      'Compare transport modes and choose the eco-friendly option that suits you best.',
    bg:        '#F0FAF0',
    iconColor: Colors.success,
  },
  {
    id:        '3',
    icon:      'heart-outline' as const,
    tag:       '03 · community',
    title:     'Share with Friends ♡',
    body:      'Post your favourite routes and discover hidden gems from fellow travellers.',
    bg:        Colors.primaryPale,
    iconColor: Colors.primaryDark,
  },
];

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const flatRef   = useRef<FlatList>(null);
  const scrollX   = useRef(new Animated.Value(0)).current;

  const goNext = () => {
    if (index < SLIDES.length - 1) {
      flatRef.current?.scrollToIndex({ index: index + 1 });
      setIndex(index + 1);
    } else {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTag}>·* getting started ·*</Text>

      <Animated.FlatList
        ref={flatRef}
        data={SLIDES}
        keyExtractor={(s) => s.id}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={[styles.iconCard, { backgroundColor: item.bg }]}>
              <Text style={styles.slideTag}>{item.tag}</Text>
              <Ionicons name={item.icon} size={56} color={item.iconColor} />
            </View>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideBody}>{item.body}</Text>
          </View>
        )}
      />

      {/* Dot indicators */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.footer}>
        <AppButton
          variant="primary"
          size="lg"
          label={index === SLIDES.length - 1 ? '★ get started' : '✦ next · 次へ'}
          fullWidth
          onPress={goNext}
        />
        {index < SLIDES.length - 1 && (
          <AppButton
            variant="ghost"
            size="md"
            label="skip →"
            fullWidth
            style={styles.skipBtn}
            onPress={() => router.replace('/(tabs)/home')}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: Colors.background,
  },
  pageTag: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    letterSpacing: 1.5,
    color:         Colors.textSecondary,
    textAlign:     'center',
    paddingTop:    Spacing.xl,
  },
  slide: {
    width:             width,
    alignItems:        'center',
    justifyContent:    'center',
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingTop:        Spacing.xxl,
    gap:               Spacing.lg,
  },
  iconCard: {
    width:          180,
    height:         180,
    borderRadius:   Radius.xl,
    borderWidth:    1,
    borderColor:    Colors.border,
    alignItems:     'center',
    justifyContent: 'center',
    gap:            Spacing.sm,
    marginBottom:   Spacing.lg,
  },
  slideTag: {
    fontFamily:    MONO_FONT,
    fontSize:      9,
    letterSpacing: 1.5,
    color:         Colors.textSecondary,
    position:      'absolute',
    top:           Spacing.md,
    left:          Spacing.md,
  },
  slideTitle: {
    fontSize:      20,
    fontWeight:    '600',
    color:         Colors.textPrimary,
    letterSpacing: 0.2,
    textAlign:     'center',
  },
  slideBody: {
    fontFamily:    MONO_FONT,
    fontSize:      12,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
    textAlign:     'center',
    lineHeight:    20,
    paddingHorizontal: Spacing.md,
  },
  dots: {
    flexDirection:  'row',
    justifyContent: 'center',
    gap:            Spacing.sm,
    marginVertical: Spacing.xl,
  },
  dot: {
    width:           8,
    height:          8,
    borderRadius:    Radius.full,
    backgroundColor: Colors.gray200,
    borderWidth:     1,
    borderColor:     Colors.border,
  },
  dotActive: {
    width:           24,
    backgroundColor: Colors.primary,
    borderColor:     Colors.primaryDark,
  },
  footer: {
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingBottom:     Spacing.xxl,
    gap:               Spacing.xs,
  },
  skipBtn: {
    marginTop: Spacing.xs,
  },
});
