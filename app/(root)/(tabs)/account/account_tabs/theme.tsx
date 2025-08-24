import ThemeSelector from "@/components/ui/ThemeSelector";
import {
  View,
  Text,
  useWindowDimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";

const Theme = () => {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - 40, 400);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-800">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ alignItems: "center", paddingVertical: 24 }}
      >
        {/* Card container */}
        <View
          style={{ width: cardWidth }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden"
        >
          {/* Title */}
          <View className="px-5 py-4">
            <Text className="text-2xl font-PSSemiB text-gray-900 dark:text-gray-100">
              Theme
            </Text>
          </View>

          {/* Theme selector component */}
          <View className="px-5">
            <ThemeSelector />
          </View>
          <View className="flex flex-row items-center justify-center mt-2 mx-6">
            <View className="flex-1 h-[1px] bg-gray-200 dark:bg-gray-700" />
          </View>
          <View className="px-5 py-4">
            <Text className="text-sm font-PSSemiB text-gray-300 dark:text-gray-700">
              Here you can select your preferred theme for the app. Choose
              between Auto, Light, and Dark modes to customize your experience.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Theme;
