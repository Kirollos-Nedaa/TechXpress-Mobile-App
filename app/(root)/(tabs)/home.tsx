import { View, Text, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "@/global.css";
import { Link } from "expo-router";

const Home = () => {
  const { width } = useWindowDimensions();
  const selectorWidth = Math.min(width - 40, 400);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-2xl text-center font-PSBold uppercase text-success-500">
        Home
      </Text>
      <Link href={"/welcome"} className="text-secondary-500 mt-4">
        Go to Welcome Page
      </Link>
    </SafeAreaView>
  );
};

export default Home;
