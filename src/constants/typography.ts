import { Platform, TextStyle } from 'react-native';
import { Colors } from './colors';

export const MONO_FONT = Platform.OS === 'ios' ? 'Courier New' : 'monospace';

export const FontSize = {
  xs:      10,
  sm:      12,
  base:    14,
  md:      15,
  lg:      17,
  xl:      20,
  xxl:     24,
  display: 30,
} as const;

export const FontWeight: Record<string, TextStyle['fontWeight']> = {
  light:    '300',
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
};

export const TextPresets = {
  display: {
    fontSize:      FontSize.display,
    fontWeight:    '700' as TextStyle['fontWeight'],
    lineHeight:    FontSize.display * 1.2,
    letterSpacing: 0.5,
    color:         Colors.textPrimary,
  } as TextStyle,

  title: {
    fontSize:      FontSize.xl,
    fontWeight:    '600' as TextStyle['fontWeight'],
    lineHeight:    FontSize.xl * 1.3,
    letterSpacing: 0.2,
    color:         Colors.textPrimary,
  } as TextStyle,

  subtitle: {
    fontSize:      FontSize.lg,
    fontWeight:    '500' as TextStyle['fontWeight'],
    lineHeight:    FontSize.lg * 1.4,
    letterSpacing: 0,
    color:         Colors.textPrimary,
  } as TextStyle,

  body: {
    fontSize:      FontSize.base,
    fontWeight:    '400' as TextStyle['fontWeight'],
    lineHeight:    FontSize.base * 1.6,
    letterSpacing: 0,
    color:         Colors.textPrimary,
  } as TextStyle,

  bodySmall: {
    fontSize:      FontSize.sm,
    fontWeight:    '400' as TextStyle['fontWeight'],
    lineHeight:    FontSize.sm * 1.6,
    letterSpacing: 0,
    color:         Colors.textSecondary,
  } as TextStyle,

  caption: {
    fontSize:      FontSize.xs,
    fontWeight:    '400' as TextStyle['fontWeight'],
    lineHeight:    FontSize.xs * 1.5,
    letterSpacing: 0.5,
    color:         Colors.textSecondary,
    fontFamily:    MONO_FONT,
  } as TextStyle,

  label: {
    fontSize:      FontSize.xs,
    fontWeight:    '500' as TextStyle['fontWeight'],
    lineHeight:    FontSize.xs * 1.4,
    letterSpacing: 1.0,
    color:         Colors.textSecondary,
    fontFamily:    MONO_FONT,
  } as TextStyle,

  overline: {
    fontSize:      FontSize.xs,
    fontWeight:    '400' as TextStyle['fontWeight'],
    lineHeight:    FontSize.xs * 1.4,
    letterSpacing: 1.5,
    color:         Colors.textSecondary,
    textTransform: 'uppercase' as TextStyle['textTransform'],
    fontFamily:    MONO_FONT,
  } as TextStyle,

  mono: {
    fontSize:      FontSize.sm,
    fontWeight:    '400' as TextStyle['fontWeight'],
    lineHeight:    FontSize.sm * 1.5,
    letterSpacing: 0.5,
    color:         Colors.textSecondary,
    fontFamily:    MONO_FONT,
  } as TextStyle,
} as const;

export type TextVariant = keyof typeof TextPresets;
