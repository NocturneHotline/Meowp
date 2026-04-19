import React from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '@/components/common/ScreenContainer';
import AppText from '@/components/common/AppText';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';

const STATS = [
  { label: 'routes', value: '24', icon: '✦' },
  { label: 'following', value: '138', icon: '☆' },
  { label: 'likes', value: '512', icon: '♡' },
];

type SettingRow = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  tag?: string;
  danger?: boolean;
  onPress?: () => void;
};

const SETTINGS: SettingRow[] = [
  { icon: 'person-outline',             label: 'Edit Profile',   tag: '·* profile' },
  { icon: 'notifications-outline',      label: 'Notifications',  tag: '·* alerts' },
  { icon: 'bookmark-outline',           label: 'Saved Routes',   tag: '·* saved' },
  { icon: 'language-outline',           label: 'Language',       tag: '·* lang' },
  { icon: 'information-circle-outline', label: 'About',          tag: '·* info' },
  {
    icon:    'log-out-outline',
    label:   'Sign Out',
    danger:  true,
    onPress: () => router.replace('/(auth)/login'),
  },
];

export default function ProfileScreen() {
  return (
    <ScreenContainer scrollable>
      {/* Page tag */}
      <Text style={styles.pageTag}>·* my space ·*</Text>

      {/* Avatar section */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarRing}>
          <Image
            source={require('../../assets/icons/userDefaultProfilePhoto.png')}
            style={styles.avatarImg}
          />
        </View>
        <Text style={styles.username}>meow_traveller</Text>
        <Text style={styles.memberSince}>member since 2024 ☆</Text>

        {/* Progress bar (profile completion) */}
        <View style={styles.progressWrap}>
          <Text style={styles.progressLabel}>·* profile · 80%</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '80%' }]} />
          </View>
        </View>
      </View>

      {/* Stats card */}
      <View style={styles.statsCard}>
        {STATS.map((stat, i) => (
          <React.Fragment key={stat.label}>
            <View style={styles.statCell}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <AppText variant="title">{stat.value}</AppText>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
            {i < STATS.length - 1 && <View style={styles.statDivider} />}
          </React.Fragment>
        ))}
      </View>

      {/* Settings list */}
      <Text style={styles.sectionTag}>★ settings</Text>
      <View style={styles.settingsList}>
        {SETTINGS.map((row, i) => (
          <Pressable
            key={row.label}
            style={({ pressed }) => [
              styles.settingRow,
              i === SETTINGS.length - 1 && styles.settingRowLast,
              pressed && styles.pressed,
            ]}
            onPress={row.onPress}
          >
            <Ionicons
              name={row.icon}
              size={18}
              color={row.danger ? Colors.error : Colors.gray400}
            />
            <View style={styles.settingTextWrap}>
              {row.tag && !row.danger && (
                <Text style={styles.settingTag}>{row.tag}</Text>
              )}
              <AppText
                variant="body"
                color={row.danger ? Colors.error : Colors.textPrimary}
              >
                {row.label}
              </AppText>
            </View>
            {!row.danger && (
              <Ionicons name="chevron-forward" size={14} color={Colors.gray300} />
            )}
          </Pressable>
        ))}
      </View>

      <Text style={styles.footer}>© @meowp · v1.0 · made w/ ♡</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  pageTag: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    letterSpacing: 1.5,
    color:         Colors.textSecondary,
    textAlign:     'center',
    marginTop:     Spacing.lg,
    marginBottom:  Spacing.sm,
  },
  avatarSection: {
    alignItems:    'center',
    paddingBottom: Spacing.xl,
    gap:           Spacing.sm,
  },
  avatarRing: {
    width:           88,
    height:          88,
    borderRadius:    Radius.full,
    borderWidth:     2,
    borderColor:     Colors.primary,
    overflow:        'hidden',
    backgroundColor: Colors.primaryPale,
    marginBottom:    Spacing.xs,
  },
  avatarImg: {
    width:  84,
    height: 84,
  },
  username: {
    fontFamily:    MONO_FONT,
    fontSize:      16,
    fontWeight:    '600',
    color:         Colors.textPrimary,
    letterSpacing: 0.5,
  },
  memberSince: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.textSecondary,
    letterSpacing: 0.5,
  },
  progressWrap: {
    width:  200,
    gap:    Spacing.xs,
    marginTop: Spacing.xs,
  },
  progressLabel: {
    fontFamily:    MONO_FONT,
    fontSize:      9,
    color:         Colors.primaryDark,
    letterSpacing: 0.8,
    textAlign:     'center',
  },
  progressTrack: {
    height:          6,
    backgroundColor: Colors.gray100,
    borderRadius:    Radius.full,
    borderWidth:     1,
    borderColor:     Colors.border,
    overflow:        'hidden',
  },
  progressFill: {
    height:          '100%',
    backgroundColor: Colors.primary,
    borderRadius:    Radius.full,
  },
  statsCard: {
    backgroundColor: Colors.card,
    borderRadius:    Radius.lg,
    borderWidth:     1,
    borderColor:     Colors.border,
    flexDirection:   'row',
    justifyContent:  'space-evenly',
    alignItems:      'center',
    paddingVertical: Spacing.lg,
    marginBottom:    Spacing.xl,
  },
  statCell: {
    alignItems: 'center',
    gap:        2,
  },
  statIcon: {
    fontSize:  13,
    color:     Colors.primaryDark,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily:    MONO_FONT,
    fontSize:      9,
    color:         Colors.textSecondary,
    letterSpacing: 0.8,
  },
  statDivider: {
    width:           1,
    height:          36,
    backgroundColor: Colors.border,
    borderStyle:     'dashed',
  },
  sectionTag: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    letterSpacing: 1.2,
    color:         Colors.textPrimary,
    fontWeight:    '600',
    marginBottom:  Spacing.sm,
  },
  settingsList: {
    backgroundColor: Colors.card,
    borderRadius:    Radius.lg,
    borderWidth:     1,
    borderColor:     Colors.border,
    overflow:        'hidden',
    marginBottom:    Spacing.xl,
  },
  settingRow: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingVertical:   Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap:               Spacing.md,
  },
  settingRowLast: {
    borderBottomWidth: 0,
  },
  pressed: {
    backgroundColor: Colors.gray100,
  },
  settingTextWrap: {
    flex: 1,
    gap:  1,
  },
  settingTag: {
    fontFamily:    MONO_FONT,
    fontSize:      8,
    color:         Colors.gray400,
    letterSpacing: 0.8,
  },
  footer: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.gray400,
    letterSpacing: 0.5,
    textAlign:     'center',
    marginBottom:  Spacing.xxl,
  },
});
