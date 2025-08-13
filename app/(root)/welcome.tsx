import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "@/assets/images/logo.png";
import { router } from "expo-router";
import Animated, {
  ZoomIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  withTiming,
  BounceInUp,
} from "react-native-reanimated";
import { useEffect } from "react";

const SplashScreen = () => {
  const textScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textRotation = useSharedValue(-10);

  useEffect(() => {
    // Advanced text animations
    textOpacity.value = withDelay(1100, withTiming(1, { duration: 800 }));

    textScale.value = withDelay(
      1100,
      withSequence(
        withSpring(1.2, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 12, stiffness: 150 })
      )
    );

    textRotation.value = withDelay(
      1100,
      withSpring(0, {
        damping: 15,
        stiffness: 200,
      })
    );
  }, []);

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [
        { scale: textScale.value },
        { rotate: `${textRotation.value}deg` },
      ],
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="absolute top-14 right-8 z-10">
        <TouchableOpacity
          onPress={() => {
            router.replace("/home");
          }}
        >
          <Text className="text-xl font-PSSemiB text-gray-900 dark:text-gray-50">
            Skip
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center justify-center">
        <Animated.View entering={BounceInUp.duration(1000)}>
          <Image source={logo} className="w-52 h-52" resizeMode="contain" />
        </Animated.View>
        <Animated.View style={[textAnimatedStyle]} className="mt-4">
          <Text className="text-3xl text-center font-PSBlackIt uppercase text-gray-900 dark:text-gray-50">
            TechXpress
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
