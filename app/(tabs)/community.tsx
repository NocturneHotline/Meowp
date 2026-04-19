import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView, Text } from 'react-native';
import AppText from '@/components/common/AppText';
import ScreenContainer from '@/components/common/ScreenContainer';
import PostCard, { Post } from '@/components/post/PostCard';
import { Colors } from '@/constants/colors';
import { Spacing, Radius, PAGE_HORIZONTAL } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';

const FILTERS = ['all', 'routes', 'tips'] as const;
type Filter = typeof FILTERS[number];

const FILTER_ICONS: Record<Filter, string> = {
  all:    '✦',
  routes: '☆',
  tips:   '♪',
};

const DEMO_POSTS: Post[] = [
  {
    id:       '1',
    author:   'meow_traveller',
    timeAgo:  '2h ago',
    caption:  'Just did the perfect NYC loop — Central Park → MoMA → Brooklyn Bridge in one afternoon! The transit connections were seamless with Meowp',
    likes:    48,
    comments: 12,
  },
  {
    id:       '2',
    author:   'wanderpaws',
    timeAgo:  '5h ago',
    caption:  'Pro tip: cycling mode saves 15 mins on the riverside route compared to transit. Highly recommend!',
    likes:    31,
    comments: 7,
  },
  {
    id:       '3',
    author:   'citykitty',
    timeAgo:  '1d ago',
    caption:  'Morning commute + 3 errands + lunch spot, all planned in under 2 minutes. This app is wild',
    likes:    92,
    comments: 24,
  },
];

export default function CommunityScreen() {
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <ScreenContainer scrollable>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTag}>·* community · コミュニティ</Text>
        <AppText variant="title">discover ♡</AppText>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
        style={styles.filterRow}
      >
        {FILTERS.map((f) => (
          <Pressable
            key={f}
            style={[styles.chip, filter === f && styles.chipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>
              {FILTER_ICONS[f]} {f}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Posts */}
      {DEMO_POSTS.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop:    Spacing.lg,
    marginBottom: Spacing.md,
    gap:          Spacing.xs,
  },
  pageTag: {
    fontFamily:    MONO_FONT,
    fontSize:      9,
    letterSpacing: 1.2,
    color:         Colors.textSecondary,
  },
  filterRow: {
    marginBottom:     Spacing.lg,
    marginHorizontal: -PAGE_HORIZONTAL,
  },
  filters: {
    paddingHorizontal: PAGE_HORIZONTAL,
    gap:               Spacing.sm,
  },
  chip: {
    paddingVertical:   6,
    paddingHorizontal: Spacing.md,
    borderRadius:      Radius.full,
    backgroundColor:   Colors.card,
    borderWidth:       1,
    borderColor:       Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primaryPale,
    borderColor:     Colors.primaryDark,
  },
  chipText: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.textSecondary,
    letterSpacing: 0.5,
  },
  chipTextActive: {
    color: Colors.primaryDark,
  },
});
