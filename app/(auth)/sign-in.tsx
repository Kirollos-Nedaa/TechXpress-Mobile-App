import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

const SignIn = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-2xl text-center font-PSBlackIt uppercase text-success-500">
        Sign Up
      </Text>
      <View className="mt-8" style={{ width: 400 }}></View>
    </SafeAreaView>
  );
};

export default SignIn;
