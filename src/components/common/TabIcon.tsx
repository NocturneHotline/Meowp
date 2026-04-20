import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export type TabIconName = 'map' | 'routes' | 'saved' | 'me';

type Props = { name: TabIconName; color: string; size?: number };

export function TabIcon({ name, color, size = 24 }: Props) {
  const sw = 1.6;
  const common = {
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  switch (name) {
    case 'map':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path {...common} d="M3.2 6.5 L9 4.5 L15 6.5 L20.8 4.5 L20.8 17.5 L15 19.5 L9 17.5 L3.2 19.5 Z" />
          <Path {...common} d="M9 4.5 L9 17.5" />
          <Path {...common} d="M15 6.5 L15 19.5" />
        </Svg>
      );
    case 'routes':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path {...common} d="M17.5 5.5 C 13 5.5, 13 9.5, 16 10.8 C 19 12, 19 15.5, 15 16 C 11 16.5, 8 15.5, 7 18.5" />
          <Circle cx="17.5" cy="5.5" r="1.6" fill={color} />
          <Circle cx="7" cy="18.5" r="1.6" fill={color} />
        </Svg>
      );
    case 'saved':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path {...common} d="M6.5 3.5 L17.5 3.5 L17.5 20 L12 16 L6.5 20 Z" />
        </Svg>
      );
    case 'me':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle {...common} cx="12" cy="8" r="3.6" />
          <Path {...common} d="M4.5 20.5 C 5.2 16, 8 14.2, 12 14.2 C 16 14.2, 18.8 16, 19.5 20.5" />
        </Svg>
      );
  }
}
