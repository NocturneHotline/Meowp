import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, Text, Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, Radius, PAGE_HORIZONTAL } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';

type Mode = { key: string; icon: string; label: string; time: string };

const MODES: Mode[] = [
  { key: 'walk',    icon: 'Å',  label: '·walk·',    time: '52m' },
  { key: 'transit', icon: '⊡',  label: '·transit·', time: '34m' },
  { key: 'drive',   icon: '⊟',  label: '·drive·',   time: '22m' },
  { key: 'bike',    icon: '⊕',  label: '·bike·',    time: '28m' },
];

type Leg = { label: string; time: string; walkMin: string; walkKm: string; stay?: string };

const ITINERARY: Leg[] = [
  { label: 'A', time: '10:30 AM', walkMin: '17min', walkKm: '1.4 km' },
  { label: '1', time: '10:47 AM', walkMin: '17min', walkKm: '1.4 km', stay: 'stay 25m' },
  { label: '2', time: '11:04 AM', walkMin: '17min', walkKm: '1.4 km', stay: 'stay 40m' },
  { label: 'Z', time: '11:21 AM', walkMin: '',      walkKm: '',       stay: '' },
];

const STOP_NAMES: Record<string, string> = {
  A: 'Home',
  '1': 'David Jones',
  '2': 'Top Tea',
  Z: 'University of Melbourne',
};
const STOP_ADDRS: Record<string, string> = {
  A: '·42 Carlton St·',
  '1': '·Bourke St Mall·',
  '2': '·Swanston St·',
  Z: '·Parkville·',
};

function WindowControls() {
  return (
    <View style={{ flexDirection: 'row', gap: 4 }}>
      {[0,1,2].map(i => <View key={i} style={{ width: 13, height: 13, borderRadius: 3, borderWidth: 1, borderColor: Colors.border }} />)}
    </View>
  );
}

/* Mini map */
function RouteMap() {
  return (
    <View style={rm.map}>
      {Array.from({ length: 10 }).map((_, i) => (
        <View key={`h${i}`} style={[rm.line, rm.horiz, { top: i * 24 }]} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <View key={`v${i}`} style={[rm.line, rm.vert, { left: i * 38 }]} />
      ))}
      <View style={rm.blob} />
      <View style={rm.blobOrange} />
      <View style={rm.routeLine} />
      <View style={[rm.pin, rm.pinPink, { top: 44, left: 16 }]}><Text style={rm.pinTxt}>A</Text></View>
      <View style={[rm.pin, rm.pinWhite, { top: 32, left: 78 }]}><Text style={[rm.pinTxt, { color: '#333' }]}>1</Text></View>
      <View style={[rm.pin, rm.pinWhite, { top: 52, left: 148 }]}><Text style={[rm.pinTxt, { color: '#333' }]}>2</Text></View>
      <View style={[rm.pin, rm.pinBlack, { top: 68, left: 224 }]}><Text style={rm.pinTxt}>Z</Text></View>
      <Text style={[rm.lbl, { top: 30, left: 10 }]}>Home</Text>
      <Text style={[rm.lbl, { top: 18, left: 68 }]}>David Jones</Text>
      <Text style={[rm.lbl, { top: 38, left: 138 }]}>Top Tea</Text>
      <Text style={[rm.lbl, { top: 84, left: 212, fontSize: 7 }]}>expand·</Text>
      <View style={rm.tag}><Text style={rm.tagTxt}>·*meowp*·</Text></View>
      <View style={rm.compass}><Text style={rm.compassTxt}>+ N</Text></View>
    </View>
  );
}

const rm = StyleSheet.create({
  map: {
    height: 160, backgroundColor: '#F7F4F0', borderRadius: Radius.md,
    overflow: 'hidden', borderWidth: 1, borderColor: Colors.border,
  },
  line: { position: 'absolute', backgroundColor: '#E0DAD4' },
  horiz: { left: 0, right: 0, height: 1 },
  vert:  { top: 0, bottom: 0, width: 1 },
  blob: {
    position: 'absolute', top: 68, left: 100, width: 80, height: 34,
    borderRadius: 999, backgroundColor: Colors.primaryLight, opacity: 0.5,
  },
  blobOrange: {
    position: 'absolute', top: 20, right: 20, width: 60, height: 80,
    borderRadius: 30, backgroundColor: '#F5D5A0', opacity: 0.5,
  },
  routeLine: {
    position: 'absolute', top: 58, left: 28, width: 210, height: 2,
    borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.primary,
  },
  pin: {
    position: 'absolute', width: 20, height: 20, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  pinPink:  { backgroundColor: Colors.primary },
  pinWhite: { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#333' },
  pinBlack: { backgroundColor: '#1a1a1a' },
  pinTxt: { fontFamily: MONO_FONT, fontSize: 8, fontWeight: '700', color: '#fff' },
  lbl: { position: 'absolute', fontFamily: MONO_FONT, fontSize: 8, color: '#666' },
  tag: {
    position: 'absolute', bottom: 8, left: 8, backgroundColor: '#1a1a1a',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999,
  },
  tagTxt: { fontFamily: MONO_FONT, fontSize: 8, color: '#fff', letterSpacing: 1 },
  compass: {
    position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4,
  },
  compassTxt: { fontFamily: MONO_FONT, fontSize: 8, color: Colors.primaryDark, fontWeight: '700' },
});

export default function PlanScreen() {
  const [activeMode, setActiveMode] = useState('walk');

  return (
    <SafeAreaView style={styles.container}>
      {/* Star deco */}
      <Text style={styles.starDeco}>☆</Text>

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={16} color={Colors.textSecondary} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>✦  today's plan</Text>
          <Text style={styles.headerSub}>4 stops · starts 10:30 AM</Text>
        </View>
        <Pressable style={styles.shareBtn}>
          <Ionicons name="share-outline" size={16} color={Colors.primaryDark} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Route map card */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>✦ route map ✦</Text>
            <WindowControls />
          </View>
          <RouteMap />
        </View>

        {/* Transport mode selector */}
        <View style={styles.modesRow}>
          {MODES.map((m) => (
            <Pressable
              key={m.key}
              style={[styles.modeCard, m.key === activeMode && styles.modeCardActive]}
              onPress={() => setActiveMode(m.key)}
            >
              <Text style={[styles.modeIcon, m.key === activeMode && styles.modeIconActive]}>{m.icon}</Text>
              <Text style={[styles.modeLabel, m.key === activeMode && styles.modeLabelActive]}>{m.label}</Text>
              <Text style={[styles.modeTime,  m.key === activeMode && styles.modeTimeActive]}>{m.time}</Text>
            </Pressable>
          ))}
        </View>

        {/* Itinerary */}
        <View style={styles.itinerarySection}>
          <View style={styles.itineraryHeader}>
            <Text style={styles.itineraryTag}>·✦ itinerary ·✦</Text>
            <View style={styles.routeBadge}>
              <Text style={styles.routeBadgeText}>♡ green · 52min · 4.2 km</Text>
            </View>
          </View>

          <View style={styles.itineraryList}>
            {ITINERARY.map((leg) => (
              <View key={leg.label}>
                <View style={styles.legRow}>
                  <View style={[
                    styles.legPin,
                    leg.label === 'A' && styles.legPinPink,
                    leg.label === 'Z' && styles.legPinBlack,
                  ]}>
                    <Text style={[
                      styles.legPinLabel,
                      (leg.label === 'A' || leg.label === 'Z') && { color: '#fff' },
                    ]}>{leg.label}</Text>
                  </View>
                  <View style={styles.legInfo}>
                    <Text style={styles.legName}>{STOP_NAMES[leg.label]}</Text>
                    <Text style={styles.legAddr}>{STOP_ADDRS[leg.label]}</Text>
                  </View>
                  <View style={styles.legTimeSide}>
                    <View style={styles.legTimePill}>
                      <Text style={styles.legTimeText}>{leg.time}</Text>
                    </View>
                    {leg.stay ? <Text style={styles.legStay}>{leg.stay}</Text> : null}
                  </View>
                </View>

                {/* Walk leg */}
                {leg.walkMin ? (
                  <View style={styles.walkLeg}>
                    <View style={styles.walkDot} />
                    <Text style={styles.walkText}>Å {leg.walkMin} · {leg.walkKm}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  starDeco: {
    position: 'absolute', top: 52, right: PAGE_HORIZONTAL + 44,
    fontSize: 14, color: Colors.gray300,
  },

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
  shareBtn: {
    width: 34, height: 34, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.primaryLight,
    backgroundColor: Colors.primaryPale,
    alignItems: 'center', justifyContent: 'center',
  },

  scroll: { paddingHorizontal: PAGE_HORIZONTAL, paddingTop: Spacing.md, paddingBottom: Spacing.xxxl, gap: Spacing.md },

  /* Section card */
  sectionCard: {
    backgroundColor: '#fff', borderRadius: Radius.lg, padding: Spacing.base, gap: Spacing.md,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionLabel: { fontFamily: MONO_FONT, fontSize: 11, color: Colors.textSecondary, letterSpacing: 1 },

  /* Transport modes */
  modesRow: { flexDirection: 'row', gap: Spacing.sm },
  modeCard: {
    flex: 1, alignItems: 'center', gap: 2, paddingVertical: Spacing.sm,
    backgroundColor: '#fff', borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  modeCardActive: { backgroundColor: '#FDF0E0', borderColor: '#E8B87A' },
  modeIcon:  { fontSize: 16, color: Colors.textSecondary },
  modeIconActive: { color: '#C88A3A' },
  modeLabel: { fontFamily: MONO_FONT, fontSize: 9, color: Colors.textSecondary, letterSpacing: 0.5 },
  modeLabelActive: { color: '#C88A3A', fontWeight: '600' },
  modeTime:  { fontFamily: MONO_FONT, fontSize: 11, fontWeight: '600', color: Colors.textSecondary },
  modeTimeActive: { color: '#C88A3A' },

  /* Itinerary */
  itinerarySection: { gap: Spacing.sm },
  itineraryHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.sm },
  itineraryTag: { fontFamily: MONO_FONT, fontSize: 11, color: Colors.textSecondary, letterSpacing: 1 },
  routeBadge: {
    backgroundColor: '#FDF0E0', paddingHorizontal: Spacing.sm, paddingVertical: 4,
    borderRadius: Radius.full, borderWidth: 1, borderColor: '#E8B87A',
  },
  routeBadgeText: { fontFamily: MONO_FONT, fontSize: 10, color: '#C88A3A', letterSpacing: 0.3 },

  itineraryList: {
    backgroundColor: '#fff', borderRadius: Radius.lg,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
    overflow: 'hidden',
  },
  legRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
    padding: Spacing.base, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  legPin: {
    width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, borderColor: '#333',
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  legPinPink:  { backgroundColor: Colors.primary, borderColor: Colors.primary },
  legPinBlack: { backgroundColor: '#1a1a1a', borderColor: '#1a1a1a' },
  legPinLabel: { fontFamily: MONO_FONT, fontSize: 10, fontWeight: '700', color: '#333' },
  legInfo: { flex: 1, gap: 2 },
  legName: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  legAddr: { fontFamily: MONO_FONT, fontSize: 10, color: Colors.textSecondary, letterSpacing: 0.3 },
  legTimeSide: { alignItems: 'flex-end', gap: 3, flexShrink: 0 },
  legTimePill: {
    backgroundColor: Colors.primaryPale, paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.primaryLight,
  },
  legTimeText: { fontFamily: MONO_FONT, fontSize: 10, fontWeight: '700', color: Colors.primaryDark },
  legStay: { fontFamily: MONO_FONT, fontSize: 9, color: Colors.textSecondary, letterSpacing: 0.3 },
  walkLeg: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    paddingHorizontal: Spacing.base + 40, paddingVertical: Spacing.xs,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  walkDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.gray300 },
  walkText: { fontFamily: MONO_FONT, fontSize: 10, color: Colors.textSecondary, letterSpacing: 0.3 },
});
