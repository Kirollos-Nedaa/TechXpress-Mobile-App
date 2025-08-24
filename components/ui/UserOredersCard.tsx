import { View, Text, TouchableOpacity } from "react-native";
import { PackageIcon } from "phosphor-react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

const UserOrdersCard = ({ ordersPress }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={ordersPress}>
      <View className="bg-white dark:bg-gray-900 p-4 flex-row items-center">
        <View className="mr-4 items-center justify-center">
          <PackageIcon size={20} color={isDark ? "#E4E7E9" : "#191C1F"} />
        </View>
        <View>
          <Text className="text-lg font-PSSemiB text-gray-900 dark:text-gray-100">
            Orders
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Manage & Track
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserOrdersCard;
