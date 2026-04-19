import { ViewStyle } from 'react-native';

export const Shadows = {
  none: {} as ViewStyle,

  soft: {
    shadowColor:   '#F4A0BC',
    shadowOffset:  { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius:  4,
    elevation:     1,
  } as ViewStyle,

  medium: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius:  8,
    elevation:     2,
  } as ViewStyle,

  strong: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius:  12,
    elevation:     3,
  } as ViewStyle,
} as const;

export type ShadowKey = keyof typeof Shadows;
