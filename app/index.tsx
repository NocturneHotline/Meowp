import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';

const { width: SW, height: SH } = Dimensions.get('window');
const GRID = 30;
const DURATION = 3200;
const TOTAL_BARS = 20;

const STATUS = [
  'waking up widgets...',
  'loading your routes...',
  'counting paw prints...',
  'warming up engines...',
  'almost there ♪...',
];

const STARS: { ty: number; tx: number; size: number; outline: boolean }[] = [
  { ty: 0.08, tx: 0.80, size: 18, outline: true },
  { ty: 0.13, tx: 0.12, size: 13, outline: false },
  { ty: 0.23, tx: 0.40, size: 11, outline: false },
  { ty: 0.55, tx: 0.04, size: 10, outline: false },
  { ty: 0.68, tx: 0.07, size: 15, outline: false },
  { ty: 0.72, tx: 0.84, size: 11, outline: true },
  { ty: 0.85, tx: 0.13, size: 20, outline: true },
  { ty: 0.89, tx: 0.90, size: 16, outline: true },
];

function GridBackground() {
  const cols = Math.ceil(SW / GRID) + 1;
  const rows = Math.ceil(SH / GRID) + 1;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: rows }).map((_, i) => (
        <View key={`h${i}`} style={[s.gridLine, s.gridH, { top: i * GRID }]} />
      ))}
      {Array.from({ length: cols }).map((_, i) => (
        <View key={`v${i}`} style={[s.gridLine, s.gridV, { left: i * GRID }]} />
      ))}
    </View>
  );
}

export default function SplashScreen() {
  const anim = useRef(new Animated.Value(0)).current;
  const catOpacity = useRef(new Animated.Value(0.25)).current;
  const [pct, setPct] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: DURATION,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => router.replace('/(auth)/login'), 300);
    });

    const id = anim.addListener(({ value }) => {
      const p = Math.round(value * 100);
      setPct(p);
      catOpacity.setValue(0.25 + value * 0.75);
      setMsgIdx(Math.min(Math.floor(value * STATUS.length), STATUS.length - 1));
    });

    return () => anim.removeListener(id);
  }, []);

  const filled = Math.round((pct / 100) * TOTAL_BARS);

  return (
    <View style={s.container}>
      <GridBackground />

      {STARS.map((st, i) => (
        <Text
          key={i}
          style={[
            s.star,
            { top: SH * st.ty, left: SW * st.tx, fontSize: st.size },
            st.outline ? s.starOutline : s.starFilled,
          ]}
        >
          {st.outline ? '☆' : '★'}
        </Text>
      ))}

      <Text style={s.header}>·* loading my map *·</Text>

      <View style={s.card}>
        <Animated.Image
          source={require('../assets/icons/appIcon.png')}
          style={[s.catImg, { opacity: catOpacity }]}
          resizeMode="contain"
        />

        <View style={s.dashed} />

        <View style={s.barRow}>
          <Text style={s.barText}>
            {'█'.repeat(filled)}{'░'.repeat(TOTAL_BARS - filled)}
          </Text>
          <View style={s.badge}>
            <Text style={s.badgeText}>{pct}%</Text>
          </View>
        </View>

        <Text style={s.status}>{STATUS[msgIdx]}</Text>
      </View>

      <View style={s.wordRow}>
        {['nice', 'to', 'meow', 'you'].map((w) => (
          <View key={w} style={[s.wordBtn, w === 'meow' && s.wordBtnActive]}>
            <Text style={[s.wordText, w === 'meow' && s.wordTextActive]}>{w}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Grid
  gridLine: { position: 'absolute', backgroundColor: 'rgba(180,170,162,0.25)' },
  gridH:    { left: 0, right: 0, height: StyleSheet.hairlineWidth },
  gridV:    { top: 0, bottom: 0, width: StyleSheet.hairlineWidth },

  // Stars
  star:        { position: 'absolute' },
  starFilled:  { color: Colors.primary, opacity: 0.65 },
  starOutline: { color: '#C8BEB8', opacity: 0.5 },

  header: {
    fontFamily:    'Courier New',
    fontSize:      13,
    letterSpacing: 2,
    color:         Colors.textSecondary,
    marginBottom:  24,
  },

  card: {
    width:           SW * 0.82,
    backgroundColor: '#FFFFFF',
    borderRadius:    20,
    alignItems:      'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    shadowColor:     '#000',
    shadowOpacity:   0.06,
    shadowOffset:    { width: 0, height: 4 },
    shadowRadius:    12,
    elevation:       4,
  },

  catImg: {
    width:        180,
    height:       180,
    marginBottom: 12,
  },

  dashed: {
    width:           '100%',
    height:          1,
    borderStyle:     'dashed',
    borderTopWidth:  1,
    borderColor:     '#D8D0CB',
    marginBottom:    16,
  },

  barRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           10,
    marginBottom:  10,
  },

  barText: {
    fontFamily: 'Courier New',
    fontSize:   13,
    color:      Colors.textPrimary,
    letterSpacing: 1,
  },

  badge: {
    backgroundColor: Colors.primaryLight,
    borderRadius:    20,
    paddingHorizontal: 10,
    paddingVertical:   3,
  },

  badgeText: {
    fontSize:   12,
    color:      Colors.textAccent,
    fontWeight: '600',
  },

  status: {
    fontFamily: 'Courier New',
    fontSize:   12,
    color:      Colors.textSecondary,
    letterSpacing: 1,
  },

  wordRow: {
    flexDirection: 'row',
    gap:           8,
    marginTop:     32,
  },

  wordBtn: {
    borderWidth:      1,
    borderColor:      Colors.gray300,
    borderRadius:     20,
    paddingHorizontal: 14,
    paddingVertical:   7,
    backgroundColor:  'transparent',
  },

  wordBtnActive: {
    backgroundColor: Colors.primaryLight,
    borderColor:     Colors.primaryLight,
  },

  wordText: {
    fontSize: 14,
    color:    Colors.textSecondary,
  },

  wordTextActive: {
    color:      Colors.textAccent,
    fontWeight: '600',
  },
});
