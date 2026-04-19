import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

interface MeowMascotProps {
  size?: number;
}

export default function MeowMascot({ size = 64 }: MeowMascotProps) {
  return (
    <View
      style={[
        styles.circle,
        {
          width:        size,
          height:       size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Text style={{ fontSize: size * 0.55 }}>🐱</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: Colors.primaryLight,
    alignItems:      'center',
    justifyContent:  'center',
  },
});
