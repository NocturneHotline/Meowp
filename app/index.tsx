import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import AppText from '@/components/common/AppText';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';

export default function SplashScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale   = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scale,   { toValue: 1, friction: 7,  useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
        router.replace('/(auth)/login');
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrapper, { opacity, transform: [{ scale }] }]}>
        <View style={styles.iconCircle}>
          <Image
            source={require('../assets/icons/appIcon.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <AppText variant="display" style={styles.title}>Meowp</AppText>
        <AppText variant="bodySmall" align="center" style={styles.subtitle}>
          Your smart route planner
        </AppText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: Colors.background,
    alignItems:      'center',
    justifyContent:  'center',
  },
  logoWrapper: {
    alignItems: 'center',
    gap:        Spacing.sm,
  },
  iconCircle: {
    width:           100,
    height:          100,
    borderRadius:    Radius.xl,
    backgroundColor: Colors.primaryLight,
    alignItems:      'center',
    justifyContent:  'center',
    marginBottom:    Spacing.md,
  },
  icon: {
    width:  72,
    height: 72,
  },
  title: {
    color:       Colors.textPrimary,
    letterSpacing: 1,
  },
  subtitle: {
    marginTop: Spacing.xs,
  },
});
