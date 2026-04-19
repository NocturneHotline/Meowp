import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '@/components/common/AppText';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';
import { Shadows } from '@/constants/shadows';

export interface Stop {
  id: string;
  name: string;
  address?: string;
  order: number;
}

interface StopCardProps {
  stop: Stop;
}

export default function StopCard({ stop }: StopCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.accent} />
      <View style={styles.content}>
        <View style={styles.orderBadge}>
          <AppText variant="caption" color={Colors.primaryDark} align="center">
            {stop.order}
          </AppText>
        </View>
        <View style={styles.text}>
          <AppText variant="body" numberOfLines={1}>{stop.name}</AppText>
          {stop.address ? (
            <AppText variant="caption" numberOfLines={1} style={styles.address}>
              {stop.address}
            </AppText>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...Shadows.soft,
    backgroundColor: Colors.card,
    borderRadius:    Radius.md,
    flexDirection:   'row',
    overflow:        'hidden',
    marginBottom:    Spacing.sm,
  },
  accent: {
    width:           3,
    backgroundColor: Colors.primary,
  },
  content: {
    flex:           1,
    flexDirection:  'row',
    alignItems:     'center',
    padding:        Spacing.base,
    gap:            Spacing.md,
  },
  orderBadge: {
    width:           28,
    height:          28,
    borderRadius:    Radius.full,
    backgroundColor: Colors.primaryLight,
    alignItems:      'center',
    justifyContent:  'center',
  },
  text: {
    flex: 1,
  },
  address: {
    marginTop: Spacing.xs,
  },
});
