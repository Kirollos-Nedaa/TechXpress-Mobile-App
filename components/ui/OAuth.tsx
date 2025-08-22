import { View, Text, Platform } from "react-native";
import CustomButton from "./customButton";
import { Ionicons } from "@expo/vector-icons";
import GoogleIcon from "@/assets/images/Google.png";

const OAuth = ({ onPressGoogle, onPressApple, onPressBiometric }) => {
  return (
    <View>
      {/* Divider */}
      <View className="flex flex-row items-center justify-center my-6 gap-x-3">
        <View className="flex-1 h-[1px] bg-gray-100 dark:bg-gray-700" />
        <Text className="font-PSBold text-lg text-gray-400">Or</Text>
        <View className="flex-1 h-[1px] bg-gray-100 dark:bg-gray-700" />
      </View>

      {/* Google Button */}
      <CustomButton
        onPress={onPressGoogle}
        Title="Login with Google"
        BgVariant
        TextVatiant="text-gray-500 dark:text-gray-300"
        ClassName="gap-2 py-3 mb-3"
        IconLeft={GoogleIcon}
        LeftStyleIcon={true}
      />

      {/* Apple Button */}
      {Platform.OS === "ios" && (
        <CustomButton
          onPress={onPressApple}
          Title="Login with Apple"
          BgVariant
          TextVatiant="text-gray-500 dark:text-gray-300"
          ClassName="gap-2 py-3 my-3 relative"
          IconLeft={Ionicons}
          IconName="logo-apple"
          IconDarkMode={true}
          IconSize={24}
          LeftStyleIcon={true}
        />
      )}

      {/* Biometric Button */}
      <CustomButton
        onPress={onPressBiometric}
        Title="Login with Biometric"
        BgVariant
        TextVatiant="text-gray-500 dark:text-gray-300"
        ClassName="gap-2 py-3 my-3 relative"
        IconLeft={Ionicons}
        IconName="finger-print"
        LeftStyleIcon={true}
        IconDarkMode={true}
        IconSize={24}
      />
    </View>
  );
};

export default OAuth;
