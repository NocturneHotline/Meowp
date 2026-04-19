export const TRANSPORT_MODES = [
  { id: 'transit',  label: 'Transit',  icon: 'bus-outline' },
  { id: 'walking',  label: 'Walk',     icon: 'walk-outline' },
  { id: 'cycling',  label: 'Cycle',    icon: 'bicycle-outline' },
  { id: 'driving',  label: 'Drive',    icon: 'car-outline' },
] as const;

export type TransportMode = typeof TRANSPORT_MODES[number]['id'];
