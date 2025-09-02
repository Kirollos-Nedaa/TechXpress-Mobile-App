import { ThemeContext } from "@/context/themeContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const SvgLoader = () => {
  const { isDark } = useContext(ThemeContext);
  const progress = useRef(new Animated.Value(0)).current;
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [progress]);

  // Animate stroke drawing using actual path length
  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [pathLength, 0], // hidden → fully drawn
  });

  const lightColors = ["#E4E7E9", "#FA8323"];
  const darkColors = ["#303639", "#FA8323"];
  const colors = isDark ? darkColors : lightColors;
  const fillColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: colors, // use theme-based pair
  });

  const stokeColor = isDark ? "#FFF" : "#475156";

  return (
    <View className="flex items-center justify-center gray-800">
      <Svg
        width={120}
        height={120}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M0 0h24v24H0z" fill="none" />

        <AnimatedPath
          d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
          stroke={stokeColor}
          strokeWidth={1}
          fill={fillColor}
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
          // Get the path length once mounted
          onLayout={() => {
            setPathLength(68);
          }}
        />
      </Svg>
    </View>
  );
};

export default SvgLoader;
