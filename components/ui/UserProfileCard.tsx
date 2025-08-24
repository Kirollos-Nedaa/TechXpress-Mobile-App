import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { UserIcon } from "phosphor-react-native";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

const UserProfileCard = ({ name, email, profilePicture, editPress }) => {
  const isDark = useContext(ThemeContext);

  return (
    <TouchableWithoutFeedback onPress={editPress}>
      <View className="bg-white dark:bg-gray-900 p-4 rounded-t-xl flex-row items-center">
        {profilePicture ? (
          <Image
            source={{ uri: profilePicture }}
            className="w-16 h-16 rounded-full mr-4"
          />
        ) : (
          <View className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 mr-4 items-center justify-center">
            <UserIcon size={32} color={isDark ? "#ADB7BC" : "#191C1F"} />
          </View>
        )}
        <View>
          <Text className="text-xl font-PSBold text-gray-900 dark:text-gray-100">
            {name}
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            {email}
          </Text>
        </View>
        <TouchableOpacity
          className="ml-auto rounded-full px-3 py-1 bg-gray-50 dark:bg-gray-800"
          onPress={editPress}
        >
          <Text className="text-gray-900 dark:text-gray-100 font-PSBold">
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserProfileCard;
