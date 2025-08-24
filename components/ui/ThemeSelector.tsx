import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { ThemeContext } from "@/context/themeContext";
import { SunIcon, MoonIcon, InfinityIconIcon } from "phosphor-react-native"; // Example icons

const themes = [
  { label: "Auto", value: "auto", icon: InfinityIconIcon },
  { label: "Light", value: "light", icon: SunIcon },
  { label: "Dark", value: "dark", icon: MoonIcon },
];

export default function ThemeSelector() {
  const { isDark, themeMode, setThemeMode } = useContext(ThemeContext);

  return (
    <View>
      {themes.map((theme) => {
        const isActive = themeMode === theme.value;
        const ThemeIcon = theme.icon; // get the icon component

        return (
          <Pressable
            key={theme.value}
            onPress={() => setThemeMode(theme.value as any)}
            className="flex-row items-center justify-between py-2"
          >
            <View className="flex-row items-center space-x-3">
              <ThemeIcon
                size={20}
                color={isDark ? "#FFF" : "#000"}
                style={{ marginRight: 8 }}
              />
              <Text className="text-lg font-PSSemiB text-gray-900 dark:text-gray-100">
                {theme.label}
              </Text>
            </View>
            <View
              className={`w-7 h-7 rounded-full border-2 items-center justify-center ${
                isActive
                  ? "border-primary-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              {isActive && (
                <View className="w-3 h-3 rounded-full bg-primary-500" />
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
