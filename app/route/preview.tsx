import React, { useState } from 'react';
import {
  View, StyleSheet, Text, Pressable, ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, Radius, PAGE_HORIZONTAL } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';

const STOPS = [
  { label: 'A', name: 'Home',                    addr: 'Home',         isPink: true,  isBlack: false },
  { label: '1', name: 'David Jon...',             addr: 'David Jones',  isPink: false, isBlack: false },
  { label: '2', name: 'Top Tea',                  addr: 'Top Tea',      isPink: false, isBlack: false },
  { label: '●', name: '',                         addr: '',             isPink: false, isBlack: true  },
];

function WindowControls() {
  return (
    <View style={{ flexDirection: 'row', gap: 4 }}>
      {[0,1,2].map(i => <View key={i} style={{ width: 13, height: 13, borderRadius: 3, borderWidth: 1, borderColor: Colors.border }} />)}
    </View>
  );
}

export default function MapViewScreen() {
  const [selected, setSelected] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={16} color={Colors.textSecondary} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>✦  map view</Text>
          <Text style={styles.headerSub}>4 stops · walk mode</Text>
        </View>
      </View>

      {/* Map card — fills remaining space */}
      <View style={styles.mapCard}>
        <View style={styles.mapTitleRow}>
          <Text style={styles.mapLabel}>✦ meowp map · no.042 ✦</Text>
          <WindowControls />
        </View>

        {/* Full map */}
        <View style={styles.map}>
          {/* Grid lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <View key={`h${i}`} style={[styles.gridLine, styles.gridH, { top: i * 44 }]} />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <View key={`v${i}`} style={[styles.gridLine, styles.gridV, { left: i * 44 }]} />
          ))}

          {/* Pink blob parks */}
          <View style={[styles.blob, { top: '42%', left: '22%', width: 120, height: 64 }]} />
          <View style={[styles.blobOrange, { top: '15%', right: '8%', width: 70, height: 110 }]} />

          {/* Park label */}
          <Text style={[styles.parkLabel, { top: '46%', left: '26%' }]}>park ♡</Text>

          {/* Dashed route line */}
          <View style={styles.routeLine} />

          {/* Stop pins */}
          <View style={[styles.pin, styles.pinPink, { top: '22%', left: '10%' }]}>
            <Text style={styles.pinLbl}>A</Text>
          </View>
          <View style={[styles.pin, styles.pinWhite, { top: '30%', left: '36%' }]}>
            <Text style={[styles.pinLbl, { color: '#333' }]}>1</Text>
          </View>
          <View style={[styles.pin, styles.pinWhite, { top: '50%', left: '58%' }]}>
            <Text style={[styles.pinLbl, { color: '#333' }]}>2</Text>
          </View>
          <View style={[styles.pin, styles.pinBlack, { top: '65%', right: '8%' }]}>
            <Text style={styles.pinLbl}>Z</Text>
          </View>

          {/* Labels */}
          <Text style={[styles.stopLabel, { top: '16%', left: '8%' }]}>Home</Text>
          <Text style={[styles.stopLabel, { top: '24%', left: '34%' }]}>David Jones</Text>
          <Text style={[styles.stopLabel, { top: '44%', left: '56%' }]}>Top Tea</Text>
          <Text style={[styles.stopLabel, { top: '73%', right: '6%', fontSize: 8 }]}>University o...</Text>

          {/* Scale bar */}
          <View style={styles.scaleBar}>
            <View style={styles.scaleLine} />
            <Text style={styles.scaleText}>— 500m</Text>
          </View>

          {/* Compass */}
          <View style={styles.compass}>
            <Text style={styles.compassN}>+ N</Text>
          </View>

          {/* Meowp tag */}
          <View style={styles.meowpTag}>
            <Text style={styles.meowpTagText}>·*meowp*·</Text>
          </View>
        </View>
      </View>

      {/* Bottom panel */}
      <View style={styles.bottomPanel}>
        <View style={styles.routeRow}>
          <View style={styles.greenRoutePill}>
            <Text style={styles.greenRouteText}>♡ green route</Text>
          </View>
          <Text style={styles.tapHint}>·tap pin for detail·</Text>
        </View>

        {/* Stop chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {STOPS.map((s, i) => (
            <Pressable
              key={i}
              style={[styles.chip, selected === i && styles.chipActive]}
              onPress={() => setSelected(i)}
            >
              <View style={[
                styles.chipPin,
                s.isPink  && styles.chipPinPink,
                s.isBlack && styles.chipPinBlack,
                selected === i && !s.isPink && !s.isBlack && styles.chipPinSelected,
              ]}>
                <Text style={[
                  styles.chipPinLabel,
                  (s.isPink || s.isBlack || selected === i) && { color: '#fff' },
                ]}>{s.label}</Text>
              </View>
              {s.name ? <Text style={styles.chipName}>{s.name}</Text> : null}
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  /* Header */
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: PAGE_HORIZONTAL, paddingVertical: Spacing.md,
    backgroundColor: '#fff', gap: Spacing.sm,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 32, height: 32, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff',
  },
  headerText: { flex: 1, gap: 2 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, letterSpacing: 0.2 },
  headerSub: { fontFamily: MONO_FONT, fontSize: 10, color: Colors.textSecondary, letterSpacing: 0.5 },

  /* Map card */
  mapCard: {
    flex: 1,
    margin: PAGE_HORIZONTAL,
    marginBottom: 0,
    backgroundColor: '#fff',
    borderRadius: Radius.lg,
    overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  mapTitleRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  mapLabel: { fontFamily: MONO_FONT, fontSize: 11, color: Colors.textSecondary, letterSpacing: 0.8 },

  /* Map */
  map: { flex: 1, backgroundColor: '#F7F4F0', overflow: 'hidden' },
  gridLine: { position: 'absolute', backgroundColor: '#E0DAD4' },
  gridH:    { left: 0, right: 0, height: 1 },
  gridV:    { top: 0, bottom: 0, width: 1 },

  blob: {
    position: 'absolute', borderRadius: 999,
    backgroundColor: Colors.primaryLight, opacity: 0.5,
  },
  blobOrange: {
    position: 'absolute', borderRadius: 40,
    backgroundColor: '#F5D5A0', opacity: 0.45,
  },
  parkLabel: {
    position: 'absolute', fontStyle: 'italic', fontSize: 12,
    color: Colors.primaryDark, letterSpacing: 0.3,
  },

  routeLine: {
    position: 'absolute', top: '36%', left: '12%', width: '74%', height: 2,
    borderStyle: 'dashed', borderWidth: 1.5, borderColor: Colors.primary,
    transform: [{ rotate: '12deg' }],
  },

  pin: {
    position: 'absolute', width: 22, height: 22, borderRadius: 11,
    alignItems: 'center', justifyContent: 'center',
  },
  pinPink:  { backgroundColor: Colors.primary },
  pinWhite: { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#333' },
  pinBlack: { backgroundColor: '#1a1a1a' },
  pinLbl:   { fontFamily: MONO_FONT, fontSize: 9, fontWeight: '700', color: '#fff' },

  stopLabel: {
    position: 'absolute', fontFamily: MONO_FONT, fontSize: 9, color: '#555',
  },

  scaleBar: {
    position: 'absolute', bottom: 10, right: 10,
    flexDirection: 'row', alignItems: 'center', gap: 4,
  },
  scaleLine: { width: 30, height: 1.5, backgroundColor: '#888' },
  scaleText: { fontFamily: MONO_FONT, fontSize: 8, color: '#888' },

  compass: {
    position: 'absolute', top: 10, right: 10,
    backgroundColor: 'rgba(255,255,255,0.85)', paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4,
  },
  compassN: { fontFamily: MONO_FONT, fontSize: 9, color: Colors.primaryDark, fontWeight: '700' },

  meowpTag: {
    position: 'absolute', bottom: 10, left: 10,
    backgroundColor: '#1a1a1a', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 999,
  },
  meowpTagText: { fontFamily: MONO_FONT, fontSize: 8, color: '#fff', letterSpacing: 1 },

  /* Bottom panel */
  bottomPanel: {
    backgroundColor: '#fff',
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginHorizontal: PAGE_HORIZONTAL,
    marginBottom: Spacing.md,
    borderRadius: Radius.lg,
    shadowColor: '#000', shadowOffset: { width: 0, height: -1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  routeRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  greenRoutePill: {
    backgroundColor: '#FDF0E0', paddingHorizontal: Spacing.md, paddingVertical: 5,
    borderRadius: Radius.full, borderWidth: 1, borderColor: '#E8B87A',
  },
  greenRouteText: { fontFamily: MONO_FONT, fontSize: 11, color: '#C88A3A', fontWeight: '600' },
  tapHint: { fontFamily: MONO_FONT, fontSize: 10, color: Colors.textSecondary, letterSpacing: 0.5 },

  chipsRow: { gap: Spacing.sm, paddingVertical: 2 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    paddingVertical: 6, paddingHorizontal: Spacing.sm,
    backgroundColor: Colors.gray100, borderRadius: Radius.full,
    borderWidth: 1, borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primaryPale, borderColor: Colors.primaryLight },
  chipPin: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: '#333',
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  chipPinPink:     { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipPinBlack:    { backgroundColor: '#1a1a1a', borderColor: '#1a1a1a' },
  chipPinSelected: { backgroundColor: Colors.textPrimary, borderColor: Colors.textPrimary },
  chipPinLabel: { fontFamily: MONO_FONT, fontSize: 8, fontWeight: '700', color: '#333' },
  chipName: { fontFamily: MONO_FONT, fontSize: 11, color: Colors.textPrimary, letterSpacing: 0.2 },
});
