import { View, Text, TouchableOpacity } from "react-native";
import { HeartIcon } from "phosphor-react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

const UserWishlistCard = ({ wishlistCount, wishlistPress }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={wishlistPress}>
      <View className="bg-white dark:bg-gray-900 p-4 rounded-br-xl flex-row items-center">
        <View className="rounded-full mr-4 items-center justify-center">
          <HeartIcon size={20} color={isDark ? "#E4E7E9" : "#191C1F"} />
        </View>
        <View>
          <Text className="text-lg font-PSSemiB text-gray-900 dark:text-gray-100">
            Wishlist
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            {wishlistCount} saved items
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserWishlistCard;
