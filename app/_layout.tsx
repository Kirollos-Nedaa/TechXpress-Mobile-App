import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import { ThemeProvider } from "../context/themeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "PublicSans-Black": require("../assets/fonts/PublicSans-Black.ttf"),
    "PublicSans-BlackItalic": require("../assets/fonts/PublicSans-BlackItalic.ttf"),
    "PublicSans-Bold": require("../assets/fonts/PublicSans-Bold.ttf"),
    "PublicSans-BoldItalic": require("../assets/fonts/PublicSans-BoldItalic.ttf"),
    "PublicSans-ExtraBold": require("../assets/fonts/PublicSans-ExtraBold.ttf"),
    "PublicSans-ExtraBoldItalic": require("../assets/fonts/PublicSans-ExtraBoldItalic.ttf"),
    "PublicSans-ExtraLight": require("../assets/fonts/PublicSans-ExtraLight.ttf"),
    "PublicSans-ExtraLightItalic": require("../assets/fonts/PublicSans-ExtraLightItalic.ttf"),
    "PublicSans-Italic": require("../assets/fonts/PublicSans-Italic.ttf"),
    "PublicSans-Light": require("../assets/fonts/PublicSans-Light.ttf"),
    "PublicSans-LightItalic": require("../assets/fonts/PublicSans-LightItalic.ttf"),
    "PublicSans-Medium": require("../assets/fonts/PublicSans-Medium.ttf"),
    "PublicSans-MediumItalic": require("../assets/fonts/PublicSans-MediumItalic.ttf"),
    "PublicSans-Regular": require("../assets/fonts/PublicSans-Regular.ttf"),
    "PublicSans-SemiBold": require("../assets/fonts/PublicSans-SemiBold.ttf"),
    "PublicSans-SemiBoldItalic": require("../assets/fonts/PublicSans-SemiBoldItalic.ttf"),
    "PublicSans-Thin": require("../assets/fonts/PublicSans-Thin.ttf"),
    "PublicSans-ThinItalic": require("../assets/fonts/PublicSans-ThinItalic.ttf"),
  });

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
