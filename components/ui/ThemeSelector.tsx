import React, { useContext, useRef, useState } from "react";
import {
  Pressable,
  Text,
  View,
  LayoutChangeEvent,
  Animated,
} from "react-native";
import { ThemeContext } from "@/context/themeContext";

const themes = [
  { label: "Auto", value: "auto" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

export default function ThemeSelector() {
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const [optionWidth, setOptionWidth] = useState(0);
  const bubbleX = useRef(new Animated.Value(0)).current;

  const handleLayout = (e: LayoutChangeEvent, index: number) => {
    const { width } = e.nativeEvent.layout;
    setOptionWidth(width);
    if (themes[index].value === themeMode) {
      bubbleX.setValue(width * index);
    }
  };

  const handlePress = (value: string, index: number) => {
    setThemeMode(value as any);
    Animated.spring(bubbleX, {
      toValue: optionWidth * index,
      useNativeDriver: true,
      damping: 15,
    }).start();
  };

  return (
    <View className="relative flex-row rounded-xl border border-gray-300 dark:border-gray-600 overflow-hidden bg-gray-100 dark:bg-gray-800">
      {/* Active bubble */}
      <Animated.View
        className="absolute top-0 bottom-0 bg-white dark:bg-gray-700 rounded-xl shadow-md"
        style={{
          width: optionWidth,
          transform: [{ translateX: bubbleX }],
        }}
      />

      {themes.map((theme, index) => {
        const isActive = themeMode === theme.value;
        return (
          <Pressable
            key={theme.value}
            onLayout={(e) => handleLayout(e, index)}
            onPress={() => handlePress(theme.value, index)}
            className="flex-1 py-2 items-center"
          >
            <Text
              className={`font-medium ${
                isActive
                  ? "text-gray-800 dark:text-gray-100"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {theme.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}