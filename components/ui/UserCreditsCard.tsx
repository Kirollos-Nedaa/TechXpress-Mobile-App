import { View, Text, TouchableOpacity } from "react-native";
import { WalletIcon } from "phosphor-react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

const UserCreditsCard = ({ credits, creditsPress }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={creditsPress}>
      <View className="bg-white dark:bg-gray-900 p-4 rounded-bl-xl flex-row items-center">
        <View className="mr-4 items-center justify-center">
          <WalletIcon size={20} color={isDark ? "#E4E7E9" : "#191C1F"} />
        </View>
        <View>
          <Text className="text-lg font-PSSemiB text-gray-900 dark:text-gray-100">
            Store Credits
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            EGP {Number(credits).toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCreditsCard;
