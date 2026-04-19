import React, { useState } from 'react';
import { View, Image, Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from '@/components/common/AppText';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';
import { MONO_FONT } from '@/constants/typography';

export interface Post {
  id: string;
  author: string;
  timeAgo: string;
  caption: string;
  imageUrl?: string;
  likes: number;
  comments: number;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.card}>
      {/* Image area */}
      <View style={styles.photo}>
        {post.imageUrl ? (
          <Image source={{ uri: post.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderIcon}>✦</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        {/* Author row */}
        <View style={styles.authorRow}>
          <Image
            source={require('../../../assets/icons/userDefaultProfilePhoto.png')}
            style={styles.avatar}
          />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>@{post.author}</Text>
            <Text style={styles.timeAgo}>{post.timeAgo}</Text>
          </View>
        </View>

        <AppText variant="body" numberOfLines={3} style={styles.caption}>
          {post.caption}
        </AppText>

        {/* Dashed divider */}
        <View style={styles.divider} />

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable style={styles.action} onPress={() => setLiked(!liked)}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={16}
              color={liked ? Colors.primaryDark : Colors.gray400}
            />
            <Text style={[styles.actionCount, liked && styles.actionCountActive]}>
              {post.likes + (liked ? 1 : 0)}
            </Text>
          </Pressable>

          <Pressable style={styles.action}>
            <Ionicons name="chatbubble-outline" size={16} color={Colors.gray400} />
            <Text style={styles.actionCount}>{post.comments}</Text>
          </Pressable>

          <Pressable style={styles.action}>
            <Ionicons name="arrow-redo-outline" size={16} color={Colors.gray400} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius:    Radius.lg,
    borderWidth:     1,
    borderColor:     Colors.border,
    overflow:        'hidden',
    marginBottom:    Spacing.md,
  },
  photo: {
    height: 180,
  },
  image: {
    width:      '100%',
    height:     '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    flex:            1,
    backgroundColor: Colors.primaryPale,
    alignItems:      'center',
    justifyContent:  'center',
  },
  placeholderIcon: {
    fontSize: 28,
    color:    Colors.primaryDark,
  },
  body: {
    padding: Spacing.base,
    gap:     Spacing.sm,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Spacing.sm,
  },
  avatar: {
    width:        32,
    height:       32,
    borderRadius: Radius.full,
    borderWidth:  1,
    borderColor:  Colors.primaryLight,
  },
  authorInfo: {
    flex: 1,
    gap:  1,
  },
  authorName: {
    fontFamily:    MONO_FONT,
    fontSize:      12,
    fontWeight:    '600',
    color:         Colors.textPrimary,
    letterSpacing: 0.3,
  },
  timeAgo: {
    fontFamily:    MONO_FONT,
    fontSize:      9,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
  },
  caption: {
    lineHeight: 22,
  },
  divider: {
    borderBottomWidth: 1,
    borderStyle:       'dashed',
    borderColor:       Colors.border,
    marginVertical:    Spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap:           Spacing.lg,
  },
  action: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Spacing.xs,
  },
  actionCount: {
    fontFamily:    MONO_FONT,
    fontSize:      10,
    color:         Colors.textSecondary,
    letterSpacing: 0.3,
  },
  actionCountActive: {
    color: Colors.primaryDark,
  },
});
