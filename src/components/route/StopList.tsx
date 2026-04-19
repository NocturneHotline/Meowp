import React from 'react';
import { View, StyleSheet } from 'react-native';
import StopCard, { Stop } from './StopCard';
import AppText from '@/components/common/AppText';
import { Spacing } from '@/constants/spacing';

interface StopListProps {
  stops: Stop[];
}

export default function StopList({ stops }: StopListProps) {
  if (stops.length === 0) {
    return (
      <View style={styles.empty}>
        <AppText variant="bodySmall" align="center">
          Add stops to plan your route
        </AppText>
      </View>
    );
  }

  return (
    <View>
      {stops.map((stop) => (
        <StopCard key={stop.id} stop={stop} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    paddingVertical: Spacing.xxl,
    alignItems:      'center',
  },
});
