import React from 'react';
import { View, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const THEME = '#6aaa82';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* Full-screen map placeholder */}
      <View style={styles.map} />

      {/* Search bar overlay */}
      <View style={[styles.searchWrap, { top: insets.top + 12 }]}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="搜索地点…"
            placeholderTextColor="#999"
          />
          <View style={styles.actions}>
            <Pressable style={styles.plusBtn}>
              <Ionicons name="add" size={18} color="#666" />
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

      {/* Location FAB */}
      <Pressable style={styles.fab}>
        <Ionicons name="locate-outline" size={20} color={THEME} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e8f0eb',
  },
  searchWrap: {
    position: 'absolute',
    left:     12,
    right:    12,
  },
  searchBar: {
    flexDirection:     'row',
    alignItems:        'center',
    backgroundColor:   '#fff',
    borderRadius:      999,
    paddingVertical:   10,
    paddingHorizontal: 16,
    shadowColor:       '#000',
    shadowOpacity:     0.10,
    shadowRadius:      8,
    shadowOffset:      { width: 0, height: 2 },
    elevation:         4,
    gap:               8,
  },
  input: {
    flex:     1,
    fontSize: 14,
    color:    '#333',
    padding:  0,
  },
  actions: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           8,
  },
  plusBtn: {
    width:           32,
    height:          32,
    borderRadius:    16,
    backgroundColor: '#f0f0f0',
    alignItems:      'center',
    justifyContent:  'center',
  },
  avatar: {
    width:        32,
    height:       32,
    borderRadius: 16,
    overflow:     'hidden',
  },
  avatarImg: {
    width:  32,
    height: 32,
  },
  fab: {
    position:        'absolute',
    right:           12,
    bottom:          16,
    width:           40,
    height:          40,
    borderRadius:    10,
    backgroundColor: '#fff',
    alignItems:      'center',
    justifyContent:  'center',
    shadowColor:     '#000',
    shadowOpacity:   0.10,
    shadowRadius:    6,
    shadowOffset:    { width: 0, height: 2 },
    elevation:       4,
  },
});
