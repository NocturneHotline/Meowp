module.exports = {
  expo: {
    name: 'Meowp',
    slug: 'meowp',
    version: '1.0.0',
    scheme: 'meowp',
    orientation: 'portrait',
    icon: './assets/images/icons/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    ios: {
      bundleIdentifier: 'com.meowp.app',
      supportsTablet: false,
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
      infoPlist: {
        NSLocationWhenInUseUsageDescription: 'We need your location to set starting point',
      },
    },
    android: {
      package: 'com.meowp.app',
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
      adaptiveIcon: {
        foregroundImage: './assets/images/icons/icon.png',
        backgroundColor: '#ffffff',
      },
    },
    plugins: [
      'expo-router',
      'expo-asset',
      'expo-font',
      [
        'expo-location',
        {
          locationWhenInUsePermission: 'We need your location to set starting point',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
