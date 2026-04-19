import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '@/components/common/ScreenContainer';
import AppText from '@/components/common/AppText';
import AppButton from '@/components/common/AppButton';
import AppInput from '@/components/common/AppInput';
import TransportModeSelector from '@/components/route/TransportModeSelector';
import StopList from '@/components/route/StopList';
import { Colors } from '@/constants/colors';
import { Spacing, Radius, PAGE_HORIZONTAL } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';
import { TransportMode } from '@/constants/transportModes';
import { Stop } from '@/components/route/StopCard';

const DEMO_STOPS: Stop[] = [
  { id: '1', name: 'Central Park',    address: 'New York, NY',     order: 1 },
  { id: '2', name: 'MoMA',            address: '11 W 53rd St, NY', order: 2 },
  { id: '3', name: 'Brooklyn Bridge', address: 'Brooklyn, NY',     order: 3 },
];

export default function PlanScreen() {
  const [from, setFrom]       = useState('');
  const [to, setTo]           = useState('');
  const [modes, setModes]     = useState<TransportMode[]>(['transit']);
  const [loading, setLoading] = useState(false);

  const toggleMode = (mode: TransportMode) => {
    setModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode],
    );
  };

  const handleFind = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTag}>·* plan · 路线规划</Text>
        <AppText variant="title">plan a route ✦</AppText>
        <AppText variant="bodySmall" color={Colors.textSecondary} style={styles.headerSub}>
          find the best way to get there
        </AppText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Search card */}
        <View style={styles.searchCard}>
          <Text style={styles.cardTag}>·* from · to</Text>
          <View style={styles.dividerDashed} />

          <AppInput
            placeholder="from..."
            value={from}
            onChangeText={setFrom}
            leftIcon={<View style={styles.dotOrigin} />}
            containerStyle={styles.inputWrap}
          />
          <View style={styles.routeLine} />
          <AppInput
            placeholder="to..."
            value={to}
            onChangeText={setTo}
            leftIcon={<Ionicons name="location" size={13} color={Colors.primaryDark} />}
            containerStyle={styles.inputWrap}
          />
        </View>

        {/* Transport mode */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>♪ how are you travelling?</Text>
          <TransportModeSelector selected={modes} onToggle={toggleMode} />
        </View>

        {/* Stops */}
        <View style={[styles.section, styles.stopsSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>☆ stops</Text>
            <Text style={styles.addStop}>+ add stop</Text>
          </View>
          <StopList stops={DEMO_STOPS} />
        </View>

        {/* Loading route image */}
        {loading && (
          <View style={styles.loadingWrap}>
            <Image
              source={require('../../assets/icons/loadingRoute.png')}
              style={styles.loadingImg}
              resizeMode="contain"
            />
            <Text style={styles.loadingText}>·* finding the best route… ·*</Text>
          </View>
        )}
      </ScrollView>

      {/* CTA */}
      <View style={styles.footer}>
        <View style={styles.dividerDashed} />
        <AppButton
          variant="primary"
          size="lg"
          label="★ find routes · 出发"
          fullWidth
          loading={loading}
          onPress={handleFind}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop:        Spacing.xl,
    paddingHorizontal: PAGE_HORIZONTAL,
    marginBottom:      Spacing.lg,
    gap:               Spacing.xs,
  },
  pageTag: {
    fontFamily:    MONO_FONT,
    fontSize:      9,
    letterSpacing: 1.2,
    color:         Colors.textSecondary,
  },
  headerSub: {
    marginTop: Spacing.xs,
  },
  scroll: {
    paddingBottom: Spacing.xxxl,
  },
  searchCard: {
    backgroundColor:  Colors.card,
    borderRadius:     Radius.lg,
    borderWidth:      1,
    borderColor:      Colors.border,
    padding:          Spacing.base,
    marginHorizontal: PAGE_HORIZONTAL,
    marginBottom:     Spacing.lg,
    gap:              Spacing.sm,
  },
  cardTag: {
    fontFamily:    MONO_FONT,
    fontSize:      9,
    letterSpacing: 1.0,
    color:         Colors.textSecondary,
  },
  dividerDashed: {
    borderBottomWidth: 1,
    borderStyle:       'dashed',
    borderColor:       Colors.border,
  },
  inputWrap: {
    marginBottom: 0,
  },
  dotOrigin: {
    width:        8,
    height:       8,
    borderRadius: Radius.full,
    borderWidth:  2,
    borderColor:  Colors.gray300,
  },
  routeLine: {
    width:           1,
    height:          16,
    backgroundColor: Colors.border,
    marginLeft:      3,
    marginVertical:  Spacing.xs,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionLabel: {
    fontFamily:        MONO_FONT,
    fontSize:          10,
    letterSpacing:     1.0,
    color:             Colors.textPrimary,
    fontWeight:        '600',
    paddingHorizontal: PAGE_HORIZONTAL,
    marginBottom:      Spacing.sm,
  },
  stopsSection: {
    paddingHorizontal: PAGE_HORIZONTAL,
  },
  sectionHeader: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    marginBottom:   Spacing.sm,
  },
  addStop: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.primaryDark,
    letterSpacing: 0.5,
  },
  loadingWrap: {
    alignItems:      'center',
    paddingVertical: Spacing.xl,
    gap:             Spacing.md,
  },
  loadingImg: {
    width:  120,
    height: 120,
  },
  loadingText: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.textSecondary,
    letterSpacing: 1.0,
  },
  footer: {
    paddingHorizontal: PAGE_HORIZONTAL,
    paddingBottom:     Spacing.xl,
    paddingTop:        Spacing.md,
    backgroundColor:   Colors.background,
    gap:               Spacing.md,
  },
});
