export const Colors = {
  background:     '#EFEAE6',
  backgroundWarm: '#EFEAE6',
  card:           '#FFFFFF',
  surface:        '#F9C8D8',

  primary:      '#F4A0BC',
  primaryDark:  '#E8799F',
  primaryLight: '#F9C8D8',
  primaryPale:  '#FEF0F5',

  textPrimary:   '#333333',
  textSecondary: '#888888',
  textDisabled:  '#BCBCBC',
  textInverse:   '#FFFFFF',
  textAccent:    '#E8799F',

  gray100: '#F5F5F5',
  gray200: '#EBEBEB',
  gray300: '#D0D0D0',
  gray400: '#BCBCBC',
  gray500: '#888888',

  border:     '#EBEBEB',
  borderPink: '#F4A0BC',
  divider:    '#EBEBEB',

  error:   '#E57373',
  success: '#81C784',
  warning: '#FFB74D',

  tabActive:     '#E8799F',
  tabInactive:   '#BCBCBC',
  tabBackground: '#FFFFFF',

  overlay: 'rgba(0, 0, 0, 0.03)',
  scrim:   'rgba(0, 0, 0, 0.32)',
} as const;

export type ColorKey = keyof typeof Colors;
