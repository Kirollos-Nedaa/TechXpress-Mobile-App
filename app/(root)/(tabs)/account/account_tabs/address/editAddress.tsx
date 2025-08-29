import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditAddress = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <TouchableOpacity onPress={router.back}>
        <Text className="text-2xl text-center font-PSBlackIt uppercase text-success-500">
          Back
        </Text>
      </TouchableOpacity>
      <Text className="text-2xl text-center font-PSBlackIt uppercase text-success-500">
        Edit Address
      </Text>
    </SafeAreaView>
  );
};

export default EditAddress;
