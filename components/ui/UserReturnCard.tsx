import { View, Text, Image, TouchableOpacity } from "react-native";
import { ArrowUDownLeftIcon } from "phosphor-react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

const UserReturnCard = ({ returnsCount, returnsPress }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={returnsPress}>
      <View className="bg-white dark:bg-gray-900 p-4 flex-row items-center">
        <View className="mr-4 items-center justify-center">
          <ArrowUDownLeftIcon
            size={20}
            color={isDark ? "#E4E7E9" : "#191C1F"}
          />
        </View>
        <View>
          <Text className="text-lg font-PSSemiB text-gray-900 dark:text-gray-100">
            Returns
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            {returnsCount} active requests
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserReturnCard;
