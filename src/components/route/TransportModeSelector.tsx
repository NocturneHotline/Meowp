import React from 'react';
import { ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from '@/components/common/AppText';
import { Colors } from '@/constants/colors';
import { Spacing, Radius, PAGE_HORIZONTAL } from '@/constants/spacing';
import { TRANSPORT_MODES, TransportMode } from '@/constants/transportModes';

interface TransportModeSelectorProps {
  selected: TransportMode[];
  onToggle: (mode: TransportMode) => void;
}

export default function TransportModeSelector({
  selected,
  onToggle,
}: TransportModeSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {TRANSPORT_MODES.map((mode) => {
        const active = selected.includes(mode.id);
        return (
          <Pressable
            key={mode.id}
            style={[styles.pill, active && styles.pillActive]}
            onPress={() => onToggle(mode.id)}
          >
            <Ionicons
              name={mode.icon as React.ComponentProps<typeof Ionicons>['name']}
              size={16}
              color={active ? Colors.primaryDark : Colors.gray500}
            />
            <AppText
              variant="caption"
              color={active ? Colors.primaryDark : Colors.textSecondary}
              style={styles.pillLabel}
            >
              {mode.label}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap:             Spacing.sm,
    paddingHorizontal: PAGE_HORIZONTAL,
  },
  pill: {
    flexDirection:   'row',
    alignItems:      'center',
    paddingVertical:   Spacing.sm,
    paddingHorizontal: Spacing.base,
    borderRadius:    Radius.full,
    backgroundColor: Colors.gray100,
    borderWidth:     1,
    borderColor:     Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.primaryLight,
    borderColor:     Colors.primaryDark,
  },
  pillLabel: {
    marginLeft: Spacing.xs,
  },
});
