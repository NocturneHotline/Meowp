import React from 'react';
import {
  View,
  ScrollView,
  ViewStyle,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { PAGE_HORIZONTAL, Spacing } from '@/constants/spacing';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  withSafeArea?: boolean;
  backgroundColor?: string;
  horizontalPadding?: boolean;
  style?: ViewStyle;
}

export default function ScreenContainer({
  children,
  scrollable = false,
  withSafeArea = true,
  backgroundColor = Colors.background,
  horizontalPadding = true,
  style,
}: ScreenContainerProps) {
  const Wrapper = withSafeArea ? SafeAreaView : View;
  const px = horizontalPadding ? PAGE_HORIZONTAL : 0;

  const inner = scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingHorizontal: px },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.fill, { paddingHorizontal: px }, style]}>
      {children}
    </View>
  );

  return (
    <Wrapper style={[styles.fill, { backgroundColor }]} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.fill}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {inner}
      </KeyboardAvoidingView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
});
