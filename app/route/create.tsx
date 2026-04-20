import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, Text, Pressable, Switch,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '@/components/common/AppButton';
import { Colors } from '@/constants/colors';
import { Spacing, Radius, PAGE_HORIZONTAL } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';

type Stop = { id: string; name: string; address: string; label: string; isStart?: boolean; isEnd?: boolean };

const DEMO_STOPS: Stop[] = [
  { id: 'a', name: 'Home',                   address: '·42 Carlton St·',    label: 'A', isStart: true },
  { id: '1', name: 'David Jones',            address: '·Bourke St Mall·',   label: '1' },
  { id: '2', name: 'Top Tea',                address: '·Swanston St·',      label: '2' },
  { id: 'z', name: 'University of Melbourne', address: '·Parkville·',       label: 'Z', isEnd: true },
];

/* Mini map placeholder */
function MiniMap() {
  return (
    <View style={mm.map}>
      {Array.from({ length: 10 }).map((_, i) => (
        <View key={`h${i}`} style={[mm.line, mm.horiz, { top: i * 26 }]} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <View key={`v${i}`} style={[mm.line, mm.vert, { left: i * 38 }]} />
      ))}
      {/* Pink blob */}
      <View style={mm.blob} />
      {/* Dashed route line (visual only) */}
      <View style={mm.routeLine} />
      {/* Stop pins */}
      <View style={[mm.pin, mm.pinPink, { top: 48, left: 18 }]}><Text style={mm.pinLabel}>A</Text></View>
      <View style={[mm.pin, mm.pinWhite, { top: 38, left: 80 }]}><Text style={[mm.pinLabel, { color: '#333' }]}>1</Text></View>
      <View style={[mm.pin, mm.pinWhite, { top: 56, left: 148 }]}><Text style={[mm.pinLabel, { color: '#333' }]}>2</Text></View>
      <View style={[mm.pin, mm.pinBlack, { top: 72, left: 226 }]}><Text style={mm.pinLabel}>Z</Text></View>
      {/* Labels */}
      <Text style={[mm.label, { top: 34, left: 12 }]}>Home</Text>
      <Text style={[mm.label, { top: 24, left: 68 }]}>David Jones</Text>
      <Text style={[mm.label, { top: 42, left: 136 }]}>Top Tea</Text>
      {/* Meowp tag */}
      <View style={mm.tag}><Text style={mm.tagText}>·*meowp*·</Text></View>
      {/* Compass */}
      <View style={mm.compass}><Text style={mm.compassN}>+ N</Text></View>
    </View>
  );
}

const mm = StyleSheet.create({
  map: {
    height:          160,
    backgroundColor: '#F7F4F0',
    borderRadius:    Radius.md,
    overflow:        'hidden',
    borderWidth:     1,
    borderColor:     Colors.border,
  },
  line:  { position: 'absolute', backgroundColor: '#E0DAD4' },
  horiz: { left: 0, right: 0, height: 1 },
  vert:  { top: 0, bottom: 0, width: 1 },
  blob: {
    position: 'absolute', top: 68, left: 100,
    width: 80, height: 36, borderRadius: 999,
    backgroundColor: Colors.primaryLight, opacity: 0.5,
  },
  routeLine: {
    position: 'absolute', top: 62, left: 30, width: 210, height: 2,
    borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.primary,
  },
  pin: {
    position: 'absolute', width: 20, height: 20, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  pinPink:  { backgroundColor: Colors.primary },
  pinWhite: { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#333' },
  pinBlack: { backgroundColor: '#1a1a1a' },
  pinLabel: { fontFamily: MONO_FONT, fontSize: 8, fontWeight: '700', color: '#fff' },
  label: { position: 'absolute', fontFamily: MONO_FONT, fontSize: 8, color: '#666' },
  tag: {
    position: 'absolute', bottom: 8, left: 8,
    backgroundColor: '#1a1a1a', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999,
  },
  tagText: { fontFamily: MONO_FONT, fontSize: 8, color: '#fff', letterSpacing: 1 },
  compass: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: 'rgba(255,255,255,0.85)', paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4,
  },
  compassN: { fontFamily: MONO_FONT, fontSize: 8, color: Colors.primaryDark, fontWeight: '700' },
});

function WindowControls() {
  return (
    <View style={{ flexDirection: 'row', gap: 4 }}>
      {[0,1,2].map(i => <View key={i} style={{ width: 13, height: 13, borderRadius: 3, borderWidth: 1, borderColor: Colors.border }} />)}
    </View>
  );
}

export default function CreateRouteScreen() {
  const [autoOptimize, setAutoOptimize] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top star deco */}
      <Text style={styles.starDeco}>☆</Text>

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={16} color={Colors.textSecondary} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>✦  new route</Text>
          <Text style={styles.headerSub}>4 stops · drag ⋮⋮ to reorder</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Stops section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>✦ your stops ✦</Text>
            <WindowControls />
          </View>

          {/* Auto-optimize toggle */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>♡ auto-optimize</Text>
            <Switch
              value={autoOptimize}
              onValueChange={setAutoOptimize}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor="#fff"
              style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
            />
          </View>

          {/* Stop list */}
          {DEMO_STOPS.map((stop) => (
            <View key={stop.id} style={styles.stopRow}>
              <View style={[
                styles.stopPin,
                stop.isStart && styles.stopPinPink,
                stop.isEnd   && styles.stopPinBlack,
              ]}>
                <Text style={[
                  styles.stopPinLabel,
                  (stop.isStart || stop.isEnd) && { color: '#fff' },
                ]}>
                  {stop.label}
                </Text>
              </View>
              <View style={styles.stopInfo}>
                <Text style={styles.stopName}>{stop.name}</Text>
                <Text style={styles.stopAddr}>{stop.address}</Text>
              </View>
              {!stop.isStart && !stop.isEnd && (
                <View style={styles.stopActions}>
                  <Text style={styles.stopAction}>×</Text>
                  <Text style={styles.stopAction}>⋮⋮</Text>
                </View>
              )}
            </View>
          ))}

          {/* Add stop */}
          <Pressable style={styles.addStop}>
            <Text style={styles.addStopText}>+ add stop ♡</Text>
          </Pressable>
        </View>

        {/* Preview section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>✦ preview ✦</Text>
            <WindowControls />
          </View>
          <MiniMap />
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={styles.footer}>
        <AppButton
          variant="primary"
          size="lg"
          label="plan my day ★"
          fullWidth
          onPress={() => router.push('/route/preview')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: Colors.background,
  },
  starDeco: {
    position:   'absolute',
    top:        52,
    right:      PAGE_HORIZONTAL,
    fontSize:   16,
    color:      Colors.gray300,
  },
  header: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingVertical:   Spacing.md,
    backgroundColor:   '#fff',
    gap:               Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width:           32,
    height:          32,
    borderRadius:    Radius.md,
    borderWidth:     1,
    borderColor:     Colors.border,
    alignItems:      'center',
    justifyContent:  'center',
    backgroundColor: '#fff',
  },
  headerText: { flex: 1, gap: 2 },
  headerTitle: {
    fontSize:      16,
    fontWeight:    '600',
    color:         Colors.textPrimary,
    letterSpacing: 0.2,
  },
  headerSub: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.textSecondary,
    letterSpacing: 0.5,
  },
  scroll: {
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingTop:        Spacing.md,
    paddingBottom:     Spacing.xxxl,
    gap:               Spacing.md,
  },

  /* Section cards */
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius:    Radius.lg,
    padding:         Spacing.base,
    gap:             Spacing.md,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 1 },
    shadowOpacity:   0.05,
    shadowRadius:    6,
    elevation:       2,
  },
  sectionRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.textSecondary,
    letterSpacing: 1,
  },

  /* Toggle */
  toggleRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    fontFamily:    MONO_FONT,
    fontSize:      11,
    color:         Colors.textSecondary,
    letterSpacing: 0.5,
  },

  /* Stops */
  stopRow: {
    flexDirection:  'row',
    alignItems:     'center',
    gap:            Spacing.sm,
    paddingVertical: 2,
  },
  stopPin: {
    width:           28,
    height:          28,
    borderRadius:    Radius.full,
    borderWidth:     1.5,
    borderColor:     '#333',
    backgroundColor: '#fff',
    alignItems:      'center',
    justifyContent:  'center',
    flexShrink:      0,
  },
  stopPinPink:  { backgroundColor: Colors.primary, borderColor: Colors.primary },
  stopPinBlack: { backgroundColor: '#1a1a1a', borderColor: '#1a1a1a' },
  stopPinLabel: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    fontWeight:    '700',
    color:         '#333',
  },
  stopInfo: { flex: 1, gap: 1 },
  stopName: {
    fontSize:   14,
    fontWeight: '600',
    color:      Colors.textPrimary,
  },
  stopAddr: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
  },
  stopActions: {
    flexDirection: 'row',
    gap:           Spacing.md,
    alignItems:    'center',
  },
  stopAction: {
    fontFamily: MONO_FONT,
    fontSize:   14,
    color:      Colors.gray300,
  },

  /* Add stop */
  addStop: {
    borderWidth:     1.5,
    borderStyle:     'dashed',
    borderColor:     Colors.primaryLight,
    borderRadius:    Radius.md,
    paddingVertical: Spacing.sm,
    alignItems:      'center',
  },
  addStopText: {
    fontFamily:    MONO_FONT,
    fontSize:      12,
    color:         Colors.primaryDark,
    letterSpacing: 0.5,
  },

  footer: {
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingBottom:     Spacing.xl,
    paddingTop:        Spacing.md,
    backgroundColor:   Colors.background,
  },
});
