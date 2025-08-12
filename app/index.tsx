import { View, Text, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { Link } from "expo-router";
import ThemeSelector from "@/components/ui/ThemeSelector";

const Home = () => {
  const { width } = useWindowDimensions();
  const selectorWidth = Math.min(width - 40, 400);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-2xl text-center font-PSBlackIt uppercase text-success-500">
        TechXpress
      </Text>
      <Link href="/+not-found" className="text-secondary-500 mt-4">
        Go to Not Found Page
      </Link>
      <View className="mt-8" style={{ width: selectorWidth }}>
        <ThemeSelector />
      </View>
    </SafeAreaView>
  );
};

export default Home;
