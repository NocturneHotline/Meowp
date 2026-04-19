import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { TextPresets, TextVariant } from '@/constants/typography';

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
  align?: TextStyle['textAlign'];
  children?: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

export default function AppText({
  variant = 'body',
  color,
  align,
  children,
  style,
  ...rest
}: AppTextProps) {
  return (
    <Text
      style={[
        TextPresets[variant],
        color ? { color } : null,
        align ? { textAlign: align } : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
