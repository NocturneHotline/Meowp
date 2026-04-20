import React, { useState } from 'react';
import {
  View, StyleSheet, Pressable, Text,
  ScrollView, TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Spacing, Radius, PAGE_HORIZONTAL } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';

const STICKERS = ['★', '♪', '♡', '✿', '☁', '◑', '✦', '●'];

const VIBES = [
  { icon: '♪', name: 'lo-fi girl',    sub: '恋曲 · lazy afternoon' },
  { icon: '◑', name: 'y2k flip phone', sub: 'cute & chromed' },
  { icon: '☁', name: 'bedroom pop',   sub: 'soft synths' },
  { icon: '★', name: "city pop '98",  sub: '東京 · midnight' },
];

const THEME_COLORS = [
  { id: 'white',    hex: '#FFFFFF',  border: Colors.border },
  { id: 'rosepink', hex: '#F4A0BC', border: Colors.primaryDark },
  { id: 'hotpink',  hex: '#E8799F', border: '#E8799F' },
  { id: 'lavender', hex: '#C8B8E8', border: '#C8B8E8' },
  { id: 'butter',   hex: '#F5D77F', border: '#F5D77F' },
  { id: 'black',    hex: '#333333', border: '#333333' },
];

export default function ProfileScreen() {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio]                 = useState('');
  const [sticker, setSticker]         = useState(0);
  const [vibe, setVibe]               = useState(2);
  const [themeColor, setThemeColor]   = useState('rosepink');

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.badgeWrap}>
          <Text style={styles.badgeNum}>04</Text>
        </View>
        <Text style={styles.topTitle}>profile ·*</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Display name */}
        <View style={styles.fieldSection}>
          <Text style={styles.fieldLabel}>·* display name</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>✿</Text>
            <TextInput
              style={styles.textInput}
              placeholder="what should we call you?"
              placeholderTextColor={Colors.gray400}
              value={displayName}
              onChangeText={setDisplayName}
            />
          </View>
        </View>

        {/* Bio */}
        <View style={styles.fieldSection}>
          <Text style={styles.fieldLabel}>·* bio</Text>
          <View style={[styles.inputWrap, styles.bioWrap]}>
            <Text style={styles.inputIcon}>♡</Text>
            <TextInput
              style={[styles.textInput, styles.bioInput]}
              placeholder="the day we are about to meet..."
              placeholderTextColor={Colors.gray400}
              value={bio}
              onChangeText={(t) => t.length <= 60 && setBio(t)}
              multiline
            />
          </View>
          <Text style={styles.charCount}>{bio.length}/60</Text>
        </View>

        {/* Pick sticker */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>✦ pick your sticker ·* ✦</Text>
          <View style={styles.stickerRow}>
            {STICKERS.map((s, i) => (
              <Pressable
                key={i}
                style={[styles.stickerBtn, i === sticker && styles.stickerBtnActive]}
                onPress={() => setSticker(i)}
              >
                <Text style={[styles.stickerText, i === sticker && styles.stickerTextActive]}>
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Choose a vibe */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>✦ choose a vibe ♪ ✦</Text>
          <View style={styles.vibeList}>
            {VIBES.map((v, i) => {
              const active = i === vibe;
              return (
                <Pressable
                  key={v.name}
                  style={[styles.vibeRow, active && styles.vibeRowActive]}
                  onPress={() => setVibe(i)}
                >
                  <View style={[styles.vibeIcon, active && styles.vibeIconActive]}>
                    <Text style={[styles.vibeIconText, active && styles.vibeIconTextActive]}>
                      {v.icon}
                    </Text>
                  </View>
                  <View style={styles.vibeInfo}>
                    <Text style={[styles.vibeName, active && styles.vibeNameActive]}>
                      {v.name}
                    </Text>
                    {v.sub ? (
                      <Text style={[styles.vibeSub, active && styles.vibeSubActive]}>
                        {v.sub}
                      </Text>
                    ) : null}
                  </View>
                  {active && <Text style={styles.vibeCheck}>★</Text>}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Theme color */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>✦ theme color ✧ ✦</Text>
          <View style={styles.colorRow}>
            {THEME_COLORS.map((c) => {
              const selected = c.id === themeColor;
              return (
                <Pressable
                  key={c.id}
                  onPress={() => setThemeColor(c.id)}
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: c.hex, borderColor: c.border },
                    selected && styles.colorSwatchSelected,
                  ]}
                >
                  {selected && (
                    <View style={[styles.colorRing, { borderColor: Colors.textPrimary }]} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Bottom spacer for button */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Fixed bottom button */}
      <View style={styles.bottomBar}>
        <Pressable
          style={styles.ctaBtn}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text style={styles.ctaText}>★  nice to meow you ✦</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: Colors.background,
  },

  /* Top bar */
  topBar: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'center',
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingVertical:   Spacing.sm,
    gap:               Spacing.sm,
  },
  badgeWrap: {
    borderWidth:       1.5,
    borderColor:       Colors.success,
    borderRadius:      6,
    paddingHorizontal: 7,
    paddingVertical:   2,
  },
  badgeNum: {
    fontFamily:    MONO_FONT,
    fontSize:      12,
    fontWeight:    '700',
    color:         Colors.textPrimary,
    letterSpacing: 0.5,
  },
  topTitle: {
    fontFamily:    MONO_FONT,
    fontSize:      13,
    color:         Colors.textSecondary,
    letterSpacing: 1.5,
  },

  scroll: {
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingTop:        Spacing.sm,
    gap:               Spacing.md,
  },

  /* Field sections */
  fieldSection: {
    gap: Spacing.xs,
  },
  fieldLabel: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.textSecondary,
    letterSpacing: 0.8,
  },
  inputWrap: {
    flexDirection:     'row',
    alignItems:        'center',
    backgroundColor:   '#FFFFFF',
    borderRadius:      Radius.md,
    borderWidth:       1,
    borderColor:       Colors.border,
    paddingHorizontal: Spacing.sm,
    paddingVertical:   Spacing.sm,
    gap:               Spacing.xs,
  },
  bioWrap: {
    alignItems: 'flex-start',
  },
  inputIcon: {
    fontSize:   13,
    color:      Colors.gray400,
    paddingTop: 1,
  },
  textInput: {
    flex:       1,
    fontSize:   14,
    color:      Colors.textPrimary,
    padding:    0,
    fontFamily: MONO_FONT,
  },
  bioInput: {
    minHeight:         44,
    textAlignVertical: 'top',
  },
  charCount: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.gray400,
    letterSpacing: 0.3,
    alignSelf:     'flex-start',
  },

  /* Section cards */
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius:    Radius.lg,
    padding:         Spacing.base,
    gap:             Spacing.md,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 1 },
    shadowOpacity:   0.04,
    shadowRadius:    6,
    elevation:       1,
  },
  sectionLabel: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.textSecondary,
    letterSpacing: 1,
  },

  /* Stickers */
  stickerRow: {
    flexDirection: 'row',
    gap:           Spacing.sm,
    flexWrap:      'wrap',
  },
  stickerBtn: {
    width:           40,
    height:          40,
    borderRadius:    Radius.md,
    borderWidth:     1.5,
    borderColor:     Colors.border,
    backgroundColor: Colors.gray100,
    alignItems:      'center',
    justifyContent:  'center',
  },
  stickerBtnActive: {
    backgroundColor: Colors.primary,
    borderColor:     Colors.primary,
  },
  stickerText: {
    fontSize: 16,
    color:    Colors.textSecondary,
  },
  stickerTextActive: {
    color: '#FFFFFF',
  },

  /* Vibes */
  vibeList: {
    gap: Spacing.sm,
  },
  vibeRow: {
    flexDirection:     'row',
    alignItems:        'center',
    gap:               Spacing.md,
    backgroundColor:   Colors.gray100,
    borderRadius:      Radius.md,
    borderWidth:       1,
    borderColor:       Colors.border,
    paddingVertical:   Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  vibeRowActive: {
    backgroundColor: Colors.primaryPale,
    borderColor:     Colors.primaryLight,
  },
  vibeIcon: {
    width:           36,
    height:          36,
    borderRadius:    Radius.md,
    backgroundColor: '#FFFFFF',
    borderWidth:     1,
    borderColor:     Colors.border,
    alignItems:      'center',
    justifyContent:  'center',
  },
  vibeIconActive: {
    backgroundColor: '#FFFFFF',
    borderColor:     Colors.primaryLight,
  },
  vibeIconText: {
    fontSize: 14,
    color:    Colors.textSecondary,
  },
  vibeIconTextActive: {
    color: Colors.textPrimary,
  },
  vibeInfo: {
    flex: 1,
    gap:  2,
  },
  vibeName: {
    fontFamily:    MONO_FONT,
    fontSize:      14,
    fontWeight:    '600',
    color:         Colors.textPrimary,
    letterSpacing: 0.2,
  },
  vibeNameActive: {
    color: Colors.textPrimary,
  },
  vibeSub: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.textSecondary,
    letterSpacing: 0.2,
  },
  vibeSubActive: {
    color: Colors.textSecondary,
  },
  vibeCheck: {
    fontSize: 14,
    color:    Colors.primary,
  },

  /* Theme color */
  colorRow: {
    flexDirection: 'row',
    gap:           Spacing.md,
    flexWrap:      'wrap',
  },
  colorSwatch: {
    width:        44,
    height:       44,
    borderRadius: Radius.full,
    borderWidth:  1.5,
    alignItems:   'center',
    justifyContent: 'center',
  },
  colorSwatchSelected: {
    borderWidth: 2.5,
  },
  colorRing: {
    width:        34,
    height:       34,
    borderRadius: Radius.full,
    borderWidth:  2,
    backgroundColor: 'transparent',
  },

  /* Bottom CTA */
  bottomBar: {
    position:          'absolute',
    bottom:            0,
    left:              0,
    right:             0,
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingBottom:     Spacing.xl,
    paddingTop:        Spacing.sm,
    backgroundColor:   'transparent',
  },
  ctaBtn: {
    backgroundColor: Colors.primary,
    borderRadius:    Radius.full,
    paddingVertical: 16,
    alignItems:      'center',
    justifyContent:  'center',
    shadowColor:     Colors.primaryDark,
    shadowOffset:    { width: 0, height: 3 },
    shadowOpacity:   0.25,
    shadowRadius:    8,
    elevation:       4,
  },
  ctaText: {
    fontFamily:    MONO_FONT,
    fontSize:      15,
    fontWeight:    '700',
    color:         '#FFFFFF',
    letterSpacing: 0.5,
  },
});
