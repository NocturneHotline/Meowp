import React, { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  Image,
  Text,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';
import { FontSize, MONO_FONT } from '@/constants/typography';

interface AppInputProps extends TextInputProps {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  hint?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

export default function AppInput({
  label,
  leftIcon,
  rightIcon,
  error,
  hint,
  disabled,
  containerStyle,
  style,
  ...rest
}: AppInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? Colors.error
    : isFocused
    ? Colors.primary
    : Colors.border;

  return (
    <View style={containerStyle}>
      {label ? (
        <Text style={styles.label}>{label}</Text>
      ) : null}

      <View
        style={[
          styles.inputRow,
          { borderColor },
          disabled && styles.disabledRow,
        ]}
      >
        {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}

        <TextInput
          style={[styles.input, disabled && styles.disabledText, style]}
          placeholderTextColor={Colors.gray400}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        {rightIcon && !error ? (
          <View style={styles.iconRight}>{rightIcon}</View>
        ) : null}

        {error ? (
          <View style={styles.iconRight}>
            <Image
              source={require('../../../assets/icons/alert.png')}
              style={styles.alertIcon}
            />
          </View>
        ) : null}
      </View>

      {hint && !error ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}

      {error ? (
        <Text style={[styles.hint, styles.errorText]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily:    MONO_FONT,
    fontSize:      FontSize.xs,
    letterSpacing: 0.8,
    color:         Colors.textSecondary,
    marginBottom:  Spacing.xs,
  },
  inputRow: {
    flexDirection:     'row',
    alignItems:        'center',
    backgroundColor:   Colors.card,
    borderWidth:       1,
    borderRadius:      Radius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical:   Spacing.sm,
  },
  disabledRow: {
    backgroundColor: Colors.gray100,
  },
  input: {
    flex:            1,
    fontSize:        FontSize.base,
    color:           Colors.textPrimary,
    paddingVertical: 0,
    fontFamily:      MONO_FONT,
    letterSpacing:   0.3,
  },
  disabledText: {
    color: Colors.textDisabled,
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
  alertIcon: {
    width:     16,
    height:    16,
    tintColor: Colors.error,
  },
  hint: {
    fontFamily:    MONO_FONT,
    fontSize:      FontSize.xs,
    color:         Colors.gray400,
    marginTop:     Spacing.xs,
    letterSpacing: 0.3,
  },
  errorText: {
    color: Colors.error,
  },
});
