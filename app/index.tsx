import { useEffect, useState } from "react";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "@/app/(root)/welcome";
import { useColorScheme } from "nativewind";
import "../global.css";

// Simple loading component that matches your app's theme
const LoadingScreen = () => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 bg-white dark:bg-gray-900 items-center justify-center">
      <ActivityIndicator
        size="large"
        color={colorScheme === "dark" ? "#ADB7BC" : "#475156"}
      />
    </View>
  );
};

export default function Index() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      // Add a minimum loading time to prevent flicker
      const [hasLaunched] = await Promise.all([
        AsyncStorage.getItem("hasLaunched"),
        new Promise((resolve) => setTimeout(resolve, 300)), // Minimum 300ms
      ]);

      if (hasLaunched === null) {
        // First time opening the app
        setIsFirstLaunch(true);
        await AsyncStorage.setItem("hasLaunched", "true");

        // Show splash screen for 3 seconds
        const timer = setTimeout(() => {
          router.replace("/home");
        }, 3000);

        return () => clearTimeout(timer);
      } else {
        // App has been launched before, go directly to home
        setIsFirstLaunch(false);
        router.replace("/home");
      }
    } catch (error) {
      console.error("Error checking first launch:", error);
      router.replace("/home");
    }
  };

  // Show loading while checking (prevents white flash)
  if (isFirstLaunch === null) {
    return <LoadingScreen />;
  }

  // Show splash only on first launch
  if (isFirstLaunch) {
    return <SplashScreen />;
  }

  // Show loading while navigating
  return <LoadingScreen />;
}
