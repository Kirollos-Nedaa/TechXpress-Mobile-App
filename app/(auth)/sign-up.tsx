import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-2xl text-center font-PSBlackIt uppercase text-success-500">
        Sign Up
      </Text>
    </SafeAreaView>
  );
};

export default SignUp;
