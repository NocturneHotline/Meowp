import React from 'react';
import { View, StyleSheet, Image, Pressable, TextInput, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';

/* Soft pink blob for parks */
function PinkBlob({ style }: { style: object }) {
  return <View style={[styles.blob, style]} />;
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* Grid-paper map placeholder */}
      <View style={styles.map}>
        {/* Faint grid lines */}
        {Array.from({ length: 18 }).map((_, i) => (
          <View key={`h${i}`} style={[styles.gridLine, styles.gridH, { top: i * 44 }]} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={`v${i}`} style={[styles.gridLine, styles.gridV, { left: i * 44 }]} />
        ))}

        {/* Pink park blobs */}
        <PinkBlob style={{ top: '28%', left: '30%', width: 130, height: 70 }} />
        <PinkBlob style={{ top: '55%', right: '8%', width: 110, height: 60 }} />

        {/* Park label */}
        <Text style={[styles.parkLabel, { top: '31%', left: '34%' }]}>Royal Park ·</Text>

        {/* Street labels */}
        <Text style={[styles.streetLabel, { top: '44%', right: '12%' }]}>· lygon st ·</Text>
        <Text style={[styles.streetLabel, { top: '64%', left: '20%' }]}>· swanston st ·</Text>

        {/* Meowp watermark */}
        <View style={styles.meowpTag}>
          <Text style={styles.meowpTagText}>·*meowp*·</Text>
        </View>

        {/* Compass */}
        <View style={[styles.compass, { top: insets.top + 72 }]}>
          <Text style={styles.compassN}>N</Text>
        </View>

        {/* Location FAB */}
        <Pressable style={styles.fab}>
          <Text style={styles.fabIcon}>-⊕-</Text>
        </Pressable>
      </View>

      {/* Search bar overlay */}
      <View style={[styles.searchWrap, { top: insets.top + 12 }]}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color={Colors.gray400} />
          <TextInput
            style={styles.input}
            placeholder="search a place..."
            placeholderTextColor={Colors.gray400}
          />
          <Pressable style={styles.plusBtn}>
            <Ionicons name="add" size={18} color={Colors.textPrimary} />
          </Pressable>
          <Pressable onPress={() => router.push('/(tabs)/profile')}>
            <View style={styles.avatar}>
              <Image
                source={require('../../assets/icons/userDefaultProfilePhoto.png')}
                style={styles.avatarImg}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  /* Map */
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F7F4F0',
    overflow:        'hidden',
  },
  gridLine: {
    position:        'absolute',
    backgroundColor: '#E0DAD4',
  },
  gridH: {
    left:   0,
    right:  0,
    height: 1,
  },
  gridV: {
    top:    0,
    bottom: 0,
    width:  1,
  },

  /* Blobs */
  blob: {
    position:        'absolute',
    borderRadius:    999,
    backgroundColor: Colors.primaryLight,
    opacity:         0.5,
  },

  /* Labels */
  parkLabel: {
    position:      'absolute',
    fontStyle:     'italic',
    fontSize:      12,
    color:         Colors.primaryDark,
    letterSpacing: 0.3,
  },
  streetLabel: {
    position:      'absolute',
    fontFamily:    MONO_FONT,
    fontSize:      9,
    color:         Colors.gray400,
    letterSpacing: 1,
  },

  /* Meowp tag */
  meowpTag: {
    position:          'absolute',
    bottom:            72,
    left:              16,
    backgroundColor:   Colors.textPrimary,
    paddingHorizontal: Spacing.sm,
    paddingVertical:   4,
    borderRadius:      Radius.full,
  },
  meowpTagText: {
    fontFamily:    MONO_FONT,
    fontSize:      9,
    color:         '#fff',
    letterSpacing: 1,
  },

  /* Compass */
  compass: {
    position:        'absolute',
    right:           16,
    width:           24,
    height:          24,
    borderRadius:    Radius.full,
    backgroundColor: '#fff',
    borderWidth:     1,
    borderColor:     Colors.border,
    alignItems:      'center',
    justifyContent:  'center',
  },
  compassN: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    fontWeight:    '700',
    color:         Colors.primary,
  },

  /* FAB */
  fab: {
    position:        'absolute',
    right:           16,
    bottom:          72,
    width:           40,
    height:          40,
    borderRadius:    Radius.md,
    backgroundColor: '#fff',
    alignItems:      'center',
    justifyContent:  'center',
    shadowColor:     '#000',
    shadowOpacity:   0.08,
    shadowRadius:    6,
    shadowOffset:    { width: 0, height: 2 },
    elevation:       3,
  },
  fabIcon: {
    fontFamily: MONO_FONT,
    fontSize:   11,
    color:      Colors.primary,
  },

  /* Search bar */
  searchWrap: {
    position: 'absolute',
    left:     12,
    right:    12,
  },
  searchBar: {
    flexDirection:     'row',
    alignItems:        'center',
    backgroundColor:   '#fff',
    borderRadius:      Radius.full,
    paddingVertical:   10,
    paddingHorizontal: Spacing.base,
    shadowColor:       '#000',
    shadowOpacity:     0.08,
    shadowRadius:      8,
    shadowOffset:      { width: 0, height: 2 },
    elevation:         4,
    gap:               8,
  },
  input: {
    flex:       1,
    fontSize:   14,
    color:      Colors.textPrimary,
    padding:    0,
    fontFamily: MONO_FONT,
  },
  plusBtn: {
    width:           30,
    height:          30,
    borderRadius:    Radius.full,
    backgroundColor: Colors.gray100,
    alignItems:      'center',
    justifyContent:  'center',
  },
  avatar: {
    width:           32,
    height:          32,
    borderRadius:    Radius.full,
    overflow:        'hidden',
    backgroundColor: Colors.primaryLight,
  },
  avatarImg: {
    width:  32,
    height: 32,
  },
});
