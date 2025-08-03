import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  // Add other routes if needed
};

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the scale
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Navigate to Home after 2.5 seconds
    const timeout = setTimeout(() => {
      navigation.navigate('Home');
    }, 2500);

    return () => clearTimeout(timeout);
  }, [navigation, scaleAnim]);

  return (
    <LinearGradient colors={['#B987C6', '#211C24']} style={styles.container}>
      <Animated.Text style={[styles.title, { transform: [{ scale: scaleAnim }] }]}>
        TechXpress
      </Animated.Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreen;