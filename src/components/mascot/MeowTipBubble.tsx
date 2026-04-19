import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '@/components/common/AppText';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';

interface MeowTipBubbleProps {
  tip: string;
}

export default function MeowTipBubble({ tip }: MeowTipBubbleProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.notch} />
      <View style={styles.bubble}>
        <AppText variant="caption" style={styles.tag}>♪ meow tip</AppText>
        <AppText variant="bodySmall" style={styles.text}>{tip}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex:          1,
    flexDirection: 'row',
    alignItems:    'flex-start',
  },
  notch: {
    width:              0,
    height:             0,
    borderTopWidth:     6,
    borderBottomWidth:  6,
    borderRightWidth:   10,
    borderTopColor:     'transparent',
    borderBottomColor:  'transparent',
    borderRightColor:   Colors.primaryPale,
    marginTop:          Spacing.md,
  },
  bubble: {
    flex:               1,
    backgroundColor:    Colors.primaryPale,
    borderRadius:       Radius.lg,
    borderTopLeftRadius: Radius.xs,
    borderWidth:        1,
    borderColor:        Colors.primaryLight,
    padding:            Spacing.md,
    gap:                Spacing.xs,
  },
  tag: {
    color:      Colors.primaryDark,
    letterSpacing: 0.8,
  },
  text: {
    color: Colors.textPrimary,
  },
});
