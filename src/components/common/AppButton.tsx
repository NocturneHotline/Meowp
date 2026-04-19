import React from 'react';
import {
  Pressable,
  PressableProps,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import AppText from './AppText';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';
import { FontSize, MONO_FONT } from '@/constants/typography';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface AppButtonProps extends PressableProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary:   { backgroundColor: Colors.primary, borderWidth: 1, borderColor: Colors.primaryDark },
  secondary: { backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border },
  ghost:     { backgroundColor: 'transparent', borderWidth: 0 },
  danger:    { backgroundColor: '#FEE8E8', borderWidth: 1, borderColor: Colors.error },
};

const variantTextColor: Record<ButtonVariant, string> = {
  primary:   Colors.textPrimary,
  secondary: Colors.textPrimary,
  ghost:     Colors.textSecondary,
  danger:    Colors.error,
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: { paddingVertical: Spacing.sm,  paddingHorizontal: Spacing.base },
  md: { paddingVertical: 13,          paddingHorizontal: Spacing.xl },
  lg: { paddingVertical: 16,          paddingHorizontal: Spacing.xxl },
};

const sizeFontSize: Record<ButtonSize, number> = {
  sm: FontSize.xs,
  md: FontSize.sm,
  lg: FontSize.sm,
};

export default function AppButton({
  variant = 'primary',
  size = 'md',
  label,
  leftIcon,
  rightIcon,
  loading,
  disabled,
  fullWidth,
  style,
  ...rest
}: AppButtonProps) {
  const isDisabled = disabled || loading;
  const textColor = variantTextColor[variant];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.textPrimary : Colors.primaryDark}
        />
      ) : (
        <View style={styles.inner}>
          {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}
          <AppText
            style={{
              fontSize:   sizeFontSize[size],
              fontWeight: '500',
              color:      textColor,
              fontFamily: MONO_FONT,
              letterSpacing: 0.8,
            }}
          >
            {label}
          </AppText>
          {rightIcon ? <View style={styles.iconRight}>{rightIcon}</View> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius:   Radius.full,
    alignItems:     'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.40,
  },
  pressed: {
    opacity: 0.72,
  },
  inner: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
});
